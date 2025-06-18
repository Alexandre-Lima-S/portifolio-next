"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState({ text: "", position: "top" });

  const videos = [
    "/video1.mp4",
    "/video2.mp4",
    "/video3.mp4",
    "/video4.mp4"
  ];

  const phrases = [
    { text: "desenvolvedor de software, sites, programas, lojas e sistemas de ajudas web.", position: "top" },
    { text: "A criatividade e a execução, nas suas mãos e no seu controle.", position: "bottom" },
    { text: "ganhe visibilidade ou ate um template mais atrativo ao publico.", position: "top" },
    { text: "Sua criação? Agora é um protótipo interativo e editavel.", position: "bottom" }
  ];

  // Frases animadas
  useEffect(() => {
    let index = 0;
    setCurrentPhrase(phrases[0]);
    const interval = setInterval(() => {
      index = (index + 1) % phrases.length;
      setCurrentPhrase(phrases[index]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Troca automática de vídeos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, 10000); // troca a cada 10 s
    // s
    return () => clearInterval(interval);
  }, []);

  // Play/pause baseado na visibilidade
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(console.error);
        } else if (videoRef.current) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.3 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Vídeo dinâmico com troca automática */}
      <video
        key={videos[currentVideoIndex]}
        ref={videoRef}
        className="w-full h-screen object-cover"
        src={videos[currentVideoIndex]}
        playsInline
        muted
        autoPlay
        loop
        controls={false}
        preload="auto"
      />

      {/* Frase animada sobre o vídeo */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentPhrase.position}-${currentPhrase.text}`}
          className={`absolute ${
            currentPhrase.position === "top" ? "top-16" : "bottom-24"
          } left-0 right-0 text-center px-6`}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={textVariants}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-light drop-shadow-lg">
            {currentPhrase.text}
          </h2>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
