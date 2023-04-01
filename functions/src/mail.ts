import sgMail from "@sendgrid/mail";

export async function sendEmails(
	htmlContent: string,
	recipients: string[],
	subject: string
) {
	sgMail.setApiKey(
		"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"
	);
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
