"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import CtaBtn from "@/components/CtaButton";
import ScrollAnimated from "@/components/ScrollAnimated";
import ScrollToTopButton from "@/components/ScrollToTopBtn";
import MenuSection from "@/components/MenuSection";

type Schedule = {
  id: number;
  day:
    | "Lundi"
    | "Mardi"
    | "Mercredi"
    | "Jeudi"
    | "Vendredi"
    | "Samedi"
    | "Dimanche";
  period: "MIDI" | "SOIR";
  openTime: string | null;
  closeTime: string | null;
  isClosed: boolean;
};

type Content = {
  histoireImg?: string | null;
  // Champs FR
  histoire?: string | null;
  title?: string | null;
  menuDesc?: string | null;
  cuisine?: string | null;
  paiement?: string | null;
  // Champs EN
  histoireEn?: string | null;
  titleEn?: string | null;
  menuDescEn?: string | null;
  cuisineEn?: string | null;
  paiementEn?: string | null;
  // Fichiers
  menuImg?: string | null;
  menuImg1?: string | null;
  menuImg2?: string | null;
  menuImg3?: string | null;
  menuImg4?: string | null;
  menuPdf?: string | null;
  mail?: string | null;
  tel?: string | null;
  schedules?: Schedule[];
};

const DAYS_KEYS = [
  "LUNDI",
  "MARDI",
  "MERCREDI",
  "JEUDI",
  "VENDREDI",
  "SAMEDI",
  "DIMANCHE",
] as const;

const DAYS_MAP: Record<string, Schedule["day"]> = {
  LUNDI: "Lundi",
  MARDI: "Mardi",
  MERCREDI: "Mercredi",
  JEUDI: "Jeudi",
  VENDREDI: "Vendredi",
  SAMEDI: "Samedi",
  DIMANCHE: "Dimanche",
};

export default function AnimatedSections({
  content,
  locale = "fr",
}: {
  content: Content | null;
  locale?: string;
}) {
  const t = useTranslations();
  const tInfos = useTranslations("infos");
  const tContact = useTranslations("contact");
  const tAbout = useTranslations("about");
  const tDays = useTranslations("days");

  // Helper pour obtenir le contenu traduit
  const getLocalizedContent = <K extends keyof Content>(
    frKey: K,
    enKey: K
  ): Content[K] | undefined => {
    if (locale === "en" && content?.[enKey]) {
      return content[enKey];
    }
    return content?.[frKey];
  };

  // Contenu localisé
  const localizedTitle = getLocalizedContent("title", "titleEn");
  const localizedHistoire = getLocalizedContent("histoire", "histoireEn");
  const localizedCuisine = getLocalizedContent("cuisine", "cuisineEn");
  const localizedPaiement = getLocalizedContent("paiement", "paiementEn");

  const formatSchedule = (s?: Schedule) =>
    s
      ? s.isClosed
        ? tInfos("closed")
        : `${s.openTime || "??"} - ${s.closeTime || "??"}`
      : "-";

  return (
    <>
      {/* About Section */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="relative w-full md:h-[calc(100vh-4.7rem)] grid grid-cols-3 overflow-hidden border-b border-primary"
      >
        {/* Partie gauche - Image ou Vidéo (1/3) */}
        {content?.histoireImg && (
          <ScrollAnimated
            direction="up"
            delay={0}
            className="col-span-3 lg:col-span-1 w-full min-h-[50vh] lg:h-full relative overflow-hidden border-t lg:border-t-0 lg:border-r border-primary"
          >
            {/* Détecter si c'est une vidéo par l'extension */}
            {content.histoireImg.match(/\.(mp4|webm|ogg|mov)$/i) ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={content.histoireImg} type="video/mp4" />
                {t("common.error")}
              </video>
            ) : (
              <Image
                src={content.histoireImg}
                alt={`${localizedTitle || tAbout("title")} - Palais du Raja`}
                fill
                loading="lazy"
                sizes="33.333vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
                className=""
                title={`${localizedTitle || tAbout("title")} - Palais du Raja`}
              />
            )}
          </ScrollAnimated>
        )}

        {/* Partie droite - Texte (2/3) */}
        <ScrollAnimated
          direction="up"
          delay={150}
          className="col-span-3 lg:col-span-2 flex flex-col justify-center px-4 md:px-6 lg:px-8 xl:px-12 py-12 md:py-6 lg:py-8 bg-light border-t lg:border-t-0 border-primary relative overflow-hidden"
        >
          <div className="w-full lg:max-w-[70%] relative z-10">
            <h2
              id="about-heading"
              className="relative font-head font-light text-5xl md:text-6xl text-primary underline-offset-2 mb-4 md:mb-6"
            >
              {localizedTitle || tAbout("title")}
            </h2>
            <p className="text-lg md:text-xl text-dark" itemProp="description">
              {localizedHistoire || tAbout("title")}
            </p>
          </div>

          {/* Rosace en position absolute - visible à moitié à droite du texte */}
          <div
            className="absolute right-0 top-1/2 w-[60%] h-[60%] opacity-20 pointer-events-none z-0"
            style={{
              transform: "translateY(-50%) translateX(50%)",
            }}
            aria-hidden="true"
          >
            <Image
              src="/img/mandala.png"
              alt=""
              fill
              sizes="60%"
              style={{ objectFit: "contain", objectPosition: "center" }}
              className=""
            />
          </div>
        </ScrollAnimated>
      </section>

      {/* Menu Section */}
      <div className="w-full">
        <MenuSection
          menuImg1={content?.menuImg1}
          menuImg2={content?.menuImg2}
          menuImg3={content?.menuImg3}
          menuImg4={content?.menuImg4}
          menuPdf={content?.menuPdf}
          menuDesc={content?.menuDesc}
          locale={locale}
        />
      </div>

      {/* Infos Section */}
      <section
        id="infos"
        aria-labelledby="infos-heading"
        className="w-full md:h-[calc(100vh-4.7rem)] grid grid-cols-3 overflow-hidden border-b border-primary bg-light"
      >
        {/* Colonne 1 - Grille 2x3 (6 cases) */}
        <div className="col-span-3 lg:col-span-1 grid grid-rows-3 border-b lg:border-b-0 lg:border-r border-primary">
          {/* Case 1 - Titre "Infos pratiques" */}
          <div className="border-b border-primary flex items-center justify-center px-4 md:px-6 lg:px-8 xl:px-12 py-4 md:py-6">
            <ScrollAnimated direction="up" delay={0}>
              <h2
                id="infos-heading"
                className="relative text-primary font-head text-4xl md:text-5xl lg:text-6xl text-center"
              >
                {tInfos("title")}
              </h2>
            </ScrollAnimated>
          </div>

          {/* Case 2 - Viande Halal */}
          <div className="border-b border-primary flex items-center justify-center px-4 md:px-6 lg:px-8 xl:px-12 py-4 md:py-6">
            <ScrollAnimated direction="up" delay={100}>
              <div className="flex flex-col items-center gap-2">
                <div className="w-[60px] h-[60px] flex items-center justify-center">
                  <span className="text-primary font-bold text-3xl">حلال</span>
                </div>
                <p className="text-primary font-semibold text-lg md:text-xl text-center">
                  {tInfos("halal")}
                </p>
              </div>
            </ScrollAnimated>
          </div>

          {/* Case 3 - Large choix végétarien */}
          <div className="flex items-center justify-center px-4 md:px-6 lg:px-8 xl:px-12 py-4 md:py-6">
            <ScrollAnimated direction="up" delay={200}>
              <div className="flex flex-col items-center gap-3">
                <div className="w-[60px] h-[60px] flex items-center justify-center">
                  <span className="text-primary text-5xl">🌿</span>
                </div>
                <p className="text-primary font-semibold text-lg md:text-xl text-center">
                  {tInfos("accessibility")}
                </p>
              </div>
            </ScrollAnimated>
          </div>
        </div>

        {/* Colonne 2 - Grille 2x3 (6 cases) */}
        <div className="col-span-3 lg:col-span-1 grid grid-rows-3 border-b lg:border-b-0 lg:border-r border-primary">
          {/* Case 1 - Moyens de paiement */}
          <div className="border-b border-primary flex items-center justify-center px-4 md:px-6 lg:px-8 xl:px-12 py-4 md:py-6">
            <ScrollAnimated direction="up" delay={150}>
              <div className="text-center">
                <h3 className="font-bold text-xl md:text-2xl text-primary mb-2">
                  {tInfos("payment")}
                </h3>
                <p className="text-primary text-base md:text-lg">
                  {localizedPaiement || tInfos("paymentDesc")}
                </p>
              </div>
            </ScrollAnimated>
          </div>

          {/* Case 2 - Cuisine Indienne et Pakistanaise */}
          <div className="border-b border-primary flex items-center justify-center px-4 md:px-6 lg:px-8 xl:px-12 py-4 md:py-6">
            <ScrollAnimated direction="up" delay={250}>
              <div className="flex flex-col items-center gap-3">
                <div className="w-[60px] h-[60px] flex items-center justify-center">
                  <span className="text-primary text-5xl">🍛</span>
                </div>
                <p className="text-primary font-semibold text-lg md:text-xl text-center">
                  {localizedCuisine || tInfos("cuisineDesc")}
                </p>
              </div>
            </ScrollAnimated>
          </div>

          {/* Case 3 - Plats faits maison */}
          <div className="flex items-center justify-center px-4 md:px-6 lg:px-8 xl:px-12 py-4 md:py-6">
            <ScrollAnimated direction="up" delay={350}>
              <div className="flex flex-col items-center gap-3">
                <div className="w-[60px] h-[60px] flex items-center justify-center">
                  <span className="text-primary text-5xl">👨‍🍳</span>
                </div>
                <p className="text-primary font-semibold text-lg md:text-xl text-center">
                  {tInfos("cuisine")}
                </p>
              </div>
            </ScrollAnimated>
          </div>
        </div>

        {/* Colonne 3 - Tableau horaires vertical */}
        <div className="col-span-3 lg:col-span-1 flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 xl:px-12 py-8 md:py-12">
          {content?.schedules && content.schedules.length > 0 && (
            <ScrollAnimated
              direction="up"
              delay={300}
              className="w-full flex flex-col items-center"
            >
              <h3 className="text-primary font-bold text-xl md:text-2xl mb-6 text-center">
                {tInfos("schedule")}
              </h3>
              <div className="w-full flex justify-center">
                <div className="w-full max-w-full">
                  <table className="border-collapse text-sm md:text-base w-full">
                    <thead>
                      <tr className="border-b-2 border-primary">
                        <th className="px-2 md:px-4 py-3 text-center font-semibold text-primary text-xs md:text-base"></th>
                        <th className="px-2 md:px-4 py-3 text-center font-semibold text-primary border-l border-primary text-xs md:text-base">
                          {tInfos("lunch")}
                        </th>
                        <th className="px-2 md:px-4 py-3 text-center font-semibold text-primary border-l border-primary text-xs md:text-base">
                          {tInfos("dinner")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {DAYS_KEYS.map((dayKey) => {
                        const day = DAYS_MAP[dayKey];
                        const midi = content.schedules?.find(
                          (s: Schedule) => s.day === day && s.period === "MIDI"
                        );
                        const soir = content.schedules?.find(
                          (s: Schedule) => s.day === day && s.period === "SOIR"
                        );
                        return (
                          <tr key={dayKey} className="">
                            <td className="px-2 md:px-4 py-3 font-semibold text-primary text-center text-xs md:text-base">
                              {tDays(dayKey)}
                            </td>
                            <td className="px-2 md:px-4 py-3 text-center text-primary border-l border-primary text-xs md:text-base">
                              {formatSchedule(midi)}
                            </td>
                            <td className="px-2 md:px-4 py-3 text-center text-primary border-l border-primary text-xs md:text-base">
                              {formatSchedule(soir)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </ScrollAnimated>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="w-full md:h-[calc(100vh-4.7rem)] flex flex-col"
        style={{ paddingTop: "6rem" }}
      >
        <div className="w-full mx-auto pb-6 px-4 md:px-6 lg:px-8 xl:px-12 flex-shrink-0">
          <ScrollAnimated direction="up" delay={0}>
            <h2
              id="contact-heading"
              className="relative text-primary font-head text-5xl md:text-6xl mb-2 md:mb-10"
            >
              {tContact("title")}
            </h2>
          </ScrollAnimated>
          <ScrollAnimated direction="up" delay={150}>
            <div className="flex flex-col gap-4 items-start md:items-center lg:flex-row-reverse justify-between">
              <div className="flex flex-col gap-4 md:flex-row lg:justify-end justify-around items-start md:items-center">
                {content?.mail && (
                  <CtaBtn
                    type="email"
                    aria-label={tContact("writeUs")}
                    value={content.mail}
                    label={content.mail}
                    className=""
                  />
                )}
                {content?.tel && (
                  <CtaBtn
                    aria-label={tContact("callUs")}
                    type="tel"
                    value={content.tel}
                    label={tContact("callUs")}
                  />
                )}
              </div>
              <CtaBtn
                type="location"
                aria-label={tContact("findUs")}
                value={tContact("address")}
                label={tContact("address")}
              />
            </div>
          </ScrollAnimated>
        </div>
        <ScrollAnimated
          direction="up"
          delay={300}
          className="flex-1 min-h-[50vh] md:min-h-0 w-full h-[50vh] md:h-full relative"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5401.635074206616!2d0.689015977602613!3d47.395992871171224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47fcd5b248f1490b%3A0xd4bc494e1971897e!2sLe%20Palais%20du%20Rajah%20(Rajasthan)!5e0!3m2!1sfr!2sfr!4v1738936968444!5m2!1sfr!2sfr"
            width="100%"
            height="100%"
            style={{
              border: 0,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            title={tContact("findUs")}
            aria-label={tContact("findUs")}
            loading="lazy"
            className="w-full h-full"
          ></iframe>
        </ScrollAnimated>
      </section>
      <ScrollToTopButton />
    </>
  );
}
