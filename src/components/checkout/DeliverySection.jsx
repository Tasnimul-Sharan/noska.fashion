import { MapPin, PackageCheck, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { formatCurrency } from "@/data/products";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function DeliverySection({
  address,
  delivery,
  freeShippingThreshold,
  setDelivery,
  subtotal,
  updateField,
}) {
  const standardPrice = subtotal >= freeShippingThreshold ? "Free" : formatCurrency(180);
  const expressPrice = subtotal >= freeShippingThreshold ? "Free" : formatCurrency(320);

  return (
    <motion.section className="rounded-lg border border-[#e5ddd2] bg-white p-5" variants={fadeUp}>
      <div className="flex items-center gap-2">
        <MapPin size={19} className="text-[#b9404f]" />
        <h2 className="text-xl font-semibold">Delivery</h2>
      </div>
      <div className="mt-5">
        <label className="text-sm font-semibold" htmlFor="address">
          Address
        </label>
        <textarea
          id="address"
          value={address}
          onChange={(event) => updateField("address", event.target.value)}
          className="focus-ring mt-2 min-h-28 w-full resize-y rounded-lg border border-[#ded6ca] bg-[#fbfaf8] px-3 py-3 text-sm outline-none"
          required
        />
      </div>
      <motion.div className="mt-4 grid gap-3 sm:grid-cols-2" variants={staggerContainer}>
        <DeliveryOption
          active={delivery === "standard"}
          icon={Truck}
          title="Standard"
          text="2-4 business days"
          price={standardPrice}
          onClick={() => setDelivery("standard")}
        />
        <DeliveryOption
          active={delivery === "express"}
          icon={PackageCheck}
          title="Express"
          text="24-48 hours"
          price={expressPrice}
          onClick={() => setDelivery("express")}
        />
      </motion.div>
    </motion.section>
  );
}

function DeliveryOption({ active, icon: Icon, title, text, price, onClick }) {
  return (
    <motion.button
      variants={fadeUp}
      whileTap={{ scale: 0.97 }}
      className={`focus-ring rounded-lg border p-4 text-left ${
        active ? "border-[#151515] bg-[#fbfaf8]" : "border-[#ded6ca] bg-white"
      }`}
      type="button"
      onClick={onClick}
    >
      <Icon size={19} className="text-[#b9404f]" />
      <span className="mt-3 block font-semibold">{title}</span>
      <span className="mt-1 block text-sm text-[#6f6a63]">{text}</span>
      <span className="mt-2 block text-sm font-semibold">{price}</span>
    </motion.button>
  );
}
