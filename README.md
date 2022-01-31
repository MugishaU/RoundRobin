# Round Robin

A REST-API that sends emails in a "Secret Santa" style to recipients. Deployed with AWS Gateway & Lambda. Utilises the https://www.mailjet.com/ API. Served by front end: https://github.com/MugishaU/secretsend_v2

## Usage

Served from front end at https://secretsend.netlify.app/

## Endpoints

`Base URL` : https://p3h7zn74oj.execute-api.eu-west-2.amazonaws.com

---

### `GET /wake`

Response:
`awake`.

Can be used as a health check or to wake the lambda.

`POST /email`

---

## Request Body

    {
    "mainUser": { "name": "String", "email": "String" },
    "recipients": [
    	{ "name": "String", "email": "String" },
    	{ "name": "String", "email": "String" }
    ],
    "sendReport": true,
    "customSubject": "String",
    "customTitle": "String",
    "customMessage": "String"
    }
