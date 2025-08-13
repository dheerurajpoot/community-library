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

export function generateBorrowRequestEmailToOwner(
	borrowerName: string,
	bookTitle: string,
	bookAuthor: string,
	borrowerEmail: string,
	borrowerPhone: string,
	borrowDate: string,
	dueDate: string
): string {
	return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Book Borrow Request - Community Library</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #059669, #0d9488); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">📚 Community Library</h1>
        <p style="color: #e6fffa; margin: 10px 0 0 0;">Book Borrow Request</p>
      </div>
      
      <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #059669; margin-top: 0;">Someone wants to borrow your book!</h2>
        
        <div style="background: white; border-left: 4px solid #059669; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
          <h3 style="margin: 0 0 15px 0; color: #059669;">📖 Book Details</h3>
          <p style="margin: 5px 0;"><strong>Title:</strong> ${bookTitle}</p>
          <p style="margin: 5px 0;"><strong>Author:</strong> ${bookAuthor}</p>
        </div>

        <div style="background: white; border-left: 4px solid #0d9488; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
          <h3 style="margin: 0 0 15px 0; color: #0d9488;">👤 Borrower Information</h3>
          <p style="margin: 5px 0;"><strong>Name:</strong> ${borrowerName}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${borrowerEmail}" style="color: #0d9488;">${borrowerEmail}</a></p>
          <p style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:${borrowerPhone}" style="color: #0d9488;">${borrowerPhone}</a></p>
        </div>

        <div style="background: white; border-left: 4px solid #06b6d4; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
          <h3 style="margin: 0 0 15px 0; color: #06b6d4;">📅 Loan Details</h3>
          <p style="margin: 5px 0;"><strong>Borrow Date:</strong> ${borrowDate}</p>
          <p style="margin: 5px 0;"><strong>Expected Return:</strong> ${dueDate}</p>
          <p style="margin: 5px 0;"><strong>Loan Duration:</strong> 14 days</p>
        </div>

        <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #0277bd;">💡 What's Next?</h3>
          <ul style="margin: 0; padding-left: 20px;">
            <li>Contact the borrower to arrange pickup</li>
            <li>Confirm the book's condition before handover</li>
            <li>Keep track of the return date</li>
            <li>Rate your experience after the book is returned</li>
          </ul>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="mailto:${borrowerEmail}?subject=Re: Book Borrow Request - ${bookTitle}" style="background: #059669; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin: 0 10px 10px 0;">📧 Contact Borrower</a>
          <a href="tel:${borrowerPhone}" style="background: #0d9488; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin: 0 10px 10px 0;">📞 Call Borrower</a>
        </div>

        <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #92400e; font-size: 14px;">
            <strong>⚠️ Safety Reminder:</strong> When meeting to exchange books, choose a safe, public location and let someone know where you're going.
          </p>
        </div>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
        
        <p style="font-size: 14px; color: #64748b;">
          Happy sharing!<br>
          The Community Library Team
        </p>
        
        <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">
          This email was sent because someone requested to borrow your book on Community Library. 
          If you have any questions, please contact us at <a href="mailto:support@communitylibrary.com" style="color: #059669;">support@communitylibrary.com</a>
        </p>
      </div>
    </body>
    </html>
  `;
}

export function generateBorrowConfirmationEmailToBorrower(
	borrowerName: string,
	bookTitle: string,
	bookAuthor: string,
	ownerName: string,
	ownerEmail: string,
	ownerPhone: string,
	borrowDate: string,
	dueDate: string,
	bookCondition: string,
	bookLocation: string
): string {
	return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Borrow Request Confirmed - Community Library</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #059669, #0d9488); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">📚 Community Library</h1>
        <p style="color: #e6fffa; margin: 10px 0 0 0;">Borrow Request Confirmed</p>
      </div>
      
      <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #059669; margin-top: 0;">Great news, ${borrowerName}! 🎉</h2>
        
        <p style="font-size: 16px; color: #374151; margin-bottom: 25px;">
          Your request to borrow "<strong>${bookTitle}</strong>" has been confirmed. The book owner will contact you soon to arrange pickup.
        </p>

        <div style="background: white; border-left: 4px solid #059669; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
          <h3 style="margin: 0 0 15px 0; color: #059669;">📖 Book Details</h3>
          <p style="margin: 5px 0;"><strong>Title:</strong> ${bookTitle}</p>
          <p style="margin: 5px 0;"><strong>Author:</strong> ${bookAuthor}</p>
          <p style="margin: 5px 0;"><strong>Condition:</strong> ${bookCondition}</p>
          <p style="margin: 5px 0;"><strong>Location:</strong> ${bookLocation}</p>
        </div>

        <div style="background: white; border-left: 4px solid #0d9488; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
          <h3 style="margin: 0 0 15px 0; color: #0d9488;">👤 Book Owner</h3>
          <p style="margin: 5px 0;"><strong>Name:</strong> ${ownerName}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${ownerEmail}" style="color: #0d9488;">${ownerEmail}</a></p>
          <p style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:${ownerPhone}" style="color: #0d9488;">${ownerPhone}</a></p>
        </div>

        <div style="background: white; border-left: 4px solid #06b6d4; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
          <h3 style="margin: 0 0 15px 0; color: #06b6d4;">📅 Important Dates</h3>
          <p style="margin: 5px 0;"><strong>Borrow Date:</strong> ${borrowDate}</p>
          <p style="margin: 5px 0;"><strong>Return By:</strong> <span style="color: #dc2626; font-weight: bold;">${dueDate}</span></p>
          <p style="margin: 5px 0;"><strong>Loan Duration:</strong> 14 days</p>
        </div>

        <div style="background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #166534;">✅ Your Responsibilities</h3>
          <ul style="margin: 0; padding-left: 20px; color: #166534;">
            <li>Take good care of the book</li>
            <li>Return it in the same condition</li>
            <li>Return by the due date</li>
            <li>Contact the owner if you need an extension</li>
            <li>Rate your experience after returning</li>
          </ul>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="mailto:${ownerEmail}?subject=Book Pickup - ${bookTitle}" style="background: #059669; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin: 0 10px 10px 0;">📧 Contact Owner</a>
          <a href="tel:${ownerPhone}" style="background: #0d9488; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin: 0 10px 10px 0;">📞 Call Owner</a>
        </div>

        <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #92400e; font-size: 14px;">
            <strong>⏰ Reminder:</strong> Please return the book by ${dueDate}. Late returns may affect your borrowing privileges.
          </p>
        </div>

        <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #0277bd;">📱 Manage Your Loan</h3>
          <p style="margin: 0; color: #0277bd;">
            Visit your <a href="${
				process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
			}/borrowed" style="color: #0277bd; font-weight: bold;">borrowed books page</a> to track this loan and manage your returns.
          </p>
        </div>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
        
        <p style="font-size: 14px; color: #64748b;">
          Happy reading!<br>
          The Community Library Team
        </p>
        
        <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">
          This email confirms your book borrow request on Community Library. 
          If you have any questions, please contact us at <a href="mailto:support@communitylibrary.com" style="color: #059669;">support@communitylibrary.com</a>
        </p>
      </div>
    </body>
    </html>
  `;
}

export function generateBookReturnEmailToOwner(
	borrowerName: string,
	bookTitle: string,
	bookAuthor: string,
	returnDate: string,
	borrowDuration: string
): string {
	return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Book Returned - Community Library</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #059669, #0d9488); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">📚 Community Library</h1>
        <p style="color: #e6fffa; margin: 10px 0 0 0;">Book Returned</p>
      </div>
      
      <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #059669; margin-top: 0;">Great news! Your book has been returned 📖✨</h2>
        
        <p style="font-size: 16px; color: #374151; margin-bottom: 25px;">
          <strong>${borrowerName}</strong> has successfully returned your book "<strong>${bookTitle}</strong>". Thank you for sharing with the community!
        </p>

        <div style="background: white; border-left: 4px solid #059669; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
          <h3 style="margin: 0 0 15px 0; color: #059669;">📖 Book Details</h3>
          <p style="margin: 5px 0;"><strong>Title:</strong> ${bookTitle}</p>
          <p style="margin: 5px 0;"><strong>Author:</strong> ${bookAuthor}</p>
          <p style="margin: 5px 0;"><strong>Returned by:</strong> ${borrowerName}</p>
        </div>

        <div style="background: white; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
          <h3 style="margin: 0 0 15px 0; color: #10b981;">📅 Loan Summary</h3>
          <p style="margin: 5px 0;"><strong>Return Date:</strong> ${returnDate}</p>
          <p style="margin: 5px 0;"><strong>Loan Duration:</strong> ${borrowDuration}</p>
          <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">✅ Completed</span></p>
        </div>

        <div style="background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #166534;">🌟 What's Next?</h3>
          <ul style="margin: 0; padding-left: 20px; color: #166534;">
            <li>Your book is now available for other community members</li>
            <li>Rate your lending experience</li>
            <li>Consider sharing more books with the community</li>
            <li>Browse other books you might want to borrow</li>
          </ul>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${
				process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
			}/my-books" style="background: #059669; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin: 0 10px 10px 0;">📚 View My Books</a>
          <a href="${
				process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
			}" style="background: #0d9488; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin: 0 10px 10px 0;">🔍 Browse Books</a>
        </div>

        <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #0277bd;">💝 Thank You for Sharing!</h3>
          <p style="margin: 0; color: #0277bd;">
            Your generosity helps build a stronger, more connected community. Every book you share makes knowledge more accessible to everyone.
          </p>
        </div>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
        
        <p style="font-size: 14px; color: #64748b;">
          Keep sharing the love of reading!<br>
          The Community Library Team
        </p>
        
        <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">
          This email confirms that your book has been returned on Community Library. 
          If you have any questions, please contact us at <a href="mailto:support@communitylibrary.com" style="color: #059669;">support@communitylibrary.com</a>
        </p>
      </div>
    </body>
    </html>
  `;
}

export function generateBookReturnConfirmationToBorrower(
	borrowerName: string,
	bookTitle: string,
	bookAuthor: string,
	ownerName: string,
	returnDate: string,
	borrowDuration: string
): string {
	return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Return Confirmed - Community Library</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #059669, #0d9488); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">📚 Community Library</h1>
        <p style="color: #e6fffa; margin: 10px 0 0 0;">Return Confirmed</p>
      </div>
      
      <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #059669; margin-top: 0;">Thank you, ${borrowerName}! 🙏</h2>
        
        <p style="font-size: 16px; color: #374151; margin-bottom: 25px;">
          Your return of "<strong>${bookTitle}</strong>" has been confirmed. We hope you enjoyed reading it!
        </p>

        <div style="background: white; border-left: 4px solid #059669; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
          <h3 style="margin: 0 0 15px 0; color: #059669;">📖 Book Details</h3>
          <p style="margin: 5px 0;"><strong>Title:</strong> ${bookTitle}</p>
          <p style="margin: 5px 0;"><strong>Author:</strong> ${bookAuthor}</p>
          <p style="margin: 5px 0;"><strong>Owner:</strong> ${ownerName}</p>
        </div>

        <div style="background: white; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
          <h3 style="margin: 0 0 15px 0; color: #10b981;">📅 Loan Summary</h3>
          <p style="margin: 5px 0;"><strong>Return Date:</strong> ${returnDate}</p>
          <p style="margin: 5px 0;"><strong>Total Duration:</strong> ${borrowDuration}</p>
          <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">✅ Successfully Returned</span></p>
        </div>

        <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #92400e; font-size: 14px;">
            <strong>⭐ Rate Your Experience:</strong> Help other community members by rating this book and your borrowing experience.
          </p>
        </div>

        <div style="background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #166534;">🎉 Great Job!</h3>
          <ul style="margin: 0; padding-left: 20px; color: #166534;">
            <li>You returned the book on time</li>
            <li>You're helping build a trustworthy community</li>
            <li>You can now borrow more books</li>
            <li>Your borrowing history has been updated</li>
          </ul>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${
				process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
			}" style="background: #059669; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin: 0 10px 10px 0;">📚 Browse More Books</a>
          <a href="${
				process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
			}/borrowed" style="background: #0d9488; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin: 0 10px 10px 0;">📖 My Borrowed Books</a>
        </div>

        <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #0277bd;">📚 Keep Reading!</h3>
          <p style="margin: 0; color: #0277bd;">
            Discover your next great read in our community library. Thousands of books are waiting for you!
          </p>
        </div>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
        
        <p style="font-size: 14px; color: #64748b;">
          Happy reading!<br>
          The Community Library Team
        </p>
        
        <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">
          This email confirms your book return on Community Library. 
          If you have any questions, please contact us at <a href="mailto:support@communitylibrary.com" style="color: #059669;">support@communitylibrary.com</a>
        </p>
      </div>
    </body>
    </html>
  `;
}
