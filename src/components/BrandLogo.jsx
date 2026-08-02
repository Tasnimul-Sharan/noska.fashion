import Image from "next/image";

const logoSizes = {
  nav: "h-10 w-32 sm:h-12 sm:w-40",
  footer: "h-12 w-40 sm:h-14 sm:w-48",
  mark: "h-24 w-72 sm:h-32 sm:w-[28rem] lg:h-40 lg:w-[36rem]",
};

export function BrandLogo({ className = "", priority = false, size = "nav" }) {
  return (
    <span
      className={`brand-logo-surface relative inline-flex shrink-0 overflow-hidden ${logoSizes[size]} ${className}`}
    >
      <Image
        src="/noshka-logo.png"
        alt="Noska"
        fill
        priority={priority}
        sizes={
          size === "mark"
            ? "(min-width: 1024px) 36rem, 18rem"
            : "(min-width: 640px) 12rem, 8rem"
        }
        className="object-contain"
      />
    </span>
  );
}