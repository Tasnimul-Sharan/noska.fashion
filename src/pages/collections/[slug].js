import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { Seo } from "@/components/Seo";
import {
  formatCurrency,
  getCollectionBySlug,
  getCollectionGroups,
} from "@/data/products";
import {
  createBreadcrumbJsonLd,
  createCollectionJsonLd,
  createItemListJsonLd,
} from "@/lib/seo";

export default function CollectionDetailPage({ collection }) {
  return (
    <>
      <Seo
        title={`${collection.title} Collection`}
        description={`${collection.description} Shop ${collection.items.length} Noska styles from ${formatCurrency(
          collection.lowestPrice,
        )}.`}
        canonicalPath={`/collections/${collection.slug}`}
        image={collection.image}
        imageAlt={`${collection.title} collection`}
        jsonLd={[
          createCollectionJsonLd(collection),
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Collections", path: "/collections" },
            { name: collection.title, path: `/collections/${collection.slug}` },
          ]),
          createItemListJsonLd(
            collection.items,
            `${collection.title} Noska dresses`,
            `/collections/${collection.slug}`,
          ),
        ]}
      />

      <section className="relative overflow-hidden bg-[#171412] text-white">
        <Image
          src={collection.image}
          alt={collection.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_center] opacity-40"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,16,14,0.92),rgba(18,16,14,0.58),rgba(18,16,14,0.36))]" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#f2d7b0] transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to collections
          </Link>
          <p className="mt-10 text-sm font-semibold uppercase text-tertiary">Noska capsule</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
            {collection.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#eee4da] md:text-base">
            {collection.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3 text-sm">
            <span className="rounded-lg bg-white/12 px-3 py-2">
              {collection.items.length} style{collection.items.length > 1 ? "s" : ""}
            </span>
            <span className="rounded-lg bg-white/12 px-3 py-2">
              From {formatCurrency(collection.lowestPrice)}
            </span>
            {collection.categories.map((category) => (
              <span key={category} className="rounded-lg bg-white/12 px-3 py-2">
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#b9404f]">Collection rack</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
              {collection.title} dresses
            </h2>
          </div>
          <Link
            href={`/shop?collection=${encodeURIComponent(collection.title)}`}
            className="flex w-fit items-center gap-2 text-sm font-semibold text-[#151515]"
          >
            Filter in shop
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {collection.items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}

export function getStaticPaths() {
  return {
    paths: getCollectionGroups().map((collection) => ({
      params: { slug: collection.slug },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const collection = getCollectionBySlug(params.slug);

  return {
    props: {
      collection,
    },
  };
}
