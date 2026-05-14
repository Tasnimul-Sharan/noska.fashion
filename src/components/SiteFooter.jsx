import { ArrowRight, Mail, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border_color bg-secondary text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-secondary">
                <Sparkles size={21} />
              </span>
              <span>
                <span className="block text-2xl font-semibold">Noska</span>
                <span className="mt-1 block text-xs font-semibold uppercase text-tertiary">
                  Premium Wear
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-6 text-[#c9c0b7]">
              Premium dresses, occasionwear, and everyday silhouettes crafted for a
              polished wardrobe.
            </p>
          </div>
          <form
            className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/8 p-3 sm:flex-row"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg bg-white/8 px-3">
              <Mail size={17} className="text-tertiary" />
              <input
                className="focus-ring h-12 min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-[#a9a098]"
                placeholder="Email address"
                type="email"
              />
            </div>
            <button
              className="focus-ring flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-secondary"
              type="submit"
            >
              Join
              <ArrowRight size={16} />
            </button>
          </form>
        </div>

        <div className="grid gap-10 py-10 md:grid-cols-[1.1fr_1fr_1fr_1fr]">
          <div>
            <p className="text-sm font-semibold text-tertiary">Visit studio</p>
            <div className="mt-4 flex gap-3 text-sm leading-6 text-[#c9c0b7]">
              <MapPin size={18} className="mt-1 shrink-0 text-white" />
              <span>
                Banani, Dhaka
                <br />
                Online orders open every day
              </span>
            </div>
          </div>
          <FooterColumn
            title="Shop"
            links={[
              { label: "All dresses", href: "/shop" },
              { label: "Collections", href: "/collections" },
              { label: "Evening", href: "/shop?category=Evening" },
              { label: "Festive", href: "/shop?category=Festive" },
            ]}
          />
          <FooterColumn
            title="Service"
            links={[
              { label: "Cart", href: "/cart" },
              { label: "Checkout", href: "/checkout" },
              { label: "Account", href: "/account" },
              { label: "Wishlist", href: "/account?tab=wishlist" },
            ]}
          />
          <div>
            <h3 className="text-sm font-semibold">Care promise</h3>
            <div className="mt-3 space-y-2 text-sm text-[#c9c0b7]">
              <p>Fast delivery</p>
              <p>7-day fit support</p>
              <p>Premium finishing</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#a9a098] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span>© 2026 Noska</span>
            <span>Premium fashion ecommerce</span>
          </div>
          <span>Built for polished shopping moments.</span>
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
          <Link key={link.href} href={link.href} className="transition hover:text-white">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
