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

       // Get the Stripe customer ID from the session
      const stripeCustomerId = session.customer as string; // session.customer is likely a string (customer ID)
      
      // Retrieve email from the session or customer object
      let customerEmail = session.customer_email; // Use session.customer_email first
      
      // If the session doesn't provide the customer email, fetch the full customer details from Stripe
      if (!customerEmail && stripeCustomerId) {
        try {
          const customer = await stripe.customers.retrieve(stripeCustomerId); // Retrieve full customer object from Stripe
          customerEmail = customer.email; // Use the email from the full customer object
        } catch (error) {
          console.error(`Error retrieving customer details for ID ${stripeCustomerId}:`, error);
          throw new Error('Failed to retrieve customer details');
        }
      }

        if (!customerEmail) {
          throw new Error("Customer email not found in session.");
        }

        // Find the user in your database by email if the userId is missing
        const user = await prisma.user.findUnique({
          where: { email: customerEmail }, // Search by email
        });

        if (user) {
          // Update the stripeCustomerId if the user is found
          await prisma.user.update({
            where: { email: customerEmail },
            data: { stripeCustomerId },
          });
          console.log(`Stripe customer ID updated for user: ${customerEmail}`);
        } else {
          console.warn(`User with email ${customerEmail} not found.`);
        }

        // Handle subscription or one-time payment logic
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
