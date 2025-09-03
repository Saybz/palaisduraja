import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-5 text-center bg-primary text-white">
      <div className="footer-content px-4 mx-auto flex flex-col lg:flex-row item-center space-y-2 max-w-main lg:space-y-0 lg:space-x-4 lg:justify-between">
        <p>&copy; {new Date().getFullYear()} Palais du Raja. Tous droits réservés.</p>
        <div>
          <address>
            113 rue Colbert, 37000 Tours –{" "}
          </address>
          <a href="tel:0247648155" className="underline hover:text-secondary">
            02 47 64 81 55
          </a>
        </div>
        <p>
          <a href="/mentions-legales" className="underline hover:text-secondary">
            Mentions légales
          </a>{" "}
          |{" "}
          <a
            href="/politique-confidentialite"
            className="underline hover:text-secondary"
          >
            Politique de confidentialité
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
