import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import type { Producto } from "@/types";

/** LocalBusiness — NAP + geo + rating, base de toda la autoridad local. */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SportingGoodsStore",
    name: SITE.name,
    image: `${SITE.url}/opengraph-image`,
    "@id": SITE.url,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.province,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    areaServed: [
      ...SITE.servedProvinces.map((name) => ({
        "@type": "AdministrativeArea",
        name,
      })),
      { "@type": "Country", name: "España" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.reviews.rating,
      reviewCount: SITE.reviews.count,
      bestRating: 5,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "13:30",
      },
    ],
  };
}

export function productSchema(p: Producto) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.nombre,
    image: p.imagen_local ? `${SITE.url}${p.imagen_local}` : undefined,
    description: p.descripcion_corta,
    category: p.categoria,
    brand: { "@type": "Brand", name: "Fabricación profesional" },
    offers: {
      "@type": "Offer",
      price: p.precio || undefined,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: SITE.name },
      url: `${SITE.url}/producto/${p.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.reviews.rating,
      reviewCount: SITE.reviews.count,
      bestRating: 5,
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.url}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  slug: string;
  date: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.date,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: `${SITE.url}/blog/${opts.slug}`,
  };
}

/**
 * Helper de metadata con OG/canonical coherentes. Las imágenes OG las genera
 * Next con next/og vía los archivos opengraph-image (raíz y por producto), así
 * que aquí no se fija una imagen estática.
 */
export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${SITE.url}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      type: "website",
      locale: "es_ES",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
  };
}
