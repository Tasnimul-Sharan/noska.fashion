import { absoluteUrl } from "@/lib/seo";

function createRobotsTxt() {
  return `User-agent: *
Allow: /
Disallow: /account
Disallow: /cart
Disallow: /checkout
Disallow: /wishlist
Disallow: /login

Sitemap: ${absoluteUrl("/sitemap.xml")}`;
}

export function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/plain");
  res.write(createRobotsTxt());
  res.end();

  return {
    props: {},
  };
}

export default function RobotsTxt() {
  return null;
}
