"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiHtml5,
  SiCss3,
  SiPostgresql,
} from "react-icons/si";

const techs = [
  { name: "React", icon: <SiReact size={40} /> },
  { name: "Next.js", icon: <SiNextdotjs size={40} /> },
  { name: "Tailwind", icon: <SiTailwindcss size={40} /> },
  { name: "JavaScript", icon: <SiJavascript size={40} /> },
  { name: "TypeScript", icon: <SiTypescript size={40} /> },
  { name: "Node.js", icon: <SiNodedotjs size={40} /> },
  { name: "HTML5", icon: <SiHtml5 size={40} /> },
  { name: "CSS3", icon: <SiCss3 size={40} /> },
];

export default function TechStackShowcase() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (rowRef.current) {
      setWidth(rowRef.current.scrollWidth);
    }
  }, []);

  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-semibold mb-12">
          <span className="text-red-400">Minhas Tecnologias</span>
        </h2>

        <div className="overflow-hidden w-full">
          <motion.div
            ref={rowRef}
            className="flex gap-8 px-6"
            animate={{ x: [0, -width * 0.3] }}

            transition={{ duration: 80, ease: "linear", repeat: Infinity }}
          >
            {[...techs, ...techs].map((tech, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center justify-center bg-white/10 border border-white/20 rounded-xl shadow-md p-6 min-w-[180px] hover:scale-110 transition-all"
                whileHover={{ scale: 1.1 }}
              >
                {tech.icon}
                <p className="mt-4 text-lg font-light">{tech.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
