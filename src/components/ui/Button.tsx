import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "ghost" | "quiet";
type Size = "sm" | "md" | "lg" | "xl";

const base =
  "group/btn relative isolate inline-flex items-center justify-center gap-2 " +
  "overflow-hidden rounded-pill font-medium whitespace-nowrap select-none " +
  "transition-[color,background-color,border-color,transform,box-shadow] " +
  "duration-300 active:scale-[0.97]";

/**
 * Buttons fill from the left on hover — a deeper wine sweeping over the base
 * tone rather than a flat colour swap. The sweep is a pseudo-element behind
 * the label at -z-10, so the label never re-renders.
 *
 * Every colour resolves through a theme token, so a button is correct in both
 * themes without a variant per theme.
 */
const sweep =
  "before:absolute before:inset-0 before:-z-10 before:origin-left " +
  "before:scale-x-0 before:transition-transform before:duration-500 " +
  "before:ease-[cubic-bezier(0.16,1,0.3,1)] hover:before:scale-x-100";

const variants: Record<Variant, string> = {
  // white on the bright wine is 5.1:1; the sweep lands on --accent, which is
  // darker still in light and lighter in dark — legible under white either way
  solid: `bg-accent-bright text-on-accent shadow-[0_10px_30px_-14px_color-mix(in_srgb,var(--accent-bright)_80%,transparent)] ${sweep} before:bg-accent`,
  ghost: `border border-line-strong text-fg hover:border-accent ${sweep} before:bg-accent-soft`,
  quiet: `text-fg-mute hover:text-accent`,
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.875rem]",
  md: "h-12 px-7 text-[0.9375rem]",
  lg: "h-[3.375rem] px-9",
  xl: "h-[3.75rem] px-11 text-[1.0625rem]",
};

type Props = {
  children: ReactNode;
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
};

export function Button({
  children,
  href,
  variant = "solid",
  size = "md",
  className = "",
  onClick,
}: Props) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}
