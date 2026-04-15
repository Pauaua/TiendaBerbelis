"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";

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
    <nav className="fixed w-full bg-white/95 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Berbelis
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={
                  pathname === l.href
                    ? "text-purple-600 font-semibold"
                    : "text-gray-700 hover:text-purple-600 transition-colors"
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
              className="relative flex items-center space-x-2 px-5 py-2 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-300 transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden md:inline">Carrito</span>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            {/* Mobile menu */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-purple-100 px-4 py-4 space-y-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-gray-700 hover:text-purple-600 font-medium py-1"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
