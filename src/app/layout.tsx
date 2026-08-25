import type { Metadata } from "next";
import { display, sans } from "./fonts";
import { identity, footer } from "@/content/site";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { preloaderWarmScript } from "@/components/layout/Preloader";
import { themeInitScript } from "@/components/ui/ThemeToggle";
import { Cursor } from "@/components/ui/Cursor";
import "./globals.css";

const SITE = "https://velammal.org/global-mambakkam/";

export const metadata: Metadata = {
  metadataBase: new URL("https://velammal.org"),
  title: identity.title,
  description: identity.description,
  alternates: { canonical: SITE },
  icons: { icon: "/img/favi.png", apple: "/img/favi.png" },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: identity.brand,
    title: identity.title,
    description: identity.description,
    images: [
      {
        url: "/img/hero-campus.jpg",
        width: 1366,
        height: 540,
        alt: "The Velammal Global School, Mambakkam campus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: identity.title,
    description: identity.description,
    images: ["/img/hero-campus.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "School",
      "@id": `${SITE}#school`,
      name: identity.subject,
      alternateName: identity.brand,
      url: SITE,
      description: identity.description,
      telephone: footer.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "4/176, Surapet Main Rd, Puzhal, Kadirvedu",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: "600066",
        addressCountry: "IN",
      },
      foundingDate: "2015",
      image: "https://velammal.org/img/hero-campus.jpg",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Velammal New-Gen Edu Network",
          item: "https://velammal.org/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: identity.subject,
          item: SITE,
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {/* Runs before the rest of the body parses, so both the stored theme
            and the preloader's warm-session skip are decided before anything
            can paint in the wrong one. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `${themeInitScript}${preloaderWarmScript}`,
          }}
        />
        <MotionProvider>
          <SmoothScroll />
          <Cursor />
          <a
            href="#main"
            className="sr-only rounded-pill bg-wine-500 px-5 py-3 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200]"
          >
            Skip to content
          </a>
          {children}
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
