import Stripe from 'stripe';
import { prisma } from '@/lib/db';
import { env } from '@/env.mjs';

// Create a Stripe instance
export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
  typescript: true,
});

// Function to create a Stripe checkout session for subscriptions
export async function createCheckoutSessionForSubscription(
  priceId: string,
  userId: string,
  emailAddress: string
) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId, // Price ID from Stripe
          quantity: 1,
        },
      ],
      billing_address_collection: 'auto',
      customer_creation: 'if_required',
      subscription_data: {
        metadata: {
          userId, // Store user ID in metadata
        },
      },
      allow_promotion_codes: true,
      automatic_tax: {
        enabled: true,
      },
      mode: 'subscription',
      success_url: `${env.NEXT_PUBLIC_APP_URL}/payment-status?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.NEXT_PUBLIC_APP_URL}/pricing`,
      customer_email: emailAddress, // Prepopulate customer email
    });

    return session; // Return the created session
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    throw new Error('Failed to generate user stripe session');
  }
}

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
      credits: { increment: 100 }, // Example: increment user credits based on your logic
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
      amount: 100, // Example: adjust the amount based on your logic
      type: 'PURCHASE',
    },
  });
}
