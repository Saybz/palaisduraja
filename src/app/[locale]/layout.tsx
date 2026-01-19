import type { Metadata } from "next";
import { Tangerine, Karma } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import Providers from "@/components/Providers";
import ClientLayout from "@/components/ClientLayout";
import { locales, type Locale } from "@/i18n/config";

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

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isEnglish = locale === "en";

  return {
    metadataBase: new URL("https://palaisduraja.fr"),
    title: {
      default: isEnglish
        ? "Palais du Raja | Indian Restaurant in Tours | traditional Cuisine"
        : "Palais du Raja | Restaurant Indien à Tours | Cuisine traditionnelle",
      template: "%s | Palais du Raja",
    },
    description: isEnglish
      ? "Traditional Indian restaurant in Tours. Discover authentic cuisine, spicy specialties and a warm atmosphere. Reservation at +33 2 47 64 81 55."
      : "Restaurant indien traditionnel à Tours. Découvrez une cuisine authentique, des spécialités épicées et une ambiance chaleureuse. Réservation au 02 47 64 81 55.",
    keywords: isEnglish
      ? [
          "Indian restaurant Tours",
          "Pakistani restaurant Tours",
          "Indian cuisine Tours",
          "Indian specialties",
          "curry Tours",
          "naan Tours",
          "restaurant Tours",
          "Palais du Raja",
          "Palais du Rajah",
        ]
      : [
          "restaurant indien Tours",
          "restaurant pakistanais Tours",
          "cuisine indienne Tours",
          "spécialités indiennes",
          "curry Tours",
          "naan Tours",
          "restaurant Tours",
          "Palais du Raja",
          "Palais du Rajah",
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
      canonical: `https://palaisduraja.fr${locale === "en" ? "/en" : ""}`,
      languages: {
        fr: "https://palaisduraja.fr",
        en: "https://palaisduraja.fr/en",
      },
    },
    openGraph: {
      title: isEnglish
        ? "Palais du Raja | Traditional Indian Restaurant in Tours"
        : "Palais du Raja | Restaurant Indien traditionnel à Tours",
      description: isEnglish
        ? "Authentic Indian restaurant in the heart of Tours. Discover our traditional specialties and warm atmosphere. Reservation at +33 2 47 64 81 55."
        : "Restaurant indien authentique au cœur de Tours. Découvrez nos spécialités traditionnelles et notre ambiance chaleureuse. Réservation au 02 47 64 81 55.",
      url: `https://palaisduraja.fr${locale === "en" ? "/en" : ""}`,
      siteName: "Palais du Raja",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: isEnglish
            ? "Palais du Raja restaurant interior - Traditional Indian restaurant"
            : "Salle du restaurant Palais du Raja - Restaurant indien traditionnel",
        },
      ],
      locale: locale === "en" ? "en_US" : "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: isEnglish
        ? "Palais du Raja | Indian Restaurant in Tours"
        : "Palais du Raja | Restaurant Indien à Tours",
      description: isEnglish
        ? "Discover authentic Indian and Pakistani cuisine at Palais du Raja in Tours. Reservation at +33 2 47 64 81 55."
        : "Découvrez la cuisine indienne et pakistanaise authentique du Palais du Raja à Tours. Réservation au 02 47 64 81 55.",
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
    category: "restaurant",
    classification: isEnglish ? "Indian Restaurant" : "Restaurant Indien",
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body className={`${karmaBody.variable} ${TangerineHead.variable} antialiased`}>
          <a
            href="#main"
            className="absolute left-0 top-0 -translate-y-full focus:translate-y-0 bg-primary text-white p-2"
          >
            {locale === "en" ? "Skip to main content" : "Aller au contenu principal"}
          </a>
          <NextIntlClientProvider messages={messages}>
            <Providers>
              <ClientLayout>{children}</ClientLayout>
            </Providers>
          </NextIntlClientProvider>
          <Script
            id="restaurant-schema"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Restaurant",
                name: "Palais du Raja",
                alternateName: locale === "en" ? "Indian Restaurant Palais du Raja" : "Restaurant Indien Palais du Raja",
                description:
                  locale === "en"
                    ? "Traditional Indian and Pakistani restaurant in Tours. Authentic cuisine, spicy specialties and warm atmosphere."
                    : "Restaurant indien et pakistanais traditionnel à Tours. Cuisine authentique, spécialités épicées et ambiance chaleureuse.",
                image: "https://palaisduraja.fr/og-image.jpg",
                logo: "https://palaisduraja.fr/og-image.jpg",
                url: "https://palaisduraja.fr",
                telephone: "+33247648155",
                priceRange: "€€",
                acceptsReservations: "True",
                servesCuisine: ["Indian", "Pakistani", "Asian Cuisine"],
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
              }),
            }}
          />
      </body>
    </html>
  );
}

