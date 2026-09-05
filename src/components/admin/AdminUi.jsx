import { ChevronLeft, ChevronRight, Search } from "lucide-react";

export function PageHeading({ eyebrow, title, description, actions }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="text-xs font-bold uppercase tracking-widest text-[#231f20]/50">{eyebrow}</p>}
        <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-sm leading-6 text-[#231f20]/60">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function SearchField({ value, onChange, placeholder = "Search" }) {
  return (
    <label className="flex h-10 min-w-0 items-center gap-2 rounded-lg border border-[#231f20]/15 bg-white px-3 focus-within:ring-2 focus-within:ring-[#231f20]/20">
      <Search size={16} className="shrink-0 text-[#231f20]/45" />
      <input
        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#231f20]/35"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

export function StatusBadge({ children, tone = "neutral" }) {
  const tones = {
    dark: "bg-[#231f20] text-white",
    neutral: "border border-[#231f20]/15 bg-white text-[#231f20]/70",
    soft: "bg-[#231f20]/[0.07] text-[#231f20]",
    outline: "border border-[#231f20]/30 bg-white text-[#231f20]",
  };
  return <span className={`inline-flex h-6 items-center rounded-full px-2.5 text-[11px] font-bold ${tones[tone]}`}>{children}</span>;
}

export function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center border border-dashed border-[#231f20]/20 bg-[#231f20]/[0.02] p-8 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#231f20] text-white"><Icon size={19} /></span>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm leading-6 text-[#231f20]/55">{description}</p>
    </div>
  );
}

export function Pagination({ count, label = "items" }) {
  return (
    <div className="flex items-center justify-between border-t border-[#231f20]/10 px-4 py-3 text-xs text-[#231f20]/55 sm:px-5">
      <span>Showing {count} {label}</span>
      <div className="flex gap-1">
        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#231f20]/15 disabled:opacity-40" disabled aria-label="Previous page"><ChevronLeft size={15} /></button>
        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#231f20]/15 disabled:opacity-40" disabled aria-label="Next page"><ChevronRight size={15} /></button>
      </div>
    </div>
  );
}

export const inputClass = "h-11 w-full rounded-lg border border-[#231f20]/15 bg-white px-3 text-sm outline-none transition focus:border-[#231f20]/40 focus:ring-2 focus:ring-[#231f20]/10";
export const buttonPrimary = "inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#231f20] px-4 text-sm font-semibold text-white transition hover:bg-[#231f20]/90 disabled:cursor-not-allowed disabled:opacity-50";
export const buttonSecondary = "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#231f20]/20 bg-white px-4 text-sm font-semibold text-[#231f20] transition hover:bg-[#231f20]/[0.04]";
