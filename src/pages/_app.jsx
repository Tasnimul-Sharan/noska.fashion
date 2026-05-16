import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { Layout } from "@/components/Layout";
import { ShopProvider } from "@/context/ShopContext";
import { useLenis } from "@/Hooks/useLenis";
import { easeOut } from "@/lib/motion";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useLenis();

  return (
    <ShopProvider>
      <Layout>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={router.asPath}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: easeOut }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </ShopProvider>
  );
}
