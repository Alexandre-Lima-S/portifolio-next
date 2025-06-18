"use client";

import React from "react";
import { motion } from "framer-motion";

type Project = {
  title: string;
  description: string;
  image: string;
  link: string;
};

const projects: Project[] = [
  {
    title: "Pulse Time",
    description: "E-commerce de relógios com visual moderno inspirado na Rolex.",
    image: "/images/pulse-time-preview.png",
    link: "/projects/pulse-time"
  },
  {
    title: "Portfólio Interativo",
    description: "Site pessoal com modelo 3D interativo e animações em Next.js.",
    image: "/images/portfolio-preview.png",
    link: "/"
  },
  {
    title: "Curso Heitor",
    description: "Landing page futurista para divulgação e venda de cursos online.",
    image: "/images/curso-heitor-preview.png",
    link: "/projects/curso-heitor"
  },
];

export default function ProjectsShowcase() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-black py-16">
      <div className="max-w-7xl mx-auto text-center px-6">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6">
          Meus <span className="text-red-400">Projetos</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-lg border border-gray-300 shadow-md transition flex flex-col justify-between text-gray-700 hover:shadow-xl"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="rounded-lg mb-4 h-48 w-full object-cover"
              />
              <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-500 mb-6">{project.description}</p>
              <a
                href={project.link}
                className="mt-auto inline-block text-red-400 hover:underline font-medium"
              >
                Ver Projeto →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
