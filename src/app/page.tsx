import { prisma } from "@/utils/db";
import Image from "next/image";
import CtaBtn from "@/components/CtaButton";
import ScrollToTopButton from "@/components/ScrollToTopBtn";
import {MoveDown} from "lucide-react";
// import { motion, useScroll, useTransform } from "framer-motion";

interface Content {
  banner?: string | null;
  histoireImg?: string | null;
  histoire?: string | null;
  title?: string | null;
  menuImg?: string | null;
  menuPdf?: string | null;
  menuDesc?: string | null;
  cuisine?: string | null;
  paiement?: string | null;
  horaire1?: string | null;
  horaire1state?: string | null;
  horaire2?: string | null;
  horaire2state?: string | null;
  mail?: string | null;
  tel?: string | null;
}

export default async function Home() {
  const content: Content | null = await prisma.content.findFirst();

  return (
    <div className="z-0 min-h-screen w-screen  font-body flex flex-col mt-18 items-center">
      <section id="" className="relative w-full ">
        {content?.banner && (
          <div className="h-screen w-full">
            <Image
              src={content.banner}
              alt="Image"
              fill
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
              className=""
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 flex flex-col text-secondary items-center justify-center z-20 section-responsive text-center">
          <h1 className="relative font-body font-bold text-5xl md:text-7xl mb-2 md:mb-4">
            Palais du Raja
          </h1>
          <p className="text-lg mb-2 font-semibold drop-shadow-lg">
            Restaurant traditionnel indien à Tours
          </p>
          <p className="text-lg font-semibold mb-6 drop-shadow-lg">
            Ouvert du <span className="font-black">mercredi soir</span> au
            <span className="font-black"> lundi</span>
          </p>
          <CtaBtn
            type="tel"
            value={content?.tel ? content.tel : "0247648155"}
            label="Réserver"
          />
        </div>
        <a href="#about">
          <MoveDown className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-white animate-bounce drop-shadow-lg"/>
        </a>
      </section>
      <section
        id="about"
        className="relative flex flex-col gap-10 items-center lg:flex-row w-full max-w-main section-responsive "
      >
        <div className="ml-0 lg:w-1/2 mt-10 lg:pr-10 lg:mt-0">
          <h2 className="relative font-head font-light text-5xl md:text-6xl text-primary underline-offset-2 mb-1 md:mb-4">
            {content?.title || "Histoire du restaurant"}
          </h2>
          <p className="text-lg text-gray-600">
            {content?.histoire || "Description par défaut"}
          </p>
        </div>
        {content?.histoireImg && (
          <div className="relative min-h-[400px] h-[20vh] md:h-[30vh] w-full lg:w-1/2 before:left-full rounded-3xl shadow-lg">
            <Image
              src={content.histoireImg}
              alt="Image"
              fill
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
              className="rounded-3xl"
            />
          </div>
        )}
      </section>
      <section
        id="menu"
        className="relative max-w-main w-full section-responsive"
      >
        <h2 className="relative text-primary font-head text-5xl md:text-6xl mb-2 md:mb-10">
          Carte & Menus
        </h2>
        <div className="relative min-h-[200px] md:min-h-[300px] md:min-h-[500px] h-[20vh] md:h-[50vh] w-full before:left-full rounded-3xl shadow-lg">
          <div className="absolute inset-0 bg-black/20 z-10 rounded-3xl">
          {content?.menuImg && (
            <Image
              src={content.menuImg}
              alt="Image"
              fill
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
                target="_blank"
                className="p-4 bg-primary text-white shadow-lg rounded-lg font-semibold hover:bg-secondary hover:text-primary transition-all"
              >
                {content.menuDesc || "Télécharger le menu"}
              </a>
            </div>
          )}
        </div>
      </section>
      <section id="infos" className=" w-full section-responsive">
        <div className="max-w-main w-full mx-auto">
          <h2 className="relative text-primary font-head text-5xl md:text-6xl mb-2 md:mb-10">
            Infos pratiques
          </h2>
          <div className="w-full flex flex-col md:flex-row justify-between">
            <div className="w-full md:w-1/2 flex-col pr-0 md:pr-10 mb-10 md:mb-0">
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
                  <p>
                    Carte Bleue, Visa, Eurocard/Mastercard, Paiement Sans
                    Contact, Chèque vacances, Tickets restaurant
                  </p>
                </div>
              )}
            </div>
            {content?.horaire1 && (
              <div className="flex-col w-full md:w-1/2 p-3 md:p-10 border border-primary">
                <h3 className="font-bold text-xl mb-6">Horaires :</h3>
                <div className="grid grid-cols-2 gap-4">
                  <span>{content?.horaire1}</span>
                  <span>{content?.horaire1state}</span>
                  <span>{content?.horaire2}</span>
                  <span>{content?.horaire2state}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <section id="contact" className="w-full">
        <div className="max-w-main w-full section-responsive mx-auto">
          <h2 className="relative text-primary font-head text-5xl md:text-6xl mb-2 md:mb-10 ">
            Contact
          </h2>
          <div className="flex flex-col gap-4 items-start md:items-center lg:flex-row-reverse justify-between pl-4">
            <div className="flex flex-col gap-4 md:flex-row lg:justify-end justify-around items-start md:items-center ">
              {content?.mail && (
                <CtaBtn
                  type="email"
                  value={content.mail}
                  label={content.mail}
                  className="md:mr-10"
                />
              )}
              {content?.tel && (
                <CtaBtn type="tel" value={content.tel} label="Réserver" />
              )}
            </div>
            <CtaBtn
              type="location"
              value="113 rue Colbert, 37000 Tours"
              label="113 rue Colbert, 37000 Tours"
            />
          </div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5401.635074206616!2d0.689015977602613!3d47.395992871171224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47fcd5b248f1490b%3A0xd4bc494e1971897e!2sLe%20Palais%20du%20Rajah%20(Rajasthan)!5e0!3m2!1sfr!2sfr!4v1738936968444!5m2!1sfr!2sfr"
          width="600"
          height="400"
          style={{ border: 0 }}
          title="Google Maps location of the restaurant"
          loading="lazy"
          className="w-full h-[450px] rounded-lg shadow-lg mt-10"
        ></iframe>
      </section>
      <ScrollToTopButton />
    </div>
  );
}
