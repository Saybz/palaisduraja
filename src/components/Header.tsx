import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="z-10 fixed w-screen top-0 left-0 bg-primary shadow-md h-24 font-body text-white py-6">
      <div className="container h-full max-w-main mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-bold">Logo</div>
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
            className="relative p-3 pl-8 ml-8 bg-white text-black shadow-lg rounded-lg flex items-center hover:text-gray-900"
          >
            <div className="absolute -left-4 p-2 bg-white shadow-lg rounded-md mr-2">
              <Image
                src="/img/phone_icon.svg"
                alt="Phone icon"
                width={20}
                height={20}
                className="color-primary text-primary"
              />
            </div>
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
