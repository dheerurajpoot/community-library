import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST || "smtp.gmail.com",
	port: Number.parseInt(process.env.SMTP_PORT || "587"),
	secure: false,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});

export async function sendEmail({
	to,
	subject,
	html,
}: {
	to: string;
	subject: string;
	html: string;
}) {
	try {
		await transporter.sendMail({
			from: process.env.SMTP_FROM || "noreply@affiliatehub.com",
			to,
			subject,
			html,
		});
		return { success: true };
	} catch (error) {
		console.error("Email sending error:", error);
		return { success: false, error };
	}
}

export function generateOTPEmail(otp: string): string {
	return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Verify Your Account - Community Library</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #059669, #0d9488); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Community Library</h1>
        <p style="color: #e6fffa; margin: 10px 0 0 0;">Verify Your Account</p>
      </div>
      
      <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #059669; margin-top: 0;">Welcome to Community Library!</h2>
        
        <p>Thank you for joining our community of book lovers. To complete your registration, please verify your email address using the code below:</p>
        
        <div style="background: white; border: 2px solid #059669; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
          <h3 style="margin: 0; color: #059669; font-size: 32px; letter-spacing: 8px;">${otp}</h3>
        </div>
        
        <p>This verification code will expire in 10 minutes for security reasons.</p>
        
        <p>If you didn't create an account with Community Library, please ignore this email.</p>
        
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
        
        <p style="font-size: 14px; color: #64748b;">
          Best regards,<br>
          The Community Library Team
        </p>
      </div>
    </body>
    </html>
  `;
}

export function generatePasswordResetEmail(resetLink: string): string {
	return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Reset Your Password - Community Library</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #059669, #0d9488); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Community Library</h1>
        <p style="color: #e6fffa; margin: 10px 0 0 0;">Password Reset Request</p>
      </div>
      
      <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #059669; margin-top: 0;">Reset Your Password</h2>
        
        <p>We received a request to reset your password for your Community Library account. Click the button below to create a new password:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background: #059669; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Reset Password</a>
        </div>
        
        <p>This link will expire in 1 hour for security reasons.</p>
        
        <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
        
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
        
        <p style="font-size: 14px; color: #64748b;">
          Best regards,<br>
          The Community Library Team
        </p>
      </div>
    </body>
    </html>
  `;
}
