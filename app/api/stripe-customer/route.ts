import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Handler para GET y PUT requests
export async function GET(req: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;

  try {
    // Busca el StripeCustomer usando el userId
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

export async function PUT(req: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;
  const { stripeCustomerId } = await req.json();

  if (!stripeCustomerId) {
    return NextResponse.json({ error: "Missing stripeCustomerId" }, { status: 400 });
  }

  try {
    // Actualiza el stripeCustomerId del usuario
    const updatedCustomer = await prisma.stripeCustomer.update({
      where: { userId },
      data: {
        stripeCustomerId,
      },
    });

    return NextResponse.json({ stripeCustomer: updatedCustomer }, { status: 200 });
  } catch (error) {
    console.error("Error updating Stripe customer:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
