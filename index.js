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

let testGiving = [
	{ name: "Local Test 1", email: "mugisha.au+test1@gmail.com" },
	{ name: "Local Test 2", email: "mugisha.au+test2@gmail.com" },
	{ name: "Local Test 3", email: "mugisha.au+test3@gmail.com" },
	{ name: "Local Test 4", email: "mugisha.au+test4@gmail.com" },
	{ name: "Local Test 5", email: "mugisha.au+test5@gmail.com" },
]
