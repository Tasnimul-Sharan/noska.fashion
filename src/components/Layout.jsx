import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CartPanel } from "@/components/CartPanel";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { useShop } from "@/context/ShopContext";

export function Layout({ children }) {
  const router = useRouter();
  const { itemCount, wishlist } = useShop();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const closePanels = () => {
      setMobileOpen(false);
      setCartOpen(false);
    };

    router.events.on("routeChangeStart", closePanels);
    router.events.on("hashChangeStart", closePanels);

    return () => {
      router.events.off("routeChangeStart", closePanels);
      router.events.off("hashChangeStart", closePanels);
    };
  }, [router.events]);

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/shop?q=${encodeURIComponent(trimmed)}` : "/shop");
  };

  return (
    <div className="min-h-screen bg-white text-secondary transition-colors">
      <Navbar
        handleSearch={handleSearch}
        itemCount={itemCount}
        mobileOpen={mobileOpen}
        onCartOpen={() => setCartOpen(true)}
        onMobileClose={() => setMobileOpen(false)}
        onMobileOpen={() => setMobileOpen(true)}
        query={query}
        setQuery={setQuery}
        wishlistCount={wishlist.length}
      />
      <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
      <motion.main
        className={router.pathname === "/" ? "" : "pt-20"}
        layout="position"
      >
        {children}
      </motion.main>
      <SiteFooter />
    </div>
  );
}
