// /lib/stripe.ts .
import Stripe from 'stripe';
import { prisma } from '@/lib/db';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
  typescript: true,
});

// Function to handle successful subscription payments
export async function handleSuccessfulSubscriptionPayment(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string;

  // Fetch subscription details from the database
  const subscription = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: subscriptionId },
  });

  if (!subscription) {
    throw new Error(`Subscription not found for ID: ${subscriptionId}`);
  }

  // Increment user credits or other business logic
  await prisma.user.update({
    where: { id: subscription.userId },
    data: {
      credits: { increment: 100 }, // Example: adjust based on your business logic
    },
  });

  // Update subscription status to "paid"
  await prisma.subscription.update({
    where: { stripeSubscriptionId: subscriptionId },
    data: {
      status: 'paid',
    },
  });

  // Record the credit transaction
  await prisma.creditTransaction.create({
    data: {
      userId: subscription.userId,
      amount: 100, // Example: adjust based on your business logic
      type: 'PURCHASE',
    },
  });
}
