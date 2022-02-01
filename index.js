const { RoundRobin } = require("./utils/roundRobin")

exports.handler = async (event, context) => {
	let body
	let statusCode = 202
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
				response = await RoundRobin(requestJSON)

				if (response === "error") {
					throw new Error("Not enough recipients")
				} else if (response.errors.length > 0) {
					throw new Error("Some emails failed to send")
				} else {
					body = {
						message: "Success",
						errors: response.errors,
					}
				}

				break
			default:
				throw new Error(`Unsupported route: "${event.routeKey}"`)
		}
	} catch (err) {
		statusCode = 400
		let errors

		response.errors ? (errors = response) : (errors = { errors: [err.message] })

		body = {
			message: err.message,
			errors: errors.errors,
		}
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
	sendReport: true,
	customSubject: "Custom Subject",
	customTitle: "Custom Title",
	customMessage: "Custom Message",
}
