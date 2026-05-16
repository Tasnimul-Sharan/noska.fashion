import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { FormField } from "@/components/checkout/FormField";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function ContactSection({ form, updateField }) {
  return (
    <motion.section className="rounded-lg border border-[#e5ddd2] bg-white p-5" variants={fadeUp}>
      <div className="flex items-center gap-2">
        <Phone size={19} className="text-[#b9404f]" />
        <h2 className="text-xl font-semibold">Contact</h2>
      </div>
      <motion.div className="mt-5 grid gap-4 sm:grid-cols-2" variants={staggerContainer}>
        <FormField
          label="Full name"
          value={form.name}
          onChange={(value) => updateField("name", value)}
          required
        />
        <FormField
          label="Email"
          type="email"
          value={form.email}
          onChange={(value) => updateField("email", value)}
          required
        />
        <FormField
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={(value) => updateField("phone", value)}
          required
        />
        <FormField
          label="City"
          value={form.city}
          onChange={(value) => updateField("city", value)}
          required
        />
      </motion.div>
    </motion.section>
  );
}
