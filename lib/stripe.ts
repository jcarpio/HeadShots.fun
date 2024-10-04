import Stripe from "stripe";
import { env } from "@/env.mjs";
import { prisma } from "@/lib/db"; // Database management

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
  typescript: true,
});

// Amount of credits awarded per subscription cycle
const CREDITS_PER_SUBSCRIPTION = 100;

// Function to handle successful subscription payments
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
      credits: { increment: CREDITS_PER_SUBSCRIPTION }, // Increment credits on each payment
    },
  });

  // Update subscription status to "paid"
  await prisma.subscription.update({
    where: { stripeSubscriptionId: subscriptionId },
    data: {
      status: "paid",
    },
  });

  // Optionally, record a credit transaction
  await prisma.creditTransaction.create({
    data: {
      userId: subscription.userId,
      amount: CREDITS_PER_SUBSCRIPTION,
      type: "PURCHASE",
    },
  });
}

// Function to create a Stripe subscription checkout session
export async function createCheckoutSessionForSubscription(
  priceId: string,
  userId: string,
  emailAddress: string
) {
  try {
    console.log('Creating session with priceId:', priceId);
    
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
        },
      },
      allow_promotion_codes: true,
      automatic_tax: {
        enabled: true,
      },
      mode: "subscription",
      success_url: `${env.NEXT_PUBLIC_APP_URL}/payment-status?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.NEXT_PUBLIC_APP_URL}/pricing`,
      customer_email: emailAddress, // Prepopulate the customer email
    });

    console.log('Session created:', session);
    return session;

  } catch (error) {
    console.error('Error creating Stripe session:', error);
    throw new Error('Failed to generate user stripe session');
  }
}
