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

const navLinks = [
  { href: "/#shop", label: "Shop" },
  { href: "/#collections", label: "Collections" },
  { href: "/#journal", label: "Lookbook" },
  { href: "/account", label: "Account" },
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
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border_color bg-off_white/92 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-w-fit items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-white">
              <Sparkles size={20} strokeWidth={1.8} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-lg font-semibold">Noska</span>
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
                className="transition hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <SearchForm
            className="ml-auto hidden h-11 w-full max-w-sm items-center gap-2 rounded-lg border border-[#e0d8cc] bg-white px-3 md:flex"
            handleSearch={handleSearch}
            query={query}
            setQuery={setQuery}
          />

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
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              className="focus-ring relative flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-white transition hover:bg-secondary_soft"
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
            </button>
            <button
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-lg border border-[#e0d8cc] bg-white lg:hidden"
              type="button"
              aria-label="Open menu"
              onClick={onMobileOpen}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-secondary/45 lg:hidden">
          <div className="ml-auto flex h-full w-full max-w-sm flex-col bg-off_white p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Menu</span>
              <button
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-lg border border-[#e0d8cc] bg-white"
                type="button"
                aria-label="Close menu"
                onClick={onMobileClose}
              >
                <X size={19} />
              </button>
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
    </>
  );
}

function SearchForm({ className, handleSearch, query, setQuery }) {
  return (
    <form onSubmit={handleSearch} className={className}>
      <Search size={18} className="text-muted_light" />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="focus-ring min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted_light"
        placeholder="Search dresses"
        type="search"
      />
    </form>
  );
}
