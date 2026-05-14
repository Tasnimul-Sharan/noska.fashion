import Link from "next/link";
import { Seo } from "@/components/Seo";

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="This Noska page could not be found."
        canonicalPath="/404"
        noindex
      />

      <section className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase text-[#b9404f]">404</p>
        <h1 className="mt-3 text-4xl font-semibold md:text-5xl">Page not found</h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[#6f6a63] md:text-base">
          The page you are looking for is not available, but the Noska collection is ready.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/shop"
            className="rounded-lg bg-[#151515] px-5 py-3 text-sm font-semibold text-white"
          >
            Shop dresses
          </Link>
          <Link
            href="/collections"
            className="rounded-lg border border-[#151515] px-5 py-3 text-sm font-semibold"
          >
            View collections
          </Link>
        </div>
      </section>
    </>
  );
}
