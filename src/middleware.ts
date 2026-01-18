import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { locales, defaultLocale } from "./i18n/config";

// Middleware next-intl pour la gestion des langues
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed", // Pas de préfixe pour la langue par défaut (fr)
  localeDetection: false, // Désactiver la détection automatique basée sur Accept-Language
});

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Exclure les routes admin, api, login et fichiers statiques de l'internationalisation
  const isAdminRoute = pathname.startsWith("/admin");
  const isApiRoute = pathname.startsWith("/api");
  const isLoginRoute = pathname.startsWith("/login");
  const isStaticFile =
    pathname.includes(".") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/logo") ||
    pathname.startsWith("/uploads") ||
    pathname.startsWith("/img");

  // Pour les routes admin, vérifier l'authentification
  if (isAdminRoute) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Ne pas appliquer l'i18n sur les routes spéciales
  if (isApiRoute || isLoginRoute || isStaticFile) {
    return NextResponse.next();
  }

  // Appliquer l'internationalisation pour les autres routes
  const response = intlMiddleware(req);
  
  return response;
}

export const config = {
  // Matcher pour toutes les routes sauf les fichiers statiques
  matcher: ["/((?!_next|.*\\..*).*)"],
};
