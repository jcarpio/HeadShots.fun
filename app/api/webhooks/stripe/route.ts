import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { handleSuccessfulSubscriptionPayment, handleSuccessfulPayment } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import type Stripe from "stripe"; // Import Stripe types for TypeScript support

// Webhook handler for Stripe
export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text(); // Stripe expects the raw body to verify the signature

  try {
    // Validate the signature with Stripe
    const event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);

    // Handle different Stripe event types
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const stripeCustomerId = session.customer as string; // This is the stripeCustomerId you need
        const userId = session.metadata?.userId; // This is your internal user ID

       // Get the Stripe customer ID from the session
        if (!session.metadata || !session.metadata.userId) {
          console.error("UserId not found in metadata");
        } else {
          const userId = session.metadata.userId;
          console.log("UserId found:", userId);
        }
        
        // Ensure both userId and stripeCustomerId exist
        if (userId && stripeCustomerId) {
          // Update or store the stripeCustomerId in the User table
          await prisma.user.update({
            where: { id: userId }, // Update the user based on your internal userId
            data: { stripeCustomerId }, // Store the Stripe customer ID
          });
        }

        // Check if the session mode is for a subscription or a one-time payment
        if (session.mode === "subscription") {
          const invoice = await stripe.invoices.retrieve(session.invoice as string);
          await handleSuccessfulSubscriptionPayment(invoice); // Handle subscription payment
        } else if (session.mode === "payment") {
          await handleSuccessfulPayment(session.id); // Handle one-time payment
        }

        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleSuccessfulSubscriptionPayment(invoice); // Handle recurring payments for subscriptions
        break;
      }

      // Handle other Stripe events if needed
      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(`⚠️ Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }
}
