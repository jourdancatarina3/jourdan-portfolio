import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { cookies } from 'next/headers';

// Function to verify reCAPTCHA token
async function verifyRecaptcha(token: string) {
  const secretKey = '6Ld0zSMrAAAAAOJoBSkd2NH81LmlE71Ye3L-wl1_'; // Google's test secret key
  
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, message, recaptchaToken } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification required' },
        { status: 400 }
      );
    }

    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }

    // Rate limiting implementation - max 3 messages per device
    const cookieStore = await cookies();
    const messageSentCount = cookieStore.get('messageSentCount')?.value || '0';
    const currentCount = parseInt(messageSentCount, 10);
    
    if (currentCount >= 3) {
      return NextResponse.json(
        { 
          error: 'Message limit reached. Maximum 3 messages allowed per day.',
          limitExceeded: true,
          messagesRemaining: 0,
          resetTime: 'in 24 hours' 
        },
        { status: 429 }
      );
    }

    // Create transporter (replace with your email service credentials)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jourdancatarina3@gmail.com',
        pass: 'srmi cooi bfak xewf',
      },
    });

    // Email content
    const mailOptions = {
      from: 'jourdancatarina3@gmail.com',
      to: 'jourdancatarina3@gmail.com', // Your email
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to the person who submitted the form
    const confirmationMailOptions = {
      from: 'jourdancatarina3@gmail.com',
      to: email,
      subject: `Thank you for contacting Jourdan Catarina`,
      text: `
        Dear ${name},
        
        Thank you for reaching out. This is a confirmation that I have received your message:
        
        Name: ${name}
        Email: ${email}
        Message: ${message}
        
        I will get back to you as soon as possible.
        
        Best regards,
        Jourdan Catarina
      `,
      html: `
        <h3>Thank you for contacting Jourdan Catarina</h3>
        <p>Dear ${name},</p>
        <p>Thank you for reaching out. This is a confirmation that I have received your message:</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <p>I will get back to you as soon as possible.</p>
        <p>Best regards,<br>Jourdan Catarina</p>
      `,
    };

    // Send confirmation email
    await transporter.sendMail(confirmationMailOptions);

    // Calculate remaining messages
    const remainingMessages = 3 - (currentCount + 1);
    const limitReached = (currentCount + 1) >= 3;

    // Update message count cookie
    const response = NextResponse.json(
      { 
        message: 'Email sent successfully',
        messagesRemaining: remainingMessages,
        limitReached: limitReached,
        resetTime: limitReached ? 'in 24 hours' : null
      },
      { status: 200 }
    );
    
    // Set cookie to expire in 24 hours
    response.cookies.set('messageSentCount', (currentCount + 1).toString(), {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
      sameSite: 'strict',
    });

    return response;
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 