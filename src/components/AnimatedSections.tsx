"use client";

import React from "react";
import Image from "next/image";
import CtaBtn from "@/components/CtaButton";
import ScrollAnimated from "@/components/ScrollAnimated";
import ScrollToTopButton from "@/components/ScrollToTopBtn";

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
        className="relative flex flex-col gap-10 items-center lg:flex-row w-full max-w-main section-responsive "
      >
        <ScrollAnimated direction="up" delay={0} className="ml-0 lg:w-1/2 mt-10 lg:pr-10 lg:mt-0">
          <h2 className="relative font-head font-light text-5xl md:text-6xl text-primary underline-offset-2 mb-1 md:mb-4">
            {content?.title || "Histoire du restaurant"}
          </h2>
          <p className="text-lg text-gray-600">
            {content?.histoire || "Description par défaut"}
          </p>
        </ScrollAnimated>
        {content?.histoireImg && (
          <ScrollAnimated direction="up" delay={150} className="relative min-h-[400px] h-[20vh] md:h-[30vh] w-full lg:w-1/2 before:left-full rounded-3xl shadow-lg">
            <Image
              src={content.histoireImg}
              alt="Devanture du restaurant Palais du Raja à Tours"
              fill
              loading="lazy"
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
              className="rounded-3xl"
            />
          </ScrollAnimated>
        )}
      </section>

      {/* Menu Section */}
      <section
        id="menu"
        className="relative max-w-main w-full section-responsive"
      >
        <ScrollAnimated direction="up" delay={0}>
          <h2 className="relative text-primary font-head text-5xl md:text-6xl mb-2 md:mb-10">
            Carte & Menus
          </h2>
        </ScrollAnimated>
        <ScrollAnimated direction="up" delay={150}>
          <div className="relative min-h-[200px] md:min-h-[300px] md:min-h-[500px] h-[20vh] md:h-[50vh] w-full before:left-full rounded-3xl shadow-lg">
            <div className="absolute inset-0 bg-black/20 z-10 rounded-3xl">
              {content?.menuImg && (
                <Image
                  src={content.menuImg}
                  alt="Photos de plats du restaurant Palais du Raja à Tours"
                  fill
                  loading="lazy"
                  sizes="100vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  className="rounded-3xl"
                />
              )}
            </div>

            {content?.menuPdf && (
              <div className="absolute z-20 top-0 right-0 w-full h-full flex justify-center items-center">
                <a
                  href={content.menuPdf}
                  rel="noopener noreferrer"
                  aria-label="Télécharger le menu au format PDF"
                  target="_blank"
                  className="p-4 bg-primary text-white shadow-lg rounded-lg font-semibold hover:bg-secondary hover:text-primary transition-all"
                >
                  {content.menuDesc || "Télécharger le menu"}
                </a>
              </div>
            )}
          </div>
        </ScrollAnimated>
      </section>

      {/* Infos Section */}
      <section id="infos" className="w-full section-responsive">
        <div className="max-w-main w-full mx-auto">
          <ScrollAnimated direction="up" delay={0}>
            <h2 className="relative text-primary font-head text-5xl md:text-6xl mb-2 md:mb-10">
              Infos pratiques
            </h2>
          </ScrollAnimated>
          <div itemScope itemType="https://schema.org/Restaurant" className="w-full flex flex-col md:flex-row justify-between">
            <ScrollAnimated direction="up" delay={0} className="w-full md:w-1/2 flex-col pr-0 md:pr-10 mb-10 md:mb-0">
              {content?.cuisine && (
                <div className="flex-col mb-10">
                  <h3 className="font-bold text-xl mb-2">Cuisine :</h3>
                  <p>{content.cuisine}</p>
                </div>
              )}
              {content?.paiement && (
                <div className="flex-col">
                  <h3 className="font-bold text-xl mb-2">
                    Moyens de paiement :
                  </h3>
                  <p className="max-w-md">
                    Carte Bleue, Visa, Eurocard/Mastercard, Paiement Sans
                    Contact, Chèque vacances, Tickets restaurant
                  </p>
                </div>
              )}
            </ScrollAnimated>
            {content?.schedules && content.schedules.length > 0 && (
              <ScrollAnimated direction="up" delay={150} className="flex-col w-full md:w-1/2">
                <h3 className="font-bold text-xl mb-6">Horaires :</h3>
                <table className="w-full border-collapse border text-sm">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="border px-3 py-2 text-left">Jour</th>
                      <th className="border px-3 py-2 text-left">Midi</th>
                      <th className="border px-3 py-2 text-left">Soir</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DAYS.map((day) => {
                      const midi = content.schedules?.find(
                        (s: Schedule) => s.day === day && s.period === "MIDI"
                      );
                      const soir = content.schedules?.find(
                        (s: Schedule) => s.day === day && s.period === "SOIR"
                      );

                      return (
                        <tr key={day}>
                          <td className="border border-primary px-3 py-2">{day}</td>
                          <td className="border border-primary px-3 py-2">{formatSchedule(midi)}</td>
                          <td className="border border-primary px-3 py-2">{formatSchedule(soir)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </ScrollAnimated>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full">
        <div className="max-w-main w-full section-responsive mx-auto">
          <ScrollAnimated direction="up" delay={0}>
            <h2 className="relative text-primary font-head text-5xl md:text-6xl mb-2 md:mb-10">
              Contact
            </h2>
          </ScrollAnimated>
          <ScrollAnimated direction="up" delay={150}>
            <div className="flex flex-col gap-4 items-start md:items-center lg:flex-row-reverse justify-between pl-4">
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

