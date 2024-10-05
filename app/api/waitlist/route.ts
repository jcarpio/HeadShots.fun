import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db'; // Ensure Prisma instance is properly configured

// Handle POST request to add email to the waitlist
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Validate email format
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
    }

    // Add the email to the waitlist with 'processed' set to false by default
    await prisma.waitlist.create({
      data: {
        email,
        processed: false, // Default field to track whether the user has been processed
      },
    });

    // Return success response
    return NextResponse.json({ message: 'Email added to the waitlist.' }, { status: 200 });
  } catch (error) {
    // Return error response in case of failure
    return NextResponse.json({ error: 'Failed to add email to the waitlist.' }, { status: 500 });
  }
}
