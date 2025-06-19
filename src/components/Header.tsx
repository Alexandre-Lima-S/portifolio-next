"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { FiInstagram } from "react-icons/fi";

// Tipo para as seções
export type Sections = {
  [key: string]: React.RefObject<HTMLDivElement>;
};

type HeaderProps = {
  scrollToSection: (sectionRef: React.RefObject<HTMLDivElement>) => void;
  sections: Sections;
};

export default function Header({ scrollToSection, sections }: HeaderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = useCallback(() => {
    // Se quiser adicionar navegação pro topo
  }, []);

  const handleMenuItemClick = useCallback(
    (item: string) => {
      const sectionMap: { [key: string]: string } = {
        Projetos: "blanksections",
        "Contate-me": "thirdsections",
      };
      const sectionKey = sectionMap[item];
      const sectionRef = sections[sectionKey];
      if (sectionRef && sectionRef.current) {
        scrollToSection(sectionRef);
      }
    },
    [sections, scrollToSection]
  );

  const menuItems = ["Projetos", "Contate-me"];

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed top-0 w-full z-50"
    >
      <div
        className={`relative flex items-center justify-center px-0 py-4 md:px-8 md:justify-between ${
          isScrolled ? "bg-black/10 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <motion.div
          className="relative h-10 w-24 cursor-pointer flex items-center justify-center text-black sm:h-12 sm:w-32"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={handleLogoClick}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === "Enter" && handleLogoClick()}
        >
          <motion.span
            className="absolute left-1/2 transform -translate-x-1/2 text-2xl sm:text-3xl font-normal"
            initial={{ y: 0, opacity: 1 }}
            animate={isHovered ? { y: -40, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            AL
          </motion.span>
          <motion.span
            className="absolute left-1/2 transform -translate-x-1/2 text-2xl sm:text-3xl font-normal"
            initial={{ y: 40, opacity: 0 }}
            animate={isHovered ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            Codes
          </motion.span>
        </motion.div>

        {/* Menu */}
        <motion.div
          className={`hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center ${
            isScrolled
              ? "bg-black/10 backdrop-blur-md shadow-lg px-6 py-3 rounded-[2rem]"
              : "bg-transparent"
          }`}
          animate={isScrolled ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <nav className="flex gap-6 text-base font-light text-black transition-all duration-500">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                className="relative cursor-pointer group"
                onClick={() => handleMenuItemClick(item)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === "Enter" && handleMenuItemClick(item)}
              >
                <span className="relative">
                  {item}
                  <span className="absolute left-0 -bottom-[0.5mm] w-0 h-[2px] bg-red-500 transition-all duration-300 ease-in-out group-hover:w-full" />
                </span>
              </motion.div>
            ))}
          </nav>
        </motion.div>

        {/* Instagram */}
        <a
          href="https://instagram.com/the.gpx"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block text-black hover:text-gray-700 transition-colors"
          aria-label="Instagram"
        >
          <FiInstagram size={24} />
        </a>
      </div>
    </motion.header>
  );
}
