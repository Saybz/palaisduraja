"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const Footer: React.FC = () => {
  const t = useTranslations("footer");
  const pathname = usePathname();
  
  // Déterminer la locale à partir du pathname
  const locale = pathname.startsWith("/en") ? "en" : "fr";
  const basePath = locale === "fr" ? "" : `/${locale}`;

  return (
    <footer className="py-5 text-center bg-primary text-white">
      <div className="footer-content px-4 mx-auto flex flex-col items-center space-y-2 w-full text-sm">
        {/* Logo - Au-dessus des autres éléments */}
        <div className="flex justify-center mb-2 lg:mb-0 lg:pb-4">
          <div className="p-4">
            <Image
              src="/logo/Logo_palaisduraja_footer.svg"
              alt="Palais du Raja"
              width={120}
              height={120}
              className="w-24 h-24"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(85%) sepia(30%) saturate(2000%) hue-rotate(350deg) brightness(105%) contrast(90%)",
              }}
            />
          </div>
        </div>
        {/* Autres éléments - Alignés naturellement en desktop */}
        <div className="w-full self-stretch flex flex-col lg:flex-row lg:justify-between lg:items-center lg:gap-4 space-y-2 lg:space-y-0">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Palais du Raja. • {t("rights")} <a href="https://shailashbhati.fr" className="underline hover:text-secondary">Shailash Bhati</a>
          </p>
          <div className="text-sm flex flex-wrap items-center justify-center lg:justify-start gap-x-1 lg:flex-nowrap">
            <address className="not-italic">
              113 rue Colbert, 37000 Tours –
            </address>
            <a href="tel:0247648155" className="underline hover:text-secondary">
              02 47 64 81 55
            </a>
          </div>
          <p className="text-sm">
            <Link
              href={`${basePath}/mentions-legales`}
              className="underline hover:text-secondary"
            >
              {t("legal")}
            </Link>{" "}
          |{" "}
            <Link
              href={`${basePath}/politique-confidentialite`}
            className="underline hover:text-secondary"
          >
              {t("privacy")}
            </Link>
        </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
