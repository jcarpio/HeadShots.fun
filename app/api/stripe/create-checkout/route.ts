import { NextResponse } from "next/server";
import { createCheckoutSessionForSubscription } from "@/lib/stripe"; // Import the correct function for subscriptions
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const { priceId, userId, emailAddress } = await req.json();

  if (!priceId || !userId || !emailAddress) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    // Create the subscription checkout session
    const session = await createCheckoutSessionForSubscription(priceId, userId, emailAddress);
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    return NextResponse.json({ error: "Error creating checkout session" }, { status: 500 });
  }
}


/*

import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { amount, quantity, description, userId, emailAddress } = await req.json();

    if (!amount || !quantity || !description || !userId || !emailAddress) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const session = await createCheckoutSession(amount, quantity, description, userId, emailAddress);

    if (!session || !session.id || !session.url) {
      throw new Error("Failed to create checkout session");
    }

    // Record transaction to database
    await prisma.stripeTransaction.create({
      data: {
        userId,
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent as string || null,
        amount: Math.round(amount * 100),
        status: 'pending',
      },
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

*/
