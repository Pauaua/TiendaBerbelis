import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { name, email, phone, address, items, total } = await req.json();
  if (!name || !email || !items?.length) {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
  }
  const order = await prisma.order.create({
    data: {
      customerName: name,
      email,
      phone: phone || null,
      address: address || null,
      total,
      items: {
        create: items.map((i: { productId: number; quantity: number; price: number }) => ({
          productId: i.productId,
          quantity: i.quantity,
          price: i.price,
        })),
      },
    },
    include: { items: true },
  });
  return NextResponse.json(order, { status: 201 });
}

export async function GET() {
  const orders = await prisma.order.findMany({
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orders);
}
