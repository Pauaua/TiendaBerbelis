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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-100/50 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-purple-100 border border-purple-200 rounded-full">
                <span className="text-purple-700 font-semibold">✨ Naturaleza y Bienestar</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Belleza Natural para tu{" "}
                <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                  Piel
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Descubre el poder de la naturaleza con nuestros productos orgánicos de alta calidad.
                Cuida tu piel de forma natural y sostenible.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/productos"
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-full font-semibold hover:shadow-xl hover:shadow-purple-300 transition-all flex items-center space-x-2"
                >
                  <span>Prueba nuestros productos</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#quienes-somos"
                  className="px-8 py-4 border-2 border-purple-300 text-purple-700 rounded-full font-semibold hover:bg-purple-50 transition-all"
                >
                  Ver más
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-300/30 to-violet-300/30 rounded-3xl blur-3xl" />
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Quiénes <span className="text-purple-600">Somos?</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-violet-600 mx-auto rounded-full" />
            <p className="text-lg text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed">
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
                className="p-8 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-violet-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestros <span className="text-purple-600">Productos</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-violet-600 mx-auto rounded-full" />
            <p className="text-gray-600 mt-6">Selección exclusiva de productos naturales para tu cuidado</p>
          </div>

          {featured.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {featured.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-purple-100 hover:border-purple-300 group"
                >
                  <div className="relative h-64 overflow-hidden bg-purple-50">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Leaf className="w-16 h-16 text-purple-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex text-yellow-400 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-2xl font-bold text-purple-600 mb-4">
                      ${Number(product.price).toFixed(2)}
                    </p>
                    <Link
                      href={`/productos/${product.slug}`}
                      className="block w-full py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white text-center rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Ver detalles
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Fallback static products when DB not connected */
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Serum Facial Lavanda", price: "45.00", image: "https://images.unsplash.com/photo-1656281144403-62b94b052a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600" },
                { name: "Crema Hidratante Natural", price: "38.00", image: "https://images.unsplash.com/photo-1768548658056-f5cbb2d3d795?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600" },
                { name: "Pack Wellness Spa", price: "89.00", image: "https://images.unsplash.com/photo-1761864293840-cf73a186bff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600" },
              ].map((p, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-purple-100 hover:border-purple-300 group">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="p-6">
                    <div className="flex text-yellow-400 mb-3">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{p.name}</h3>
                    <p className="text-2xl font-bold text-purple-600 mb-4">${p.price}</p>
                    <Link href="/productos" className="block w-full py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white text-center rounded-xl font-semibold hover:shadow-lg transition-all">
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
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white border-2 border-purple-300 text-purple-700 rounded-full font-semibold hover:bg-purple-50 transition-all"
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros <span className="text-purple-600">Clientes</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-violet-600 mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">"{t.text}"</p>
                <p className="font-bold text-purple-700">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Contacto */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-600 to-violet-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">¿Lista para comenzar tu transformación natural?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Contáctanos y descubre cómo nuestros productos pueden ayudarte
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contacto"
              className="px-8 py-4 bg-white text-purple-700 rounded-full font-semibold hover:bg-purple-50 transition-all flex items-center space-x-2"
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
