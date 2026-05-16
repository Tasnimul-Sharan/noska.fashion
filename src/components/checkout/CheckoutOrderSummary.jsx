import { motion } from "framer-motion";
import Image from "next/image";
import { formatCurrency } from "@/data/products";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function CheckoutOrderSummary({ cart, error, shipping, subtotal, total }) {
  return (
    <motion.aside
      className="h-fit rounded-lg border border-[#e5ddd2] bg-white p-5"
      variants={fadeUp}
    >
      <h2 className="text-xl font-semibold">Order summary</h2>
      <motion.div className="mt-5 space-y-4" variants={staggerContainer}>
        {cart.map((line) => (
          <motion.div key={line.id} className="grid grid-cols-[64px_1fr] gap-3" variants={fadeUp}>
            <div className="relative h-20 overflow-hidden rounded-lg bg-[#eee7dd]">
              <Image
                src={line.image}
                alt={line.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="font-semibold leading-5">{line.name}</p>
              <p className="mt-1 text-xs text-[#7b7167]">
                {line.size} / {line.color} x {line.quantity}
              </p>
              <p className="mt-2 text-sm font-semibold">
                {formatCurrency(line.price * line.quantity)}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="mt-5 space-y-3 border-t border-[#e7e1d8] pt-5 text-sm"
        variants={staggerContainer}
      >
        <SummaryLine label="Subtotal" value={formatCurrency(subtotal)} />
        <SummaryLine label="Shipping" value={shipping === 0 ? "Free" : formatCurrency(shipping)} />
      </motion.div>
      <div className="mt-5 flex items-center justify-between border-t border-[#e7e1d8] pt-5 text-lg font-semibold">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
      {error && <p className="mt-3 text-sm text-[#b9404f]">{error}</p>}
      <button
        className="focus-ring mt-5 w-full rounded-lg bg-[#b9404f] px-5 py-3 text-sm font-semibold text-white"
        type="submit"
      >
        Place order
      </button>
    </motion.aside>
  );
}

function SummaryLine({ label, value }) {
  return (
    <motion.div className="flex items-center justify-between" variants={fadeUp}>
      <span className="text-[#6f6a63]">{label}</span>
      <span className="font-semibold">{value}</span>
    </motion.div>
  );
}
