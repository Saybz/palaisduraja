"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CtaBtn from "@/components/CtaButton";

type HeroSectionProps = {
  banner?: string | null;
  tel?: string | null;
  menuPdf?: string | null;
};

export default function HeroSection({ banner, tel, menuPdf }: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calcul du décalage parallax (l'image se déplace plus lentement que le scroll)
  const parallaxOffset = scrollY * 0.5;

  // Séparer les mots du titre pour les animer individuellement
  const titleWords = "Palais du Raja".split(" ");

  return (
    <section 
      id="" 
      className="relative w-full h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4.7rem)] overflow-hidden flex flex-col border-y border-primary"
    >
      {/* Partie principale : Image et Titre */}
      <div className="grid grid-cols-3 flex-1 min-h-0 relative">
        {/* Partie gauche - Contenu texte (1/3) - Visible seulement sur desktop */}
        <div className="hidden lg:flex lg:col-span-1 flex-col justify-center px-4 md:px-6 lg:px-8 xl:px-12 bg-light hero-content lg:border-r border-primary">
          <header className="space-y-4 md:space-y-6">
            <h1 className="relative font-head font-bold text-4xl md:text-5xl lg:text-6xl text-primary mb-4 md:mb-6 flex flex-wrap gap-2 md:gap-3">
              {titleWords.map((word, index) => (
                <span
                  key={index}
                  className="hero-word inline-block"
                  style={{
                    animationDelay: `${index * 100 + 300}ms`,
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>
            <p className="text-base md:text-lg text-dark font-semibold hero-subtitle" role="doc-subtitle">
              Restaurant traditionnel indien et pakistanais à Tours
            </p>
          </header>
          <div className="mt-6 md:mt-8 hero-button">
            <CtaBtn
              type="tel"
              value={tel || "0247648155"}
              label="Réserver"
              aria-label="Réserver une table au restaurant Palais du Raja par téléphone"
            />
          </div>
        </div>

        {/* Partie droite - Image (2/3 sur desktop, tout l'écran sur mobile) */}
        {banner && (
          <div className="col-span-3 lg:col-span-2 w-full h-full relative overflow-hidden border-t lg:border-t-0 border-primary">
            <div
              className="absolute inset-0 w-full h-[120%] hero-banner-zoom"
              style={{
                transform: `translateY(${parallaxOffset}px)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={banner}
                  alt="Salle du restaurant Palais du Raja à Tours"
                  fill
                  priority
                  sizes="100vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  className=""
                />
              </div>
            </div>
            {/* Overlay sombre pour améliorer la lisibilité du texte sur mobile */}
            <div className="absolute inset-0 bg-black/30 lg:bg-transparent" />
            
            {/* Titre en overlay sur mobile */}
            <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-6 lg:hidden z-10 hero-content">
              <header className="space-y-4">
                <h1 className="relative font-head font-bold text-4xl md:text-5xl text-secondary drop-shadow-lg mb-4 flex flex-wrap gap-2 md:gap-3">
                  {titleWords.map((word, index) => (
                    <span
                      key={index}
                      className="hero-word inline-block"
                      style={{
                        animationDelay: `${index * 100 + 300}ms`,
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </h1>
                <p className="text-base md:text-lg text-secondary font-semibold drop-shadow-lg hero-subtitle" role="doc-subtitle">
                  Restaurant traditionnel indien et pakistanais à Tours
                </p>
              </header>
              <div className="mt-6 md:mt-8 hero-button">
                <CtaBtn
                  type="tel"
                  value={tel || "0247648155"}
                  label="Réserver"
                  aria-label="Réserver une table au restaurant Palais du Raja par téléphone"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Section inférieure : Sur place/à emporter + Bouton carte (même hauteur que le header) */}
      <div className="grid grid-cols-3 w-full flex-shrink-0">
        {/* Div gauche - Texte "Sur place ou à emporter" (1/3) */}
        <div className="col-span-3 lg:col-span-1 border-t border-r border-primary flex items-center justify-start px-4 md:px-6 lg:px-8 xl:px-12 bg-light h-14 md:h-20">
          <p className="text-base md:text-lg font-body text-primary font-bold text-center">
            Sur place ou à emporter
          </p>
        </div>
        
        {/* Div droite - Bouton "Découvrir la carte" (2/3) */}
        <div className="col-span-3 lg:col-span-2 flex items-center justify-start px-4 md:px-6 lg:px-8 xl:px-12 h-14 md:h-20 border-t border-primary">
          {menuPdf && (
            <a
              href={menuPdf}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Découvrir la carte du restaurant Palais du Raja"
              className="inline-block px-6 md:px-8 py-2 md:pt-3 md:pb-2 bg-secondary text-primary font-semibold shadow-lg hover:bg-secondary/90 transition-colors"
            >
              Découvrir la carte
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

