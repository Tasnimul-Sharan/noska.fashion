import { Seo } from "@/components/Seo";
import { EditorialHome } from "@/components/home/EditorialHome";
import {
  createBreadcrumbJsonLd,
  createItemListJsonLd,
  createOrganizationJsonLd,
  createWebsiteJsonLd,
} from "@/lib/seo";
import {
  CATALOG_REVALIDATE_SECONDS,
  getCatalogProducts,
} from "@/lib/server/catalog";

export default function Home({ products }) {
  const heroProduct = products[0];

  return (
    <>
      <Seo
        title="Noska | Premium Dresses & Occasionwear in Bangladesh"
        description="Shop Noska premium dresses, Eid edits, polished workwear, resort silhouettes, evening gowns, and bridal occasionwear for a refined wardrobe."
        canonicalPath="/"
        image={heroProduct.image}
        imageAlt="Noska premium dress collection"
        jsonLd={[
          createOrganizationJsonLd(),
          createWebsiteJsonLd(),
          createBreadcrumbJsonLd([{ name: "Home", path: "/" }]),
          createItemListJsonLd(products.slice(0, 12), "Featured Noska dresses", "/shop"),
        ]}
      />

      <EditorialHome />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      products: await getCatalogProducts(),
    },
    revalidate: CATALOG_REVALIDATE_SECONDS,
  };
}
