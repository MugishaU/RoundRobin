const email = require("./email")

async function RoundRobin(reqBody) {
	let firstPerson = reqBody.mainUser
	let recipients = reqBody.recipients
	let emailOptions = {}

	if (reqBody.customSubject) {
		emailOptions.customSubject = reqBody.customSubject
	}

	if (reqBody.customTitle) {
		emailOptions.customTitle = reqBody.customTitle
	}

	if (reqBody.customMessage) {
		emailOptions.customMessage = reqBody.customMessage
	}

	let giver = reqBody.mainUser
	let errors = []
	let log = []

	if (!firstPerson) {
		return "error"
	}

	if (recipients.length >= 1) {
		while (recipients.length > 0) {
			const reciever = pickAndRemove(recipients)

			const sendResult = await email.send(
				{
					giverEmail: giver.email,
					giverName: giver.name,
					recieverName: reciever.name,
				},
				emailOptions
			)

			log.push({ giver: giver, reciever: { name: reciever.name } })

			if (sendResult !== 202) {
				errors.push(sendResult)
			}
			giver = reciever
		}
		const sendResult = await email.send(
			{
				giverEmail: giver.email,
				giverName: giver.name,
				recieverName: firstPerson.name,
			},
			emailOptions
		)

		log.push({ giver: giver, reciever: { name: firstPerson.name } })
		if (sendResult !== 202) {
			errors.push(sendResult)
		}

		if (reqBody.sendReport) {
			const reportResult = await email.report(firstPerson, log)
			if (reportResult !== 202) {
				errors.push(sendResult)
			}
		}
	} else {
		return "error"
	}
	return { errors: errors }
}

function pickAndRemove(list) {
	const listIndex = Math.floor(Math.random() * list.length)
	const listItem = list.splice(listIndex, 1)[0]
	return listItem
}

exports.RoundRobin = RoundRobin
