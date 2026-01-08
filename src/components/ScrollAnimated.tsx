"use client";

import React, { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

type ScrollAnimatedProps = {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  className?: string;
};

export default function ScrollAnimated({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: ScrollAnimatedProps) {
  const { ref, inView } = useInView({
    threshold: 0.25, // Déclenchement plus tardif - l'élément doit être visible à 25% avant de se déclencher
    triggerOnce: true, // L'animation ne se déclenche qu'une seule fois
    rootMargin: "0px 0px -50px 0px", // Décalage supplémentaire pour déclencher plus tard
  });

  // Classes CSS définies dans globals.css
  const getAnimationClass = () => {
    if (inView) {
      switch (direction) {
        case "up":
          return "animate-in-up";
        case "down":
          return "animate-in-down";
        case "left":
          return "animate-in-left";
        case "right":
          return "animate-in-right";
        case "fade":
          return "animate-in-fade";
        default:
          return "animate-in-up";
      }
    } else {
      switch (direction) {
        case "up":
          return "animate-out-up";
        case "down":
          return "animate-out-down";
        case "left":
          return "animate-out-left";
        case "right":
          return "animate-out-right";
        case "fade":
          return "animate-out-fade";
        default:
          return "animate-out-up";
      }
    }
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

