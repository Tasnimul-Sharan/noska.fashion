import { CheckCircle2, ShieldCheck, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const items = [
  { icon: Truck, label: "Fast delivery", text: "Dhaka 24-48h" },
  { icon: ShieldCheck, label: "Easy exchange", text: "7-day fit support" },
  { icon: CheckCircle2, label: "Quality checked", text: "Premium finishing" },
];

export function ServiceStrip() {
  return (
    <motion.section
      className="border-y border-[#e7e1d8] bg-white"
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      <motion.div
        className="mx-auto grid max-w-7xl gap-0 px-4 sm:px-6 md:grid-cols-3 lg:px-8"
        variants={staggerContainer}
      >
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              className="flex items-center gap-4 border-b border-[#e7e1d8] py-5 md:border-b-0 md:border-r md:last:border-r-0"
              variants={fadeUp}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f5eee5] text-[#b9404f]">
                <Icon size={20} />
              </span>
              <span>
                <span className="block font-semibold">{item.label}</span>
                <span className="mt-1 block text-sm text-[#6f6a63]">{item.text}</span>
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
