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
	let result = []
	let log = []

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

			log.push({ giver: giver, reciever: reciever })

			result.push(sendResult)
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

		log.push({ giver: giver, reciever: firstPerson })
		result.push(sendResult)
	} else {
		return "error"
	}
	return result
}

function pickAndRemove(list) {
	const listIndex = Math.floor(Math.random() * list.length)
	const listItem = list.splice(listIndex, 1)[0]
	return listItem
}

exports.RoundRobin = RoundRobin
