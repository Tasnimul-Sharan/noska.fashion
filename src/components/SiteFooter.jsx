import { Sparkles } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#e7e1d8] bg-[#151515] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#151515]">
              <Sparkles size={19} />
            </span>
            <span className="text-xl font-semibold">Noska</span>
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
            className="mt-4 flex overflow-hidden rounded-lg border border-white/20 bg-white/8"
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
