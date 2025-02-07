import React from "react";

const Header: React.FC = () => {
  return (
    <header className="z-10 fixed w-screen top-0 left-0 bg-primary shadow-md h-24 text-white py-6">
      <div className="container h-full max-w-main mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-bold">Logo</div>
        <nav className="flex space-x-4">
          <a href="#about" className=" hover:text-gray-900">
            Qui sommes-nous ?
          </a>
          <a href="#menu" className=" hover:text-gray-900">
            Menu
          </a>
          <a href="#infos" className=" hover:text-gray-900">
            Infos
          </a>
          <a href="#contact" className=" hover:text-gray-900">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
