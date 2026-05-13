import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CartPanel } from "@/components/CartPanel";
import { SiteFooter } from "@/components/SiteFooter";
import { useShop } from "@/context/ShopContext";

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
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#151515] text-white">
              <Sparkles size={20} strokeWidth={1.8} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-lg font-semibold">Noska</span>
              <span className="mt-1 text-xs font-medium text-[#7b7167]">
                Premium Wear
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
            className="ml-auto hidden h-11 w-full max-w-sm items-center gap-2 rounded-lg border border-[#e0d8cc] bg-white px-3 md:flex"
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
              className="focus-ring hidden h-11 w-11 items-center justify-center rounded-lg border border-[#e0d8cc] bg-white transition hover:border-[#c9bcae] sm:flex"
              aria-label="Account"
            >
              <User size={19} />
            </Link>
            <Link
              href="/account?tab=wishlist"
              className="focus-ring relative hidden h-11 w-11 items-center justify-center rounded-lg border border-[#e0d8cc] bg-white transition hover:border-[#c9bcae] sm:flex"
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
              className="focus-ring relative flex h-11 w-11 items-center justify-center rounded-lg bg-[#151515] text-white transition hover:bg-[#2a2927]"
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
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-lg border border-[#e0d8cc] bg-white lg:hidden"
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
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-lg border border-[#e0d8cc] bg-white"
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <X size={19} />
              </button>
            </div>
            <form
              onSubmit={handleSearch}
              className="mt-6 flex h-12 items-center gap-2 rounded-lg border border-[#e0d8cc] bg-white px-3"
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
                  className="rounded-lg px-3 py-3 text-base font-medium transition hover:bg-white"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/account?tab=wishlist"
                className="rounded-lg px-3 py-3 text-base font-medium transition hover:bg-white"
              >
                Wishlist
              </Link>
              <Link
                href="/cart"
                className="rounded-lg px-3 py-3 text-base font-medium transition hover:bg-white"
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
