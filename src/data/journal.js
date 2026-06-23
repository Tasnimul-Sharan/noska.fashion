import { getProductBySlug, products } from "@/data/products";

function productImage(slug) {
  return getProductBySlug(slug)?.image || products[0].image;
}

export const journalPosts = [
  {
    slug: "eid-dress-styling-guide",
    title: "Eid Dress Styling Guide",
    excerpt:
      "How to build a refined Eid look with embroidery, soft shine, and practical finishing touches.",
    category: "Festive styling",
    date: "May 10, 2026",
    readTime: "4 min read",
    image: productImage("noor-embroidered-anarkali"),
    featuredProductSlugs: ["noor-embroidered-anarkali", "naira-zari-kaftan", "elara-metallic-slip"],
    sections: [
      {
        title: "Start With Movement",
        body:
          "Choose silhouettes that move easily from family visits to evening plans. A-line, kaftan, and tiered shapes keep the look polished without feeling heavy.",
      },
      {
        title: "Keep Accessories Intentional",
        body:
          "Let embroidery or zari lead the outfit. Pair a detailed dress with clean heels, one metallic accent, and a small structured bag.",
      },
      {
        title: "Balance Color",
        body:
          "Marigold, emerald, ivory, and blush feel festive while staying versatile across daylight and dinner styling.",
      },
    ],
  },
  {
    slug: "workwear-dresses-that-feel-premium",
    title: "Workwear Dresses That Feel Premium",
    excerpt:
      "A practical guide to structured dresses that carry morning meetings, office days, and dinner plans.",
    category: "Workwear",
    date: "May 6, 2026",
    readTime: "5 min read",
    image: productImage("aria-tailored-wrap"),
    featuredProductSlugs: ["aria-tailored-wrap", "iris-utility-shirt-dress"],
    sections: [
      {
        title: "Look For Structure",
        body:
          "Defined shoulders, wrap waists, and clean seams make a dress feel intentional without needing extra layers.",
      },
      {
        title: "Use Color Quietly",
        body:
          "Graphite, olive, cranberry, and oat tones work across repeated wear while still feeling considered.",
      },
      {
        title: "Plan For After Hours",
        body:
          "A blazer dress or tailored wrap can move into dinner with a sharper shoe and a smaller evening bag.",
      },
    ],
  },
  {
    slug: "resort-dresses-for-humid-days",
    title: "Resort Dresses For Humid Days",
    excerpt:
      "Lightweight fabric, breathable color, and travel-friendly silhouettes for warm weather wardrobes.",
    category: "Resort",
    date: "April 30, 2026",
    readTime: "3 min read",
    image: productImage("maeve-pleated-maxi"),
    featuredProductSlugs: ["maeve-pleated-maxi", "vela-linen-midi", "paloma-halter-maxi"],
    sections: [
      {
        title: "Prioritize Fabric",
        body:
          "Linen, chiffon georgette, and crinkle cotton keep shape while staying comfortable in heat.",
      },
      {
        title: "Pack By Mood",
        body:
          "A relaxed midi, one statement maxi, and an easy halter cover most destination plans.",
      },
      {
        title: "Let Color Work",
        body:
          "Sea, coral, salt, and palm shades make resort styling feel fresh with minimal accessories.",
      },
    ],
  },
];

export function getJournalPostBySlug(slug) {
  return journalPosts.find((post) => post.slug === slug);
}
