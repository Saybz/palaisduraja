import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="z-10 fixed w-screen top-0 left-0 bg-primary shadow-md h-24 font-body text-white py-6">
      <div className="container h-full max-w-main mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-bold">Palais du Raja</div>
        <nav className="flex items-center ">
          <a href="#about" className="mx-2 hover:text-gray-900">
            Qui sommes-nous ?
          </a>
          <a href="#menu" className="mx-2 hover:text-gray-900">
            Menu
          </a>
          <a href="#infos" className="mx-2 hover:text-gray-900">
            Infos
          </a>
          <a
            href="#contact"
            className="relative py-3 pl-8 pr-4 ml-8 bg-white text-black shadow-lg rounded-lg flex items-center hover:text-gray-900"
          >
            <Image
              src="/img/phone.svg"
              alt="phone icon"
              width={32}
              height={32}
              className="absolute -left-4 shadow-lg mr-2"
            />
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
