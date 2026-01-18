"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ScrollToTopButton() {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function toggleVisibility() {
      setIsVisible(window.scrollY > 300);
    }

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label={t("scrollToTop")}
      className="fixed bottom-20 md:bottom-30 right-6 z-50 bg-primary/60 backdrop-blur-md text-secondary p-3 rounded-full shadow-lg border border-primary-light/90 hover:bg-primary/80 transition-all"
    >
      <ArrowUp className="w-5 h-5 text-light" />
    </button>
  );
}
