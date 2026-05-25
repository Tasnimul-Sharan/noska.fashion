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
      className="light-readable border-y border-[#ded6ca] bg-[#fbfaf8] text-[#151515]"
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      <motion.div
        className="mx-auto grid max-w-7xl gap-3 px-4 py-5 sm:px-6 md:grid-cols-3 lg:px-8"
        variants={staggerContainer}
      >
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              className="flex items-center gap-4 rounded-lg border border-[#e3d8cb] bg-white px-4 py-4 text-[#151515] shadow-[0_18px_50px_rgba(24,21,18,0.06)]"
              variants={fadeUp}
            >
              <span className="readable-white flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#151515] text-white">
                <Icon size={20} />
              </span>
              <span>
                <span className="block text-sm font-bold uppercase tracking-[0.08em] text-[#151515]">{item.label}</span>
                <span className="readable-muted mt-1 block text-sm font-medium text-[#514c45]">{item.text}</span>
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
