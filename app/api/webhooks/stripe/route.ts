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
        
        // Directly access the customer ID and email from the session.customer object
        const stripeCustomerId = session.customer as string;
        const customerEmail = session.customer_email || (session.customer as Stripe.Customer).email;

        // Log for debugging
        console.log("Stripe Customer ID:", stripeCustomerId);
        console.log("Customer Email:", customerEmail);

        // Ensure both stripeCustomerId and customerEmail exist
        if (stripeCustomerId && customerEmail) {
          // Update or store the stripeCustomerId in the User table based on the email
          await prisma.user.update({
            where: { email: customerEmail },
            data: { stripeCustomerId }, // Store the Stripe customer ID
          });
        } else {
          console.error("Stripe customer ID or email not found.");
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

/* import { NextResponse } from "next/server";
import { handleSuccessfulSubscriptionPayment } from "@/lib/stripe"; // Use the subscription-related function
import { stripe } from "@/lib/stripe"; 
import type Stripe from 'stripe'; // Import Stripe types for TypeScript support

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
        const session = event.data.object as Stripe.Checkout.Session; // Use the Stripe type for session
        if (session.mode === "subscription") {
          // Process the subscription completion
          const invoice = await stripe.invoices.retrieve(session.invoice as string);
          await handleSuccessfulSubscriptionPayment(invoice);
        }
        break;
      }
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleSuccessfulSubscriptionPayment(invoice);
        break;
      }
      // Add more event types as needed
      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(`⚠️ Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }
}
*/

/*

import { NextResponse } from "next/server";
import { handleSuccessfulSubscriptionPayment } from "@/lib/stripe"; // Use the subscription-related function
import { stripe } from "@/lib/stripe";

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
        if (session.mode === "subscription") {
          // Process the subscription completion
          const invoice = await stripe.invoices.retrieve(session.invoice as string);
          await handleSuccessfulSubscriptionPayment(invoice);
        }
        break;
      }
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleSuccessfulSubscriptionPayment(invoice);
        break;
      }
      // Add more event types as needed
      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(`⚠️ Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }
}

*/
