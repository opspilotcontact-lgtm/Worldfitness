import { clsx } from "@/lib/clsx";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Tag className={clsx("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>
      {children}
    </Tag>
  );
}
