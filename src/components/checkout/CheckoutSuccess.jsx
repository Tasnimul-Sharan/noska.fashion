import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/data/products";

export function CheckoutSuccess({ order }) {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <CheckCircle2 size={56} className="text-[#1f7a5a]" />
      <h1 className="mt-5 text-4xl font-semibold">Order confirmed</h1>
      <p className="mt-3 max-w-xl text-base leading-7 text-[#6f6a63]">
        Order {order.number} has been placed. A confirmation was prepared for{" "}
        {order.email}.
      </p>
      <div className="mt-8 grid w-full gap-3 rounded-lg border border-[#e5ddd2] bg-white p-5 text-left sm:grid-cols-2">
        <SummaryTile label="Total" value={formatCurrency(order.total)} />
        <SummaryTile
          label="Items"
          value={`${order.items} line item${order.items > 1 ? "s" : ""}`}
        />
        <SummaryTile
          label="Delivery"
          value={order.delivery === "express" ? "Express" : "Standard"}
        />
        <SummaryTile label="Payment" value={paymentLabel(order.payment)} />
      </div>
      <Link
        href="/shop"
        className="mt-8 rounded-lg bg-[#151515] px-5 py-3 text-sm font-semibold text-white"
      >
        Continue shopping
      </Link>
    </section>
  );
}

function SummaryTile({ label, value }) {
  return (
    <div className="rounded-lg bg-[#fbfaf8] p-4">
      <p className="text-sm text-[#7b7167]">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

function paymentLabel(payment) {
  if (payment === "bkash") return "bKash";
  if (payment === "cod") return "Cash";
  return "Card";
}
