import Head from "next/head";
import { Collections } from "@/components/home/Collections";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HeroSection } from "@/components/home/HeroSection";
import { Lookbook } from "@/components/home/Lookbook";
import { ServiceStrip } from "@/components/home/ServiceStrip";

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
      <FeaturedProducts />
      <Collections />
      <Lookbook />
    </>
  );
}
