"use client";

import React from "react";
import Image from "next/image";
import CtaBtn from "@/components/CtaButton";
import ScrollAnimated from "@/components/ScrollAnimated";
import ScrollToTopButton from "@/components/ScrollToTopBtn";
import MenuSection from "@/components/MenuSection";

type Schedule = {
  id: number;
  day: "Lundi" | "Mardi" | "Mercredi" | "Jeudi" | "Vendredi" | "Samedi" | "Dimanche";
  period: "MIDI" | "SOIR";
  openTime: string | null;
  closeTime: string | null;
  isClosed: boolean;
};

type Content = {
  histoireImg?: string | null;
  histoire?: string | null;
  title?: string | null;
  menuImg?: string | null;
  menuImg1?: string | null;
  menuImg2?: string | null;
  menuImg3?: string | null;
  menuImg4?: string | null;
  menuPdf?: string | null;
  menuDesc?: string | null;
  cuisine?: string | null;
  paiement?: string | null;
  mail?: string | null;
  tel?: string | null;
  schedules?: Schedule[];
};

const DAYS: Schedule["day"][] = [
  "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"
];

export default function AnimatedSections({ content }: { content: Content | null }) {
  const formatSchedule = (s?: Schedule) =>
    s
      ? s.isClosed
        ? "Fermé"
        : `${s.openTime || "??"} - ${s.closeTime || "??"}`
      : "Non renseigné";

  return (
    <>
      {/* About Section */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="relative flex flex-col gap-10 lg:gap-0 items-center lg:flex-row w-full min-h-screen"
        style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
      >
        <ScrollAnimated direction="up" delay={0} className="ml-0 lg:w-1/2 lg:flex-shrink-0 mt-10 lg:mt-0 px-4 md:px-6 lg:px-8 xl:px-12">
          <h2 id="about-heading" className="relative font-head font-light text-5xl md:text-6xl text-primary underline-offset-2 mb-1 md:mb-4">
            {content?.title || "Histoire du restaurant Palais du Raja"}
          </h2>
          <p className="text-lg text-gray-600" itemProp="description">
            {content?.histoire || "Découvrez l'histoire du Palais du Raja, restaurant indien traditionnel à Tours."}
          </p>
        </ScrollAnimated>
        {content?.histoireImg && (
          <ScrollAnimated direction="up" delay={150} className="relative min-h-[400px] h-[20vh] md:h-[30vh] w-full lg:w-1/2 lg:flex-shrink-0 before:left-full shadow-lg">
            <Image
              src={content.histoireImg}
              alt={`${content?.title || "Histoire"} - Restaurant Palais du Raja, restaurant indien traditionnel à Tours, 113 rue Colbert`}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
              className=""
              title={`${content?.title || "Histoire"} du restaurant Palais du Raja`}
            />
          </ScrollAnimated>
        )}
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
        />
      </div>

      {/* Infos Section */}
      <section id="infos" aria-labelledby="infos-heading" className="w-full bg-primary-light/20 min-h-screen" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
        <div className="w-full mx-auto px-4 md:px-6 lg:px-8 xl:px-12 py-8 md:py-12">
          <ScrollAnimated direction="up" delay={0}>
            <h2 id="infos-heading" className="relative text-primary font-head text-5xl md:text-6xl mb-2 md:mb-10">
              Infos pratiques
            </h2>
          </ScrollAnimated>
          
          {/* Cuisine et Moyens de paiement */}
          <div className="w-full flex flex-col md:flex-row gap-8 md:gap-12 mb-10">
            <ScrollAnimated direction="up" delay={0} className="flex-1">
              {content?.cuisine && (
                <div className="flex-col mb-8 md:mb-0">
                  <h3 className="font-bold text-xl mb-2">Cuisine :</h3>
                  <p className="text-gray-700">{content.cuisine}</p>
                </div>
              )}
            </ScrollAnimated>
            <ScrollAnimated direction="up" delay={100} className="flex-1">
              {content?.paiement && (
                <div className="flex-col">
                  <h3 className="font-bold text-xl mb-2">
                    Moyens de paiement :
                  </h3>
                  <p className="text-gray-700">
                    {content.paiement || "Carte Bleue, Visa, Eurocard/Mastercard, Paiement Sans Contact, Chèque vacances, Tickets restaurant"}
                  </p>
                </div>
              )}
            </ScrollAnimated>
          </div>

          {/* Tableau Horaires */}
          {content?.schedules && content.schedules.length > 0 && (
            <ScrollAnimated direction="up" delay={200} className="w-full">
              <h3 className="font-bold text-xl mb-6">Horaires :</h3>
              <div className="overflow-x-auto rounded-lg p-4">
                <table className="w-full border-collapse text-sm md:text-base">
                  <thead>
                    <tr>
                      <th className="px-3 py-3 text-left font-semibold"></th>
                      {DAYS.map((day) => (
                        <th key={day} className="px-3 py-3 text-center font-semibold text-primary">
                          {day.toUpperCase()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b-2 border-primary/40">
                      <td className="px-4 py-3 font-semibold text-primary">MIDI</td>
                      {DAYS.map((day) => {
                        const midi = content.schedules?.find(
                          (s: Schedule) => s.day === day && s.period === "MIDI"
                        );
                        return (
                          <td key={`midi-${day}`} className="px-3 py-3 text-center text-gray-700">
                            {formatSchedule(midi)}
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-primary">SOIR</td>
                      {DAYS.map((day) => {
                        const soir = content.schedules?.find(
                          (s: Schedule) => s.day === day && s.period === "SOIR"
                        );
                        return (
                          <td key={`soir-${day}`} className="px-3 py-3 text-center text-gray-700">
                            {formatSchedule(soir)}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </ScrollAnimated>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" aria-labelledby="contact-heading" className="w-full min-h-screen" style={{ paddingTop: "6rem" }}>
        <div className="w-full mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
          <ScrollAnimated direction="up" delay={0}>
            <h2 id="contact-heading" className="relative text-primary font-head text-5xl md:text-6xl mb-2 md:mb-10">
              Contact et réservation
            </h2>
          </ScrollAnimated>
          <ScrollAnimated direction="up" delay={150}>
            <div className="flex flex-col gap-4 items-start md:items-center lg:flex-row-reverse justify-between">
              <div className="flex flex-col gap-4 md:flex-row lg:justify-end justify-around items-start md:items-center">
                {content?.mail && (
                  <CtaBtn
                    type="email"
                    aria-label="Envoyer un email au restaurant Palais du Raja"
                    value={content.mail}
                    label={content.mail}
                    className="md:mr-10"
                  />
                )}
                {content?.tel && (
                  <CtaBtn
                    aria-label="Réserver une table par téléphone"
                    type="tel"
                    value={content.tel}
                    label="Réserver"
                  />
                )}
              </div>
              <CtaBtn
                type="location"
                aria-label="Trouver le restaurant Palais du Raja à Tours sur Google Maps"
                value="113 rue Colbert, 37000 Tours"
                label="113 rue Colbert, 37000 Tours"
              />
            </div>
          </ScrollAnimated>
        </div>
        <ScrollAnimated direction="up" delay={300}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5401.635074206616!2d0.689015977602613!3d47.395992871171224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47fcd5b248f1490b%3A0xd4bc494e1971897e!2sLe%20Palais%20du%20Rajah%20(Rajasthan)!5e0!3m2!1sfr!2sfr!4v1738936968444!5m2!1sfr!2sfr"
            width="600"
            height="400"
            style={{ border: 0 }}
            title="Carte Google Maps du Palais du Raja à Tours"
            aria-label="Carte Google Maps du Palais du Raja à Tours"
            loading="lazy"
            className="w-full h-[450px] rounded-lg shadow-lg mt-10"
          ></iframe>
        </ScrollAnimated>
      </section>
      <ScrollToTopButton />
    </>
  );
}

