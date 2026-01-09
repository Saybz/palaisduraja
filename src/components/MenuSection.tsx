"use client";

import React from "react";
import Image from "next/image";
import ScrollAnimated from "@/components/ScrollAnimated";

type MenuSectionProps = {
  menuImg1?: string | null;
  menuImg2?: string | null;
  menuImg3?: string | null;
  menuImg4?: string | null;
  menuPdf?: string | null;
  menuDesc?: string | null;
};

export default function MenuSection({ 
  menuImg1, 
  menuImg2, 
  menuImg3, 
  menuImg4, 
  menuPdf, 
  menuDesc 
}: MenuSectionProps) {
  // Filtrer les images pour ne garder que celles qui existent
  const imagesToShow = [menuImg1, menuImg2, menuImg3, menuImg4].filter(
    (img): img is string => img !== null && img !== undefined && img !== ""
  );

  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="relative w-full section-responsive"
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
        {/* Partie gauche - Sticky */}
        <div className="lg:w-1/2 flex-shrink-0 lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-col gap-6 py-8">
            <ScrollAnimated direction="up" delay={0}>
              <h2 id="menu-heading" className="relative text-primary font-head text-5xl md:text-6xl mb-6 md:mb-8">
                Carte & Menus
              </h2>
            </ScrollAnimated>
            
            {/* Description cuisine indienne */}
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-head text-primary mb-4">
                Un Voyage Culinaire Authentique
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Plongez dans l&apos;univers envoûtant de la cuisine indienne traditionnelle. 
                Au Palais du Raja, chaque plat raconte une histoire, chaque épice révèle 
                un secret transmis de génération en génération.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Découvrez une palette de saveurs exceptionnelles : currys généreux, 
                tandooris parfumés, biryanis savoureux et naans moelleux. Nos chefs 
                maîtrisent l&apos;art subtil des épices pour vous offrir une expérience 
                gustative unique.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Laissez-vous transporter par les arômes du curry, du garam masala, 
                du cumin et du curcuma. Chaque bouchée est une invitation au voyage, 
                une découverte de l&apos;Inde à travers ses saveurs les plus authentiques.
              </p>
            </div>

            {/* Bouton PDF */}
            {menuPdf && (
              <div className="mt-6">
                <a
                  href={menuPdf}
                  rel="noopener noreferrer"
                  aria-label="Télécharger le menu complet au format PDF - Restaurant Palais du Raja"
                  target="_blank"
                  className="inline-block p-4 bg-primary text-white shadow-lg font-semibold hover:bg-secondary hover:text-primary transition-all rounded-lg"
                  title="Menu PDF du restaurant Palais du Raja - Téléchargement"
                >
                  {menuDesc || "Découvrir le menu"}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Partie droite - Images en colonne */}
        <div className="lg:w-1/2 flex-shrink-0">
          <div className="flex flex-col ">
            {imagesToShow.map((img, index) => (
              <div
                key={index}
                className="relative min-h-[400px] md:min-h-[500px] h-[50vh] w-full"
              >
                <div 
                  className="relative w-full h-full shadow-lg overflow-hidden"
                  style={{
                    boxShadow: "inset 0 0 30px 10px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  {img && (
                    <Image
                      src={img}
                      alt={`Plat indien ${index + 1} - Restaurant Palais du Raja, spécialités indiennes et pakistanaises à Tours`}
                      fill
                      loading={index === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                      className="transition-transform duration-300 hover:scale-105"
                      title={`Spécialité indienne ${index + 1} - Palais du Raja`}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

