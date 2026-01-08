import { Tangerine, Karma } from "next/font/google";
import "@/styles/globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://palaisduraja.fr"),
  title: {
    default: "Palais du Raja | Restaurant Indien à Tours | Cuisine Traditionnelle",
    template: "%s | Palais du Raja",
  },
  description:
    "Restaurant indien et pakistanais traditionnel à Tours. Découvrez une cuisine authentique, des spécialités épicées et une ambiance chaleureuse. Réservation au 02 47 64 81 55. Ouvert du mardi soir au dimanche.",
  keywords: [
    "restaurant indien Tours",
    "restaurant pakistanais Tours",
    "cuisine indienne Tours",
    "spécialités indiennes",
    "curry Tours",
    "naan Tours",
    "restaurant Tours",
    "Palais du Raja",
    "restaurant traditionnel Tours",
    "cuisine épicée Tours",
    "restaurant rue Colbert Tours",
    "réservation restaurant Tours",
  ],
  authors: [{ name: "Palais du Raja" }],
  creator: "Palais du Raja",
  publisher: "Palais du Raja",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://palaisduraja.fr",
  },
  openGraph: {
    title: "Palais du Raja | Restaurant Indien Traditionnel à Tours",
    description:
      "Restaurant indien et pakistanais authentique au cœur de Tours. Découvrez nos spécialités traditionnelles, notre carte variée et notre ambiance chaleureuse. Réservation au 02 47 64 81 55.",
    url: "https://palaisduraja.fr",
    siteName: "Palais du Raja",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Salle du restaurant Palais du Raja à Tours - Restaurant indien traditionnel",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Palais du Raja | Restaurant Indien à Tours",
    description:
      "Découvrez la cuisine indienne et pakistanaise authentique du Palais du Raja à Tours. Réservation au 02 47 64 81 55.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Ajoutez vos codes de vérification ici quand vous les obtiendrez
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
  category: "restaurant",
  classification: "Restaurant Indien",
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
              alternateName: "Restaurant Indien Palais du Raja",
              description:
                "Restaurant indien et pakistanais traditionnel à Tours. Cuisine authentique, spécialités épicées et ambiance chaleureuse.",
              image: "https://palaisduraja.fr/og-image.jpg",
              logo: "https://palaisduraja.fr/og-image.jpg",
              url: "https://palaisduraja.fr",
              telephone: "+33247648155",
              priceRange: "€€",
              acceptsReservations: "True",
              servesCuisine: ["Indienne", "Pakistanaise", "Cuisine Asiatique"],
              menu: "https://palaisduraja.fr/#menu",
              address: {
                "@type": "PostalAddress",
                streetAddress: "113 rue Colbert",
                addressLocality: "Tours",
                addressRegion: "Centre-Val de Loire",
                postalCode: "37000",
                addressCountry: "FR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 47.395992871171224,
                longitude: 0.689015977602613,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  opens: "19:00",
                  closes: "22:30",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  opens: "12:00",
                  closes: "14:00",
                },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.5",
                reviewCount: "150",
              },
              sameAs: [
                // Ajoutez vos réseaux sociaux ici si vous en avez
                // "https://www.facebook.com/palaisduraja",
                // "https://www.instagram.com/palaisduraja",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
