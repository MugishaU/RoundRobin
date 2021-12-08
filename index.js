const { RoundRobin } = require("./utils/roundRobin")

exports.handler = async (event, context) => {
	let body
	let statusCode = 200
	const headers = {
		"Content-Type": "application/json",
	}

	try {
		switch (event.routeKey) {
			case "GET /wake":
				body = "awake"
				break
			case "POST /email":
				let requestJSON = JSON.parse(event.body)
				body = await RoundRobin(requestJSON)

				if (body === "error") {
					throw new Error("List must contain more than one entry")
				}
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

let testGiving = {
	mainUser: { name: "mainUser", email: "mugisha.au+test1@gmail.com" },
	recipients: [
		{ name: "recipient1", email: "mugisha.au+test2@gmail.com" },
		{ name: "recipient2", email: "mugisha.au+test3@gmail.com" },
	],
	sendCopy: true,
	customSubject: "Custom Subject",
	customTitle: "Custom Title",
	customMessage: "Custom Message",
}
