import { motion } from "framer-motion";
import { CartItem } from "@/components/cart/CartItem";
import { CartOrderSummary } from "@/components/cart/CartOrderSummary";
import { staggerContainer } from "@/lib/motion";

export function CartContent({
  applyPromo,
  cart,
  discount,
  freeShippingThreshold,
  promo,
  promoError,
  promoInput,
  removeFromCart,
  setPromoInput,
  shipping,
  subtotal,
  total,
  updateCartItemOptions,
  updateQuantity,
}) {
  return (
    <motion.div
      className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]"
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      <motion.div className="space-y-4" variants={staggerContainer}>
        {cart.map((line) => (
          <CartItem
            key={line.id}
            line={line}
            removeFromCart={removeFromCart}
            updateCartItemOptions={updateCartItemOptions}
            updateQuantity={updateQuantity}
          />
        ))}
      </motion.div>

      <CartOrderSummary
        applyPromo={applyPromo}
        discount={discount}
        freeShippingThreshold={freeShippingThreshold}
        promo={promo}
        promoError={promoError}
        promoInput={promoInput}
        setPromoInput={setPromoInput}
        shipping={shipping}
        subtotal={subtotal}
        total={total}
      />
    </motion.div>
  );
}
