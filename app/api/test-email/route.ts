import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/app/api/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { to } = await req.json();
    
    if (!to) {
      return NextResponse.json({ error: "Email address required" }, { status: 400 });
    }

    await sendEmail({
      to,
      subject: "Test Email from Your App",
      html: `
        <h2>Test Email</h2>
        <p>This is a test email to verify SendGrid is working.</p>
        <p>If you receive this, email sending is configured correctly!</p>
      `,
    });

    return NextResponse.json({ success: true, message: "Test email sent" });
  } catch (error) {
    console.error("Test email error:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
