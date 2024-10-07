import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const {userId, emailAddress, priceId, quantity } = await req.json();

    if (!userId || !emailAddress || !priceId || quantity) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const session = await createCheckoutSession(userId, emailAddress, priceId, quantity);

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
