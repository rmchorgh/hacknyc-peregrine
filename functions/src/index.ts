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
    while (true) {
      try {
        // get users with weekly schedule task
        const dailyJobs = await getUsersByPeriod();

        // run job on each user
        for (const x of dailyJobs) {
          for (const y of x) {
            await runJob(y);
          }
        }
        break;
      } catch {}
    }
  });

const runJob = async (pg: any) => {
  console.log("running job", pg);
  // run the llm on their data
  let htmlContent = "";
  for (const field of pg.fields) {
    let res: any;
    if (field.apiName === "Linear") {
      res = await getLinear(pg.keys.find((x: any) => x.name === "Linear").key);
    }
    if (field.type === "text") {
      htmlContent += await model(
        res,
        "Text",
        "al" + "l issues completed during cycle number 6"
      );
    }
  }

  console.log("got to 40", pg);

  const { emailRecipients: recipients, emailSubject: subject } = pg;
  console.log("got to 43", recipients, subject);
  // send email
  return await sendEmails(htmlContent!, recipients, subject);
};

const getUsersByPeriod = async () => {
  const db = admin.firestore();
  const ref = db.collection("users");

  const snap = await ref.get();

  return await Promise.all(
    snap.docs.map(async (doc) => {
      const pg = await doc.ref.collection("playgrounds").get();
      const keys = (await doc.ref.collection("apis").get()).docs.map((x) =>
        x.data()
      );
      console.log("got to 56");

      return await Promise.all(
        pg.docs.map(async (x) => {
          const c = { ...(await x.data()), keys };
          console.log(c);
          return c;
        })
      );
    })
  );
};
