import { stripe } from "@/lib/stripe"; // Import Stripe SDK to retrieve session data
import { handleSuccessfulSubscriptionPayment } from "@/lib/stripe"; // Use the subscription-related function
import { NextResponse } from "next/server";

// This route checks the payment status for subscriptions
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const stripeSessionId = searchParams.get("session_id");

  if (!stripeSessionId) {
    return NextResponse.json({ error: "Session ID not provided" }, { status: 400 });
  }

  try {
    // Retrieve the session directly from Stripe to check its status
    const session = await stripe.checkout.sessions.retrieve(stripeSessionId);

    if (!session) {
      return NextResponse.json({ error: `No session found for ID: ${stripeSessionId}` }, { status: 404 });
    }

    // Check if the session is for a subscription
    if (session.mode === "subscription") {
      const invoice = await stripe.invoices.retrieve(session.invoice as string);
      await handleSuccessfulSubscriptionPayment(invoice); // Process subscription payment
      return NextResponse.json({ status: "Subscription processed" });
    }

    return NextResponse.json({ error: "Only subscription payments are supported" }, { status: 400 });
  } catch (error) {
    console.error("Error retrieving Stripe session:", error);
    return NextResponse.json({ error: "Error processing subscription" }, { status: 500 });
  }
}
