"use client";

import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { locales, localeNames, type Locale, defaultLocale } from "@/i18n/config";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = useLocale();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;

    // Définir le cookie NEXT_LOCALE pour persister la préférence
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    // Retirer le préfixe de locale actuel du pathname
    let pathWithoutLocale = pathname;
    
    // Si le pathname commence par une locale connue, la retirer
    for (const loc of locales) {
      if (pathname.startsWith(`/${loc}/`)) {
        pathWithoutLocale = pathname.substring(loc.length + 1);
        break;
      } else if (pathname === `/${loc}`) {
        pathWithoutLocale = "/";
        break;
      }
    }

    // Construire le nouveau chemin
    let newPath: string;
    if (newLocale === defaultLocale) {
      // Pour la langue par défaut (fr), pas de préfixe
      newPath = pathWithoutLocale || "/";
    } else {
      // Pour les autres langues, ajouter le préfixe
      newPath = `/${newLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
    }

    // Utiliser une navigation complète pour s'assurer que le middleware est appelé
    window.location.href = newPath;
  };

  return (
    <div className="flex items-center gap-1 text-sm">
      {locales.map((loc, index) => (
        <span key={loc} className="flex items-center">
          <button
            onClick={() => switchLocale(loc)}
            className={`px-1 py-0.5 transition-colors ${
              currentLocale === loc
                ? "text-secondary font-bold"
                : "text-primary/60 hover:text-primary"
            }`}
            aria-label={`Switch to ${localeNames[loc]}`}
            aria-current={currentLocale === loc ? "true" : undefined}
          >
            {loc.toUpperCase()}
          </button>
          {index < locales.length - 1 && (
            <span className="text-primary/40"> |</span>
          )}
        </span>
      ))}
    </div>
  );
}
