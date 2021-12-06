require("dotenv").config()

const mailjet = require("node-mailjet").connect(
	process.env.MAILJET_API_KEY,
	process.env.MAILJET_SECRET_KEY
)

function send(emailObject) {
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

	const request = mailjet.post("send", { version: "v3.1" }).request({
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
	request
		.then((result) => {
			console.log(result.body.Messages[0].Status)
		})
		.catch((error) => {
			console.log({ error: error.message, status: error.statusCode })
		})
}

exports.send = send
