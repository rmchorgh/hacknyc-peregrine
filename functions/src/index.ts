import { getFirestore } from "firebase-admin/firestore";
import { onSchedule } from "firebase-functions/v2/scheduler";
// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
import { Period, User } from "../../types.d";

// Schedule function to run on a weekly interval.

exports.scheduleWeekly = onSchedule("every week 00:00", async (ev) => {
	// get users with weekly schedule task
	const weeklyUsers = await getUsersByPeriod(Period.weekly);

	// run job on each user
	weeklyUsers.forEach(runJob);
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
