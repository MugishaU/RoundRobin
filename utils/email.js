require("dotenv").config()

const mailjet = require("node-mailjet").connect(
	process.env.MAILJET_API_KEY,
	process.env.MAILJET_SECRET_KEY
)

async function send(emailObject, emailOptions) {
	const subject = emailOptions.customSubject
		? emailOptions.customSubject
		: "You've got mail from SecretSend!"

	const customMessage = emailOptions.customMessage
		? `${emailOptions.customMessage}<br/><br/>`
		: ""

	const htmlPart = `<h3>${
		emailOptions.customTitle
			? emailOptions.customTitle
			: "You've got mail from SecretSend!"
	}</h3><br/>Hi ${
		emailObject.giverName
	},<br>${customMessage}You are getting a gift for <strong><u>${
		emailObject.recieverName
	}!</u><br/><h5>Powered by SecretSend ©</h5><strong>`

	try {
		const request = await mailjet.post("send", { version: "v3.1" }).request({
			Messages: [
				{
					From: {
						Email: "info@mugisha.io",
						Name: "SecretSend",
					},
					To: [
						{
							Email: emailObject.giverEmail,
							Name: emailObject.giverName,
						},
					],
					Subject: subject,
					HTMLPart: htmlPart,
				},
			],
		})
		if (request.response.status == "200") {
			console.log("Email sent successfully")
			return 202
		}
	} catch (error) {
		const errResult = { error: error.message, status: error.statusCode }
		console.error(errResult)
		return errResult
	}
}

async function report(mainUser, report) {
	const subject = "SecretSend Report"

	const tableRows = report
		.map(
			(listItem) =>
				`<tr style="border: 1px solid black;"><td style="border: 1px solid black;"> ${listItem.giver.name} </td><td style="border: 1px solid black;"> ${listItem.giver.email} </td><td style="border: 1px solid black;"> ${listItem.reciever.name} </td></tr>`
		)
		.join("")

	const htmlPart = `<h3>SecretSend Report</h3><br/><table style="border: 1px solid black;border-collapse:collapse;"><tr style="border: 1px solid black;"><th style="border: 1px solid black;"> Giver Name </th><th style="border: 1px solid black;"> Giver Email </th><th style="border: 1px solid black;"> Reciever Name </tr>${tableRows}</table><br/><strong><h5>Powered by SecretSend ©</h5></strong>`

	try {
		const request = await mailjet.post("send", { version: "v3.1" }).request({
			Messages: [
				{
					From: {
						Email: "info@mugisha.io",
						Name: "SecretSend",
					},
					To: [
						{
							Email: mainUser.email,
							Name: mainUser.name,
						},
					],
					Subject: subject,
					HTMLPart: htmlPart,
				},
			],
		})
		if (request.response.status == "200") {
			console.log("Report sent successfully")
			return 202
		}
	} catch (error) {
		const errResult = { error: error.message, status: error.statusCode }
		console.error(errResult)
		return errResult
	}
	return htmlPart
}

exports.send = send
exports.report = report
