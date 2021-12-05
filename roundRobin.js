let testGiving = [
	{ name: "Test 1", email: "mugisha.au+test1@gmail.com" },
	{ name: "Test 2", email: "mugisha.au+test2@gmail.com" },
	{ name: "Test 3", email: "mugisha.au+test3@gmail.com" },
	{ name: "Test 4", email: "mugisha.au+test4@gmail.com" },
	{ name: "Test 5", email: "mugisha.au+test5@gmail.com" },
	{ name: "Test 6", email: "mugisha.au+test6@gmail.com" },
	{ name: "Test 7", email: "mugisha.au+test6@gmail.com" },
	{ name: "Test 8", email: "mugisha.au+test6@gmail.com" },
	{ name: "Test 9", email: "mugisha.au+test6@gmail.com" },
];

function RoundRobin(people) {
	let firstPerson;
	let giver;

	if (people.length > 1) {
		while (people.length > 0) {
			if (giver === undefined) {
				const firstGiverIndex = Math.floor(Math.random() * people.length);
				const firstGiver = people.splice(firstGiverIndex, 1)[0];
				giver = firstGiver;
				firstPerson = firstGiver;
			}

			const recieverIndex = Math.floor(Math.random() * people.length);
			const reciever = people.splice(recieverIndex, 1)[0];

			EmailSend(giver, reciever);
			giver = reciever;
		}
		EmailSend(giver, firstPerson);
	}
}

function EmailSend(giver, reciever) {
	console.log(`Giver: ${giver.name}, Reciever: ${reciever.name}!`);
}

RoundRobin(testGiving);
