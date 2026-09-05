import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCustomer } from "@/context/CustomerContext";

export function CustomerGuard({ children }) {
  const router = useRouter();
  const { hydrated, session } = useCustomer();

  useEffect(() => {
    if (hydrated && !session) router.replace(`/login?next=${encodeURIComponent(router.asPath)}`);
  }, [hydrated, router, session]);

  if (!hydrated || !session) {
    return <div className="flex min-h-[70vh] items-center justify-center"><LoaderCircle className="animate-spin" size={24} aria-label="Loading account" /></div>;
  }

  return children;
}
