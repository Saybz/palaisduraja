import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === "en";

  return {
    title: isEnglish ? "Privacy Policy" : "Politique de confidentialité",
    description: isEnglish
      ? "Privacy policy and personal data protection of Palais du Raja restaurant in Tours"
      : "Politique de confidentialité et protection des données personnelles du restaurant Palais du Raja à Tours",
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PolitiqueConfidentialite({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEnglish = locale === "en";

  return (
    <div className="min-h-screen bg-light py-16">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Retour à l'accueil */}
        <div className="mt-12 pb-8 mb-8 border-b border-primary/20">
          <Link
            href={`/${locale === "fr" ? "" : locale}`}
            className="inline-block text-primary hover:underline font-semibold"
          >
            ← {isEnglish ? "Back to home" : "Retour à l'accueil"}
          </Link>
        </div>
        <h1 className="text-4xl md:text-5xl font-head text-primary mb-4">
          {isEnglish ? "Privacy Policy" : "Politique de confidentialité"}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {isEnglish ? "Last updated: " : "Dernière mise à jour : "}
          {new Date().toLocaleDateString(isEnglish ? "en-US" : "fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="prose prose-lg max-w-none space-y-8 text-dark">
          {/* Introduction */}
          <section>
            <p className="text-lg">
              {isEnglish
                ? "Palais du Raja restaurant is committed to protecting the privacy and security of the personal data of its visitors and customers. This privacy policy explains how we collect, use, store and protect your personal information in accordance with the General Data Protection Regulation (GDPR)."
                : "Le restaurant Palais du Raja s'engage à protéger la confidentialité et la sécurité des données personnelles de ses visiteurs et clients. Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos informations personnelles conformément au Règlement Général sur la Protection des Données (RGPD)."}
            </p>
          </section>

          {/* Responsable du traitement */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              {isEnglish ? "1. Data Controller" : "1. Responsable du traitement"}
            </h2>
            <p>
              {isEnglish
                ? "The data controller is:"
                : "Le responsable du traitement des données personnelles est :"}
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

          {/* Données collectées */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              {isEnglish
                ? "2. Personal Data Collected"
                : "2. Données personnelles collectées"}
            </h2>
            <p>
              {isEnglish
                ? "We collect the following personal data:"
                : "Nous collectons les données personnelles suivantes :"}
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>
                <strong>
                  {isEnglish ? "Contact data:" : "Données de contact :"}
                </strong>{" "}
                {isEnglish
                  ? "name, phone number, email address (when making a reservation or contact request)"
                  : "nom, prénom, numéro de téléphone, adresse email (lors d'une réservation ou demande de contact)"}
              </li>
              <li>
                <strong>
                  {isEnglish ? "Browsing data:" : "Données de navigation :"}
                </strong>{" "}
                {isEnglish
                  ? "IP address, browser type, pages visited, duration of visit (via cookies)"
                  : "adresse IP, type de navigateur, pages visitées, durée de visite (via les cookies)"}
              </li>
            </ul>
          </section>

          {/* Droits RGPD */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              {isEnglish ? "3. Your Rights" : "3. Vos droits"}
            </h2>
            <p>
              {isEnglish
                ? "In accordance with the GDPR, you have the following rights regarding your personal data:"
                : "Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :"}
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>
                <strong>
                  {isEnglish ? "Right of access:" : "Droit d'accès :"}
                </strong>{" "}
                {isEnglish
                  ? "you can obtain a copy of your personal data"
                  : "vous pouvez obtenir une copie de vos données personnelles"}
              </li>
              <li>
                <strong>
                  {isEnglish ? "Right to rectification:" : "Droit de rectification :"}
                </strong>{" "}
                {isEnglish
                  ? "you can correct your inaccurate or incomplete data"
                  : "vous pouvez corriger vos données inexactes ou incomplètes"}
              </li>
              <li>
                <strong>
                  {isEnglish ? "Right to erasure:" : "Droit à l'effacement :"}
                </strong>{" "}
                {isEnglish
                  ? "you can request the deletion of your data in certain cases"
                  : "vous pouvez demander la suppression de vos données dans certains cas"}
              </li>
              <li>
                <strong>
                  {isEnglish ? "Right to object:" : "Droit d'opposition :"}
                </strong>{" "}
                {isEnglish
                  ? "you can object to the processing of your data for legitimate reasons"
                  : "vous pouvez vous opposer au traitement de vos données pour des motifs légitimes"}
              </li>
            </ul>
            <p className="mt-4">
              {isEnglish
                ? "To exercise these rights, you can contact us:"
                : "Pour exercer ces droits, vous pouvez nous contacter :"}
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                {isEnglish ? "By phone: " : "Par téléphone : "}
                <a
                  href="tel:0247648155"
                  className="text-primary hover:underline"
                >
                  02 47 64 81 55
                </a>
              </li>
              <li>
                {isEnglish
                  ? "By mail: Palais du Raja, 113 rue Colbert, 37000 Tours, France"
                  : "Par courrier : Palais du Raja, 113 rue Colbert, 37000 Tours, France"}
              </li>
            </ul>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              4. Contact
            </h2>
            <p>
              {isEnglish
                ? "For any questions regarding this privacy policy, you can contact us:"
                : "Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter :"}
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

          {/* Liens */}
          <div className="mt-12 pt-8 border-t border-primary/20 flex flex-col sm:flex-row gap-4">
            <Link
              href={`/${locale === "fr" ? "" : locale + "/"}mentions-legales`}
              className="text-primary hover:underline font-semibold"
            >
              {isEnglish ? "Legal notice" : "Mentions légales"}
            </Link>
            <span className="hidden sm:inline">|</span>
            <Link
              href={`/${locale === "fr" ? "" : locale}`}
              className="text-primary hover:underline font-semibold"
            >
              ← {isEnglish ? "Back to home" : "Retour à l'accueil"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

