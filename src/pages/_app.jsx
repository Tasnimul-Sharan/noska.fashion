import { Layout } from "@/components/Layout";
import { ShopProvider } from "@/context/ShopContext";
import { useLenis } from "@/Hooks/useLenis";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  useLenis();

  return (
    <ShopProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ShopProvider>
  );
}
