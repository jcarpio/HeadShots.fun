import Stripe from 'stripe';
import { prisma } from '@/lib/db';
import { env } from '@/env.mjs';

// Create a Stripe instance
export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
  typescript: true,
});

// Function to create the Stripe session
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
          price: priceId, // The Price ID must be passed here
          quantity: 1,
        },
      ],
      billing_address_collection: 'auto',
      customer_creation: 'if_required',
      subscription_data: {
        metadata: {
          userId,
        },
      },
      allow_promotion_codes: true,
      automatic_tax: {
        enabled: true,
      },
      mode: 'subscription',
      success_url: `${env.NEXT_PUBLIC_APP_URL}/payment-status?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.NEXT_PUBLIC_APP_URL}/pricing`,
      customer_email: emailAddress, // Prepopulate the customer's email
    });

    return session;
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    throw new Error('Failed to generate user stripe session');
  }
}

// Function to handle successful subscription payments
export async function handleSuccessfulSubscriptionPayment(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;

  // Find the user in the database using the Stripe customer ID
  const user = await prisma.user.findUnique({
    where: {
      stripeCustomerId: customerId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Get the plan from the payment session (use metadata if present)
  const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
  const planId = subscription.items.data[0].plan.id;
  
  // Logic to determine the number of credits according to the plan and the time interval
  let creditsToAdd = 0;

  switch (planId) {
    // Plan Starter
    case process.env.NEXT_PUBLIC_STRIPE_STARTER_MONTHLY_PLAN_ID:
      creditsToAdd = 9; // Annual credits for Starter
      break;
    case process.env.NEXT_PUBLIC_STRIPE_STARTER_YEARLY_PLAN_ID:
      creditsToAdd = 141; // Annual credits for Starter
      break;

    // Plan Pro
    case process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID:
      creditsToAdd = 21; // Annual credits for Pro
      break;
    case process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID:
      creditsToAdd = 321; // Annual credits for Pro
      break;

    // Plan Business
    case process.env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID:
      creditsToAdd = 49; // Annual credits for Business
      break;
    case process.env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID:
      creditsToAdd = 735; // Annual credits for Business
      break;

    default:
      throw new Error("Invalid plan ID");
  }

  // Update user credits
  await prisma.user.update({
    where: { id: user.id },
    data: {
      credits: { increment: creditsToAdd }, // Add the credits corresponding to the user
    },
  });

  console.log(`✅ Successfully added ${creditsToAdd} credits to user ${user.id}`);
}
/*
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

*/
