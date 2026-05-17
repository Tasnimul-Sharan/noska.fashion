import { Gift } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { formatCurrency } from "@/data/products";
import { promoCodes } from "@/data/promos";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function CartOrderSummary({
  applyPromo,
  discount,
  freeShippingThreshold,
  promo,
  promoError,
  promoInput,
  setPromoInput,
  shipping,
  subtotal,
  total,
}) {
  return (
    <motion.aside
      className="h-fit rounded-lg border border-[#e5ddd2] bg-white p-5"
      variants={fadeUp}
    >
      <h2 className="text-xl font-semibold">Order summary</h2>
      <motion.div
        className="mt-5 rounded-lg border border-[#e0d8cc] bg-[#fbfaf8] p-3"
        variants={fadeUp}
      >
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Gift size={17} className="text-[#b9404f]" />
          Promo
        </div>
        <div className="mt-3 flex gap-2">
          <input
            value={promoInput}
            onChange={(event) => setPromoInput(event.target.value)}
            className="focus-ring min-w-0 flex-1 rounded-lg border border-[#ded6ca] bg-white px-3 text-sm outline-none"
            placeholder="NOSKA15"
          />
          <button
            className="focus-ring rounded-lg bg-[#151515] px-4 text-sm font-semibold text-white"
            type="button"
            onClick={applyPromo}
          >
            Apply
          </button>
        </div>
        <div className="mt-3 grid gap-2">
          {promoCodes.map((suggestion) => (
            <button
              key={suggestion.code}
              className={`focus-ring rounded-lg border px-3 py-2 text-left text-xs transition ${
                promo === suggestion.code
                  ? "border-[#1f7a5a] bg-[#eaf7f1] text-[#1f7a5a]"
                  : "border-[#ded6ca] bg-white text-[#514c45] hover:border-[#b9404f]"
              }`}
              type="button"
              onClick={() => applyPromo(suggestion.code)}
            >
              <span className="font-bold">{suggestion.code}</span>
              <span className="ml-2">{suggestion.label}</span>
              <span className="mt-1 block text-[#7b7167]">{suggestion.hint}</span>
            </button>
          ))}
        </div>
        {promo && (
          <p className="mt-2 text-sm font-semibold text-[#1f7a5a]">
            {promo} applied
          </p>
        )}
        {promoError && <p className="mt-2 text-sm text-[#b9404f]">{promoError}</p>}
      </motion.div>

      <motion.div className="mt-5 space-y-3 text-sm" variants={staggerContainer}>
        <SummaryLine label="Subtotal" value={formatCurrency(subtotal)} />
        <SummaryLine label="Discount" value={`-${formatCurrency(discount)}`} />
        <SummaryLine label="Shipping" value={shipping === 0 ? "Free" : formatCurrency(shipping)} />
      </motion.div>
      <div className="mt-5 flex items-center justify-between border-t border-[#e7e1d8] pt-5 text-lg font-semibold">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
      <Link
        href="/checkout"
        className="mt-5 block rounded-lg bg-[#b9404f] px-5 py-3 text-center text-sm font-semibold text-white"
      >
        Checkout
      </Link>
      <p className="mt-3 text-xs leading-5 text-[#7b7167]">
        Use NOSKA15 for a demo discount. Shipping becomes free from{" "}
        {formatCurrency(freeShippingThreshold)}.
      </p>
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
