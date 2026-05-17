import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useShop } from "@/context/ShopContext";
import { formatCurrency, getProductBySlug } from "@/data/products";
import { fadeIn, fadeUp, panelSlide, staggerContainer } from "@/lib/motion";

export function CartPanel({ open, onClose }) {
  const { cart, subtotal, updateQuantity, updateCartItemOptions, removeFromCart } =
    useShop();
  const remaining = Math.max(0, 12000 - subtotal);

  useEffect(() => {
    if (!open) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-[#151515]/45"
          role="dialog"
          aria-modal="true"
          data-lenis-prevent=""
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={fadeIn}
        >
          <motion.div
            className="ml-auto flex h-dvh min-h-0 w-full max-w-md flex-col bg-[#fbfaf8] shadow-2xl"
            onWheel={(event) => event.stopPropagation()}
            onTouchMove={(event) => event.stopPropagation()}
            data-lenis-prevent=""
            initial="hidden"
            animate="show"
            exit="exit"
            variants={panelSlide}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-[#e7e1d8] p-5">
              <div>
                <p className="text-sm font-medium text-[#7b7167]">Shopping bag</p>
                <h2 className="mt-1 text-2xl font-semibold">Your edit</h2>
              </div>
              <motion.button
                whileTap={{ scale: 0.96 }}
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-lg border border-[#e0d8cc] bg-white"
                type="button"
                aria-label="Close cart"
                onClick={onClose}
              >
                <X size={19} />
              </motion.button>
            </div>

            {cart.length === 0 ? (
              <motion.div
                className="flex flex-1 flex-col items-center justify-center px-8 text-center"
                variants={fadeUp}
              >
                <ShoppingBag size={42} className="text-[#b9404f]" />
                <h3 className="mt-4 text-xl font-semibold">Your bag is empty</h3>
                <p className="mt-2 text-sm leading-6 text-[#6f6a63]">
                  Add your favorite dresses and they will stay here.
                </p>
                <Link
                  href="/shop"
                  className="mt-6 rounded-lg bg-[#151515] px-5 py-3 text-sm font-semibold text-white"
                >
                  Shop dresses
                </Link>
              </motion.div>
            ) : (
              <>
                <motion.div
                  className="cart-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4"
                  onWheel={(event) => event.stopPropagation()}
                  onTouchMove={(event) => event.stopPropagation()}
                  data-lenis-prevent=""
                  data-lenis-prevent-wheel=""
                  data-lenis-prevent-touch=""
                  variants={staggerContainer}
                >
                  <motion.div
                    className="mb-4 rounded-lg border border-[#e0d8cc] bg-white p-3 text-sm text-[#514c45]"
                    variants={fadeUp}
                  >
                    {remaining === 0
                      ? "Free shipping unlocked."
                      : `${formatCurrency(remaining)} away from free shipping.`}
                  </motion.div>
                  <div className="space-y-4">
                    {cart.map((line) => (
                      <CartPanelLine
                        key={line.id}
                        line={line}
                        removeFromCart={removeFromCart}
                        updateCartItemOptions={updateCartItemOptions}
                        updateQuantity={updateQuantity}
                      />
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className="shrink-0 border-t border-[#e7e1d8] p-5"
                  variants={fadeUp}
                >
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
                </motion.div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CartPanelLine({
  line,
  removeFromCart,
  updateCartItemOptions,
  updateQuantity,
}) {
  const product = getProductBySlug(line.slug);

  return (
    <motion.div
      className="grid grid-cols-[84px_1fr] gap-4 border-b border-[#e7e1d8] pb-4"
      variants={fadeUp}
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

        {product && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            <select
              value={line.size}
              onChange={(event) =>
                updateCartItemOptions(line.id, { size: event.target.value })
              }
              className="focus-ring h-9 rounded-lg border border-[#ded6ca] bg-white px-2 text-xs font-semibold"
              aria-label={`Change ${line.name} size`}
            >
              {product.sizes.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={line.color}
              onChange={(event) =>
                updateCartItemOptions(line.id, { color: event.target.value })
              }
              className="focus-ring h-9 rounded-lg border border-[#ded6ca] bg-white px-2 text-xs font-semibold"
              aria-label={`Change ${line.name} color`}
            >
              {product.colors.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex h-9 items-center rounded-lg border border-[#ded6ca] bg-white">
            <motion.button
              whileTap={{ scale: 0.94 }}
              className="focus-ring flex h-9 w-9 items-center justify-center"
              type="button"
              aria-label="Decrease quantity"
              onClick={() => updateQuantity(line.id, line.quantity - 1)}
            >
              <Minus size={15} />
            </motion.button>
            <span className="w-8 text-center text-sm font-semibold">
              {line.quantity}
            </span>
            <motion.button
              whileTap={{ scale: 0.94 }}
              className="focus-ring flex h-9 w-9 items-center justify-center"
              type="button"
              aria-label="Increase quantity"
              onClick={() => updateQuantity(line.id, line.quantity + 1)}
            >
              <Plus size={15} />
            </motion.button>
          </div>
          <span className="font-semibold">
            {formatCurrency(line.price * line.quantity)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
