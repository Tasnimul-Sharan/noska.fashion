import Head from "next/head";
import { absoluteUrl, buildPageTitle, siteConfig } from "@/lib/seo";

function stringifyJsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function Seo({
  title,
  description = siteConfig.description,
  canonicalPath = "/",
  canonical,
  image = siteConfig.defaultImage,
  imageAlt = `${siteConfig.name} premium fashion`,
  type = "website",
  noindex = false,
  jsonLd = [],
  children,
}) {
  const pageTitle = buildPageTitle(title);
  const canonicalUrl = canonical || absoluteUrl(canonicalPath);
  const imageUrl = absoluteUrl(image);
  const schemas = Array.isArray(jsonLd) ? jsonLd.filter(Boolean) : [jsonLd].filter(Boolean);
  const robots = noindex
    ? "noindex,nofollow,noarchive"
    : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} key="description" />
      <meta name="robots" content={robots} key="robots" />
      <meta name="googlebot" content={robots} key="googlebot" />
      <meta name="theme-color" content="#151515" key="theme-color" />
      <meta name="application-name" content={siteConfig.name} key="application-name" />
      <meta name="apple-mobile-web-app-title" content={siteConfig.name} key="apple-title" />
      <link rel="canonical" href={canonicalUrl} key="canonical" />

      <meta property="og:type" content={type} key="og:type" />
      <meta property="og:locale" content={siteConfig.locale} key="og:locale" />
      <meta property="og:site_name" content={siteConfig.name} key="og:site_name" />
      <meta property="og:title" content={pageTitle} key="og:title" />
      <meta property="og:description" content={description} key="og:description" />
      <meta property="og:url" content={canonicalUrl} key="og:url" />
      <meta property="og:image" content={imageUrl} key="og:image" />
      <meta property="og:image:alt" content={imageAlt} key="og:image:alt" />

      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      <meta name="twitter:title" content={pageTitle} key="twitter:title" />
      <meta name="twitter:description" content={description} key="twitter:description" />
      <meta name="twitter:image" content={imageUrl} key="twitter:image" />
      <meta name="twitter:image:alt" content={imageAlt} key="twitter:image:alt" />

      {schemas.map((schema, index) => (
        <script
          key={`json-ld-${schema["@type"] || index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: stringifyJsonLd(schema) }}
        />
      ))}
      {children}
    </Head>
  );
}
