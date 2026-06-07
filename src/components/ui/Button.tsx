import Link from "next/link";
import { clsx } from "@/lib/clsx";

type Variant = "energy" | "outline" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-card)] font-semibold transition select-none";

const variants: Record<Variant, string> = {
  energy: "btn-energy",
  outline: "btn-outline",
  dark: "bg-carbon text-bone hover:bg-carbon-soft",
  ghost: "text-carbon hover:bg-carbon/5",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[0.95rem]",
  lg: "px-8 py-4 text-base",
};

type Props = {
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "energy",
  size = "md",
  href,
  className,
  children,
  ...rest
}: Props) {
  const cls = clsx(base, variants[variant], sizes[size], className);
  if (href) {
    const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("wa.me");
    if (external) {
      return (
        <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
