import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Campos incompletos" }, { status: 400 });
  }
  const contact = await prisma.contact.create({ data: { name, email, message } });
  return NextResponse.json(contact, { status: 201 });
}

export async function GET() {
  const contacts = await prisma.contact.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(contacts);
}
