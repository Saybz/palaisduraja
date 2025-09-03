import { Tangerine, Karma } from "next/font/google";
import "@/styles/globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Restaurant Indien à Tours | Palais du Raja",
  description:
    "Découvrez le Palais du Raja, restaurant traditionnel indien à Tours. Carte authentique, ambiance chaleureuse, réservation en ligne.",
  openGraph: {
    title: "Restaurant Indien à Tours | Palais du Raja",
    description:
      "Cuisine traditionnelle indienne au cœur de Tours. Découvrez nos spécialités.",
    url: "https://palaisduraja.fr",
    siteName: "Palais du Raja",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Salle du restaurant Palais du Raja à Tours",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Restaurant Indien à Tours | Palais du Raja",
    description:
      "Découvrez la cuisine indienne authentique du Palais du Raja à Tours.",
    images: ["/og-image.jpg"],
  },
  themeColor: "#75192E",
};

const karmaBody = Karma({
  variable: "--font-body",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const TangerineHead = Tangerine({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-head",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${karmaBody.variable} ${TangerineHead.variable} antialiased`}
      >
        <a
          href="#main"
          className="absolute left-0 top-0 -translate-y-full focus:translate-y-0 bg-primary text-white p-2"
        >
          Aller au contenu principal
        </a>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
        <Script
          id="restaurant-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Palais du Raja",
              image: "https://palaisduraja.fr/og-image.jpg",
              address: {
                "@type": "PostalAddress",
                streetAddress: "113 rue Colbert",
                addressLocality: "Tours",
                postalCode: "37000",
                addressCountry: "FR",
              },
              telephone: "+33247648155",
              servesCuisine: "Indienne, Pakistanaise",
              url: "https://palaisduraja.fr",
              priceRange: "€€",
            }),
          }}
        />
      </body>
    </html>
  );
}
