import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone } = await request.json();

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Send email to ISG
    const { error } = await resend.emails.send({
      from: 'ISG Website <no-reply@investmentsolutions.cz>',
      to: ['nick@investmentsolutions.cz'],
      subject: 'New Free Consultation Request',
      html: `
        <h2>New Free Consultation Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Request Time:</strong> ${new Date().toLocaleString()}</p>
        
        <hr>
        <p>This consultation request was submitted through the ISG website.</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Consultation request submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Consultation API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}