'use server';

import { prisma } from "@/lib/db";
import { handleSuccessfulSubscriptionPayment } from "@/lib/stripe";

// This function checks the subscription payment status and processes it accordingly
export async function handleCheck(stripeSessionId: string) {
  try {
    // Retrieve the session information from Stripe using prisma or stripe API
    const session = await prisma.stripeTransaction.findUnique({
      where: { stripeSessionId },
    });

    if (!session) {
      throw new Error(`No session found for ID: ${stripeSessionId}`);
    }

    // If it's a subscription, call the subscription handler
    if (session.mode === "subscription") {
      const invoice = await prisma.invoice.findUnique({
        where: { stripeSessionId },
      });

      if (!invoice) {
        throw new Error(`No invoice found for session: ${stripeSessionId}`);
      }

      const result = await handleSuccessfulSubscriptionPayment(invoice);
      return result ? "completed" : "pending";
    } else {
      // If it's a one-time payment (as fallback)
      const transaction = await handleSuccessfulPayment(stripeSessionId);
      return transaction ? "completed" : "pending";
    }
  } catch (error) {
    console.error("Error checking Stripe session:", error);
    return "error";
  }
}

// Function to retrieve all transactions, including user details
export async function getTransactions() {
  return await prisma.stripeTransaction.findMany({
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


/*

'use server';

import { prisma } from "@/lib/db";
import { handleSuccessfulPayment } from "@/lib/stripe";

export async function handleCheck(stripeSessionId: string) {
  try {
    const transaction = await handleSuccessfulPayment(stripeSessionId);
    return transaction ? "completed" : "pending";
  } catch (error) {
    console.error("Error checking Stripe session:", error);
    return "error";
  }
}

export async function getTransactions() {
  return await prisma.stripeTransaction.findMany({
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

*/
