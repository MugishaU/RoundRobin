# Round Robin

Code for a lambda that sends emails in a random order, secret santa style. Sits behind an AWS API Gateway

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
