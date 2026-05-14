import Link from "next/link";
import { useMemo, useState } from "react";
import { CartContent } from "@/components/cart/CartContent";
import { CartEmptyState } from "@/components/cart/CartEmptyState";
import { Seo } from "@/components/Seo";
import { useShop } from "@/context/ShopContext";

const promos = {
  NOSKA15: 0.15,
  EID10: 0.1,
};

export default function CartPage() {
  const { cart, subtotal, freeShippingThreshold, updateQuantity, removeFromCart } =
    useShop();
  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState(null);
  const [promoError, setPromoError] = useState("");

  const discount = useMemo(() => {
    if (!promo) return 0;
    return Math.round(subtotal * promos[promo]);
  }, [promo, subtotal]);

  const shipping = subtotal - discount >= freeShippingThreshold || subtotal === 0 ? 0 : 180;
  const total = Math.max(0, subtotal - discount + shipping);

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (promos[code]) {
      setPromo(code);
      setPromoError("");
      return;
    }
    setPromo(null);
    setPromoError("Promo code not valid");
  };

  return (
    <>
      <Seo
        title="Shopping Bag"
        description="Review selected Noska dresses, apply a promo code, and continue to checkout."
        canonicalPath="/cart"
        noindex
      />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#b9404f]">Shopping bag</p>
            <h1 className="mt-2 text-4xl font-semibold">Your selected dresses</h1>
          </div>
          <Link href="/shop" className="w-fit text-sm font-semibold text-[#151515]">
            Continue shopping
          </Link>
        </div>

        {cart.length === 0 ? (
          <CartEmptyState />
        ) : (
          <CartContent
            applyPromo={applyPromo}
            cart={cart}
            discount={discount}
            freeShippingThreshold={freeShippingThreshold}
            promo={promo}
            promoError={promoError}
            promoInput={promoInput}
            removeFromCart={removeFromCart}
            setPromoInput={setPromoInput}
            shipping={shipping}
            subtotal={subtotal}
            total={total}
            updateQuantity={updateQuantity}
          />
        )}
      </section>
    </>
  );
}
