import { prisma } from "@/utils/db";
// import { div } from "framer-motion/client";
import Image from "next/image";

export default async function Home() {
  const content = await prisma.content.findFirst();

  return (
    <div className="min-h-screen w-screen px-10 font-body bg-gray-50 flex flex-col items-center">
      <div className="relative w-screen max-h-screen mb-40">
        <Image
          src="https://placehold.jp/2000x900.png"
          alt="Image"
          fill
          className=""
        />
      </div>
      <section id="about" className=" flex-col w-full max-w-main my-40">
        <h2 className="relative before:absolute before:-bottom-4 before:left-0 before:rounded-sm before:w-20 before:h-[2px] before:bg-primary font-head font-light text-3xl underline-offset-2 mb-20">
          Restaurant Familial
        </h2>
        <div className="flex items-center">
          {content?.image && (
            <div className="w-1/2">
              <Image
                src={content.image}
                alt="Image"
                width={700}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          )}
          <div className="ml-10">
            <h2 className="text-4xl font-bold font-head mb-4">
              {content?.title || "Titre par défaut"}
            </h2>
            <p className="text-lg text-gray-600">
              {content?.description || "Description par défaut"}
            </p>
            {content?.pdf && (
              <a
                href={content.pdf}
                target="_blank"
                className="text-blue-500 underline"
              >
                Télécharger la carte
              </a>
            )}
          </div>
        </div>
      </section>
      <section id="menu" className="max-w-main w-full my-40">
        <h2 className="relative before:absolute before:-bottom-4 before:left-0 before:rounded-sm before:w-20 before:h-[2px] before:bg-primary font-head font-light text-3xl underline-offset-2 mb-20">
          Carte & Menus
        </h2>
        <div className="relative w-full h-[720px] justify-center items-center">
          {content?.image && (
            <Image
              src="https://placehold.jp/1440x720.png"
              alt="Image"
              fill
              className="relative rounded-lg shadow-lg"
            />
          )}

          {content?.pdf && (
            <div className="absolute top-0 right-0 w-full h-full flex justify-center items-center">
              <a
                href={content.pdf}
                target="_blank"
                className="p-4 bg-primary text-white shadow-lg rounded-lg"
              >
                Télécharger la carte
              </a>
            </div>
          )}
        </div>
      </section>
      <section id="infos" className="w-screen py-40 bg-slate-200">
        <div className="max-w-main w-full mx-auto">
          <h2 className="relative before:absolute before:-bottom-4 before:left-0 before:rounded-sm before:w-20 before:h-[2px] before:bg-primary font-head font-light text-3xl underline-offset-2 mb-20">
            Infos pratiques
          </h2>
          <div className="w-full flex justify-between mb-8">
            <div className="flex-col">
              <h3 className="font-bold text-xl mb-2">Cuisine</h3>
              <p>Indienne, pakistanaise</p>
            </div>
            <div className="flex-col px-10">
              <h3 className="font-bold text-xl mb-2">Moyens de paiement</h3>
              <p>
                Carte Bleue, Chèques, Visa, Eurocard/Mastercard, Paiement Sans
                Contact, Chèque vacances, Tickets restaurant
              </p>
            </div>
            <div className=" flex-col">
              <h3 className="font-bold text-xl mb-2">Horaires</h3>
              <p>Du mercredi 19h au lundi</p>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="max-w-main w-full my-40">
        <h2 className="relative before:absolute before:-bottom-4 before:left-0 before:rounded-sm before:w-20 before:h-[2px] before:bg-primary font-head font-light text-3xl underline-offset-2 mb-20">
          Contact
        </h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5401.635074206616!2d0.689015977602613!3d47.395992871171224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47fcd5b248f1490b%3A0xd4bc494e1971897e!2sLe%20Palais%20du%20Rajah%20(Rajasthan)!5e0!3m2!1sfr!2sfr!4v1738936968444!5m2!1sfr!2sfr"
          width="600"
          height="450"
          style={{ border: 0 }}
          title="Google Maps location of the restaurant"
          loading="lazy"
          className="w-full h-[450px] rounded-lg shadow-lg"
        ></iframe>
      </section>
    </div>
  );
}
