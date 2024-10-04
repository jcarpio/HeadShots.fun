import Stripe from "stripe";
import { env } from "@/env.mjs";
import { prisma } from "@/lib/db"; // Database management

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
  typescript: true,
});

// Amount of credits awarded per subscription cycle
const CREDITS_PER_SUBSCRIPTION = 100;

// Function to create a Stripe subscription checkout session
export async function createCheckoutSessionForSubscription(
  priceId: string, // The price ID for the monthly subscription plan
  userId: string,
  emailAddress: string
) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId, // Use the predefined price ID from Stripe for subscriptions
        quantity: 1,
      },
    ],
    billing_address_collection: "auto",
    customer_creation: "if_required",
    subscription_data: {
      metadata: {
        userId, // Store user ID in metadata
        credits: CREDITS_PER_SUBSCRIPTION.toString(), // Credits associated with the subscription
      },
    },
    allow_promotion_codes: true,
    automatic_tax: {
      enabled: true,
    },
    mode: "subscription", // Switch to subscription mode
    success_url: `${env.NEXT_PUBLIC_APP_URL}/payment-status?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.NEXT_PUBLIC_APP_URL}/pricing`,
    customer_email: emailAddress, // Prepopulate the customer email
  });

  return session; // Return the complete Stripe session
}

// Function to handle Stripe webhooks
export async function handleStripeWebhook(req: any) {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`⚠️  Webhook signature verification failed: ${err.message}`);
    throw new Error(`Webhook Error: ${err.message}`);
  }

  // Handle different event types
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode === "subscription") {
        await handleSubscriptionCreation(session);
      }
      break;
    }
    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      await handleSuccessfulSubscriptionPayment(invoice);
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionCancellation(subscription);
      break;
    }
    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  return { received: true };
}

// Handle subscription creation event
export async function handleSubscriptionCreation(session: Stripe.Checkout.Session) {
  const subscriptionId = session.subscription as string;
  const userId = session.metadata?.userId;
  const credits = parseInt(session.metadata?.credits || "0", 10);

  if (!userId || credits <= 0) {
    throw new Error("Invalid metadata in session");
  }

  // Store the subscription in the database
  await prisma.subscription.create({
    data: {
      userId: userId,
      stripeSubscriptionId: subscriptionId,
      status: "active", // Initially, the subscription is active
      credits: credits, // Assign the credits tied to the subscription
    },
  });

  // Increment the user's credits immediately after subscription creation
  await prisma.user.update({
    where: { id: userId },
    data: {
      credits: { increment: credits },
    },
  });
}

// Handle successful subscription payment (runs for each billing cycle)
export async function handleSuccessfulSubscriptionPayment(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string;

  const subscription = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: subscriptionId },
  });

  if (!subscription) {
    throw new Error(`Subscription not found for ID: ${subscriptionId}`);
  }

  // Increment the user's credits on each successful payment
  await prisma.user.update({
    where: { id: subscription.userId },
    data: {
      credits: { increment: subscription.credits }, // Increment credits for each payment
    },
  });

  // Update subscription status to "paid"
  await prisma.subscription.update({
    where: { stripeSubscriptionId: subscriptionId },
    data: {
      status: "paid", // Keep the status as "paid"
    },
  });
}

// Handle subscription cancellation
export async function handleSubscriptionCancellation(subscription: Stripe.Subscription) {
  const subscriptionId = subscription.id;

  // Update the subscription status in the database
  await prisma.subscription.update({
    where: { stripeSubscriptionId: subscriptionId },
    data: {
      status: "canceled",
    },
  });
}

/*
import Stripe from "stripe"

import { env } from "@/env.mjs"

export const stripe = new Stripe(env.STRIPE_API_KEY, {
  apiVersion: "2024-04-10",
  typescript: true,
})

*/
