/** Mini util de clases condicionales. Sin dependencia externa. */
export function clsx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}
