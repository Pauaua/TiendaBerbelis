"use client";

import { useState, useEffect } from "react";
import { Leaf, ShoppingCart, Heart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart";

type Product = {
  id: number;
  name: string;
  slug: string;
  price: string;
  image: string | null;
  stock: number;
  category: { name: string } | null;
};

const PRODUCTS_PER_PAGE = 6;

export default function ProductosPage() {
  const { addItem, items } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const paginated = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const inCart = (id: number) => items.some((i) => i.id === id);

  const toggleFavorite = (id: number) =>
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );

  const handleAddToCart = (product: Product) => {
    if (product.stock === 0) return;
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: Number(product.price),
      image: product.image,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Nuestros{" "}
            <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Productos
            </span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-violet-600 mx-auto rounded-full mb-6" />
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra colección completa de productos orgánicos y naturales
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-purple-100 animate-pulse">
                  <div className="h-64 bg-purple-100" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-purple-100 rounded w-1/4" />
                    <div className="h-5 bg-purple-100 rounded w-3/4" />
                    <div className="h-6 bg-purple-100 rounded w-1/3" />
                    <div className="h-11 bg-purple-100 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24">
              <Leaf className="w-16 h-16 text-purple-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                Pronto tendremos productos disponibles. ¡Vuelve pronto!
              </p>
              <Link
                href="/"
                className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Volver al inicio
              </Link>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginated.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-purple-100 hover:border-purple-300 group"
                  >
                    {/* Image */}
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
                          <Leaf className="w-16 h-16 text-purple-200" />
                        </div>
                      )}

                      {/* Favorite button */}
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favorites.includes(product.id)
                              ? "text-red-500 fill-current"
                              : "text-gray-400"
                          }`}
                        />
                      </button>

                      {/* Category badge */}
                      {product.category && (
                        <div className="absolute bottom-4 left-4 px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
                          {product.category.name}
                        </div>
                      )}

                      {/* Out of stock */}
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="bg-white text-gray-800 font-bold px-4 py-2 rounded-full text-sm">
                            Agotado
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-6">
                      <div className="flex text-yellow-400 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-2xl font-bold text-purple-600 mb-4">
                        ${Number(product.price).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                        className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 ${
                          product.stock === 0
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : inCart(product.id)
                            ? "bg-green-500 text-white"
                            : "bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:shadow-lg"
                        }`}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>
                          {product.stock === 0
                            ? "Agotado"
                            : inCart(product.id)
                            ? "En el carrito"
                            : "Agregar al carrito"}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-12">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg transition-colors ${
                      currentPage === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-purple-600 hover:bg-purple-50"
                    }`}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <div className="flex space-x-2">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                          currentPage === i + 1
                            ? "bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-md"
                            : "bg-white text-purple-600 hover:bg-purple-50 shadow-sm"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg transition-colors ${
                      currentPage === totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-purple-600 hover:bg-purple-50"
                    }`}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
