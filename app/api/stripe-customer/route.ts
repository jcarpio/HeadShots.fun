import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Crear un nuevo StripeCustomer
export async function POST(req: Request) {
  const { userId, stripeCustomerId } = await req.json();

  if (!userId || !stripeCustomerId) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
  }

  try {
    // Verifica si el StripeCustomer ya existe para el usuario
    const existingCustomer = await prisma.stripeCustomer.findUnique({
      where: { userId },
    });

    if (existingCustomer) {
      return NextResponse.json({ error: "Stripe customer already exists" }, { status: 400 });
    }

    // Crea un nuevo StripeCustomer
    const newStripeCustomer = await prisma.stripeCustomer.create({
      data: {
        userId,
        stripeCustomerId,
      },
    });

    return NextResponse.json({ stripeCustomer: newStripeCustomer }, { status: 201 });
  } catch (error) {
    console.error("Error creating Stripe customer:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
