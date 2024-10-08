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

        // Get the Stripe customer ID and customer email from the session
        const stripeCustomerId = session.customer as string; // Stripe customer ID
        const customerEmail = session.customer_email || session.customer_details?.email; // Customer email

        if (!customerEmail) {
          throw new Error("Customer email not found in Stripe session.");
        }

        // Find the user in your database by email if userId is missing
        const user = await prisma.user.findUnique({
          where: { email: customerEmail }, // Search by email
        });

        if (user) {
          // Update the stripeCustomerId if the user is found
          await prisma.user.update({
            where: { email: customerEmail },
            data: { stripeCustomerId },
          });
        } else {
          console.warn(`User with email ${customerEmail} not found.`);
        }

        // Handle subscription or one-time payment logic
        if (session.mode === "subscription") {
          const invoice = await stripe.invoices.retrieve(session.invoice as string);
          await handleSuccessfulSubscriptionPayment(invoice);
        } else if (session.mode === "payment") {
          await handleSuccessfulPayment(session.id);
        }

        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleSuccessfulSubscriptionPayment(invoice);
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
