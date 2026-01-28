"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ScrollAnimated from "@/components/ScrollAnimated";
import CtaBtn from "@/components/CtaButton";

type MenuSectionProps = {
  menuImg1?: string | null;
  menuImg2?: string | null;
  menuImg3?: string | null;
  menuImg4?: string | null;
  menuPdf?: string | null;
  menuDesc?: string | null;
  locale?: string;
};

type Dish = {
  id: number;
  name: string;
  price: string;
  description: string;
  nameEn?: string | null;
  descriptionEn?: string | null;
  image?: string | null;
};

export default function MenuSection({
  menuImg1,
  menuImg2,
  menuImg3,
  menuImg4,
  menuPdf,
  locale = "fr",
}: MenuSectionProps) {
  const t = useTranslations("menu");
  const [dishes, setDishes] = useState<Dish[]>([]);

  // Helper pour obtenir le nom/description selon la langue
  const getLocalizedDishName = (dish: Dish) => {
    if (locale === "en" && dish.nameEn) return dish.nameEn;
    return dish.name;
  };

  const getLocalizedDishDescription = (dish: Dish) => {
    if (locale === "en" && dish.descriptionEn) return dish.descriptionEn;
    return dish.description;
  };
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

  // À l'initialisation, ouvrir par défaut le premier plat populaire
  useEffect(() => {
    if (dishes.length > 0 && expandedDish === null && selectedDish === null) {
      const firstId = dishes[0].id;
      setExpandedDish(firstId);
      setSelectedDish(firstId);
    }
  }, [dishes, expandedDish, selectedDish]);

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

  // Obtenir l'image pour un plat spécifique
  const getDishImage = (dishId: number) => {
    const dish = dishes.find((d) => d.id === dishId);
    // Si le plat a une image, l'utiliser
    if (dish?.image) {
      return dish.image;
    }
    // Sinon, utiliser les images menuImg1-4 en rotation
    if (dishImages.length > 0) {
      return dishImages[dishId % dishImages.length] || dishImages[0];
    }
    return null;
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
      className="relative w-full min-h-[calc(100vh-3.5rem)] md:h-[calc(100vh-5.7rem)] grid grid-cols-3 overflow-hidden border-b border-secondary bg-primary"
    >
      {/* Première colonne - Texte et bouton */}
      <div className="col-span-3 lg:col-span-1 py-10 flex flex-col justify-center px-4 md:px-6 lg:px-8 xl:px-12 border-b lg:border-b-0 lg:border-r border-secondary">
        <ScrollAnimated
          direction="up"
          delay={0}
          className="space-y-6 max-w-md mx-auto lg:mx-0"
        >
          <h2
            id="menu-heading"
            className="relative font-head text-5xl md:text-6xl text-secondary mb-6"
          >
            {t("title")}
          </h2>

          <div className="space-y-4">
            <p className="text-lg md:text-xl text-light leading-relaxed">
              {t("description1")}
            </p>
            <p className="text-lg md:text-xl text-light leading-relaxed">
              {t("description2")}
            </p>
          </div>

          {/* Bouton PDF */}
          {menuPdf && (
            <div className="mt-8">
              <CtaBtn
                type="link"
                value={menuPdf}
                label={t("downloadMenu")}
                className="bg-secondary text-primary hover:bg-secondary/90"
              />
            </div>
          )}
        </ScrollAnimated>
      </div>

      {/* Deuxième colonne - Liste des plats populaires */}
      <div className="col-span-3 lg:col-span-1 py-10 flex flex-col justify-start lg:justify-center border-b lg:border-b-0 lg:border-r border-secondary lg:overflow-y-auto">
        <ScrollAnimated direction="up" delay={150} className="w-full">
          <h3 className="font-body text-md md:text-4xl text-secondary mb-6 ml-4">
            {t("popularDishes")}
          </h3>

          <div className="space-y-0">
            {dishes.length === 0 ? (
              <p className="text-light text-center py-4 px-4">
                {t("noDishes")}
              </p>
            ) : (
              dishes.map((dish) => {
                const isExpanded = expandedDish === dish.id;
                return (
                <div
                  key={dish.id}
                  className="border-b border-secondary w-full overflow-hidden"
                >
                  <button
                    onClick={() => handleDishClick(dish.id)}
                    className="w-full px-4 py-3 flex justify-between items-center text-left hover:bg-primary/80 transition-colors cursor-pointer"
                    aria-expanded={expandedDish === dish.id}
                  >
                    <span className="flex items-center gap-2">
                      {/* Petit indicateur d'état ouvert/fermé */}
                      <span
                        className={`inline-flex h-2.5 w-2.5 mb-1 rounded-full border border-secondary transition-colors duration-200 ${
                          isExpanded ? "bg-secondary" : "bg-transparent"
                        }`}
                        aria-hidden="true"
                      />
                      <span className="text-light font-semibold text-lg">
                        {getLocalizedDishName(dish)}
                      </span>
                    </span>
                    <span className="text-light font-bold text-lg ml-4">
                      {dish.price}€
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedDish === dish.id
                        ? "max-h-[800px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-4 py-3 bg-primary/60 border-t border-secondary">
                      <p className="text-light text-base leading-relaxed mb-4">
                        {getLocalizedDishDescription(dish)}
                      </p>
                      {/* Image du plat - visible uniquement en mobile */}
                      {getDishImage(dish.id) && (
                        <div className="lg:hidden relative w-full aspect-video rounded-md overflow-hidden mt-4">
                          <Image
                            src={getDishImage(dish.id)!}
                            alt={`${dish.name} - Palais du Raja`}
                            fill
                            loading="lazy"
                            sizes="100vw"
                            style={{
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                            className="transition-opacity duration-500"
                            title={`${dish.name} - Palais du Raja`}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
              })
            )}
          </div>
        </ScrollAnimated>
      </div>

      {/* Troisième colonne - Image dynamique (visible uniquement en desktop) */}
      <div className="hidden lg:block col-span-3 lg:col-span-1 w-full h-full relative overflow-hidden">
        {currentImage && (
          <ScrollAnimated direction="up" delay={300} className="w-full h-full">
            <div className="relative w-full h-full">
              <Image
                src={currentImage}
                alt="Palais du Raja - Tours"
                fill
                loading="lazy"
                sizes="33.333vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
                className="transition-opacity duration-500"
                title="Palais du Raja"
              />
            </div>
          </ScrollAnimated>
        )}
      </div>
    </section>
  );
}
