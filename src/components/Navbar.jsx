import { Menu, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { accessories } from "@/data/accessories";
import {
  formatCurrency,
  getCollectionGroups,
  products,
} from "@/data/products";
import { easeOut, fadeIn, fadeUp, panelSlide, staggerContainer } from "@/lib/motion";

const departments = ["WOMAN", "MAN", "ACCESSORIES"];

export function Navbar({
  itemCount,
  mobileOpen,
  onCartOpen,
  onMobileClose,
  onMobileOpen,
}) {
  const [activeDepartment, setActiveDepartment] = useState("WOMAN");
  const collections = useMemo(() => getCollectionGroups(), []);
  const featuredProducts = products.slice(0, 10);

  return (
    <>
      <motion.header
        className="light-readable fixed inset-x-0 top-0 z-40 border-b border-[#ded6ca] bg-[#fbfaf8]/94 text-[#151515] backdrop-blur-md"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, ease: easeOut }}
      >
        <div className="grid h-20 grid-cols-[1fr_auto_1fr] items-center px-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#151515] sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <button
              className="focus-ring inline-flex items-center gap-2"
              type="button"
              onClick={onMobileOpen}
            >
              <Menu size={18} />
              Menu
            </button>
          </div>

          <Link
            href="/"
            className="flex items-center justify-center"
            onClick={onMobileClose}
            aria-label="Noska home"
          >
            <Image
              src="/noska-png-logo.png"
              alt="Noska"
              width={5000}
              height={5000}
              priority
              className="h-14 w-14 object-cover sm:h-16 sm:w-16"
            />
          </Link>

          <nav className="flex items-center justify-end gap-4 sm:gap-6">
            <Link href="/login" className="hidden sm:inline">
              Login
            </Link>
            <Link href="/returns" className="hidden sm:inline">
              Help
            </Link>
            <button
              className="focus-ring inline-flex items-center gap-2 uppercase"
              type="button"
              onClick={onCartOpen}
            >
              <span>Cart</span>
              <ShoppingBag size={16} />
              {itemCount > 0 && <span>({itemCount})</span>}
            </button>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="light-readable fixed inset-0 z-50 bg-[#fbfaf8] text-[#151515]"
            data-lenis-prevent=""
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={fadeIn}
          >
            <motion.div
              className="grid h-dvh min-h-0 grid-rows-[80px_1fr]"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={panelSlide}
            >
              <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-[#ded6ca] px-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#151515] sm:px-6 lg:px-8">
                <button
                  className="focus-ring inline-flex w-fit items-center gap-2"
                  type="button"
                  onClick={onMobileClose}
                >
                  <X size={18} />
                  Close
                </button>
                <Link
                  href="/"
                  className="flex items-center justify-center"
                  onClick={onMobileClose}
                  aria-label="Noska home"
                >
                  <Image
                    src="/noska-png-logo.png"
                    alt="Noska"
                    width={5000}
                    height={5000}
                    priority
                    className="h-14 w-14 object-cover sm:h-16 sm:w-16"
                  />
                </Link>
                <div className="flex justify-end gap-4">
                  <Link href="/login" onClick={onMobileClose}>
                    Login
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      onMobileClose();
                      onCartOpen();
                    }}
                  >
                    Cart {itemCount > 0 ? `(${itemCount})` : ""}
                  </button>
                </div>
              </div>

              <div className="cart-scroll min-h-0 overflow-y-auto px-4 py-8 text-[#151515] sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
                  <aside>
                    <div className="grid gap-3 text-4xl font-semibold uppercase leading-none sm:text-6xl">
                      {departments.map((department) => (
                        <button
                          key={department}
                          className={`text-left transition ${
                            activeDepartment === department
                              ? "text-[#151515]"
                              : "readable-soft text-[#6f6a63] hover:text-[#151515]"
                          }`}
                          type="button"
                          onClick={() => setActiveDepartment(department)}
                        >
                          {department}
                        </button>
                      ))}
                    </div>
                    <div className="readable-muted mt-10 grid gap-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#514c45]">
                      <Link href="/shop" onClick={onMobileClose}>
                        Search
                      </Link>
                      <Link href="/wishlist" onClick={onMobileClose}>
                        Wishlist
                      </Link>
                      <Link href="/returns" onClick={onMobileClose}>
                        Help
                      </Link>
                    </div>
                  </aside>

                  <AnimatePresence mode="wait">
                    {activeDepartment === "WOMAN" && (
                      <WomanMenu
                        collections={collections}
                        products={featuredProducts}
                        onClose={onMobileClose}
                      />
                    )}
                    {activeDepartment === "MAN" && <ManMenu />}
                    {activeDepartment === "ACCESSORIES" && (
                      <AccessoriesMenu onClose={onMobileClose} />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function WomanMenu({ collections, products: featuredProducts, onClose }) {
  return (
    <motion.div
      key="woman"
      className="grid gap-10 xl:grid-cols-[0.75fr_1.25fr]"
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={staggerContainer}
    >
      <motion.div variants={fadeUp}>
        <p className="readable-muted text-[12px] font-semibold uppercase tracking-[0.14em] text-[#514c45]">
          Woman / Dresses
        </p>
        <div className="mt-6 grid gap-2 text-sm font-bold uppercase tracking-[0.12em] text-[#151515]">
          <Link href="/shop" onClick={onClose}>
            View all dresses
          </Link>
          <Link href="/shop?category=Festive" onClick={onClose}>
            Festive
          </Link>
          <Link href="/shop?category=Evening" onClick={onClose}>
            Evening
          </Link>
          <Link href="/shop?category=Workwear" onClick={onClose}>
            Workwear
          </Link>
          <Link href="/collections" onClick={onClose}>
            All collections
          </Link>
        </div>

        <div className="mt-10">
          <p className="readable-muted text-[12px] font-semibold uppercase tracking-[0.14em] text-[#514c45]">
            Collections
          </p>
          <div className="readable-muted mt-4 grid gap-2 text-sm font-medium text-[#514c45]">
            {collections.map((collection) => (
              <Link
                key={collection.slug}
                href={`/collections/${collection.slug}`}
                className="grid grid-cols-[1fr_auto] gap-4 border-b border-[#e7e1d8] py-2"
                onClick={onClose}
              >
                <span>{collection.title}</span>
                <span>{collection.items.length}</span>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" variants={staggerContainer}>
        {featuredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group"
            onClick={onClose}
          >
            <motion.article variants={fadeUp}>
              <div className="relative aspect-[3/4] overflow-hidden bg-[#eee7dd]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1280px) 20vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-3 text-[12px] uppercase tracking-[0.12em] text-[#151515]">
                <p className="font-semibold text-[#151515]">{product.name}</p>
                <p className="readable-muted mt-1 text-[#514c45]">
                  {product.collection} / {formatCurrency(product.price)}
                </p>
              </div>
            </motion.article>
          </Link>
        ))}
      </motion.div>
    </motion.div>
  );
}

function ManMenu() {
  return (
    <motion.div
      key="man"
      className="flex min-h-[55vh] flex-col justify-center"
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={staggerContainer}
    >
      <motion.p
        className="readable-muted text-[12px] font-semibold uppercase tracking-[0.14em] text-[#514c45]"
        variants={fadeUp}
      >
        Man
      </motion.p>
      <motion.h2
        className="mt-4 max-w-2xl text-5xl font-semibold uppercase leading-none sm:text-7xl"
        variants={fadeUp}
      >
        Coming soon
      </motion.h2>
      <motion.p className="readable-soft mt-5 max-w-xl text-sm leading-6 text-[#6f6a63]" variants={fadeUp}>
        Menswear will arrive as a restrained capsule with tailored essentials and
        occasion pieces.
      </motion.p>
    </motion.div>
  );
}

function AccessoriesMenu({ onClose }) {
  return (
    <motion.div
      key="accessories"
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={staggerContainer}
    >
      <motion.div variants={fadeUp}>
        <p className="readable-muted text-[12px] font-semibold uppercase tracking-[0.14em] text-[#514c45]">
          Accessories
        </p>
        <h2 className="mt-4 max-w-2xl text-5xl font-semibold uppercase leading-none sm:text-7xl">
          Finishing pieces
        </h2>
      </motion.div>
      <motion.div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3" variants={staggerContainer}>
        {accessories.map((item) => (
          <Link key={item.id} href="/shop" className="group" onClick={onClose}>
            <motion.article variants={fadeUp}>
              <div className="relative aspect-[4/5] overflow-hidden bg-[#eee7dd]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(min-width: 1280px) 20vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-3 text-[12px] uppercase tracking-[0.12em] text-[#151515]">
                <p className="font-semibold text-[#151515]">{item.name}</p>
                <p className="readable-muted mt-1 text-[#514c45]">
                  {item.category} / {formatCurrency(item.price)}
                </p>
              </div>
            </motion.article>
          </Link>
        ))}
      </motion.div>
    </motion.div>
  );
}
