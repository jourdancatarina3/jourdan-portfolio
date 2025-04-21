import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
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

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 