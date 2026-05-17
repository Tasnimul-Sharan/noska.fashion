import {
  Heart,
  Menu,
  Moon,
  Search,
  ShoppingBag,
  Sparkles,
  Sun,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useShop } from "@/context/ShopContext";
import { easeOut, fadeIn, panelSlide } from "@/lib/motion";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/journal", label: "Journal" },
  { href: "/account", label: "Account" },
  { href: "/login", label: "Login" },
];

export function Navbar({
  handleSearch,
  itemCount,
  mobileOpen,
  onCartOpen,
  onMobileClose,
  onMobileOpen,
  query,
  setQuery,
  wishlistCount,
}) {
  const router = useRouter();
  const { theme, toggleTheme } = useShop();
  const ThemeIcon = theme === "dark" ? Sun : Moon;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeOut }}
        className="sticky top-0 z-40 border-b border-border_color bg-off_white/94 backdrop-blur-xl"
      >
        <div className="hidden border-b border-secondary/10 bg-secondary text-white sm:block">
          <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6 text-xs font-semibold lg:px-8">
            <span className="text-[#d8d0c8]">Premium dresswear made for modern occasions</span>
            <span className="text-tertiary">Free delivery from BDT 12,000</span>
          </div>
        </div>
        <div className="mx-auto flex h-20 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-w-fit items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-white shadow-[0_14px_34px_rgba(21,21,21,0.18)] ring-1 ring-white/70">
              <Sparkles size={20} strokeWidth={1.8} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-xl font-semibold">Noska</span>
              <span className="mt-1 text-xs font-medium text-muted_light">
                Premium Wear
              </span>
            </span>
          </Link>

          <nav className="ml-8 hidden items-center gap-6 text-sm font-medium text-[#3b3834] lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 transition hover:text-primary ${
                  isActiveLink(router.asPath, link.href) ? "text-primary" : ""
                }`}
              >
                {link.label}
                {isActiveLink(router.asPath, link.href) && (
                  <motion.span
                    layoutId="desktop-nav-active"
                    className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-primary"
                    transition={{ duration: 0.28, ease: easeOut }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <SearchForm
            className="ml-auto hidden h-11 w-full max-w-sm items-center gap-2 rounded-lg border border-border_color bg-white px-3 shadow-sm md:flex"
            handleSearch={handleSearch}
            query={query}
            setQuery={setQuery}
          />

          <div className="ml-auto flex items-center gap-2 md:ml-2">
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="focus-ring hidden h-11 w-11 items-center justify-center rounded-lg border border-border_color bg-white shadow-sm transition hover:border-primary/40 hover:text-primary sm:flex dark:bg-[#24201d] dark:text-[#f8f2ea]"
              type="button"
              aria-label="Toggle theme"
              onClick={toggleTheme}
            >
              <ThemeIcon size={19} />
            </motion.button>
            <Link
              href="/account"
              className="focus-ring hidden h-11 w-11 items-center justify-center rounded-lg border border-border_color bg-white shadow-sm transition hover:border-primary/40 hover:text-primary sm:flex"
              aria-label="Account"
            >
              <User size={19} />
            </Link>
            <Link
              href="/wishlist"
              className="focus-ring relative hidden h-11 w-11 items-center justify-center rounded-lg border border-border_color bg-white shadow-sm transition hover:border-primary/40 hover:text-primary sm:flex"
              aria-label="Wishlist"
            >
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="focus-ring relative flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-white shadow-[0_12px_30px_rgba(21,21,21,0.16)] transition hover:bg-primary"
              type="button"
              aria-label="Open cart"
              onClick={onCartOpen}
            >
              <ShoppingBag size={19} />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-tertiary px-1 text-[11px] font-bold text-secondary">
                  {itemCount}
                </span>
              )}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-lg border border-border_color bg-white shadow-sm lg:hidden"
              type="button"
              aria-label="Open menu"
              onClick={onMobileOpen}
            >
              <Menu size={20} />
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-secondary/45 lg:hidden"
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={fadeIn}
        >
          <motion.div
            className="ml-auto flex h-full w-full max-w-sm flex-col bg-off_white p-5 shadow-2xl"
            variants={panelSlide}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Noska menu</span>
              <motion.button
                whileTap={{ scale: 0.96 }}
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-lg border border-border_color bg-white"
                type="button"
                aria-label="Close menu"
                onClick={onMobileClose}
              >
                <X size={19} />
              </motion.button>
            </div>
            <SearchForm
              className="mt-6 flex h-12 items-center gap-2 rounded-lg border border-[#e0d8cc] bg-white px-3"
              handleSearch={handleSearch}
              query={query}
              setQuery={setQuery}
            />
            <nav className="mt-8 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-lg px-3 py-3 text-base font-medium transition hover:bg-white ${
                    isActiveLink(router.asPath, link.href) ? "bg-white text-primary" : ""
                  }`}
                >
                  {link.label}
                  {isActiveLink(router.asPath, link.href) && (
                    <motion.span
                      layoutId="mobile-nav-active"
                      className="absolute inset-y-2 left-0 w-1 rounded-full bg-primary"
                      transition={{ duration: 0.28, ease: easeOut }}
                    />
                  )}
                </Link>
              ))}
              <Link
                href="/wishlist"
                className="rounded-lg px-3 py-3 text-base font-medium transition hover:bg-white"
              >
                Wishlist
              </Link>
              <button
                className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition hover:bg-white"
                type="button"
                onClick={toggleTheme}
              >
                Theme
                <ThemeIcon size={18} />
              </button>
              <Link
                href="/cart"
                className="rounded-lg px-3 py-3 text-base font-medium transition hover:bg-white"
              >
                Cart
              </Link>
            </nav>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SearchForm({ className, handleSearch, query, setQuery }) {
  return (
    <motion.form
      onSubmit={handleSearch}
      className={className}
      whileFocus={{ scale: 1.01 }}
      transition={{ duration: 0.2, ease: easeOut }}
    >
      <Search size={18} className="text-muted_light" />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="focus-ring min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted_light"
        placeholder="Search the edit"
        type="search"
      />
    </motion.form>
  );
}

function isActiveLink(currentPath, href) {
  return currentPath === href || currentPath.startsWith(`${href}?`);
}
