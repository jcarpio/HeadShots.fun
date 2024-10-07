import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Obtener StripeCustomer usando el userId
export async function GET(req: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;

  try {
    // Busca el stripeCustomer en la tabla usando el userId
    const stripeCustomer = await prisma.stripeCustomer.findUnique({
      where: { userId },
    });

    if (!stripeCustomer) {
      return NextResponse.json({ error: "Stripe customer not found" }, { status: 404 });
    }

    return NextResponse.json({ stripeCustomer }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Stripe customer:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
