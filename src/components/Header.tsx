import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="sticky top-0 bg-white shadow-md">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <div className="text-xl font-bold">Logo</div>
                <nav className="flex space-x-4">
                    <a href="#accueil" className="text-gray-700 hover:text-gray-900">Accueil</a>
                    <a href="#about" className="text-gray-700 hover:text-gray-900">Qui sommes-nous ?</a>
                    <a href="#menu" className="text-gray-700 hover:text-gray-900">Menu</a>
                    <a href="#contact" className="text-gray-700 hover:text-gray-900">Contact</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;