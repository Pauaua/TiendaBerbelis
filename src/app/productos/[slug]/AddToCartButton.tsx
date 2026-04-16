"use client";

import { ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";

interface Props {
  product: {
    id: number;
    name: string;
    price: number;
    image: string | null;
    slug: string;
  };
}

export default function AddToCartButton({ product }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all ${
        added
          ? "bg-[#6B8F3A] text-white"
          : "bg-[#2D1B4E] text-white hover:bg-[#3d2660] hover:shadow-xl"
      }`}
    >
      {added ? (
        <>
          <Check className="w-5 h-5" />
          Agregado al carrito
        </>
      ) : (
        <>
          <ShoppingBag className="w-5 h-5" />
          Agregar al carrito
        </>
      )}
    </button>
  );
}
