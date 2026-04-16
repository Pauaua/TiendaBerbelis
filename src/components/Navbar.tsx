"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/productos", label: "Productos" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-[#2D1B4E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-horizontal.png"
              alt="Berbelis Fitocreaciones"
              width={180}
              height={56}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={
                  pathname === l.href
                    ? "text-[#2D1B4E] font-semibold border-b-2 border-[#B8A0D8] pb-0.5"
                    : "text-[#2D1B4E]/70 hover:text-[#2D1B4E] transition-colors font-medium"
                }
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Cart button */}
          <div className="flex items-center gap-3">
            <Link
              href="/carrito"
              className="relative flex items-center space-x-2 px-5 py-2 bg-[#2D1B4E] text-white rounded-full hover:bg-[#3d2660] hover:shadow-lg transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden md:inline">Carrito</span>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#B8A0D8] text-[#2D1B4E] text-xs font-bold rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            {/* Mobile menu */}
            <button
              className="md:hidden p-2 text-[#2D1B4E]"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-[#2D1B4E]/10 px-4 py-4 space-y-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-[#2D1B4E] hover:text-[#6B8F3A] font-medium py-1"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
