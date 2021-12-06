const email = require("./email")

function RoundRobin(list) {
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

			email.send({
				giverEmail: giver.email,
				giverName: giver.name,
				recieverName: reciever.name,
				subject: "You've got mail from SecretSend!",
			})
			giver = reciever
		}
		email.send({
			giverEmail: giver.email,
			giverName: giver.name,
			recieverName: firstPerson.name,
			subject: "You've got mail from SecretSend!",
		})
	} else {
		throw new Error("List must contain more than one entry")
	}
	return result
}

function pickAndRemove(list) {
	const listIndex = Math.floor(Math.random() * list.length)
	const listItem = list.splice(listIndex, 1)[0]
	return listItem
}

exports.RoundRobin = RoundRobin
