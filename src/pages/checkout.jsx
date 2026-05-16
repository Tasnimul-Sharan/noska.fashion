import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { CheckoutEmptyState } from "@/components/checkout/CheckoutEmptyState";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { CheckoutSuccess } from "@/components/checkout/CheckoutSuccess";
import { Seo } from "@/components/Seo";
import { useShop } from "@/context/ShopContext";
import { fadeUp, staggerContainer } from "@/lib/motion";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "Dhaka",
  note: "",
};

export default function CheckoutPage() {
  const { cart, subtotal, freeShippingThreshold, clearCart } = useShop();
  const [form, setForm] = useState(initialForm);
  const [payment, setPayment] = useState("card");
  const [delivery, setDelivery] = useState("standard");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const shipping = useMemo(() => {
    if (subtotal >= freeShippingThreshold || subtotal === 0) return 0;
    return delivery === "express" ? 320 : 180;
  }, [delivery, freeShippingThreshold, subtotal]);

  const total = subtotal + shipping;

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const placeOrder = (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      setError("Your bag is empty");
      return;
    }

    const requiredFields = ["name", "email", "phone", "address", "city"];
    const missingField = requiredFields.find((field) => !form[field].trim());

    if (missingField) {
      setError("Please complete your delivery details");
      return;
    }

    const orderNumber = `NS-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrder({
      number: orderNumber,
      total,
      email: form.email,
      delivery,
      payment,
      items: cart.length,
    });
    setError("");
    clearCart();
  };

  if (order) {
    return (
      <>
        <Seo
          title="Order Confirmed"
          description="Your Noska order confirmation."
          canonicalPath="/checkout"
          noindex
        />
        <CheckoutSuccess order={order} />
      </>
    );
  }

  return (
    <>
      <Seo
        title="Checkout"
        description="Securely place your Noska dress order with delivery and payment options."
        canonicalPath="/checkout"
        noindex
      />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="show" variants={staggerContainer}>
          <motion.p className="text-sm font-semibold text-[#b9404f]" variants={fadeUp}>
            Checkout
          </motion.p>
          <motion.h1 className="mt-2 text-4xl font-semibold" variants={fadeUp}>
            Secure your edit
          </motion.h1>
        </motion.div>

        {cart.length === 0 ? (
          <CheckoutEmptyState />
        ) : (
          <CheckoutForm
            cart={cart}
            delivery={delivery}
            error={error}
            form={form}
            freeShippingThreshold={freeShippingThreshold}
            payment={payment}
            placeOrder={placeOrder}
            setDelivery={setDelivery}
            setPayment={setPayment}
            shipping={shipping}
            subtotal={subtotal}
            total={total}
            updateField={updateField}
          />
        )}
      </section>
    </>
  );
}
