import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

const highlights = [
  "Structured fits",
  "Soft evening shine",
  "Festive embroidery",
  "Easy resort layers",
];

export function Lookbook() {
  return (
    <section id="journal" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-[#b9404f]">Lookbook</p>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Styled for the full day</h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-[#6f6a63]">
            Build a wardrobe from polished work mornings to candlelit dinners,
            with pieces that move across plans.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-[#514c45] sm:grid-cols-2">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-[#1f7a5a]" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[products[2], products[6]].map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group overflow-hidden rounded-lg border border-[#e5ddd2] bg-white"
            >
              <div className="relative aspect-4/5 overflow-hidden bg-[#eee7dd]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-[#7b7167]">{product.collection}</p>
                <h3 className="mt-1 text-lg font-semibold">{product.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
