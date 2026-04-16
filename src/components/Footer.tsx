import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-[#2D1B4E] text-white">
      <div className="max-w-7xl mx-auto text-center">
        <Link href="/" className="inline-flex items-center justify-center mb-6">
          <Image
            src="/images/logo-badge.png"
            alt="Berbelis Fitocreaciones"
            width={100}
            height={120}
            className="h-24 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
          />
        </Link>
        <p className="text-[#B8A0D8] mb-4 font-medium">Naturaleza y Bienestar para tu piel</p>
        <div className="flex justify-center gap-6 text-sm text-[#B8A0D8]/80">
          <Link href="/productos" className="hover:text-[#B8A0D8] transition-colors">Productos</Link>
          <Link href="/contacto" className="hover:text-[#B8A0D8] transition-colors">Contacto</Link>
        </div>
        <p className="text-[#B8A0D8]/40 text-sm mt-6">
          © {new Date().getFullYear()} Berbelis Fitocreaciones. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
