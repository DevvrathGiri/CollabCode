import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, code } = await req.json(); // Get email and code from request

    // 🔧 Create a test account on Ethereal
    const testAccount = await nodemailer.createTestAccount();

    // 🔐 Create transporter using Ethereal SMTP
    const transport = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure, // true for port 465, false for 587
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // 📧 Email contents
    const mailOptions = {
      from: '"SynapseCode" <no-reply@synapsecode.dev>',
      to: email,
      subject: "Your Verification Code",
      html: `
        <h2>Hello Coder!</h2>
        <p>Your verification code is: <strong>${code}</strong></p>
        <p>Please use this code to verify your email on SynapseCode.</p>
      `,
    };

    // 📤 Send mail
    const result = await transport.sendMail(mailOptions);

    // ✅ Show preview link
    console.log("Ethereal preview URL:", nodemailer.getTestMessageUrl(result));

    return NextResponse.json({
      success: true,
      message: "Test email sent",
      previewUrl: nodemailer.getTestMessageUrl(result), // optional: return to frontend
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
