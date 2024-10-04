// /app/api/stripe/create-checkout/route.ts
import { NextResponse } from 'next/server';
import { createCheckoutSessionForSubscription } from '@/lib/stripe';

// POST request handler to create a Stripe checkout session
export async function POST(req: Request) {
  try {
    const { priceId, userId, emailAddress } = await req.json();

    // Create a checkout session for the subscription
    const session = await createCheckoutSessionForSubscription(
      priceId,
      userId,
      emailAddress
    );

    // Return the session ID in the response
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    return NextResponse.json({ error: 'Failed to create Stripe session' }, { status: 500 });
  }
}
