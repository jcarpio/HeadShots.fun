import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const existingEntry = await prisma.waitlist.findUnique({
    where: { email },
  });

  if (existingEntry) {
    return NextResponse.json({ error: "This email is already on the waitlist" }, { status: 400 });
  }

  await prisma.waitlist.create({
    data: { email },
  });

  return NextResponse.json({ success: true });
}
