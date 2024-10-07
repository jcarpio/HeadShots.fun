import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Handler para GET y PUT requests
export async function GET(req: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;

  try {
    // Search for the StripeCustomer using the userId
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
    // Update the user's stripeCustomerId
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
