import { notFound } from "next/navigation";
import { Leaf, Star, ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import AddToCartButton from "./AddToCartButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductoDetallePage({ params }: Props) {
  const { slug } = await params;

  let product = null;
  try {
    product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });
  } catch {
    // DB not connected
  }

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-50">
      <Navbar />
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-8 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a productos
          </Link>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">
            <div className="relative h-80 md:h-full min-h-80 bg-purple-50">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Leaf className="w-24 h-24 text-purple-200" />
                </div>
              )}
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-center space-y-5">
              {product.category && (
                <span className="text-sm text-purple-500 font-medium uppercase tracking-wide">
                  {product.category.name}
                </span>
              )}
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
                <span className="ml-2 text-gray-500 text-sm">(4.9)</span>
              </div>
              <p className="text-4xl font-bold text-purple-600">
                ${Number(product.price).toFixed(2)}
              </p>
              {product.description && (
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              )}
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block w-3 h-3 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-400"}`}
                />
                <span className="text-sm text-gray-600">
                  {product.stock > 0 ? `En stock (${product.stock} disponibles)` : "Agotado"}
                </span>
              </div>

              {product.stock > 0 ? (
                <AddToCartButton product={{ id: product.id, name: product.name, price: Number(product.price), image: product.image, slug: product.slug }} />
              ) : (
                <button
                  disabled
                  className="w-full py-4 bg-gray-200 text-gray-400 rounded-2xl font-semibold cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Agotado
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
