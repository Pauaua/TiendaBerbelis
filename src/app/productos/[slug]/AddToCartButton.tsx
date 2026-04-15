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
          ? "bg-green-500 text-white"
          : "bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:shadow-xl hover:shadow-purple-300"
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
