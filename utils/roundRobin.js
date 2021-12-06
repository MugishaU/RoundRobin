const email = require("./email")

async function RoundRobin(list) {
	let people = list
	let firstPerson
	let giver
	let result = []

	if (people.length > 1) {
		while (people.length > 0) {
			if (giver === undefined) {
				const firstGiver = pickAndRemove(people)

				giver = firstGiver
				firstPerson = firstGiver
			}
			const reciever = pickAndRemove(people)

			const sendResult = await email.send({
				giverEmail: giver.email,
				giverName: giver.name,
				recieverName: reciever.name,
			})

			result.push(sendResult)
			giver = reciever
		}
		const sendResult = await email.send({
			giverEmail: giver.email,
			giverName: giver.name,
			recieverName: firstPerson.name,
		})

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
