import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { formatCurrency } from "@/data/products";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";

export function CheckoutSuccess({ order }) {
  return (
    <motion.section
      className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8"
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      <motion.div variants={scaleIn}>
        <CheckCircle2 size={56} className="text-[#1f7a5a]" />
      </motion.div>
      <motion.h1 className="mt-5 text-4xl font-semibold" variants={fadeUp}>
        Order confirmed
      </motion.h1>
      <motion.p className="mt-3 max-w-xl text-base leading-7 text-[#6f6a63]" variants={fadeUp}>
        Order {order.number} has been placed. A confirmation was prepared for{" "}
        {order.email}.
      </motion.p>
      <motion.div
        className="mt-8 grid w-full gap-3 rounded-lg border border-[#e5ddd2] bg-white p-5 text-left sm:grid-cols-2"
        variants={staggerContainer}
      >
        <SummaryTile label="Total" value={formatCurrency(order.total)} />
        <SummaryTile
          label="Items"
          value={`${order.items} line item${order.items > 1 ? "s" : ""}`}
        />
        <SummaryTile
          label="Delivery"
          value={order.delivery === "express" ? "Express" : "Standard"}
        />
        <SummaryTile label="Payment" value={paymentLabel(order.payment)} />
      </motion.div>
      <motion.div variants={fadeUp}>
        <Link
          href="/shop"
          className="mt-8 inline-flex rounded-lg bg-[#151515] px-5 py-3 text-sm font-semibold text-white"
        >
          Continue shopping
        </Link>
      </motion.div>
    </motion.section>
  );
}

function SummaryTile({ label, value }) {
  return (
    <motion.div className="rounded-lg bg-[#fbfaf8] p-4" variants={fadeUp}>
      <p className="text-sm text-[#7b7167]">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </motion.div>
  );
}

function paymentLabel(payment) {
  if (payment === "bkash") return "bKash";
  if (payment === "cod") return "Cash";
  return "Card";
}
