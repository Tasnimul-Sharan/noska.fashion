import { CreditCard } from "lucide-react";

const paymentOptions = [
  ["card", "Card"],
  ["bkash", "bKash"],
  ["cod", "Cash"],
];

export function PaymentSection({ note, payment, setPayment, updateField }) {
  return (
    <section className="rounded-lg border border-[#e5ddd2] bg-white p-5">
      <div className="flex items-center gap-2">
        <CreditCard size={19} className="text-[#b9404f]" />
        <h2 className="text-xl font-semibold">Payment</h2>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {paymentOptions.map(([value, label]) => (
          <button
            key={value}
            className={`focus-ring h-12 rounded-lg border text-sm font-semibold ${
              payment === value
                ? "border-[#151515] bg-[#151515] text-white"
                : "border-[#ded6ca] bg-[#fbfaf8]"
            }`}
            type="button"
            onClick={() => setPayment(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <label className="mt-5 block text-sm font-semibold" htmlFor="note">
        Order note
      </label>
      <input
        id="note"
        value={note}
        onChange={(event) => updateField("note", event.target.value)}
        className="focus-ring mt-2 h-11 w-full rounded-lg border border-[#ded6ca] bg-[#fbfaf8] px-3 text-sm outline-none"
        placeholder="Optional"
      />
    </section>
  );
}
