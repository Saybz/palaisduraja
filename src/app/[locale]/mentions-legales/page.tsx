import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === "en";

  return {
    title: isEnglish ? "Legal Notice" : "Mentions légales",
    description: isEnglish
      ? "Legal notice of Palais du Raja restaurant in Tours"
      : "Mentions légales du restaurant Palais du Raja à Tours",
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function MentionsLegales({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const isEnglish = locale === "en";

  return (
    <div className="min-h-screen bg-light pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <h1 className="text-4xl md:text-5xl font-head text-primary mb-8">
          {isEnglish ? "Legal Notice" : "Mentions légales"}
        </h1>

        <div className="prose prose-lg max-w-none space-y-8 text-dark">
          {/* Retour à l'accueil */}
          <div className="mt-12 pt-8 border-t border-primary/20">
            <Link
              href={`/${locale === "fr" ? "" : locale}`}
              className="inline-block text-primary hover:underline font-semibold"
            >
              ← {isEnglish ? "Back to home" : "Retour à l'accueil"}
            </Link>
          </div>

          {/* Éditeur du site */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              {isEnglish ? "1. Website Publisher" : "1. Éditeur du site"}
            </h2>
            <p>
              {isEnglish
                ? "The website palaisduraja.fr is published by:"
                : "Le site palaisduraja.fr est édité par :"}
            </p>
            <address className="not-italic mt-2">
              <strong>Palais du Raja</strong>
              <br />
              {isEnglish
                ? "Indian and Pakistani restaurant"
                : "Restaurant indien et pakistanais"}
              <br />
              113 rue Colbert
              <br />
              37000 Tours, France
              <br />
              {isEnglish ? "Phone: " : "Téléphone : "}
              <a href="tel:0247648155" className="text-primary hover:underline">
                02 47 64 81 55
              </a>
            </address>
          </section>

          {/* Directeur de publication */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              {isEnglish
                ? "2. Publication Director"
                : "2. Directeur de publication"}
            </h2>
            <p>
              {isEnglish
                ? "The publication director is the legal representative of Palais du Raja restaurant."
                : "Le directeur de publication est le représentant légal du restaurant Palais du Raja."}
            </p>
          </section>

          {/* Hébergement */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              {isEnglish ? "3. Hosting" : "3. Hébergement"}
            </h2>
            <p>
              {isEnglish ? "The website is hosted by:" : "Le site est hébergé par :"}
            </p>
            <p className="mt-2">
              {isEnglish
                ? "Hosting information will be completed upon production deployment."
                : "Les informations d'hébergement seront complétées lors de la mise en production."}
            </p>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              {isEnglish
                ? "4. Intellectual Property"
                : "4. Propriété intellectuelle"}
            </h2>
            <p>
              {isEnglish
                ? "This entire website is subject to French and international legislation on copyright and intellectual property. All reproduction rights are reserved, including downloadable documents and iconographic and photographic representations."
                : "L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques."}
            </p>
          </section>

          {/* Données personnelles */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              {isEnglish ? "5. Personal Data" : "5. Données personnelles"}
            </h2>
            <p>
              {isEnglish
                ? "In accordance with data protection laws, you have the right to access, modify and delete your personal data."
                : "Conformément à la loi n° 78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés, vous disposez d'un droit d'accès, de modification et de suppression des données qui vous concernent."}
            </p>
            <p className="mt-4">
              {isEnglish
                ? "For more information, see our "
                : "Pour plus d'informations, consultez notre "}
              <Link
                href={`/${locale === "fr" ? "" : locale + "/"}politique-confidentialite`}
                className="text-primary hover:underline"
              >
                {t("footer.privacy")}
              </Link>
              .
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              6. Cookies
            </h2>
            <p>
              {isEnglish
                ? "This website uses cookies to improve user experience. By browsing this site, you accept the use of cookies in accordance with our privacy policy."
                : "Ce site utilise des cookies pour améliorer l'expérience utilisateur. En naviguant sur ce site, vous acceptez l'utilisation de cookies conformément à notre politique de confidentialité."}
            </p>
          </section>

          {/* Droit applicable */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              {isEnglish ? "7. Applicable Law" : "7. Droit applicable"}
            </h2>
            <p>
              {isEnglish
                ? "These legal notices are governed by French law. In the event of a dispute and in the absence of an amicable agreement, the dispute will be brought before the French courts in accordance with the applicable rules of jurisdiction."
                : "Les présentes mentions légales sont régies par le droit français. En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux français conformément aux règles de compétence en vigueur."}
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              8. Contact
            </h2>
            <p>
              {isEnglish
                ? "For any questions regarding these legal notices, you can contact us:"
                : "Pour toute question concernant les présentes mentions légales, vous pouvez nous contacter :"}
            </p>
            <address className="not-italic mt-4">
              <strong>Palais du Raja</strong>
              <br />
              113 rue Colbert
              <br />
              37000 Tours, France
              <br />
              {isEnglish ? "Phone: " : "Téléphone : "}
              <a href="tel:0247648155" className="text-primary hover:underline">
                02 47 64 81 55
              </a>
            </address>
          </section>

          {/* Retour à l'accueil */}
          <div className="mt-12 pt-8 border-t border-primary/20">
            <Link
              href={`/${locale === "fr" ? "" : locale}`}
              className="inline-block text-primary hover:underline font-semibold"
            >
              ← {isEnglish ? "Back to home" : "Retour à l'accueil"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

