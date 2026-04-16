import { Leaf, Heart, Sparkles, Star, ChevronRight, ShoppingBag, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

const features = [
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "100% Natural",
    description: "Ingredientes orgánicos certificados de la más alta calidad",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Libre de Crueldad",
    description: "Productos nunca testados en animales, con amor por la naturaleza",
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Resultados Visibles",
    description: "Fórmulas efectivas que cuidan tu piel de manera natural",
  },
];

const testimonials = [
  {
    name: "Laura Martínez",
    text: "Los productos de Berbelis han transformado mi piel. Son suaves, naturales y realmente efectivos.",
    rating: 5,
  },
  {
    name: "Carmen Silva",
    text: "Me encanta la calidad y el aroma de lavanda. Es mi marca favorita de productos naturales.",
    rating: 5,
  },
  {
    name: "Ana López",
    text: "Productos excepcionales que respetan el medio ambiente. Totalmente recomendados.",
    rating: 5,
  },
];

async function getFeaturedProducts() {
  try {
    return await prisma.product.findMany({
      where: { featured: true, active: true },
      take: 3,
    });
  } catch {
    return [];
  }
}

export default async function Home() {
  const featured = await getFeaturedProducts();

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#B8A0D8]/15 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-[#B8A0D8]/20 border border-[#B8A0D8]/40 rounded-full">
                <span className="text-[#2D1B4E] font-semibold">✨ Naturaleza y Bienestar</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D1B4E] leading-tight">
                Belleza Natural para tu{" "}
                <span className="text-[#6B8F3A]">
                  Piel
                </span>
              </h1>
              <p className="text-xl text-[#2D1B4E]/70 leading-relaxed">
                Descubre el poder de la naturaleza con nuestros productos orgánicos de alta calidad.
                Cuida tu piel de forma natural y sostenible.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/productos"
                  className="px-8 py-4 bg-[#2D1B4E] text-white rounded-full font-semibold hover:bg-[#3d2660] hover:shadow-xl transition-all flex items-center space-x-2"
                >
                  <span>Prueba nuestros productos</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#quienes-somos"
                  className="px-8 py-4 border-2 border-[#2D1B4E]/30 text-[#2D1B4E] rounded-full font-semibold hover:bg-[#2D1B4E]/5 transition-all"
                >
                  Ver más
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-[#B8A0D8]/20 rounded-3xl blur-3xl" />
              <Image
                src="https://images.unsplash.com/photo-1644409496856-a92543edbc64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXZlbmRlciUyMGZpZWxkJTIwcHVycGxlJTIwZmxvd2Vyc3xlbnwxfHx8fDE3NzQ5NjU0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Lavanda natural"
                width={600}
                height={450}
                className="rounded-3xl shadow-2xl relative z-10 w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ¿Quiénes Somos? */}
      <section id="quienes-somos" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D1B4E] mb-4">
              ¿Quiénes <span className="text-[#6B8F3A]">Somos?</span>
            </h2>
            <div className="w-20 h-1 bg-[#B8A0D8] mx-auto rounded-full" />
            <p className="text-lg text-[#2D1B4E]/70 mt-6 max-w-3xl mx-auto leading-relaxed">
              En Berbelis, creemos en el poder transformador de la naturaleza. Somos una empresa
              dedicada a crear productos orgánicos de salud y estética que respetan tu piel y el
              medio ambiente. Cada fórmula es cuidadosamente elaborada con ingredientes naturales
              certificados, pensando en tu bienestar integral.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="p-8 bg-[#FAF8F5] rounded-2xl border-2 border-[#B8A0D8]/30 hover:border-[#B8A0D8] hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 bg-[#2D1B4E] rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#2D1B4E] mb-3">{feature.title}</h3>
                <p className="text-[#2D1B4E]/70 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-20 px-4 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D1B4E] mb-4">
              Nuestros <span className="text-[#6B8F3A]">Productos</span>
            </h2>
            <div className="w-20 h-1 bg-[#B8A0D8] mx-auto rounded-full" />
            <p className="text-[#2D1B4E]/70 mt-6">Selección exclusiva de productos naturales para tu cuidado</p>
          </div>

          {featured.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {featured.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-[#B8A0D8]/30 hover:border-[#B8A0D8] group"
                >
                  <div className="relative h-64 overflow-hidden bg-[#FAF8F5]">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Leaf className="w-16 h-16 text-[#B8A0D8]" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex text-yellow-400 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-[#2D1B4E] mb-2">{product.name}</h3>
                    <p className="text-2xl font-bold text-[#6B8F3A] mb-4">
                      ${Number(product.price).toFixed(2)}
                    </p>
                    <Link
                      href={`/productos/${product.slug}`}
                      className="block w-full py-3 bg-[#2D1B4E] text-white text-center rounded-xl font-semibold hover:bg-[#3d2660] hover:shadow-lg transition-all"
                    >
                      Ver detalles
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Serum Facial Lavanda", price: "45.00", image: "https://images.unsplash.com/photo-1656281144403-62b94b052a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600" },
                { name: "Crema Hidratante Natural", price: "38.00", image: "https://images.unsplash.com/photo-1768548658056-f5cbb2d3d795?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600" },
                { name: "Pack Wellness Spa", price: "89.00", image: "https://images.unsplash.com/photo-1761864293840-cf73a186bff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600" },
              ].map((p, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-[#B8A0D8]/30 hover:border-[#B8A0D8] group">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="p-6">
                    <div className="flex text-yellow-400 mb-3">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                    </div>
                    <h3 className="text-xl font-bold text-[#2D1B4E] mb-2">{p.name}</h3>
                    <p className="text-2xl font-bold text-[#6B8F3A] mb-4">${p.price}</p>
                    <Link href="/productos" className="block w-full py-3 bg-[#2D1B4E] text-white text-center rounded-xl font-semibold hover:bg-[#3d2660] hover:shadow-lg transition-all">
                      Ver detalles
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/productos"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white border-2 border-[#2D1B4E]/30 text-[#2D1B4E] rounded-full font-semibold hover:bg-[#FAF8F5] transition-all"
            >
              <span>Ver todos los productos</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D1B4E] mb-4">
              Lo que dicen nuestros <span className="text-[#6B8F3A]">Clientes</span>
            </h2>
            <div className="w-20 h-1 bg-[#B8A0D8] mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 bg-[#FAF8F5] rounded-2xl border-2 border-[#B8A0D8]/30 hover:border-[#B8A0D8] transition-all">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-[#2D1B4E]/80 italic mb-6 leading-relaxed">"{t.text}"</p>
                <p className="font-bold text-[#2D1B4E]">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Contacto */}
      <section className="py-20 px-4 bg-[#2D1B4E] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">¿Lista para comenzar tu transformación natural?</h2>
          <p className="text-base sm:text-xl mb-8 text-[#B8A0D8]">
            Contáctanos y descubre cómo nuestros productos pueden ayudarte
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contacto"
              className="px-8 py-4 bg-white text-[#2D1B4E] rounded-full font-semibold hover:bg-[#FAF8F5] transition-all flex items-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Contáctanos</span>
            </Link>
            <Link
              href="/productos"
              className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all"
            >
              <span className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5" />
                <span>Explorar productos</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
