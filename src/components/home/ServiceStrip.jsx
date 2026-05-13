import { CheckCircle2, ShieldCheck, Truck } from "lucide-react";

const items = [
  { icon: Truck, label: "Fast delivery", text: "Dhaka 24-48h" },
  { icon: ShieldCheck, label: "Easy exchange", text: "7-day fit support" },
  { icon: CheckCircle2, label: "Quality checked", text: "Premium finishing" },
];

export function ServiceStrip() {
  return (
    <section className="border-y border-[#e7e1d8] bg-white">
      <div className="mx-auto grid max-w-7xl gap-0 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-center gap-4 border-b border-[#e7e1d8] py-5 md:border-b-0 md:border-r md:last:border-r-0"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f5eee5] text-[#b9404f]">
                <Icon size={20} />
              </span>
              <span>
                <span className="block font-semibold">{item.label}</span>
                <span className="mt-1 block text-sm text-[#6f6a63]">{item.text}</span>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
