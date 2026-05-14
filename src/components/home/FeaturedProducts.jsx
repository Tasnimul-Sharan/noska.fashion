import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

const featuredProducts = products.slice(0, 6);

export function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Sparkles size={17} />
            Curated rack
          </p>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Featured dresses</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            A quick edit from the full Noska wardrobe. Explore the shop page for
            every dress, filter, and size.
          </p>
        </div>
        <Link
          href="/shop"
          className="focus-ring flex h-11 w-fit items-center gap-2 rounded-lg bg-secondary px-4 text-sm font-semibold text-white transition hover:bg-primary"
        >
          Shop all
          <ArrowRight size={17} />
        </Link>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
