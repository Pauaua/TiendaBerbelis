import { Leaf } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <Link href="/" className="inline-flex items-center justify-center space-x-2 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
            Berbelis
          </span>
        </Link>
        <p className="text-gray-400 mb-4">Naturaleza y Bienestar para tu piel</p>
        <div className="flex justify-center gap-6 text-sm text-gray-400">
          <Link href="/productos" className="hover:text-purple-400 transition-colors">Productos</Link>
          <Link href="/contacto" className="hover:text-purple-400 transition-colors">Contacto</Link>
        </div>
        <p className="text-gray-600 text-sm mt-6">
          © {new Date().getFullYear()} Berbelis. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
