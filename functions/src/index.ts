import { getFirestore } from "firebase-admin/firestore";
import { onSchedule } from "firebase-functions/v2/scheduler";

enum Period {
	daily = 0,
	weekly = 1,
}

interface User {
	id: string;
	playgrounds: Playground[];
	period: Period;
}
interface Playground {
	id: string;
	template: Template[];
}

enum TemplateType {
	rawText = 0,
	generatedText = 1,
	generatedGraph = 2,
}

interface Template {
	type: TemplateType;
	params?: string[];
	key: string;
}

// Schedule function to run on a daily interval.

exports.scheduledaily = onSchedule("every day 00:00", async (ev) => {
	// get users with weekly schedule task
	const dailyUsers = await getUsersByPeriod(Period.daily);

	// run job on each user
	dailyUsers.forEach(runJob);
});

const runJob = (user: User) => {
	// get user template
	// run the llm on their data
	// send email
};

const getUsersByPeriod = async (period: Period): Promise<User[]> => {
	const db = getFirestore();

	const ref = db.collection("users");
	const q = ref.where("period", "==", period);

	let collection: User[] = [];

	const snap = await q.get();

	snap.forEach((doc) => {
		let d = doc.data() as User;
		collection.push(d);
		console.log(d);
	});

	return collection;
};
