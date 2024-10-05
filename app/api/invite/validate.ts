import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const { code } = await req.json();

  const invitation = await prisma.invitationCode.findUnique({
    where: { code },
  });

  if (!invitation || invitation.isUsed) {
    return NextResponse.json({ error: "Invalid or used invitation code" }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
