"use client";

import React, { useState, useRef, useEffect } from "react";
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

type Dish = {
  id: number;
  name: string;
  price: string;
  description: string;
  image?: string | null;
};

export default function MenuSection({ 
  menuImg1, 
  menuImg2, 
  menuImg3, 
  menuImg4, 
  menuPdf, 
  menuDesc 
}: MenuSectionProps) {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selectedDish, setSelectedDish] = useState<number | null>(null);
  const [expandedDish, setExpandedDish] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const res = await fetch("/api/dishes");
        if (res.ok) {
          const data = await res.json();
          setDishes(data);
        }
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };
    fetchDishes();
  }, []);

  // Images disponibles pour les plats
  const dishImages = [menuImg1, menuImg2, menuImg3, menuImg4].filter(
    (img): img is string => img !== null && img !== undefined && img !== ""
  );

  // Image par défaut ou selon le plat sélectionné
  const getCurrentImage = () => {
    if (selectedDish) {
      const selectedDishData = dishes.find((d) => d.id === selectedDish);
      // Si le plat a une image, l'utiliser
      if (selectedDishData?.image) {
        return selectedDishData.image;
      }
      // Sinon, utiliser les images menuImg1-4 en rotation
      if (dishImages.length > 0) {
        return dishImages[selectedDish % dishImages.length] || dishImages[0];
      }
    }
    return dishImages[0] || null;
  };

  const currentImage = getCurrentImage();

  const handleDishClick = (dishId: number) => {
    // Annuler le timeout précédent s'il existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (expandedDish === dishId) {
      // Fermer le plat actuel
      setExpandedDish(null);
      setSelectedDish(null);
    } else if (expandedDish !== null) {
      // Un autre plat est ouvert, fermer d'abord puis ouvrir le nouveau après le délai
      setExpandedDish(null);
      timeoutRef.current = setTimeout(() => {
        setExpandedDish(dishId);
        setSelectedDish(dishId);
        timeoutRef.current = null;
      }, 300); // Délai correspondant à la durée de l'animation (duration-300)
    } else {
      // Aucun plat n'est ouvert, ouvrir directement
      setExpandedDish(dishId);
      setSelectedDish(dishId);
    }
  };

  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="relative w-full h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4.7rem)] grid grid-cols-3 overflow-hidden border-b border-secondary bg-primary"
    >
      {/* Première colonne - Texte et bouton */}
      <div className="col-span-3 lg:col-span-1 flex flex-col justify-center px-4 md:px-6 lg:px-8 xl:px-12 border-b lg:border-b-0 lg:border-r border-secondary">
        <ScrollAnimated direction="up" delay={0} className="space-y-6 max-w-md mx-auto lg:mx-0">
          <h2 id="menu-heading" className="relative font-head text-5xl md:text-6xl text-secondary mb-6">
            Carte & Menus
          </h2>
          
          <div className="space-y-4">
            <p className="text-lg md:text-xl text-light leading-relaxed">
              Plongez dans l&apos;univers envoûtant de la cuisine indienne traditionnelle. 
              Au Palais du Raja, chaque plat raconte une histoire, chaque épice révèle 
              un secret transmis de génération en génération.
            </p>
            <p className="text-lg md:text-xl text-light leading-relaxed">
              Découvrez une palette de saveurs exceptionnelles : currys généreux, 
              tandooris parfumés, biryanis savoureux et naans moelleux.
            </p>
          </div>

          {/* Bouton PDF */}
          {menuPdf && (
            <div className="mt-8">
              <a
                href={menuPdf}
                rel="noopener noreferrer"
                aria-label="Télécharger le menu complet au format PDF - Restaurant Palais du Raja"
                target="_blank"
                className="inline-block px-6 py-3 pb-2 bg-secondary text-primary font-semibold shadow-lg hover:bg-secondary/90 transition-all"
                title="Menu PDF du restaurant Palais du Raja - Téléchargement"
              >
                {menuDesc || "Découvrir la carte"}
              </a>
            </div>
          )}
        </ScrollAnimated>
      </div>

      {/* Deuxième colonne - Liste des plats populaires */}
      <div className="col-span-3 lg:col-span-1 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-secondary overflow-y-auto">
        <ScrollAnimated direction="up" delay={150} className="w-full">
          <h3 className="font-body text-md md:text-4xl text-secondary mb-6 ml-4">
            Plats populaires
          </h3>
          
          <div className="space-y-0">
            {dishes.length === 0 ? (
              <p className="text-light text-center py-4 px-4">
                Aucun plat disponible pour le moment.
              </p>
            ) : (
              dishes.map((dish) => (
              <div
                key={dish.id}
                className="border-b border-secondary w-full overflow-hidden"
              >
                <button
                  onClick={() => handleDishClick(dish.id)}
                  className="w-full px-4 py-3 flex justify-between items-center text-left hover:bg-primary/80 transition-colors cursor-pointer"
                  aria-expanded={expandedDish === dish.id}
                >
                  <span className="text-light font-semibold text-lg">
                    {dish.name}
                  </span>
                  <span className="text-light font-bold text-lg ml-4">
                    {dish.price}
                  </span>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedDish === dish.id 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-4 py-3 bg-primary/60 border-t border-secondary">
                    <p className="text-light text-base leading-relaxed">
                      {dish.description}
                    </p>
                  </div>
                </div>
              </div>
              ))
            )}
          </div>
        </ScrollAnimated>
      </div>

      {/* Troisième colonne - Image dynamique */}
      <div className="col-span-3 lg:col-span-1 w-full h-full relative overflow-hidden">
        {currentImage && (
          <ScrollAnimated direction="up" delay={300} className="w-full h-full">
            <div className="relative w-full h-full">
              <Image
                src={currentImage}
                alt={`Plat indien - Restaurant Palais du Raja, spécialités indiennes et pakistanaises à Tours`}
                fill
                loading="lazy"
                sizes="33.333vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
                className="transition-opacity duration-500"
                title={`Spécialité indienne - Palais du Raja`}
              />
            </div>
          </ScrollAnimated>
        )}
      </div>
    </section>
  );
}
