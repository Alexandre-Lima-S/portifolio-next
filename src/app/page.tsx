"use client";

import React, { useState, useEffect, createRef } from "react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import Header from "../components/Header";
import TransitionScreen from "../components/TransitionScreen";
import HeroSection from "../sections/HeroSection";
import VideoSection from "../sections/VideoSection";
import TechStackShowcase from "../sections/TechStackShowcase";
import LearnMoreSection from "../sections/LearnMoreSection";
import BlankSection from "../sections/BlankSection";
import ThirdSection from "../sections/ThirdSection";
import Modal from "../components/Modal";
import Footer from "../components/Footer";
import { useGLTF } from "@react-three/drei";

// pré-carregamento do modelo
useGLTF.preload("/eye/model.gltf");

export default function Home() {
  const sections = {
    Hero: createRef<HTMLDivElement>(),
    Video: createRef<HTMLDivElement>(),
    Testimonials: createRef<HTMLDivElement>(),
    blanksections: createRef<HTMLDivElement>(),
    thirdsections: createRef<HTMLDivElement>(),
  } as const;

  const [showTransition, setShowTransition] = useState(true);
  const [transitionFadeOut, setTransitionFadeOut] = useState(false);
  const [showPage, setShowPage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => setShowTransition(true), []);

  useEffect(() => {
    if (!showTransition) return;
    const t1 = setTimeout(() => {
      setTransitionFadeOut(true);
      const t2 = setTimeout(() => {
        setShowTransition(false);
        setShowPage(true);
      }, 1000);
      return () => clearTimeout(t2);
    }, 2000);
    return () => clearTimeout(t1);
  }, [showTransition]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {showPage && (
        <Header scrollToSection={scrollToSection} sections={sections} />
      )}

      {showTransition && <TransitionScreen fadeOut={transitionFadeOut} />}

      {showPage && (
        <>
          {/* HERO */}
          <div ref={sections.Hero} className="w-screen overflow-hidden">
            <HeroSection
              onLearnMore={() => scrollToSection(sections.Video)}
              onOurLocation={() => scrollToSection(sections.blanksections)}
            />
          </div>

          {/* VIDEO */}
          <div ref={sections.Video} className="w-screen overflow-hidden">
            <VideoSection />
          </div>

          {/* SKILLS GALLERY */}
          <div ref={sections.Testimonials} className="w-screen overflow-hidden">
            <TechStackShowcase />
          </div>

          {/* Saber Mais */}
          <LearnMoreSection onClick={() => setIsModalOpen(true)} />

          {/* PROJETOS */}
          <div ref={sections.blanksections} className="w-screen overflow-hidden">
            <BlankSection />
          </div>

          {/* CONTATE-ME */}
          <div ref={sections.thirdsections} className="w-screen overflow-hidden">
            <ThirdSection scrollToHero={() => scrollToSection(sections.Hero)} />
          </div>
        </>
      )}

      {/* modal de tópicos */}
      <AnimatePresence>
        {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>

      {/* rodapé */}
      <Footer />

      {/* animações globais */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1.5s ease-out forwards;
        }
        .animate-fadeOut {
          animation: fadeOut 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}