"use client";

import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({ productId: i.id, quantity: i.quantity, price: i.price })),
          total,
        }),
      });
      if (res.ok) {
        clearCart();
        setSuccess(true);
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-50">
        <Navbar />
        <main className="pt-24 pb-20 px-4 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¡Pedido realizado!</h2>
            <p className="text-gray-600 mb-8">
              Te contactaremos pronto para confirmar tu pedido. ¡Gracias por elegir Berbelis!
            </p>
            <Link
              href="/productos"
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Seguir comprando
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-50">
      <Navbar />
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/productos" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-8 font-medium">
            <ArrowLeft className="w-4 h-4" />
            Seguir comprando
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">Tu Carrito</h1>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-16 h-16 text-purple-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-6">Tu carrito está vacío</p>
              <Link href="/productos" className="px-8 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-full font-semibold">
                Ver productos
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-purple-50 flex-shrink-0">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="w-8 h-8 text-purple-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-purple-600 font-bold">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 hover:bg-purple-200">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 hover:bg-purple-200">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-bold text-gray-900 w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                    <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 ml-2">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Order form + summary */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Resumen</h2>
                  <div className="flex justify-between text-gray-600 mb-2">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 mb-4">
                    <span>Envío</span>
                    <span className="text-green-600">Gratis</span>
                  </div>
                  <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-purple-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                <form onSubmit={handleOrder} className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
                  <h2 className="text-xl font-bold text-gray-900">Datos de entrega</h2>
                  {[
                    { name: "name", label: "Nombre completo", required: true, type: "text" },
                    { name: "email", label: "Email", required: true, type: "email" },
                    { name: "phone", label: "Teléfono", required: false, type: "tel" },
                    { name: "address", label: "Dirección", required: false, type: "text" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                      <input
                        type={field.type}
                        required={field.required}
                        value={form[field.name as keyof typeof form]}
                        onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-60"
                  >
                    {loading ? "Procesando..." : "Confirmar pedido"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
