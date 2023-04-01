import sgMail from "@sendgrid/mail";

export async function sendEmails(
  htmlContent: string,
  recipients: string[],
  subject: string
) {
  sgMail.setApiKey(process.env.SENDGRID_KEY!);
  if (!htmlContent || !recipients || recipients.length === 0) {
    console.error("Missing parameters");
    return;
  }
  try {
    await sgMail.sendMultiple({
      to: recipients,
      from: "peregrine@kestrel.finance", // Replace with your email
      subject: subject,
      html: htmlContent,
    });
    console.log("Emails sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
