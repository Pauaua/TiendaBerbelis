"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactoPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        setError("Hubo un error al enviar tu mensaje. Intenta de nuevo.");
      }
    } catch {
      setError("Hubo un error al enviar tu mensaje. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#2D1B4E] mb-4">
              Contácta<span className="text-[#6B8F3A]">nos</span>
            </h1>
            <div className="w-20 h-1 bg-[#B8A0D8] mx-auto rounded-full" />
            <p className="text-[#2D1B4E]/70 mt-4">Estamos aquí para ayudarte</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#B8A0D8]/30">
                <h2 className="text-2xl font-bold text-[#2D1B4E] mb-6">Información de contacto</h2>
                {[
                  { icon: <Mail className="w-5 h-5" />, label: "Email", value: "fitoterapiamtch@gmail.com" },
                  { icon: <Phone className="w-5 h-5" />, label: "Teléfono", value: "+56 9 8995 7318" },
                  { icon: <MapPin className="w-5 h-5" />, label: "Ubicación", value: "Coquimbo, Chile" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 mb-5">
                    <div className="w-10 h-10 bg-[#B8A0D8]/20 rounded-xl flex items-center justify-center text-[#2D1B4E] flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-[#2D1B4E]/50">{item.label}</p>
                      <p className="font-semibold text-[#2D1B4E]">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#2D1B4E] rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-3">¿Por qué elegirnos?</h3>
                <ul className="space-y-2 text-[#B8A0D8] text-sm">
                  <li>✓ Productos 100% naturales y orgánicos</li>
                  <li>✓ Envíos rápidos y seguros</li>
                  <li>✓ Atención personalizada</li>
                  <li>✓ Garantía de satisfacción</li>
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#B8A0D8]/30">
              {sent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[#6B8F3A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-[#6B8F3A]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2D1B4E] mb-2">¡Mensaje enviado!</h3>
                  <p className="text-[#2D1B4E]/70">Te responderemos a la brevedad posible.</p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 px-6 py-2 text-[#2D1B4E] border border-[#B8A0D8] rounded-full hover:bg-[#FAF8F5] transition-all"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-2xl font-bold text-[#2D1B4E] mb-2">Envíanos un mensaje</h2>
                  {error && (
                    <p className="text-red-500 text-sm bg-red-50 p-3 rounded-xl">{error}</p>
                  )}
                  {[
                    { name: "name", label: "Nombre completo", type: "text" },
                    { name: "email", label: "Correo electrónico", type: "email" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-[#2D1B4E] mb-1.5">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        required
                        value={form[field.name as keyof typeof form]}
                        onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8A0D8]"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-[#2D1B4E] mb-1.5">Mensaje</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8A0D8] resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-[#2D1B4E] text-white rounded-xl font-semibold hover:bg-[#3d2660] hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {loading ? "Enviando..." : (<><Send className="w-5 h-5" />Enviar mensaje</>)}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
