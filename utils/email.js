require("dotenv").config()

const mailjet = require("node-mailjet").connect(
	process.env.MAILJET_API_KEY,
	process.env.MAILJET_SECRET_KEY
)

async function send(emailObject) {
	const subject = emailObject.subject
		? emailObject.subject
		: "You've got mail from SecretSend!"

	const customMessage = emailObject.customMessage
		? `${emailObject.customMessage}<br/><br/>`
		: ""

	const htmlPart = `<h3>${
		emailObject.customTitle ? emailObject.customTitle : subject
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
			return 200
		}
	} catch (error) {
		const errResult = { error: error.message, status: error.statusCode }
		console.error(errResult)
		return errResult
	}
}

exports.send = send
