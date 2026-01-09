"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MoveDown } from "lucide-react";
import CtaBtn from "@/components/CtaButton";

type HeroSectionProps = {
  banner?: string | null;
  tel?: string | null;
};

export default function HeroSection({ banner, tel }: HeroSectionProps) {
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
    <section id="" className="relative w-full overflow-hidden">
      {banner && (
        <div className="h-screen w-full relative">
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
        </div>
      )}
      <div className="absolute inset-0 bg-black/40 z-10 hero-overlay" aria-hidden="true" />
      <div className="absolute inset-0 flex flex-col text-secondary items-center justify-center z-20 section-responsive text-center hero-content">
        <header>
          <h1 className="relative font-body font-bold text-5xl md:text-7xl mb-2 md:mb-4 flex flex-wrap justify-center gap-2 md:gap-3">
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
          <p className="text-lg mb-2 font-semibold drop-shadow-lg hero-subtitle" role="doc-subtitle">
            Restaurant traditionnel indien et pakistanais à Tours
          </p>
          <p className="text-lg font-semibold mb-6 drop-shadow-lg hero-schedule">
            <time dateTime="2024">Ouvert du</time> <strong className="font-black">mardi soir</strong> au
            <strong className="font-black"> dimanche</strong>
          </p>
        </header>
        <div className="hero-button">
          <CtaBtn
            type="tel"
            value={tel || "0247648155"}
            label="Réserver une table"
            aria-label="Réserver une table au restaurant Palais du Raja par téléphone"
          />
        </div>
      </div>
      <a href="#about" aria-label="Aller à la section À propos">
        <MoveDown className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-white drop-shadow-lg hero-arrow" />
      </a>
    </section>
  );
}

