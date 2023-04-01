import admin from "firebase-admin";
import * as functions from "firebase-functions";
import { sendEmails } from "./mail";
import model from "./model";
import { getLinear } from "./api";

admin.initializeApp();

// Schedule function to run on a daily interval.

exports.scheduledaily = functions.pubsub
	.schedule("every day 00:00")
	.onRun(async (_) => {
		// get users with weekly schedule task
		const dailyJobs = await getUsersByPeriod();

		// run job on each user
		return dailyJobs.forEach(async (x) => await runJob(await x));
	});

const runJob = async (pg: any[]) => {
	console.log("running job", pg);
	// run the llm on their data
	const htmlContent = await model(
		await getLinear("lin_api_IBz66o6WGRgfor7xTuHsoRDhXh44IsEZdyH9KtpK"),
		"Text",
		"all issues completed during cycle number 6"
	);

	console.log("got to 40", pg);

	const { emailRecipients: recipients, emailSubject: subject } = pg[0];
	console.log("got to 43", recipients, subject);
	// send email
	return await sendEmails(htmlContent!, recipients, subject);
};

const getUsersByPeriod = async () => {
	const db = admin.firestore();
	const ref = db.collection("users");

	const snap = await ref.get();

	return snap.docs.map(async (doc) => {
		const pg = await doc.ref.collection("playgrounds").get();
		console.log("got to 56");

		return pg.docs.map((x) => {
			let c = x.data();
			console.log(c);
			return c;
		});
	});
};
