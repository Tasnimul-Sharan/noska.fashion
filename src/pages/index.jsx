import { Seo } from "@/components/Seo";
import { EditorialHome } from "@/components/home/EditorialHome";
import { heroProduct, products } from "@/data/products";
import {
  createBreadcrumbJsonLd,
  createItemListJsonLd,
  createOrganizationJsonLd,
  createWebsiteJsonLd,
} from "@/lib/seo";

export default function Home() {
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
