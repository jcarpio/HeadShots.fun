'use server';

import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe"; // Import Stripe SDK to retrieve session data
import { handleSuccessfulSubscriptionPayment } from "@/lib/stripe";

// This function checks the subscription payment status and processes it accordingly
export async function handleCheck(stripeSessionId: string) {
  try {
    // Retrieve the session directly from Stripe to check its mode
    const session = await stripe.checkout.sessions.retrieve(stripeSessionId);

    if (!session) {
      throw new Error(`No session found for ID: ${stripeSessionId}`);
    }

    // Check if the session is a subscription
    if (session.mode === "subscription") {
      // Retrieve the invoice from Stripe
      const invoice = await stripe.invoices.retrieve(session.invoice as string);

      if (!invoice) {
        throw new Error(`No invoice found for session: ${stripeSessionId}`);
      }

      // Process the successful subscription payment and increment credits
      await handleSuccessfulSubscriptionPayment(invoice);

      return "completed"; // Assume completed if no errors occur
    }

    throw new Error("Only subscription payments are allowed.");
  } catch (error) {
    console.error("Error checking Stripe session:", error);
    return "error";
  }
}

// Function to retrieve all transactions, including user details
export async function getTransactions() {
  return await prisma.creditTransaction.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
