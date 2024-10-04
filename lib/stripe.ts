// /lib/stripe.ts

import Stripe from "stripe";
import { env } from "@/env.mjs";

// Create a Stripe instance using the secret key from the environment variables
export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
  typescript: true,
});

// Function to create a Stripe checkout session for subscriptions
export async function createCheckoutSessionForSubscription(
  priceId: string, // The Stripe price ID for the subscription plan
  userId: string,
  emailAddress: string
) {
  try {
    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId, // The price ID from Stripe
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
      mode: "subscription", // Use subscription mode
      success_url: `${env.NEXT_PUBLIC_APP_URL}/payment-status?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.NEXT_PUBLIC_APP_URL}/pricing`,
      customer_email: emailAddress, // Prepopulate the customer email
    });

    return session; // Return the created session
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    throw new Error("Failed to generate user stripe session");
  }
}

