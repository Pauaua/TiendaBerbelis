import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  if (req.headers.get("x-admin-password") !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Create categories
  const skincare = await prisma.category.upsert({
    where: { slug: "skincare" },
    update: {},
    create: { name: "Skincare", slug: "skincare" },
  });
  const wellness = await prisma.category.upsert({
    where: { slug: "wellness" },
    update: {},
    create: { name: "Wellness", slug: "wellness" },
  });

  // Create products
  const products = [
    {
      name: "Serum Facial Lavanda",
      slug: "serum-facial-lavanda",
      description: "Suero facial concentrado con extracto de lavanda orgánica. Hidrata, calma y revitaliza tu piel de forma natural.",
      price: 45.0,
      image: "https://images.unsplash.com/photo-1656281144403-62b94b052a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      stock: 50,
      featured: true,
      categoryId: skincare.id,
    },
    {
      name: "Crema Hidratante Natural",
      slug: "crema-hidratante-natural",
      description: "Crema hidratante rica en mantequilla de karité y aceite de argán. Nutre profundamente la piel seca y sensible.",
      price: 38.0,
      image: "https://images.unsplash.com/photo-1768548658056-f5cbb2d3d795?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      stock: 40,
      featured: true,
      categoryId: skincare.id,
    },
    {
      name: "Pack Wellness Spa",
      slug: "pack-wellness-spa",
      description: "Set completo de bienestar con sales de baño, aceite corporal y vela aromática de lavanda.",
      price: 89.0,
      image: "https://images.unsplash.com/photo-1761864293840-cf73a186bff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      stock: 20,
      featured: true,
      categoryId: wellness.id,
    },
    {
      name: "Aceite de Rosa Mosqueta",
      slug: "aceite-rosa-mosqueta",
      description: "Aceite puro de rosa mosqueta, ideal para cicatrices y manchas. Regenera y suaviza la piel.",
      price: 32.0,
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      stock: 30,
      featured: false,
      categoryId: skincare.id,
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }

  return NextResponse.json({ ok: true, message: "Seed completado" });
}
