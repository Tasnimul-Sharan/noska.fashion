import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";

export function CartEmptyState() {
  return (
    <motion.div
      className="mt-10 flex min-h-96 flex-col items-center justify-center rounded-lg border border-[#e5ddd2] bg-white p-8 text-center"
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      <motion.div variants={scaleIn}>
        <ShoppingBag size={44} className="text-[#b9404f]" />
      </motion.div>
      <motion.h2 className="mt-4 text-2xl font-semibold" variants={fadeUp}>
        Your bag is empty
      </motion.h2>
      <motion.p className="mt-2 max-w-md text-sm leading-6 text-[#6f6a63]" variants={fadeUp}>
        Add dresses from the collection and come back here to checkout.
      </motion.p>
      <motion.div variants={fadeUp}>
        <Link
          href="/shop"
          className="mt-6 inline-flex rounded-lg bg-[#151515] px-5 py-3 text-sm font-semibold text-white"
        >
          Shop dresses
        </Link>
      </motion.div>
    </motion.div>
  );
}
