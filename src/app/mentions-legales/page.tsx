import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du restaurant Palais du Raja à Tours",
  robots: {
    index: true,
    follow: true,
  },
};

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-light pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <h1 className="text-4xl md:text-5xl font-head text-primary mb-8">
          Mentions légales
        </h1>

        <div className="prose prose-lg max-w-none space-y-8 text-dark">
          {/* Retour à l&apos;accueil */}
          <div className="mt-12 pt-8 border-t border-primary/20">
            <Link
              href="/"
              className="inline-block text-primary hover:underline font-semibold"
            >
              ← Retour à l&apos;accueil
            </Link>
          </div>
          {/* Éditeur du site */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              1. Éditeur du site
            </h2>
            <p>
              Le site <strong>palaisduraja.fr</strong> est édité par :
            </p>
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

          {/* Directeur de publication */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              2. Directeur de publication
            </h2>
            <p>
              Le directeur de publication est le représentant légal du
              restaurant Palais du Raja.
            </p>
          </section>

          {/* Hébergement */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              3. Hébergement
            </h2>
            <p>Le site est hébergé par :</p>
            <p className="mt-2">
              {/* À compléter avec les informations de l'hébergeur */}
              Les informations d&apos;hébergement seront complétées lors de la
              mise en production.
            </p>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              4. Propriété intellectuelle
            </h2>
            <p>
              L&apos;ensemble de ce site relève de la législation française et
              internationale sur le droit d&apos;auteur et la propriété
              intellectuelle. Tous les droits de reproduction sont réservés, y
              compris pour les documents téléchargeables et les représentations
              iconographiques et photographiques.
            </p>
            <p className="mt-4">
              La reproduction de tout ou partie de ce site sur un support
              électronique quel qu&apos;il soit est formellement interdite sauf
              autorisation expresse du directeur de la publication.
            </p>
          </section>

          {/* Données personnelles */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              5. Données personnelles
            </h2>
            <p>
              Conformément à la loi n° 78-17 du 6 janvier 1978 relative à
              l&apos;informatique, aux fichiers et aux libertés, vous disposez
              d&apos;un droit d&apos;accès, de modification et de suppression
              des données qui vous concernent.
            </p>
            <p className="mt-4">
              Pour exercer ce droit, vous pouvez nous contacter :
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
              Pour plus d&apos;informations, consultez notre{" "}
              <Link
                href="/politique-confidentialite"
                className="text-primary hover:underline"
              >
                politique de confidentialité
              </Link>
              .
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">6. Cookies</h2>
            <p>
              Ce site utilise des cookies pour améliorer l&apos;expérience
              utilisateur. En naviguant sur ce site, vous acceptez
              l&apos;utilisation de cookies conformément à notre politique de
              confidentialité.
            </p>
          </section>

          {/* Responsabilité */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              7. Responsabilité
            </h2>
            <p>
              Les informations contenues sur ce site sont aussi précises que
              possible et le site est périodiquement remis à jour, mais peut
              toutefois contenir des inexactitudes, des omissions ou des
              lacunes.
            </p>
            <p className="mt-4">
              Palais du Raja ne pourra être tenu responsable des dommages
              directs et indirects causés au matériel de l&apos;utilisateur,
              lors de l&apos;accès au site, et résultant soit de
              l&apos;utilisation d&apos;un matériel ne répondant pas aux
              spécifications, soit de l&apos;apparition d&apos;un bug ou
              d&apos;une incompatibilité.
            </p>
          </section>

          {/* Liens hypertextes */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              8. Liens hypertextes
            </h2>
            <p>
              Le site peut contenir des liens hypertextes vers d&apos;autres
              sites présents sur le réseau Internet. Les liens vers ces autres
              ressources vous font quitter le site palaisduraja.fr.
            </p>
            <p className="mt-4">
              Il est possible de créer un lien vers la page de présentation de
              ce site sans autorisation expresse de l&apos;éditeur. Aucune
              autorisation ni demande d&apos;information préalable ne peut être
              exigée par l&apos;éditeur à l&apos;égard d&apos;un site qui
              souhaite établir un lien vers le site de l&apos;éditeur. Il
              convient toutefois d&apos;afficher ce site dans une nouvelle
              fenêtre du navigateur.
            </p>
          </section>

          {/* Droit applicable */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              9. Droit applicable
            </h2>
            <p>
              Les présentes mentions légales sont régies par le droit français.
              En cas de litige et à défaut d&apos;accord amiable, le litige sera
              porté devant les tribunaux français conformément aux règles de
              compétence en vigueur.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">
              10. Contact
            </h2>
            <p>
              Pour toute question concernant les présentes mentions légales,
              vous pouvez nous contacter :
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

          {/* Retour à l&apos;accueil */}
          <div className="mt-12 pt-8 border-t border-primary/20">
            <Link
              href="/"
              className="inline-block text-primary hover:underline font-semibold"
            >
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
