import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = newsletterSchema.parse(body);

    // Send notification email to jjanocko@hotmail.com
    await resend.emails.send({
      from: 'newsletter@jj-reality.com',
      to: 'jjanocko@hotmail.com',
      subject: 'New Newsletter Subscription',
      html: `
        <h3>New Newsletter Subscription</h3>
        <p>Someone has subscribed to your real estate newsletter!</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subscribed on:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p><small>Sent from JJ Reality website newsletter subscription</small></p>
      `,
    });

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email address', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}