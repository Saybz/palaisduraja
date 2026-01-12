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
      Icon = ExternalLink;
      break;
  }

  return (
    <a
      href={href}
      target={type === "link" || type === "location" ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className={`px-4 py-3 pb-2 max-w-fit bg-primary text-light font-regular text-base shadow-lg flex items-center gap-2 hover:text-gray-100 ${className}`}
    >
      <div className="pb-1">
        <Icon className="text-light" />
      </div>
      {label}
    </a>
  );
}
