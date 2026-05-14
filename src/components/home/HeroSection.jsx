import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency, heroProduct } from "@/data/products";

export function HeroSection() {
  return (
    <section className="relative min-h-[500px] overflow-hidden bg-[#151515] text-white sm:min-h-[560px] lg:min-h-[610px]">
      <Image
        src={heroProduct.image}
        alt={heroProduct.name}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[65%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,12,13,0.86),rgba(12,12,13,0.42),rgba(12,12,13,0.18))]" />
      <div className="relative mx-auto flex min-h-[500px] max-w-7xl items-end px-4 pb-12 pt-20 sm:min-h-[560px] sm:px-6 lg:min-h-[610px] lg:px-8">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-sm font-semibold text-[#f0c76a]">
            <Sparkles size={17} />
            Noska Eid Edit is live
          </p>
          <h1 className="mt-4 max-w-2xl text-5xl font-semibold leading-[1.04] sm:text-6xl lg:text-7xl">
            Noska
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#f0ece5] sm:text-lg">
            Premium dresses for festive evenings, work days, destination plans,
            and wedding moments.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="focus-ring flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-[#151515]"
            >
              Shop collection
              <ArrowRight size={17} />
            </Link>
            <Link
              href={`/products/${heroProduct.slug}`}
              className="focus-ring flex h-12 items-center justify-center rounded-lg border border-white/60 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View featured dress
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-[#f4eee6]">
            <span>{formatCurrency(heroProduct.price)}</span>
            <span>{heroProduct.material}</span>
            <span>{heroProduct.fit}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
