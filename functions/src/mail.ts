import * as sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_KEY!);

export async function sendEmails(
  htmlContent: string,
  recipients: string[],
  subject: string
) {
  if (!htmlContent || !recipients || recipients.length === 0) {
    console.error("Missing parameters");
    return;
  }
  try {
    await sgMail.sendMultiple({
      to: recipients,
      from: "slowtacocar@gmail.com", // Replace with your email
      subject: subject,
      html: htmlContent,
    });
    console.log("Emails sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
