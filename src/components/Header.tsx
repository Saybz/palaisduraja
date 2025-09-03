"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LogOutBtn from "@/components/LogOutBtn";
import Link from "next/link";
const Header: React.FC = () => {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const isLogin = pathname.startsWith("/admin/login");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`z-50 fixed w-screen top-0 left-0 font-body text-secondary py-2 md:py-6 transition-all duration-300  ${
        isScrolled ? "shadow-md bg-primary text-secondary" : ""
      }
      ${isAdminPage ? "bg-primary" : ""}
      
      `}
    >
      <div className="container h-full max-w-main mx-auto px-4 md:px-10 lg:px-0 flex flex-col md:flex-row justify-between items-center">
        <Link href="/" aria-label="Accueil" className={`text-xl font-bold mb-2 md:mb-0`}>
          Palais du Raja
        </Link>
        {!isAdminPage && !isLogin && (
          <nav aria-label="Navigation principale" className="flex w-full gap-4 md:w-auto items-center justify-around font-semibold">
            <Link href="#about" className="hover:text-white">
              Histoire
            </Link>
            <Link href="#menu" className="hover:text-white">
              Menu
            </Link>
            <Link href="#infos" className="hover:text-white">
              Infos
            </Link>
            <Link href="#contact" className="hover:text-white">
              Contact
            </Link>
          </nav>
        )}
        {isAdminPage && !isLogin && <LogOutBtn />}
      </div>
    </header>
  );
};

export default Header;
