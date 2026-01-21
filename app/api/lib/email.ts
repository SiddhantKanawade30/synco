import sgMail from "@sendgrid/mail";

if (!process.env.NEXT_PUBLIC_SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY not set in env");
}

console.log("SendGrid API Key found:", process.env.NEXT_PUBLIC_SENDGRID_API_KEY ? "YES" : "NO");
console.log("Email from:", process.env.EMAIL_FROM);

sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  try {
    console.log("Attempting to send email to:", to);
    console.log("Subject:", subject);
    
    const result = await sgMail.send({
      to,
      from: process.env.EMAIL_FROM!, // this must be your verified sender
      subject,
      html,
    });
    
    console.log("Email sent successfully:", result);
  } catch (error) {
    console.error("SendGrid error:", error);
    throw error;
  }
}
