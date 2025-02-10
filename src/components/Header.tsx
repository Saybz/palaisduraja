import React from "react";

const Header: React.FC = () => {
  return (
    <header className="z-10 fixed w-screen top-0 left-0 bg-primary shadow-md  font-body text-white py-2 md:py-6">
      <div className="container h-full max-w-main mx-auto px-4 md:px-10 lg:px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl font-bold mb-2 md:mb-0">Palais du Raja</div>
        <nav className="flex w-full md:w-auto items-center justify-around">
          <a href="#about" className="mx-2 hover:text-gray-900">
            Histoire
          </a>
          <a href="#menu" className="mx-2 hover:text-gray-900">
            Menu
          </a>
          <a href="#infos" className="mx-2 hover:text-gray-900">
            Infos
          </a>
          <a href="#contact" className="mx-2 hover:text-gray-900">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
