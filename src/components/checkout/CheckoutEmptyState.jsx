import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export function CheckoutEmptyState() {
  return (
    <div className="mt-10 flex min-h-96 flex-col items-center justify-center rounded-lg border border-[#e5ddd2] bg-white p-8 text-center">
      <ShoppingBag size={44} className="text-[#b9404f]" />
      <h2 className="mt-4 text-2xl font-semibold">No items to checkout</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-[#6f6a63]">
        Add a dress first, then checkout will be ready.
      </p>
      <Link
        href="/#shop"
        className="mt-6 rounded-lg bg-[#151515] px-5 py-3 text-sm font-semibold text-white"
      >
        Shop dresses
      </Link>
    </div>
  );
}
