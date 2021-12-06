const AWS = require("aws-sdk")

let testGiving = [
	{ name: "Test 1", email: "mugisha.au+test1@gmail.com" },
	{ name: "Test 2", email: "mugisha.au+test2@gmail.com" },
	{ name: "Test 3", email: "mugisha.au+test3@gmail.com" },
	{ name: "Test 4", email: "mugisha.au+test4@gmail.com" },
	{ name: "Test 5", email: "mugisha.au+test5@gmail.com" },
]

exports.handler = async (event, context) => {
	let body
	let statusCode = 200
	const headers = {
		"Content-Type": "application/json",
	}

	try {
		switch (event.routeKey) {
			case "GET /ping":
				body = "pong"
				break
			case "POST /email":
				let requestJSON = JSON.parse(event.body)
				body = RoundRobin(requestJSON)
				break
			default:
				throw new Error(`Unsupported route: "${event.routeKey}"`)
		}
	} catch (err) {
		statusCode = 400
		body = err.message
	} finally {
		body = JSON.stringify(body)
	}

	return {
		statusCode,
		body,
		headers,
	}
}

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

			result.push(EmailSend(giver, reciever))
			giver = reciever
		}
		result.push(EmailSend(giver, firstPerson))
	}
	return result
}

function pickAndRemove(list) {
	const listIndex = Math.floor(Math.random() * list.length)
	const listItem = list.splice(listIndex, 1)[0]
	return listItem
}

function EmailSend(giver, reciever) {
	return `Giver: ${giver.name}, Reciever: ${reciever.name}!`
}
