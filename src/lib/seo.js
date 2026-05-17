export const siteConfig = {
  name: "Noska",
  url: "https://www.noska.fashion",
  title: "Noska | Premium Dresses & Occasionwear in Bangladesh",
  description:
    "Shop Noska premium dresses, festive edits, workwear, resort silhouettes, and bridal occasionwear crafted for a polished wardrobe.",
  locale: "en_BD",
  country: "BD",
  currency: "BDT",
  defaultImage:
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85",
};

export function absoluteUrl(path = "/") {
  if (!path) return siteConfig.url;
  if (/^https?:\/\//i.test(path)) return path;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}

export function buildPageTitle(title) {
  if (!title) return siteConfig.title;
  if (title.includes(siteConfig.name)) return title;

  return `${title} | ${siteConfig.name}`;
}

export function createOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/favicon.ico"),
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
  };
}

export function createWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/shop")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function createBreadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function createProductJsonLd(product) {
  const productUrl = absoluteUrl(`/products/${product.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.gallery,
    description: product.description,
    sku: product.id,
    mpn: product.id,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    category: product.category,
    color: product.colors.map((color) => color.name).join(", "),
    size: product.sizes.join(", "),
    material: product.material,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: siteConfig.currency,
      price: product.price,
      availability:
        product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
  };
}

export function createItemListJsonLd(items, name, path) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: absoluteUrl(path),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/products/${item.slug}`),
      name: item.name,
      image: item.image,
    })),
  };
}

export function createCollectionJsonLd(collection) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${collection.title} | ${siteConfig.name}`,
    description: collection.description,
    url: absoluteUrl(`/collections/${collection.slug}`),
    mainEntity: createItemListJsonLd(
      collection.items,
      `${collection.title} products`,
      `/collections/${collection.slug}`,
    ),
  };
}

export function createCollectionListJsonLd(collections) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.name} dress collections`,
    url: absoluteUrl("/collections"),
    numberOfItems: collections.length,
    itemListElement: collections.map((collection, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/collections/${collection.slug}`),
      name: collection.title,
      image: collection.image,
      description: collection.description,
    })),
  };
}

export function createJournalListJsonLd(posts) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} fashion journal`,
    url: absoluteUrl("/journal"),
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: absoluteUrl(post.image),
      datePublished: post.date,
      url: absoluteUrl(`/journal/${post.slug}`),
      author: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    })),
  };
}

export function createJournalPostJsonLd(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.image),
    datePublished: post.date,
    dateModified: post.date,
    url: absoluteUrl(`/journal/${post.slug}`),
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/favicon.ico"),
      },
    },
  };
}
