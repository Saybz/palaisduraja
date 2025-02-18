import { prisma } from "@/utils/db";
// import { div } from "framer-motion/client";
import Image from "next/image";

export default async function Home() {
  const content = await prisma.content.findFirst();

  return (
    <div className="min-h-screen w-screen px-6 md:px-10 font-body bg-gray-50 text-dark flex flex-col mt-18 items-center">
      <div className="relative w-screen max-h-screen mb-20 md:mb-30 lg:mb-40">
        <Image
          src="https://placehold.jp/2000x900.png"
          alt="Image"
          layout="responsive"
          width={2000}
          height={900}
          className="w-screen object-cover"
        />
      </div>
      <section
        id="about"
        className="flex flex-col w-full max-w-main mb-20 md:mb-30 lg:mb-40"
      >
        <h2 className="relative before:absolute before:-bottom-4 before:left-0 before:rounded-sm before:w-20 before:h-[2px] before:bg-primary font-head font-light text-3xl underline-offset-2 mb-16 md:mb-20">
          Restaurant Familial
        </h2>
        <div className="flex flex-col lg:flex-row ">
          {content?.image && (
            <div className="w-full lg:w-1/2">
              <Image
                src={content.image}
                alt="Image"
                layout="responsive"
                width={700}
                height={500}
                className="rounded-lg shadow-lg text-primary "
              />
            </div>
          )}
          <div className="ml-0 lg:ml-10 mt-10 lg:mt-0">
            <h2 className="text-4xl font-bold font-head mb-4">
              {content?.title || "Titre par défaut"}
            </h2>
            <p className="text-lg text-gray-600">
              {content?.description || "Description par défaut"}
            </p>
          </div>
        </div>
      </section>
      <section id="menu" className="max-w-main w-full mb-20 md:mb-30 lg:mb-40">
        <h2 className="relative before:absolute before:-bottom-4 before:left-0 before:rounded-sm before:w-20 before:h-[2px] before:bg-primary font-head font-light text-3xl underline-offset-2 mb-16 md:mb-20">
          Carte & Menus
        </h2>
        <div className="relative w-full justify-center items-center">
          {content?.image && (
            <Image
              src="https://placehold.jp/1440x720.png"
              alt="Image"
              layout="responsive"
              width={1440}
              height={720}
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
      <section
        id="infos"
        className="w-screen py-20 md:py-30 lg:py-40 bg-slate-200"
      >
        <div className="max-w-main w-full mx-auto">
          <h2 className="mx-6 md:mx-10 relative before:absolute before:-bottom-4 before:left-0 before:rounded-sm before:w-20 before:h-[2px] before:bg-primary font-head font-light text-3xl underline-offset-2 mb-16 md:mb-20">
            Infos pratiques
          </h2>
          <div className="w-full flex flex-col md:flex-row justify-between mb-8 px-6 md:px-10">
            <div className="w-full md:w-1/2 flex-col pr-0 md:pr-10 mb-10 md:mb-0">
              <div className="flex-col mb-10">
                <h3 className="font-bold text-xl mb-2">Cuisine :</h3>
                <p>Indienne, pakistanaise</p>
              </div>
              <div className="flex-col">
                <h3 className="font-bold text-xl mb-2">Moyens de paiement :</h3>
                <p>
                  Carte Bleue, Visa, Eurocard/Mastercard, Paiement Sans Contact,
                  Chèque vacances, Tickets restaurant
                </p>
              </div>
            </div>
            <div className="flex-col w-full md:w-1/2 p-10 border border-primary">
              <h3 className="font-bold text-xl mb-6">Horaires :</h3>
              <div className="grid grid-cols-2 gap-4">
                <span>Mardi - Mercredi midi</span>
                <span>Fermé</span>
                <span>Mercredi soir - lundi</span>
                <span>12h00-14h30 19h00-22h30</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="contact"
        className="max-w-main w-full my-20 md:mb-30 lg:mb-40"
      >
        <h2 className="relative before:absolute before:-bottom-4 before:left-0 before:rounded-sm before:w-20 before:h-[2px] before:bg-primary font-head font-light text-3xl underline-offset-2 mb-16 md:mb-20">
          Contact
        </h2>
        <div className="flex flex-col items-center lg:flex-row">
          <div className="w-full flex flex-col flex-1 p-6 md:p-16 bg-white rounded shadow-lg mb-10 lg:mb-0 h-full lg:max-w-[500px]">
            <h3 className="font-bold font-head mb-8">Adresse :</h3>
            <p className="py-5 mb-8 px-8 rounded whitespace-nowrap bg-primary text-white">
              113 rue Colbert, 37000 Tours
            </p>
            <ul className="pl-3 border-l flex-col border-primary">
              <li className="mb-6">A 8 min de la gare</li>
              <li className="mb-6">200m de la Loire</li>
              <li className="mb-6">300m de la cathédrale Saint gatien</li>
              <li className="mb-6">Débouche sur la rue Nationale</li>
            </ul>
          </div>
          <div className="w-full">
            <div className="flex flex-col md:flex-row lg:justify-end justify-around items-center mb-10">
              <a
                href="#contact"
                className="relative p-3 pl-8 ml-0 md:ml-8 mb-6 md:mb-0 bg-white text-black shadow-lg rounded-lg flex items-center hover:text-gray-900"
              >
                <Image
                  src="/img/mail.svg"
                  alt="mail icon"
                  width={32}
                  height={32}
                  className="absolute -left-4 shadow-lg mr-2"
                />
                palaisduraja@gmail.com
              </a>
              <a
                href="#contact"
                className="relative p-3 pl-8 ml-0 md:ml-8 bg-white text-black shadow-lg rounded-lg flex items-center hover:text-gray-900"
              >
                <Image
                  src="/img/phone.svg"
                  alt="phone icon"
                  width={32}
                  height={32}
                  className="absolute -left-4 shadow-lg mr-2"
                />
                Reserver
              </a>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5401.635074206616!2d0.689015977602613!3d47.395992871171224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47fcd5b248f1490b%3A0xd4bc494e1971897e!2sLe%20Palais%20du%20Rajah%20(Rajasthan)!5e0!3m2!1sfr!2sfr!4v1738936968444!5m2!1sfr!2sfr"
              width="600"
              height="400"
              style={{ border: 0 }}
              title="Google Maps location of the restaurant"
              loading="lazy"
              className="w-full h-[450px] rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
