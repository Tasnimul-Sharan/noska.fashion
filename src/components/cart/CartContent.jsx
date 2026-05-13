import { CartItem } from "@/components/cart/CartItem";
import { CartOrderSummary } from "@/components/cart/CartOrderSummary";

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
  updateQuantity,
}) {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
      <div className="space-y-4">
        {cart.map((line) => (
          <CartItem
            key={line.id}
            line={line}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        ))}
      </div>

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
    </div>
  );
}
