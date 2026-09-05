import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { Layout } from "@/components/Layout";
import { AdminProvider } from "@/context/AdminContext";
import { CustomerProvider } from "@/context/CustomerContext";
import { ShopProvider } from "@/context/ShopContext";
import { useLenis } from "@/Hooks/useLenis";
import { easeOut } from "@/lib/motion";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useLenis();

  if (Component.adminPage) {
    return (
      <AdminProvider>
        <Head>
          <meta name="robots" content="noindex,nofollow" />
        </Head>
        <Component {...pageProps} />
      </AdminProvider>
    );
  }

  return (
    <CustomerProvider>
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
    </CustomerProvider>
  );
}
