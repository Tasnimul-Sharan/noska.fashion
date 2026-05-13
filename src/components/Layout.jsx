import {
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Trash2,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useShop } from "@/context/ShopContext";
import { formatCurrency } from "@/data/products";

const navLinks = [
  { href: "/#shop", label: "Shop" },
  { href: "/#collections", label: "Collections" },
  { href: "/#journal", label: "Lookbook" },
  { href: "/account", label: "Account" },
];

export function Layout({ children }) {
  const router = useRouter();
  const { itemCount, wishlist } = useShop();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const closePanels = () => {
      setMobileOpen(false);
      setCartOpen(false);
    };

    router.events.on("routeChangeStart", closePanels);
    router.events.on("hashChangeStart", closePanels);

    return () => {
      router.events.off("routeChangeStart", closePanels);
      router.events.off("hashChangeStart", closePanels);
    };
  }, [router.events]);

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/?q=${encodeURIComponent(trimmed)}#shop` : "/#shop");
  };

  return (
    <div className="min-h-screen bg-[#fbfaf8] text-[#151515]">
      <header className="sticky top-0 z-40 border-b border-[#e7e1d8] bg-[#fbfaf8]/92 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-w-fit items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-[#151515] text-white">
              <Sparkles size={20} strokeWidth={1.8} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-lg font-semibold">Aurelia</span>
              <span className="mt-1 text-xs font-medium text-[#7b7167]">
                Atelier
              </span>
            </span>
          </Link>

          <nav className="ml-8 hidden items-center gap-6 text-sm font-medium text-[#3b3834] lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-[#b9404f]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <form
            onSubmit={handleSearch}
            className="ml-auto hidden h-11 w-full max-w-sm items-center gap-2 rounded-[8px] border border-[#e0d8cc] bg-white px-3 md:flex"
          >
            <Search size={18} className="text-[#7b7167]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="focus-ring min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#9b9288]"
              placeholder="Search dresses"
              type="search"
            />
          </form>

          <div className="ml-auto flex items-center gap-2 md:ml-2">
            <Link
              href="/account"
              className="focus-ring hidden h-11 w-11 items-center justify-center rounded-[8px] border border-[#e0d8cc] bg-white transition hover:border-[#c9bcae] sm:flex"
              aria-label="Account"
            >
              <User size={19} />
            </Link>
            <Link
              href="/account?tab=wishlist"
              className="focus-ring relative hidden h-11 w-11 items-center justify-center rounded-[8px] border border-[#e0d8cc] bg-white transition hover:border-[#c9bcae] sm:flex"
              aria-label="Wishlist"
            >
              <Heart size={19} />
              {wishlist.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#b9404f] px-1 text-[11px] font-semibold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button
              className="focus-ring relative flex h-11 w-11 items-center justify-center rounded-[8px] bg-[#151515] text-white transition hover:bg-[#2a2927]"
              type="button"
              aria-label="Open cart"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={19} />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e6b84f] px-1 text-[11px] font-bold text-[#151515]">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-[8px] border border-[#e0d8cc] bg-white lg:hidden"
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-[#151515]/45 lg:hidden">
          <div className="ml-auto flex h-full w-full max-w-sm flex-col bg-[#fbfaf8] p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Menu</span>
              <button
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-[8px] border border-[#e0d8cc] bg-white"
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <X size={19} />
              </button>
            </div>
            <form
              onSubmit={handleSearch}
              className="mt-6 flex h-12 items-center gap-2 rounded-[8px] border border-[#e0d8cc] bg-white px-3"
            >
              <Search size={18} className="text-[#7b7167]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="focus-ring min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#9b9288]"
                placeholder="Search dresses"
                type="search"
              />
            </form>
            <nav className="mt-8 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-[8px] px-3 py-3 text-base font-medium transition hover:bg-white"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/account?tab=wishlist"
                className="rounded-[8px] px-3 py-3 text-base font-medium transition hover:bg-white"
              >
                Wishlist
              </Link>
              <Link
                href="/cart"
                className="rounded-[8px] px-3 py-3 text-base font-medium transition hover:bg-white"
              >
                Cart
              </Link>
            </nav>
          </div>
        </div>
      )}

      <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

function CartPanel({ open, onClose }) {
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
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-[8px] border border-[#e0d8cc] bg-white"
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
              className="mt-6 rounded-[8px] bg-[#151515] px-5 py-3 text-sm font-semibold text-white"
            >
              Shop dresses
            </Link>
          </div>
        ) : (
          <>
            <div className="no-scrollbar flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 rounded-[8px] border border-[#e0d8cc] bg-white p-3 text-sm text-[#514c45]">
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
                      className="relative h-28 overflow-hidden rounded-[8px] bg-[#eee7dd]"
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
                        <div className="flex h-9 items-center rounded-[8px] border border-[#ded6ca] bg-white">
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
                  className="rounded-[8px] border border-[#151515] px-4 py-3 text-center text-sm font-semibold"
                >
                  View bag
                </Link>
                <Link
                  href="/checkout"
                  className="rounded-[8px] bg-[#b9404f] px-4 py-3 text-center text-sm font-semibold text-white"
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

function SiteFooter() {
  return (
    <footer className="border-t border-[#e7e1d8] bg-[#151515] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-white text-[#151515]">
              <Sparkles size={19} />
            </span>
            <span className="text-xl font-semibold">Aurelia Atelier</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#c9c0b7]">
            Premium dresses, occasionwear, and everyday silhouettes crafted for a
            polished wardrobe.
          </p>
        </div>
        <FooterColumn title="Shop" links={["New arrivals", "Evening", "Festive", "Workwear"]} />
        <FooterColumn title="Service" links={["Shipping", "Returns", "Size guide", "Care"]} />
        <div>
          <h3 className="text-sm font-semibold">Newsletter</h3>
          <p className="mt-3 text-sm leading-6 text-[#c9c0b7]">
            Fresh drops, private edits, and early access.
          </p>
          <form
            className="mt-4 flex overflow-hidden rounded-[8px] border border-white/20 bg-white/8"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              className="focus-ring min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white placeholder:text-[#a9a098]"
              placeholder="Email address"
              type="email"
            />
            <button className="bg-white px-4 text-sm font-semibold text-[#151515]" type="submit">
              Join
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="mt-3 flex flex-col gap-2 text-sm text-[#c9c0b7]">
        {links.map((link) => (
          <Link key={link} href="/#shop" className="transition hover:text-white">
            {link}
          </Link>
        ))}
      </div>
    </div>
  );
}
