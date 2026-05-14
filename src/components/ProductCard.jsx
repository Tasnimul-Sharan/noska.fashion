import { Heart, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useShop } from "@/context/ShopContext";
import { formatCurrency, slugifyCollection } from "@/data/products";

export function ProductCard({ product }) {
  const { addToCart, isInWishlist, toggleWishlist } = useShop();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const wished = isInWishlist(product.id);

  return (
    <article className="group overflow-hidden rounded-lg border border-[#e5ddd2] bg-white">
      <div className="relative aspect-4/5 overflow-hidden bg-[#efe8dd]">
        <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        </Link>
        <div className="absolute left-3 top-3 rounded-lg bg-white/92 px-3 py-1 text-xs font-semibold text-[#151515] shadow-sm">
          {product.badge}
        </div>
        <button
          className="focus-ring absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/92 text-[#151515] shadow-sm transition hover:text-[#b9404f]"
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product.id)}
        >
          <Heart size={18} fill={wished ? "#b9404f" : "none"} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-3 text-xs text-[#7b7167]">
          <Link
            href={`/collections/${slugifyCollection(product.collection)}`}
            className="transition hover:text-[#b9404f]"
          >
            {product.collection}
          </Link>
          <span className="flex items-center gap-1 text-[#514c45]">
            <Star size={14} fill="#e6b84f" className="text-[#e6b84f]" />
            {product.rating}
          </span>
        </div>
        <Link href={`/products/${product.slug}`} className="mt-2 block">
          <h3 className="line-clamp-2 min-h-12 text-lg font-semibold leading-6 transition group-hover:text-[#b9404f]">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-semibold">{formatCurrency(product.price)}</span>
          <span className="text-sm text-[#9b9288] line-through">
            {formatCurrency(product.oldPrice)}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            {product.colors.slice(0, 3).map((option) => (
              <button
                key={option.name}
                className={`focus-ring h-6 w-6 rounded-full border ${
                  color === option.name
                    ? "border-[#151515] ring-2 ring-[#151515]/15"
                    : "border-[#d7cdc0]"
                }`}
                style={{ backgroundColor: option.value }}
                type="button"
                aria-label={`Select ${option.name}`}
                onClick={() => setColor(option.name)}
              />
            ))}
          </div>
          <select
            value={size}
            onChange={(event) => setSize(event.target.value)}
            className="focus-ring h-9 rounded-lg border border-[#ded6ca] bg-[#fbfaf8] px-2 text-sm font-medium"
            aria-label="Select size"
          >
            {product.sizes.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <button
          className="focus-ring mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#151515] px-4 text-sm font-semibold text-white transition hover:bg-[#b9404f]"
          type="button"
          onClick={() => addToCart(product, { size, color })}
        >
          <ShoppingBag size={17} />
          Add to cart
        </button>
      </div>
    </article>
  );
}
