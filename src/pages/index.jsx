import Head from "next/head";
import { Collections } from "@/components/home/Collections";
import { HeroSection } from "@/components/home/HeroSection";
import { Lookbook } from "@/components/home/Lookbook";
import { ServiceStrip } from "@/components/home/ServiceStrip";
import { ShopCatalog } from "@/components/home/ShopCatalog";

export default function Home() {
  return (
    <>
      <Head>
        <title>Noska | Premium Fashion Ecommerce</title>
        <meta
          name="description"
          content="Premium Next.js and Tailwind CSS ecommerce storefront for curated dresses."
        />
      </Head>

      <HeroSection />
      <ServiceStrip />
      <ShopCatalog />
      <Collections />
      <Lookbook />
    </>
  );
}
