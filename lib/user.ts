import { prisma } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        name: true,
        emailVerified: true,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export async function getStripeCustomerId(userId: string): Promise<string | null> {
  if (!userId) {
    throw new Error("Missing userId");
  }

  // Fetch the user from the database to get the stripeCustomerId
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { stripeCustomerId: true }, // Only select the stripeCustomerId field
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Return the Stripe customer ID or null if not available
  return user.stripeCustomerId || null;
}

export async function hasPurchases(userId: string): Promise<boolean> {
  if (!userId) {
    throw new Error("Missing userId");
  }

// Check if there are transactions of type PURCHASE for the user
  const purchaseCount = await prisma.creditTransaction.count({
    where: {
      userId,
      type: "PURCHASE", // Purchase transactions only
    },
  });

  // If there is at least one purchase transaction, we return true
  return purchaseCount > 0;
}
