let testGiving = [
	{ name: "Test 1", email: "mugisha.au+test1@gmail.com" },
	{ name: "Test 2", email: "mugisha.au+test2@gmail.com" },
	{ name: "Test 3", email: "mugisha.au+test3@gmail.com" },
	{ name: "Test 4", email: "mugisha.au+test4@gmail.com" },
	{ name: "Test 5", email: "mugisha.au+test5@gmail.com" },
];

function RoundRobin(list) {
	let people = list;
	let firstPerson;
	let giver;

	if (people.length > 1) {
		while (people.length > 0) {
			if (giver === undefined) {
				const firstGiver = pickAndRemove(people);

				giver = firstGiver;
				firstPerson = firstGiver;
			}
			const reciever = pickAndRemove(people);

			EmailSend(giver, reciever);
			giver = reciever;
		}
		EmailSend(giver, firstPerson);
	}
}

function pickAndRemove(list) {
	const listIndex = Math.floor(Math.random() * list.length);
	const listItem = list.splice(listIndex, 1)[0];
	return listItem;
}

function EmailSend(giver, reciever) {
	console.log(`Giver: ${giver.name}, Reciever: ${reciever.name}!`);
}

RoundRobin(testGiving);
