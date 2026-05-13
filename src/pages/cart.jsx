import { Gift, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useShop } from "@/context/ShopContext";
import { formatCurrency } from "@/data/products";

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
      <Head>
        <title>Shopping Bag | Noska</title>
      </Head>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#b9404f]">Shopping bag</p>
            <h1 className="mt-2 text-4xl font-semibold">Your selected dresses</h1>
          </div>
          <Link href="/#shop" className="w-fit text-sm font-semibold text-[#151515]">
            Continue shopping
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="mt-10 flex min-h-96 flex-col items-center justify-center rounded-lg border border-[#e5ddd2] bg-white p-8 text-center">
            <ShoppingBag size={44} className="text-[#b9404f]" />
            <h2 className="mt-4 text-2xl font-semibold">Your bag is empty</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-[#6f6a63]">
              Add dresses from the collection and come back here to checkout.
            </p>
            <Link
              href="/#shop"
              className="mt-6 rounded-lg bg-[#151515] px-5 py-3 text-sm font-semibold text-white"
            >
              Shop dresses
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
            <div className="space-y-4">
              {cart.map((line) => (
                <article
                  key={line.id}
                  className="grid gap-4 rounded-lg border border-[#e5ddd2] bg-white p-4 sm:grid-cols-[132px_1fr]"
                >
                  <Link
                    href={`/products/${line.slug}`}
                    className="relative aspect-4/5 overflow-hidden rounded-lg bg-[#eee7dd] sm:h-40 sm:aspect-auto"
                  >
                    <Image
                      src={line.image}
                      alt={line.name}
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-col justify-between gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          href={`/products/${line.slug}`}
                          className="text-xl font-semibold hover:text-[#b9404f]"
                        >
                          {line.name}
                        </Link>
                        <p className="mt-1 text-sm text-[#7b7167]">
                          {line.size} / {line.color}
                        </p>
                        <p className="mt-2 font-semibold">{formatCurrency(line.price)}</p>
                      </div>
                      <button
                        className="focus-ring flex h-10 w-10 items-center justify-center rounded-lg border border-[#ded6ca] text-[#7b7167] transition hover:text-[#b9404f]"
                        type="button"
                        aria-label={`Remove ${line.name}`}
                        onClick={() => removeFromCart(line.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex h-11 w-36 items-center justify-between rounded-lg border border-[#ded6ca] bg-[#fbfaf8]">
                        <button
                          className="focus-ring flex h-11 w-11 items-center justify-center"
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(line.id, line.quantity - 1)}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-semibold">{line.quantity}</span>
                        <button
                          className="focus-ring flex h-11 w-11 items-center justify-center"
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(line.id, line.quantity + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <p className="text-lg font-semibold">
                        {formatCurrency(line.price * line.quantity)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-lg border border-[#e5ddd2] bg-white p-5">
              <h2 className="text-xl font-semibold">Order summary</h2>
              <div className="mt-5 rounded-lg border border-[#e0d8cc] bg-[#fbfaf8] p-3">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Gift size={17} className="text-[#b9404f]" />
                  Promo
                </div>
                <div className="mt-3 flex gap-2">
                  <input
                    value={promoInput}
                    onChange={(event) => setPromoInput(event.target.value)}
                    className="focus-ring min-w-0 flex-1 rounded-lg border border-[#ded6ca] bg-white px-3 text-sm outline-none"
                    placeholder="NOSKA15"
                  />
                  <button
                    className="focus-ring rounded-lg bg-[#151515] px-4 text-sm font-semibold text-white"
                    type="button"
                    onClick={applyPromo}
                  >
                    Apply
                  </button>
                </div>
                {promo && (
                  <p className="mt-2 text-sm font-semibold text-[#1f7a5a]">
                    {promo} applied
                  </p>
                )}
                {promoError && <p className="mt-2 text-sm text-[#b9404f]">{promoError}</p>}
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <SummaryLine label="Subtotal" value={formatCurrency(subtotal)} />
                <SummaryLine label="Discount" value={`-${formatCurrency(discount)}`} />
                <SummaryLine
                  label="Shipping"
                  value={shipping === 0 ? "Free" : formatCurrency(shipping)}
                />
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-[#e7e1d8] pt-5 text-lg font-semibold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <Link
                href="/checkout"
                className="mt-5 block rounded-lg bg-[#b9404f] px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Checkout
              </Link>
              <p className="mt-3 text-xs leading-5 text-[#7b7167]">
                Use NOSKA15 for a demo discount. Shipping becomes free from{" "}
                {formatCurrency(freeShippingThreshold)}.
              </p>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}

function SummaryLine({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#6f6a63]">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
