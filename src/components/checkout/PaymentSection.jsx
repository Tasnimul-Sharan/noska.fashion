import { CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

const paymentOptions = [
  ["card", "Card"],
  ["bkash", "bKash"],
  ["cod", "Cash"],
];

export function PaymentSection({ note, payment, setPayment, updateField }) {
  return (
    <motion.section className="rounded-lg border border-[#e5ddd2] bg-white p-5" variants={fadeUp}>
      <div className="flex items-center gap-2">
        <CreditCard size={19} className="text-[#b9404f]" />
        <h2 className="text-xl font-semibold">Payment</h2>
      </div>
      <motion.div className="mt-5 grid gap-3 sm:grid-cols-3" variants={staggerContainer}>
        {paymentOptions.map(([value, label]) => (
          <motion.button
            key={value}
            variants={fadeUp}
            whileTap={{ scale: 0.96 }}
            className={`focus-ring h-12 rounded-lg border text-sm font-semibold ${
              payment === value
                ? "border-[#151515] bg-[#151515] text-white"
                : "border-[#ded6ca] bg-[#fbfaf8]"
            }`}
            type="button"
            onClick={() => setPayment(value)}
          >
            {label}
          </motion.button>
        ))}
      </motion.div>
      <label className="mt-5 block text-sm font-semibold" htmlFor="note">
        Order note
      </label>
      <input
        id="note"
        value={note}
        onChange={(event) => updateField("note", event.target.value)}
        className="focus-ring mt-2 h-11 w-full rounded-lg border border-[#ded6ca] bg-[#fbfaf8] px-3 text-sm outline-none"
        placeholder="Optional"
      />
    </motion.section>
  );
}
