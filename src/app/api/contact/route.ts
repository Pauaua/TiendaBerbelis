import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Campos incompletos" }, { status: 400 });
  }

  const contact = await prisma.contact.create({ data: { name, email, message } });

  if (process.env.RESEND_API_KEY) {
    await resend.emails.send({
      from: "Berbelis <onboarding@resend.dev>",
      to: "fitoterapiamtch@gmail.com",
      replyTo: email,
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#7C3AED">Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="background:#f5f3ff;padding:16px;border-radius:8px;white-space:pre-wrap">${message}</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0"/>
          <p style="color:#9ca3af;font-size:12px">Berbelis Fitocreaciones</p>
        </div>
      `,
    });
  }

  return NextResponse.json(contact, { status: 201 });
}

export async function GET() {
  const contacts = await prisma.contact.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(contacts);
}
