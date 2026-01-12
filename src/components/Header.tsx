"use client";
import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import LogOutBtn from "@/components/LogOutBtn";
import Link from "next/link";

const sections = [
  { id: "about", label: "Histoire" },
  { id: "menu", label: "Menu" },
  { id: "infos", label: "Infos" },
  { id: "contact", label: "Contact" },
];

const Header: React.FC = () => {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const isLogin = pathname.startsWith("/admin/login");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const isClickingRef = useRef(false);
  const activeSectionRef = useRef<string>("");
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollY.current;

      // Toujours afficher le header en haut de page
      if (currentScrollY <= 10) {
        setIsHeaderVisible(true);
        setIsScrolled(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      setIsScrolled(true);

      // Si on scroll vers le bas (différence positive) et qu'on n'est pas en haut
      if (scrollDifference > 5 && currentScrollY > 100) {
        setIsHeaderVisible(false);
      }
      // Si on scroll vers le haut (différence négative), même un petit scroll
      else if (scrollDifference < -5) {
        setIsHeaderVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initialiser lastScrollY au chargement
    lastScrollY.current = window.scrollY;
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Détecter la section active au scroll
  useEffect(() => {
    if (isAdminPage || isLogin) return;

    const detectActiveSection = () => {
      if (isClickingRef.current) return;

      const scrollPosition = window.scrollY + 150; // Offset pour compenser le header
      let currentActive = "";

      // Parcourir les sections de bas en haut pour trouver la première visible
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop - 100) {
            currentActive = sections[i].id;
            break;
          }
        }
      }

      // Si on est en haut de la page, aucune section active
      if (window.scrollY < 100) {
        currentActive = "";
      }

      // Mettre à jour seulement si la section a changé
      if (currentActive !== activeSectionRef.current) {
        activeSectionRef.current = currentActive;
        setActiveSection(currentActive);
      }
    };

    // Détecter au scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
      detectActiveSection();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    detectActiveSection(); // Vérifier au chargement

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isAdminPage, isLogin]);

  // Mettre à jour la position de l'indicateur
  useEffect(() => {
    if (!activeSection || !navRef.current) {
      setIndicatorStyle({ left: 0, width: 0 });
      return;
    }

    const updateIndicator = () => {
      const activeLink = linkRefs.current[activeSection];
      if (activeLink && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();

        setIndicatorStyle({
          left: linkRect.left - navRect.left,
          width: linkRect.width,
        });
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeSection]);

  // Fonction pour scroller vers une section sans ajouter l'ID dans l'URL
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();

    // Annuler le scroll précédent si un nouveau clic arrive
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }

    // Définir immédiatement la section active et bloquer la détection au scroll
    isClickingRef.current = true;
    activeSectionRef.current = sectionId;
    setActiveSection(sectionId);

    const section = document.getElementById(sectionId);
    if (section) {
      // Calculer l'offset pour compenser la hauteur du header fixe
      const headerHeight = 80;
      const elementPosition =
        section.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      // Annuler tout scroll en cours en forçant un scroll instantané à la position actuelle
      const currentScroll = window.pageYOffset;
      window.scrollTo({
        top: currentScroll,
        behavior: "auto",
      });

      // Attendre un frame pour s'assurer que le scroll précédent est annulé
      requestAnimationFrame(() => {
        // Démarrer le nouveau scroll
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Détecter la fin du scroll smooth avec requestAnimationFrame
        let lastScrollTop = window.pageYOffset;
        let consecutiveStableFrames = 0;
        const requiredStableFrames = 3; // Nombre de frames stables nécessaires pour considérer le scroll terminé

        const checkScrollEnd = () => {
          // Vérifier si cette fonction a été annulée
          if (animationFrameRef.current === null) return;

          const currentScrollTop = window.pageYOffset;
          const scrollDelta = Math.abs(currentScrollTop - lastScrollTop);

          // Si le scroll a changé significativement, on est encore en train de scroller
          if (scrollDelta > 1) {
            lastScrollTop = currentScrollTop;
            consecutiveStableFrames = 0;
            animationFrameRef.current = requestAnimationFrame(checkScrollEnd);
          } else {
            // Le scroll semble stable
            consecutiveStableFrames++;

            if (consecutiveStableFrames >= requiredStableFrames) {
              // Le scroll est terminé
              isClickingRef.current = false;
              animationFrameRef.current = null;
              if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
                scrollTimeoutRef.current = null;
              }
            } else {
              animationFrameRef.current = requestAnimationFrame(checkScrollEnd);
            }
          }
        };

        // Démarrer la détection après un court délai
        setTimeout(() => {
          if (animationFrameRef.current === null) {
            animationFrameRef.current = requestAnimationFrame(checkScrollEnd);
          }
        }, 100);

        // Sécurité : réactiver après 3 secondes max
        scrollTimeoutRef.current = setTimeout(() => {
          isClickingRef.current = false;
          if (animationFrameRef.current !== null) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
          }
          scrollTimeoutRef.current = null;
        }, 3000);
      });
    }
  };

  return (
    <header
      className={`z-50 sticky top-0 w-full font-body text-primary py-2 md:py-6 transition-all duration-300 header-enter ${
        isScrolled
          ? "shadow-lg bg-light/80 backdrop-blur-md border-b-[0.2px] border-primary/90"
          : "border-b-[0.2px] border-transparent"
      }
      ${isAdminPage ? "bg-light" : ""}
      `}
      style={{
        transform: isHeaderVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <div className="h-full w-full mx-auto px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 flex flex-col md:flex-row justify-between items-center">
        <Link
          href="/"
          aria-label="Accueil"
          className="mb-2 md:mb-0 flex items-center"
        >
          <Image
            src="/logo/Logo_palaisduraja.svg"
            alt="Palais du Raja"
            width={150}
            height={50}
            className="h-8 md:h-10 w-auto"
            priority
          />
        </Link>
        {!isAdminPage && !isLogin && (
          <nav
            ref={navRef}
            aria-label="Navigation principale"
            className="relative flex w-full gap-4 md:w-auto items-center justify-around font-semibold"
          >
            {/* Indicateur animé */}
            {activeSection && indicatorStyle.width > 0 && (
              <div
                className="absolute bottom-0 h-0.5 bg-secondary transition-all ease-out"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                  transitionDuration: isClickingRef.current ? "0.2s" : "0.5s",
                  transitionProperty: "left, width",
                }}
              />
            )}

            {sections.map((section) => (
              <a
                key={section.id}
                ref={(el) => {
                  linkRefs.current[section.id] = el;
                }}
                href={`#${section.id}`}
                onClick={(e) => scrollToSection(e, section.id)}
                className={`relative text-md md:text-sm text-primary chover:text-primary-light cursor-pointer transition-colors ${
                  activeSection === section.id ? "text-secondary" : ""
                }`}
              >
                {section.label}
              </a>
            ))}
          </nav>
        )}
        {isAdminPage && !isLogin && <LogOutBtn />}
      </div>
    </header>
  );
};

export default Header;
