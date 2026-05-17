import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Seo } from "@/components/Seo";
import { useShop } from "@/context/ShopContext";
import { formatCurrency, products } from "@/data/products";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function WishlistPage() {
  const { wishlist } = useShop();
  const wishedProducts = useMemo(
    () => products.filter((product) => wishlist.includes(product.id)),
    [wishlist],
  );

  return (
    <>
      <Seo
        title="Wishlist"
        description="Manage saved Noska dresses and move favorite pieces to cart."
        canonicalPath="/wishlist"
        noindex
      />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="show" variants={staggerContainer}>
          <motion.p className="text-sm font-semibold text-[#b9404f]" variants={fadeUp}>
            Wishlist
          </motion.p>
          <motion.h1 className="mt-2 text-4xl font-semibold" variants={fadeUp}>
            Saved dresses
          </motion.h1>
          <motion.p className="mt-3 max-w-2xl text-sm leading-6 text-[#6f6a63]" variants={fadeUp}>
            Review saved pieces, choose size and color, remove items, or move them
            straight to cart.
          </motion.p>
        </motion.div>

        {wishedProducts.length === 0 ? (
          <motion.div
            className="mt-10 flex min-h-96 flex-col items-center justify-center rounded-lg border border-[#e5ddd2] bg-white p-8 text-center"
            initial="hidden"
            animate="show"
            variants={staggerContainer}
          >
            <Heart size={44} className="text-[#b9404f]" />
            <h2 className="mt-4 text-2xl font-semibold">No saved dresses yet</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-[#6f6a63]">
              Save dresses from the shop and they will appear here.
            </p>
            <Link
              href="/shop"
              className="mt-6 rounded-lg bg-[#151515] px-5 py-3 text-sm font-semibold text-white"
            >
              Browse shop
            </Link>
          </motion.div>
        ) : (
          <motion.div
            className="mt-8 grid gap-4"
            initial="hidden"
            animate="show"
            variants={staggerContainer}
          >
            {wishedProducts.map((product) => (
              <WishlistLine key={product.id} product={product} />
            ))}
          </motion.div>
        )}
      </section>
    </>
  );
}

function WishlistLine({ product }) {
  const { addToCart, removeFromWishlist } = useShop();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);

  return (
    <motion.article
      className="grid gap-4 rounded-lg border border-[#e5ddd2] bg-white p-4 sm:grid-cols-[120px_1fr_auto]"
      variants={fadeUp}
    >
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-4/5 overflow-hidden rounded-lg bg-[#eee7dd] sm:h-36 sm:aspect-auto"
      >
        <Image src={product.image} alt={product.name} fill sizes="140px" className="object-cover" />
      </Link>
      <div>
        <p className="text-sm font-semibold text-[#b9404f]">{product.collection}</p>
        <Link href={`/products/${product.slug}`} className="mt-1 block text-xl font-semibold">
          {product.name}
        </Link>
        <p className="mt-2 text-sm text-[#6f6a63]">{product.description}</p>
        <p className="mt-3 font-semibold">{formatCurrency(product.price)}</p>
        <div className="mt-4 grid max-w-md gap-2 sm:grid-cols-2">
          <select
            value={size}
            onChange={(event) => setSize(event.target.value)}
            className="focus-ring h-10 rounded-lg border border-[#ded6ca] bg-[#fbfaf8] px-2 text-sm font-semibold"
            aria-label={`Select ${product.name} size`}
          >
            {product.sizes.map((option) => (
              <option key={option} value={option}>
                Size {option}
              </option>
            ))}
          </select>
          <select
            value={color}
            onChange={(event) => setColor(event.target.value)}
            className="focus-ring h-10 rounded-lg border border-[#ded6ca] bg-[#fbfaf8] px-2 text-sm font-semibold"
            aria-label={`Select ${product.name} color`}
          >
            {product.colors.map((option) => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-2 sm:flex-col">
        <button
          className="focus-ring flex h-11 items-center justify-center gap-2 rounded-lg bg-[#151515] px-4 text-sm font-semibold text-white"
          type="button"
          onClick={() => addToCart(product, { size, color })}
        >
          <ShoppingBag size={17} />
          Add
        </button>
        <button
          className="focus-ring flex h-11 items-center justify-center gap-2 rounded-lg border border-[#ded6ca] px-4 text-sm font-semibold text-[#b9404f]"
          type="button"
          onClick={() => removeFromWishlist(product.id)}
        >
          <Trash2 size={17} />
          Remove
        </button>
      </div>
    </motion.article>
  );
}
