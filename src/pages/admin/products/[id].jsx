import { useRouter } from "next/router";
import { ProductEditor } from "@/components/admin/ProductEditor";

export default function EditProductPage() {
  const router = useRouter();

  if (!router.isReady || typeof router.query.id !== "string") {
    return null;
  }

  return <ProductEditor key={router.query.id} productId={router.query.id} />;
}

EditProductPage.adminPage = true;
