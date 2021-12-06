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

			result.push(email.send(giver, reciever))
			giver = reciever
		}
		result.push(email.send(giver, firstPerson))
	}
	return result
}

function pickAndRemove(list) {
	const listIndex = Math.floor(Math.random() * list.length)
	const listItem = list.splice(listIndex, 1)[0]
	return listItem
}

exports.RoundRobin = RoundRobin
