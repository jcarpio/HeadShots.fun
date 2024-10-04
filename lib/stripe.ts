// /lib/stripe.ts
import Stripe from "stripe";
import { prisma } from "@/lib/db";
import { env } from "@/env.mjs";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
  typescript: true,
});

// Amount of credits awarded per subscription cycle
const CREDITS_PER_SUBSCRIPTION = 100;

// Define the function to handle successful subscription payments
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
      credits: { increment: CREDITS_PER_SUBSCRIPTION },
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

