"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ─────────────────────────  Animated title (AL CODES) ───────────────────────── */

const AnimatedTitle: React.FC = () => {
  const text = "AL CODES";
  const words = text.split(" ");

  return (
    <h2 className="text-center text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wide mb-10">
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-6">
          {word.split("").map((letter, letterIndex) => {
            const isFirst = letterIndex === 0;
            return (
              <motion.span
                key={letterIndex}
                className="inline-block"
                animate={isFirst ? { y: [0, -12, 0] } : {}}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
                style={{
                  color: isFirst ? "#00ffff" : "#000000",
                  textShadow: isFirst ? "0 0 10px #00ffff" : "none",
                }}
              >
                {letter}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h2>
  );
};

/* ─────────────────────────  Main section  ───────────────────────── */

interface ThirdSectionProps {
  scrollToHero: () => void;
}

export default function ThirdSection({ scrollToHero }: ThirdSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const paragraphText =
    "Você não está apenas contruindo um projeto. Está iniciando um legado. Cada linha de código aqui transforma suas ideias em experiências reais. Pronto para começar a sua?";

  return (
    <section className="w-full bg-white py-18 font-sf" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-5">
        {/* Título animado "AL CODES" */}
        <AnimatedTitle />

        {/* Parágrafo */}
        <motion.p
          className="text-[24px] sm:text-[28px] lg:text-[32px] font-medium text-gray-700 leading-relaxed text-left mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {paragraphText}
        </motion.p>

        {/* Botão */}
        <div className="text-center">
          <motion.button
            onClick={() => setShowModal(true)}
            className="relative px-10 py-3 text-lg sm:text-xl font-medium text-black border border-transparent rounded-[1.5rem] overflow-hidden group"
            whileHover="hover"
            initial="rest"
            variants={{
              rest: {
                borderColor: "rgba(255, 0, 0, 0.2)",
                boxShadow: "0px 0px 15px rgba(255, 0, 0, 0.4)",
              },
              hover: {
                borderColor: "rgba(255, 0, 0, 0.4)",
                boxShadow: "0px 0px 25px rgba(255, 0, 0, 0.6)",
              },
            }}
          >
            <span className="relative z-10">contate-me</span>
            <span className="absolute inset-0 rounded-[1.5rem] border-[1px] border-red-500 opacity-30 animate-redPulse" />
            <span className="absolute inset-0 rounded-[1.5rem] border-[1px] border-red-500 opacity-0 group-hover:animate-pulse group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </div>
      </div>

      {/* Modal de contato – estilização minimalista e tech */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-[320px] shadow-2xl">
            <h3 className="text-center text-2xl font-semibold mb-6 text-gray-900">
              Fale comigo
            </h3>
            <ul className="space-y-4">
              {[
                {
                  label: "Instagram",
                  href: "https://instagram.com/seuPerfil",
                  color: "from-pink-500 to-pink-300",
                },
                {
                  label: "WhatsApp",
                  href: "https://wa.me/5511999999999",
                  color: "from-green-400 to-green-200",
                },
                {
                  label: "E-mail",
                  href: "mailto:seuemail@exemplo.com",
                  color: "from-red-500 to-red-300",
                },
                {
                  label: "GitHub",
                  href: "https://github.com/seuUsuario",
                  color: "from-gray-700 to-gray-500",
                },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`
                      flex items-center space-x-3
                      px-4 py-2 rounded-lg
                      bg-gradient-to-r ${item.color}
                      text-white font-medium
                      hover:opacity-90 transition
                    `}
                  >
                    <span className="flex-1">{item.label}</span>
                    <svg
                      className="w-5 h-5 opacity-80"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 2.293a1 1 0 011.414 0L18 6.586a1 1 0 010 1.414l-7 7a1 1 0 01-1.414-1.414L14.586 8H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Estilos locais mantidos */}
      <style jsx>{`
        .outerContainer {
          width: 100vw;
          min-height: 100vh;
          padding: 50px 20px;
          box-sizing: border-box;
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
        }
        .captionContainer h2 {
          margin-bottom: 10px;
          color: #111827;
          font-weight: 800;
          text-align: center;
        }
        @media (min-width: 640px) {
          .captionContainer h2 {
            font-size: 72px;
          }
        }
        @media (min-width: 1024px) {
          .captionContainer h2 {
            font-size: 84px;
          }
        }
      `}</style>

      <style jsx global>{`
        @keyframes redPulse {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.3;
          }
        }
        .animate-redPulse {
          animation: redPulse 3s linear infinite;
        }
      `}</style>
    </section>
  );
}
