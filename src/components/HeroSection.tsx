"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import CtaBtn from "@/components/CtaButton";
import { Mail, MapPin } from "lucide-react";

type HeroSectionProps = {
  banner?: string | null;
  tel?: string | null;
  menuPdf?: string | null;
  mail?: string | null;
};

export default function HeroSection({
  banner,
  tel,
  menuPdf,
  mail,
}: HeroSectionProps) {
  const t = useTranslations("hero");
  const [scrollY, setScrollY] = useState(0);
  const [logoSvg, setLogoSvg] = useState<string>("");
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Détecter si mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll optimisé avec requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (rafRef.current) return; // Éviter les appels multiples
    
    rafRef.current = requestAnimationFrame(() => {
      setScrollY(window.scrollY);
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  useEffect(() => {
    let animationTimer: NodeJS.Timeout;

    // Charger le SVG en inline pour permettre les animations CSS
    fetch("/logo/Logo_titre.svg")
      .then((res) => res.text())
      .then((svg) => {
        setLogoSvg(svg);
        // Marquer que l'animation a été jouée après la durée de l'animation
        // Temps total: délai max (2.3s) + durée draw (2s) + délai fill (4.3s) + durée fill (0.5s) ≈ 5s
        animationTimer = setTimeout(() => {
          setAnimationPlayed(true);
        }, 5000);
      })
      .catch((err) => console.error("Erreur lors du chargement du SVG:", err));

    return () => {
      if (animationTimer) clearTimeout(animationTimer);
    };
  }, []);

  // Calcul du décalage parallax - réduit sur mobile pour éviter les saccades
  // Desktop: 0.3, Mobile: 0.15 (plus léger)
  const parallaxMultiplier = isMobile ? 0.15 : 0.3;
  const parallaxOffset = scrollY * parallaxMultiplier;

  return (
    <section
      id=""
      className="relative w-full h-[calc(100vh-8rem)] md:h-[calc(100vh-5.5rem)] overflow-hidden flex flex-col border-y border-primary"
    >
      {/* Partie principale : Image et Titre */}
      <div className="grid grid-cols-3 flex-1 min-h-0 relative">
        {/* Partie gauche - Contenu texte (1/3) - Visible seulement sur desktop */}
        <div className="hidden lg:flex lg:col-span-1 flex-col justify-center px-4 md:px-6 lg:px-8 xl:px-12 bg-light hero-content lg:border-r border-primary">
          <header className="space-y-4 md:space-y-6">
            <div
              className={`mb-4 md:mb-6 ${
                !animationPlayed ? "logo-draw-svg" : "logo-draw-svg-animated"
              }`}
            >
              {logoSvg ? (
                <div
                  className="w-full max-w-md h-auto"
                  dangerouslySetInnerHTML={{ __html: logoSvg }}
                />
              ) : (
                <Image
                  src="/logo/Logo_titre.svg"
                  alt="Palais du Raja"
                  width={250}
                  height={80}
                  className="w-full max-w-md h-auto"
                  priority
                />
              )}
            </div>
            <p
              className="text-base md:text-lg text-dark font-semibold hero-subtitle"
              role="doc-subtitle"
            >
              {t("subtitle")}
            </p>
          </header>
          <div className="mt-6 md:mt-8 flex flex-row flex-wrap gap-6 hero-button">
            <CtaBtn
              type="tel"
              value={tel || "0247648155"}
              label={t("reserve")}
              aria-label={t("reserve")}
            />
            {menuPdf && (
              <CtaBtn
                type="link"
                value={menuPdf}
                label={t("discoverMenu")}
                className="bg-secondary text-primary hover:bg-secondary/90"
              />
            )}
          </div>
        </div>

        {/* Partie droite - Image (2/3 sur desktop, tout l'écran sur mobile) */}
        {banner && (
          <div className="col-span-3 lg:col-span-2 w-full h-full relative overflow-hidden border-t lg:border-t-0 border-primary">
            <div
              className="absolute inset-0 w-full h-[115%] hero-banner-zoom"
              style={{
                transform: `translate3d(0, ${parallaxOffset}px, 0)`,
                willChange: "transform",
              }}
            >
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={banner}
                  alt="Palais du Raja - Tours"
                  fill
                  priority
                  sizes="100vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  className=""
                />
              </div>
            </div>
            {/* Overlay sombre avec gradient pour améliorer la lisibilité du texte sur mobile */}
            <div className="absolute inset-0 lg:hidden bg-gradient-to-b from-black/40 via-black/50 to-black/60" />

            {/* Contenu en overlay sur mobile */}
            <div className="absolute inset-0 flex flex-col justify-center items-center px-4 md:px-6 lg:hidden z-10 hero-content">
              <header className="space-y-4 text-center">
                <div
                  className={`mb-4 ${
                    !animationPlayed
                      ? "logo-draw-svg"
                      : "logo-draw-svg-animated"
                  }`}
                  style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5))" }}
                >
                  {logoSvg ? (
                    <div
                      className="w-full max-w-md h-auto"
                      dangerouslySetInnerHTML={{ __html: logoSvg }}
                    />
                  ) : (
                    <Image
                      src="/logo/Logo_titre.svg"
                      alt="Palais du Raja"
                      width={300}
                      height={100}
                      className="w-full max-w-md h-auto drop-shadow-lg"
                      priority
                    />
                  )}
                </div>
                <p
                  className="text-base md:text-lg text-secondary font-semibold hero-subtitle"
                  role="doc-subtitle"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
                >
                  {t("subtitle")}
                </p>
              </header>
              
              {/* Boutons et texte en overlay sur mobile */}
              <div className="mt-6 flex flex-col items-center gap-4 hero-button">
                <CtaBtn
                  type="tel"
                  value={tel || "0247648155"}
                  label={t("reserve")}
                  aria-label={t("reserve")}
                />
                {menuPdf && (
                  <CtaBtn
                    type="link"
                    value={menuPdf}
                    label={t("discoverMenu")}
                    className="bg-secondary text-primary hover:bg-secondary/90"
                  />
                )}
                <p 
                  className="text-sm text-light font-semibold"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
                >
                  {t("takeaway")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section inférieure : Icônes sociales + Sur place/à emporter */}
      {/* Version Mobile */}
      <div className="flex lg:hidden items-center justify-center gap-8 w-full flex-shrink-0 bg-light border-t border-primary h-14">
        {mail && (
          <a
            href={`mailto:${mail}`}
            aria-label="Envoyer un email"
            className="text-primary hover:text-secondary transition-colors"
          >
            <Mail size={22} strokeWidth={1.5} />
          </a>
        )}
        <a
          href="https://www.instagram.com/palaisduraja/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-primary hover:text-secondary transition-colors"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
          </svg>
        </a>
        <a
          href="https://www.google.com/maps/search/?api=1&query=Palais+du+Raja+113+Rue+Colbert+37000+Tours"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Google Maps"
          className="text-primary hover:text-secondary transition-colors"
        >
          <MapPin size={22} strokeWidth={1.5} />
        </a>
      </div>

      {/* Version Desktop */}
      <div className="hidden lg:grid grid-cols-3 w-full flex-shrink-0">
        {/* Div gauche - Icônes sociales (1/3) */}
        <div className="col-span-1 border-t border-r border-primary flex items-center justify-start gap-6 p-4 md:px-6 lg:px-8 xl:px-12 bg-light h-20">
          {mail && (
            <a
              href={`mailto:${mail}`}
              aria-label="Envoyer un email"
              className="text-primary hover:text-secondary transition-colors"
            >
              <Mail size={24} strokeWidth={1.5} />
            </a>
          )}
          <a
            href="https://www.instagram.com/palaisduraja/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-primary hover:text-secondary transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Palais+du+Raja+113+Rue+Colbert+37000+Tours"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Maps"
            className="text-primary hover:text-secondary transition-colors"
          >
            <MapPin size={24} strokeWidth={1.5} />
          </a>
        </div>

        {/* Div droite - Texte "Sur place ou à emporter" (2/3) */}
        <div className="col-span-2 flex items-center justify-start p-4 md:px-6 lg:px-8 xl:px-12 h-20 border-t border-primary">
          <p className="text-base md:text-lg font-body text-primary font-bold">
            {t("takeaway")}
          </p>
        </div>
      </div>
    </section>
  );
}
