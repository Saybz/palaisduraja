"use client";
import React from "react";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

// 🔧 Définir le type d’une icône Lucide
type LucideIcon = typeof Phone;

type CtaBtnProps = {
  type: "tel" | "email" | "location" | "link";
  value: string;
  label: string;
  className?: string;
};

export default function CtaBtn({
  type,
  value,
  label,
  className = "",
}: CtaBtnProps) {
  let href = "#";
  let Icon: LucideIcon = ExternalLink;

  switch (type) {
    case "tel":
      href = `tel:${value}`;
      Icon = Phone;
      break;
    case "email":
      href = `mailto:${value}`;
      Icon = Mail;
      break;
    case "location":
      href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        value
      )}`;
      Icon = MapPin;
      break;
    case "link":
      href = value.startsWith("http") ? value : `https://${value}`;
      // Pour les PDF Cloudinary, ajouter le flag fl_inline pour forcer l'ouverture dans le navigateur
      // au lieu du téléchargement
      if ((href.match(/\.pdf$/i) || href.includes("/raw/upload/")) && href.includes("cloudinary.com")) {
        // Pour Cloudinary, ajouter fl_inline dans les transformations pour forcer Content-Disposition: inline
        // Format URL Cloudinary: https://res.cloudinary.com/{cloud_name}/{resource_type}/upload/{transformations}/{public_id}.{format}
        if (href.includes("/upload/")) {
          // Extraire les parties de l'URL
          const urlParts = href.split("/upload/");
          if (urlParts.length === 2) {
            const beforeUpload = urlParts[0] + "/upload";
            const afterUpload = urlParts[1];
            
            // Si fl_inline n'est pas déjà présent, l'ajouter
            if (!afterUpload.includes("fl_inline")) {
              // Ajouter fl_inline comme première transformation
              href = `${beforeUpload}/fl_inline/${afterUpload}`;
            }
          }
        }
      }
      Icon = ExternalLink;
      break;
  }

  // Détecter si des classes de couleur personnalisées sont fournies
  const hasCustomColors =
    className.includes("bg-") || className.includes("text-");
  const defaultBgColor = hasCustomColors ? "" : "bg-primary";
  const defaultTextColor = hasCustomColors ? "" : "text-light";
  const defaultHoverColor = hasCustomColors ? "" : "hover:text-gray-100";
  const iconColor = hasCustomColors ? "currentColor" : "text-light";

  // Déterminer la couleur de la bordure : même couleur que le fond du bouton
  let borderColor = "border-primary"; // Par défaut pour bg-primary
  if (hasCustomColors) {
    if (className.includes("bg-secondary")) {
      borderColor = "border-secondary";
    } else if (className.includes("bg-primary")) {
      borderColor = "border-primary";
    } else {
      // Extraire la couleur bg-* de className si présente
      const bgMatch = className.match(/bg-(\w+)/);
      if (bgMatch) {
        borderColor = `border-${bgMatch[1]}`;
      } else {
        borderColor = "border-primary";
      }
    }
  }

  // Déterminer si le lien doit s'ouvrir dans un nouvel onglet
  const shouldOpenInNewTab = type === "link" || type === "location";

  return (
    <a
      href={href}
      target={shouldOpenInNewTab ? "_blank" : "_self"}
      rel={shouldOpenInNewTab ? "noopener noreferrer" : undefined}
      className="group relative inline-block max-w-fit"
    >
      <span
        className={`absolute inset-0 border-2 ${borderColor} -m-1 group-hover:m-0 transition-all duration-300 ease-in-out`}
      />
      <span
        className={`relative block px-3 py-2 ${defaultBgColor} ${defaultTextColor} font-regular text-sm shadow-lg flex items-center gap-2 ${defaultHoverColor} ${className} transition-all duration-300 ease-in-out`}
      >
        <div>
          <Icon className={iconColor} size={18} />
      </div>
      {label}
      </span>
    </a>
  );
}
