import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function SiteFooter({ minimal = false }) {
  if (minimal) {
    return (
      <footer className="bg-white text-[#151515]">
        <div className="flex min-h-[46vh] flex-col justify-between px-4 pb-7 pt-20 text-[10px] uppercase tracking-[0.12em] sm:px-6 lg:px-8">
          <div className="mx-auto mt-auto text-center">
            <p className="font-serif text-3xl normal-case tracking-normal sm:text-4xl">
              The New
            </p>
            <Link
              href="/shop"
              className="mt-3 inline-block border-b border-[#151515] pb-1 text-[10px] font-semibold"
            >
              Shop now
            </Link>
          </div>

          <div className="mt-auto flex flex-col gap-4 text-[#5f5a54] sm:flex-row sm:items-end sm:justify-between">
            <nav className="flex flex-wrap gap-x-4 gap-y-2">
              <Link href="/shop">Shop</Link>
              <Link href="/collections">Collections</Link>
              <Link href="/journal">Journal</Link>
              <Link href="/returns">Returns</Link>
              <Link href="/account">Account</Link>
            </nav>
            <div className="flex flex-wrap gap-x-4 gap-y-2 sm:justify-end">
              <a href="mailto:support@noska.fashion">Support</a>
              <a href="tel:01323030644">01323030644</a>
              <span>Bangladesh</span>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <motion.footer
      className="border-t border-border_color bg-secondary text-white"
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-white p-2 text-secondary">
                <Image
                  src="/noska-png-logo.png"
                  alt="Noska"
                  width={5000}
                  height={5000}
                  className="h-full w-full object-contain"
                />
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
          </motion.div>

          <motion.form
            variants={fadeUp}
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
          </motion.form>
        </motion.div>

        <motion.div
          className="grid gap-10 py-10 md:grid-cols-[1.1fr_1fr_1fr_1fr]"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp}>
            <p className="text-sm font-semibold text-tertiary">Visit studio</p>
            <div className="mt-4 flex gap-3 text-sm leading-6 text-[#c9c0b7]">
              <MapPin size={18} className="mt-1 shrink-0 text-white" />
              <span>
                Printers Building, 11th floor
                <br />
                5, Rajuk Avenue, Motijheel
                <br />
                1000 Dhaka
              </span>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-6 text-[#c9c0b7]">
              <a
                href="mailto:support@noska.fashion"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Mail size={17} className="shrink-0 text-white" />
                <span>support@noska.fashion</span>
              </a>
              <a
                href="tel:01323030644"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Phone size={17} className="shrink-0 text-white" />
                <span>01323030644</span>
              </a>
            </div>
          </motion.div>

          <FooterColumn
            title="Shop"
            links={[
              { label: "All dresses", href: "/shop" },
              { label: "Collections", href: "/collections" },
              { label: "Journal", href: "/journal" },
              { label: "Evening", href: "/shop?category=Evening" },
            ]}
          />
          <FooterColumn
            title="Service"
            links={[
              { label: "Cart", href: "/cart" },
              { label: "Checkout", href: "/checkout" },
              { label: "Account", href: "/account" },
              { label: "Login / Register", href: "/login" },
              { label: "Wishlist", href: "/wishlist" },
              { label: "Returns", href: "/returns" },
            ]}
          />

          <motion.div variants={fadeUp}>
            <h3 className="text-sm font-semibold">Care promise</h3>
            <div className="mt-3 space-y-2 text-sm text-[#c9c0b7]">
              <p>Fast delivery</p>
              <p>7-day fit support</p>
              <p>Premium finishing</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#a9a098] sm:flex-row sm:items-center sm:justify-between"
          variants={fadeUp}
        >
          <div className="flex items-center gap-3">
            <span>(c) 2026 Noska</span>
            <span>Premium fashion ecommerce</span>
          </div>
          <span>Built for polished shopping moments.</span>
        </motion.div>
      </div>
    </motion.footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <motion.div variants={fadeUp}>
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="mt-3 flex flex-col gap-2 text-sm text-[#c9c0b7]">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="transition hover:text-white">
            {link.label}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
