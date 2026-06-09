import type { Metadata } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { WhatsAppFab } from "@/components/conversion/WhatsAppFab";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { Analytics } from "@/components/seo/Analytics";
import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { localBusinessSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { getCategorias } from "@/lib/productos";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jbmono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default:
      "Maquinaria de Gimnasio Profesional en Andalucía | World Fitness Club Córdoba",
    template: "%s | World Fitness Club | Maquinaria Profesional",
  },
  description:
    "Más de 160 máquinas profesionales para equipar tu gimnasio, hotel o centro deportivo. Showroom de 800 m² en Puente Genil, Córdoba. Pruébalas antes de comprar. 138 reseñas a 5★ en Google.",
  keywords: [
    "maquinaria gimnasio profesional",
    "equipamiento gimnasio Andalucía",
    "máquinas gimnasio Córdoba",
    "showroom maquinaria gimnasio Puente Genil",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "World Fitness Club",
    url: SITE.url,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const categorias = getCategorias();
  return (
    <html
      lang="es"
      className={`${anton.variable} ${inter.variable} ${jbmono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SchemaMarkup schema={localBusinessSchema()} />
        <CartProvider>
          <Header categorias={categorias} />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFab />
          <CartDrawer />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
