import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/data/products";
import { fadeUp } from "@/lib/motion";

export function CartItem({ line, removeFromCart, updateQuantity }) {
  return (
    <motion.article
      className="grid gap-4 rounded-lg border border-[#e5ddd2] bg-white p-4 sm:grid-cols-[132px_1fr]"
      variants={fadeUp}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.22 }}
    >
      <Link
        href={`/products/${line.slug}`}
        className="relative aspect-4/5 overflow-hidden rounded-lg bg-[#eee7dd] sm:h-40 sm:aspect-auto"
      >
        <Image
          src={line.image}
          alt={line.name}
          fill
          sizes="160px"
          className="object-cover"
        />
      </Link>
      <div className="flex min-w-0 flex-col justify-between gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link
              href={`/products/${line.slug}`}
              className="text-xl font-semibold hover:text-[#b9404f]"
            >
              {line.name}
            </Link>
            <p className="mt-1 text-sm text-[#7b7167]">
              {line.size} / {line.color}
            </p>
            <p className="mt-2 font-semibold">{formatCurrency(line.price)}</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.94 }}
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-lg border border-[#ded6ca] text-[#7b7167] transition hover:text-[#b9404f]"
            type="button"
            aria-label={`Remove ${line.name}`}
            onClick={() => removeFromCart(line.id)}
          >
            <Trash2 size={18} />
          </motion.button>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex h-11 w-36 items-center justify-between rounded-lg border border-[#ded6ca] bg-[#fbfaf8]">
            <motion.button
              whileTap={{ scale: 0.94 }}
              className="focus-ring flex h-11 w-11 items-center justify-center"
              type="button"
              aria-label="Decrease quantity"
              onClick={() => updateQuantity(line.id, line.quantity - 1)}
            >
              <Minus size={16} />
            </motion.button>
            <span className="font-semibold">{line.quantity}</span>
            <motion.button
              whileTap={{ scale: 0.94 }}
              className="focus-ring flex h-11 w-11 items-center justify-center"
              type="button"
              aria-label="Increase quantity"
              onClick={() => updateQuantity(line.id, line.quantity + 1)}
            >
              <Plus size={16} />
            </motion.button>
          </div>
          <p className="text-lg font-semibold">
            {formatCurrency(line.price * line.quantity)}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
