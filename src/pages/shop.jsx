import { Seo } from "@/components/Seo";
import { ShopCatalog } from "@/components/home/ShopCatalog";
import { products } from "@/data/products";
import { createBreadcrumbJsonLd, createItemListJsonLd } from "@/lib/seo";

export default function ShopPage() {
  return (
    <>
      <Seo
        title="Shop Premium Dresses"
        description="Browse every Noska dress with filters for collection, size, color, and category. Shop festive, workwear, resort, bridal, casual, and evening styles."
        canonicalPath="/shop"
        image={products[0].image}
        imageAlt="Noska shop all dresses"
        jsonLd={[
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
          ]),
          createItemListJsonLd(products, "All Noska dresses", "/shop"),
        ]}
      />

      <section className="border-b border-border_color bg-secondary text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase text-tertiary">The full rack</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
            Shop all Noska dresses
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#d8d0c8] md:text-base">
            Browse every silhouette, filter by mood and fit, and add your favorite
            pieces straight to cart.
          </p>
        </div>
      </section>

      <ShopCatalog title="All dresses" eyebrow="Shop" />
    </>
  );
}
