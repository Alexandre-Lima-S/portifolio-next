"use client";

import { motion, AnimatePresence } from "framer-motion";

const topics = [
  { title: "Front-end React", desc: "Componentes dinâmicos em React + Next.js" },
  { title: "Back-end Node.js", desc: "APIs REST, GraphQL e micro-serviços" },
  { title: "UI/UX Design", desc: "Prototipagem e interfaces centradas no usuário" },
  { title: "Animações Web", desc: "Framer Motion, Three.js e SVG animado" },
];

type ModalProps = { onClose: () => void };

export default function Modal({ onClose }: ModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-xl p-8 max-w-md w-full"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-4">O que eu posso fazer?</h2>
          <ul className="space-y-3 mb-6">
            {topics.map((t) => (
              <li key={t.title} className="border-l-4 border-red-400 pl-3">
                <h3 className="font-medium">{t.title}</h3>
                <p className="text-gray-600 text-sm">{t.desc}</p>
              </li>
            ))}
          </ul>
          <div className="text-right">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              Fechar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
