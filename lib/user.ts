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
