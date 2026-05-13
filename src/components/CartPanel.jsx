import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import { formatCurrency } from "@/data/products";

export function CartPanel({ open, onClose }) {
  const { cart, subtotal, updateQuantity, removeFromCart } = useShop();
  const remaining = Math.max(0, 12000 - subtotal);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#151515]/45" role="dialog" aria-modal="true">
      <div className="ml-auto flex h-full w-full max-w-md flex-col bg-[#fbfaf8] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#e7e1d8] p-5">
          <div>
            <p className="text-sm font-medium text-[#7b7167]">Shopping bag</p>
            <h2 className="mt-1 text-2xl font-semibold">Your edit</h2>
          </div>
          <button
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-lg border border-[#e0d8cc] bg-white"
            type="button"
            aria-label="Close cart"
            onClick={onClose}
          >
            <X size={19} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <ShoppingBag size={42} className="text-[#b9404f]" />
            <h3 className="mt-4 text-xl font-semibold">Your bag is empty</h3>
            <p className="mt-2 text-sm leading-6 text-[#6f6a63]">
              Add your favorite dresses and they will stay here.
            </p>
            <Link
              href="/#shop"
              className="mt-6 rounded-lg bg-[#151515] px-5 py-3 text-sm font-semibold text-white"
            >
              Shop dresses
            </Link>
          </div>
        ) : (
          <>
            <div className="no-scrollbar flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 rounded-lg border border-[#e0d8cc] bg-white p-3 text-sm text-[#514c45]">
                {remaining === 0
                  ? "Free shipping unlocked."
                  : `${formatCurrency(remaining)} away from free shipping.`}
              </div>
              <div className="space-y-4">
                {cart.map((line) => (
                  <div
                    key={line.id}
                    className="grid grid-cols-[84px_1fr] gap-4 border-b border-[#e7e1d8] pb-4"
                  >
                    <Link
                      href={`/products/${line.slug}`}
                      className="relative h-28 overflow-hidden rounded-lg bg-[#eee7dd]"
                    >
                      <Image
                        src={line.image}
                        alt={line.name}
                        fill
                        sizes="84px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link
                            href={`/products/${line.slug}`}
                            className="font-semibold hover:text-[#b9404f]"
                          >
                            {line.name}
                          </Link>
                          <p className="mt-1 text-xs text-[#7b7167]">
                            {line.size} / {line.color}
                          </p>
                        </div>
                        <button
                          className="focus-ring text-[#7b7167] transition hover:text-[#b9404f]"
                          type="button"
                          aria-label={`Remove ${line.name}`}
                          onClick={() => removeFromCart(line.id)}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex h-9 items-center rounded-lg border border-[#ded6ca] bg-white">
                          <button
                            className="focus-ring flex h-9 w-9 items-center justify-center"
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => updateQuantity(line.id, line.quantity - 1)}
                          >
                            <Minus size={15} />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">
                            {line.quantity}
                          </span>
                          <button
                            className="focus-ring flex h-9 w-9 items-center justify-center"
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => updateQuantity(line.id, line.quantity + 1)}
                          >
                            <Plus size={15} />
                          </button>
                        </div>
                        <span className="font-semibold">
                          {formatCurrency(line.price * line.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#e7e1d8] p-5">
              <div className="mb-4 flex items-center justify-between text-base font-semibold">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/cart"
                  className="rounded-lg border border-[#151515] px-4 py-3 text-center text-sm font-semibold"
                >
                  View bag
                </Link>
                <Link
                  href="/checkout"
                  className="rounded-lg bg-[#b9404f] px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
