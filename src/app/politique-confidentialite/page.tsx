import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et protection des données personnelles du restaurant Palais du Raja à Tours",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-light py-16">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Retour à l&apos;accueil */}
        <div className="mt-12 pb-8 mb-8 border-b border-primary/20">
          <Link
            href="/"
            className="inline-block text-primary hover:underline font-semibold"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
        <h1 className="text-4xl md:text-5xl font-head text-primary mb-4">
          Politique de confidentialité
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Dernière mise à jour :{" "}
          {new Date().toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="prose prose-lg max-w-none space-y-8 text-dark">
          {/* Introduction */}
          <section>
            <p className="text-lg">
              Le restaurant <strong>Palais du Raja</strong> s&apos;engage à
              protéger la confidentialité et la sécurité des données
              personnelles de ses visiteurs et clients. Cette politique de
              confidentialité explique comment nous collectons, utilisons,
              stockons et protégeons vos informations personnelles conformément
              au Règlement Général sur la Protection des Données (RGPD) et à la
              loi Informatique et Libertés.
            </p>
          </section>

          {/* Responsable du traitement */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              1. Responsable du traitement
            </h2>
            <p>Le responsable du traitement des données personnelles est :</p>
            <address className="not-italic mt-2">
              <strong>Palais du Raja</strong>
              <br />
              Restaurant indien et pakistanais
              <br />
              113 rue Colbert
              <br />
              37000 Tours, France
              <br />
              Téléphone :{" "}
              <a href="tel:0247648155" className="text-primary hover:underline">
                02 47 64 81 55
              </a>
            </address>
          </section>

          {/* Données collectées */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              2. Données personnelles collectées
            </h2>
            <p>Nous collectons les données personnelles suivantes :</p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>
                <strong>Données de contact :</strong> nom, prénom, numéro de
                téléphone, adresse email (lors d&apos;une réservation ou demande
                de contact)
              </li>
              <li>
                <strong>Données de navigation :</strong> adresse IP, type de
                navigateur, pages visitées, durée de visite (via les cookies)
              </li>
              <li>
                <strong>Données de réservation :</strong> date, heure, nombre de
                personnes, préférences alimentaires si communiquées
              </li>
            </ul>
          </section>

          {/* Finalités */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              3. Finalités du traitement
            </h2>
            <p>
              Vos données personnelles sont collectées et traitées pour les
              finalités suivantes :
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Gestion des réservations et prise de contact</li>
              <li>Amélioration de l&apos;expérience utilisateur sur le site</li>
              <li>Analyse statistique de fréquentation du site (anonymisée)</li>
              <li>Respect des obligations légales et réglementaires</li>
              <li>
                Envoi d&apos;informations relatives au restaurant (uniquement
                avec votre consentement)
              </li>
            </ul>
          </section>

          {/* Base légale */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              4. Base légale du traitement
            </h2>
            <p>Le traitement de vos données personnelles est fondé sur :</p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>
                <strong>Votre consentement</strong> pour les cookies non
                essentiels et les communications marketing
              </li>
              <li>
                <strong>L&apos;exécution d&apos;un contrat</strong> pour la
                gestion des réservations
              </li>
              <li>
                <strong>L&apos;intérêt légitime</strong> pour
                l&apos;amélioration du site et l&apos;analyse statistique
              </li>
              <li>
                <strong>Le respect d&apos;obligations légales</strong> pour la
                conservation de certaines données
              </li>
            </ul>
          </section>

          {/* Durée de conservation */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              5. Durée de conservation des données
            </h2>
            <p>
              Vos données personnelles sont conservées pour les durées suivantes
              :
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>
                <strong>Données de réservation :</strong> 3 ans à compter de la
                dernière interaction
              </li>
              <li>
                <strong>Données de contact :</strong> 3 ans à compter du dernier
                contact
              </li>
              <li>
                <strong>Cookies :</strong> 13 mois maximum (conformément aux
                recommandations de la CNIL)
              </li>
              <li>
                <strong>Données de navigation :</strong> 25 mois maximum
              </li>
            </ul>
            <p className="mt-4">
              Au-delà de ces durées, vos données sont supprimées ou anonymisées.
            </p>
          </section>

          {/* Destinataires */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              6. Destinataires des données
            </h2>
            <p>Vos données personnelles sont destinées à :</p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Le personnel autorisé du restaurant Palais du Raja</li>
              <li>
                Nos prestataires techniques (hébergeur, services d&apos;analyse)
                dans le cadre strict de leurs missions
              </li>
              <li>Les autorités compétentes en cas d&apos;obligation légale</li>
            </ul>
            <p className="mt-4">
              Nous ne vendons, ne louons ni ne cédons vos données personnelles à
              des tiers à des fins commerciales.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              7. Cookies et technologies similaires
            </h2>
            <p>
              Ce site utilise des cookies pour améliorer votre expérience de
              navigation. Les types de cookies utilisés sont :
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>
                <strong>Cookies essentiels :</strong> nécessaires au
                fonctionnement du site (gestion de session, sécurité)
              </li>
              <li>
                <strong>Cookies analytiques :</strong> pour analyser la
                fréquentation du site (anonymisés)
              </li>
              <li>
                <strong>Cookies de préférences :</strong> pour mémoriser vos
                choix (langue, paramètres d&apos;affichage)
              </li>
            </ul>
            <p className="mt-4">
              Vous pouvez gérer vos préférences de cookies via les paramètres de
              votre navigateur. Cependant, la désactivation de certains cookies
              peut affecter le fonctionnement du site.
            </p>
          </section>

          {/* Droits RGPD */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              8. Vos droits
            </h2>
            <p>
              Conformément au RGPD, vous disposez des droits suivants concernant
              vos données personnelles :
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>
                <strong>Droit d&apos;accès :</strong> vous pouvez obtenir une
                copie de vos données personnelles
              </li>
              <li>
                <strong>Droit de rectification :</strong> vous pouvez corriger
                vos données inexactes ou incomplètes
              </li>
              <li>
                <strong>Droit à l&apos;effacement :</strong> vous pouvez
                demander la suppression de vos données dans certains cas
              </li>
              <li>
                <strong>Droit à la limitation :</strong> vous pouvez demander la
                limitation du traitement de vos données
              </li>
              <li>
                <strong>Droit à la portabilité :</strong> vous pouvez récupérer
                vos données dans un format structuré
              </li>
              <li>
                <strong>Droit d&apos;opposition :</strong> vous pouvez vous
                opposer au traitement de vos données pour des motifs légitimes
              </li>
              <li>
                <strong>Droit de retirer votre consentement :</strong> à tout
                moment pour les traitements basés sur le consentement
              </li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits, vous pouvez nous contacter :
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                Par téléphone :{" "}
                <a
                  href="tel:0247648155"
                  className="text-primary hover:underline"
                >
                  02 47 64 81 55
                </a>
              </li>
              <li>
                Par courrier : Palais du Raja, 113 rue Colbert, 37000 Tours,
                France
              </li>
            </ul>
            <p className="mt-4">
              Vous avez également le droit d&apos;introduire une réclamation
              auprès de la Commission Nationale de l&apos;Informatique et des
              Libertés (CNIL) :{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                www.cnil.fr
              </a>
            </p>
          </section>

          {/* Sécurité */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              9. Sécurité des données
            </h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles
              appropriées pour protéger vos données personnelles contre tout
              accès non autorisé, perte, destruction ou altération. Ces mesures
              incluent :
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Chiffrement des données sensibles</li>
              <li>Accès restreint aux données personnelles</li>
              <li>Sauvegardes régulières</li>
              <li>Mise à jour régulière des systèmes de sécurité</li>
            </ul>
          </section>

          {/* Transferts */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              10. Transferts de données hors UE
            </h2>
            <p>
              Vos données personnelles sont stockées et traitées au sein de
              l&apos;Union Européenne. En cas de transfert vers un pays tiers,
              nous nous assurons que des garanties appropriées sont en place
              conformément au RGPD.
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              11. Modifications de la politique
            </h2>
            <p>
              Nous nous réservons le droit de modifier cette politique de
              confidentialité à tout moment. Toute modification sera publiée sur
              cette page avec une mise à jour de la date de dernière
              modification. Nous vous encourageons à consulter régulièrement
              cette page.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              12. Contact
            </h2>
            <p>
              Pour toute question concernant cette politique de confidentialité
              ou l&apos;exercice de vos droits, vous pouvez nous contacter :
            </p>
            <address className="not-italic mt-4">
              <strong>Palais du Raja</strong>
              <br />
              113 rue Colbert
              <br />
              37000 Tours, France
              <br />
              Téléphone :{" "}
              <a href="tel:0247648155" className="text-primary hover:underline">
                02 47 64 81 55
              </a>
            </address>
          </section>

          {/* Liens */}
          <div className="mt-12 pt-8 border-t border-primary/20 flex flex-col sm:flex-row gap-4">
            <Link
              href="/mentions-legales"
              className="text-primary hover:underline font-semibold"
            >
              Mentions légales
            </Link>
            <span className="hidden sm:inline">|</span>
            <Link
              href="/"
              className="text-primary hover:underline font-semibold"
            >
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
