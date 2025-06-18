"use client";

import React, {
  Suspense,
  useRef,
  useState,
  useEffect,
  type JSX,
} from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// pré-carregamento
useGLTF.preload("/eye/model.gltf");

type EyeModelProps = Omit<JSX.IntrinsicElements["primitive"], "object"> & {
  trigger: number;
};

/* ───────── 3D eye ───────── */
function EyeModel({ trigger, ...props }: EyeModelProps) {
  useEffect(() => THREE.Cache.clear(), [trigger]);
  const gltf = useLoader(GLTFLoader, `/eye/model.gltf?trigger=${trigger}`);
  const ref = useRef<THREE.Object3D>(null!);
  const [baseX, baseY, baseZ] = Array.isArray(props.rotation)
    ? props.rotation
    : [0, 0, 0];

  const lateralAmplitude = 0.2;
  const lateralFrequency = 0.5;
  const investigationAngle = 0.3;
  const extraYOffset = 0.2;
  const cycleDuration = 16;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const lateralOscillation =
      lateralAmplitude * Math.sin(t * lateralFrequency * Math.PI * 2);
    const investigationOffset =
      0.5 - 0.5 * Math.cos((2 * Math.PI * t) / cycleDuration);

    ref.current.rotation.x = baseX - investigationAngle * investigationOffset;
    ref.current.rotation.y =
      baseY + lateralOscillation + extraYOffset * investigationOffset;
    ref.current.rotation.z = baseZ;
  });

  return <primitive ref={ref} object={gltf.scene} {...props} />;
}

/* ───────── typewriter ───────── */
function Typewriter({
  words,
  typingSpeed = 120,
  pauseTime = 1500,
}: {
  words: string[];
  typingSpeed?: number;
  pauseTime?: number;
}) {
  const [current, setCurrent] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    if (!words.length) return;
    const word = words[current] ?? "";
    let t: ReturnType<typeof setTimeout>;

    if (!del && text !== word) {
      t = setTimeout(
        () => setText(word.slice(0, text.length + 1)),
        typingSpeed
      );
    } else if (del && text) {
      t = setTimeout(
        () => setText(word.slice(0, text.length - 1)),
        typingSpeed
      );
    } else if (!del && text === word) {
      t = setTimeout(() => setDel(true), pauseTime);
    } else if (del && !text) {
      setDel(false);
      setCurrent((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(t);
  }, [text, del, words, current, typingSpeed, pauseTime]);

  return (
    <span className="notranslate" translate="no">
      {text}
      <span className="blinking-cursor">_</span>
    </span>
  );
}

/* ───────── action buttons ───────── */
function ActionButtons({
  onLearnMore,
  onShowCertificates,
}: {
  onLearnMore: () => void;
  onShowCertificates: () => void;
}) {
  return (
    <div className="flex gap-4 mt-8">
      {/* Saber Mais */}
      <motion.button
        onClick={onLearnMore}
        className="relative px-4 py-3 text-base font-medium text-black border rounded-[1.5rem] overflow-hidden group"
        initial="rest"
        whileHover="hover"
        variants={{
          rest: { borderColor: "rgba(0,0,0,0.2)", boxShadow: "0 0 15px rgba(0,0,0,0.4)" },
          hover: { borderColor: "rgba(0,0,0,0.4)", boxShadow: "0 0 25px rgba(0,0,0,0.6)" },
        }}
      >
        <span className="relative z-10">Saber Mais</span>
        <span className="absolute inset-0 rounded-[1.5rem] border opacity-30 animate-[border-glow_3s_linear_infinite]" />
        <span className="absolute inset-0 rounded-[1.5rem] border opacity-0 group-hover:animate-pulse group-hover:opacity-100 transition-opacity duration-300" />
      </motion.button>

      {/* Ver Certificados */}
      <motion.button
        onClick={onShowCertificates}
        className="relative px-5 py-3 text-lg font-medium text-black border rounded-[1.5rem] overflow-hidden group"
        initial="rest"
        whileHover="hover"
        variants={{
          rest: { borderColor: "rgba(255,0,0,0.2)", boxShadow: "0 0 15px rgba(255,0,0,0.4)" },
          hover: { borderColor: "rgba(255,0,0,0.4)", boxShadow: "0 0 25px rgba(255,0,0,0.6)" },
        }}
      >
        <span className="relative z-10">Ver Certificados</span>
        <span className="absolute inset-0 rounded-[1.5rem] border-red-500 opacity-30 animate-redPulse" />
        <span className="absolute inset-0 rounded-[1.5rem] border-red-500 opacity-0 group-hover:animate-pulse group-hover:opacity-100 transition-opacity duration-300" />
      </motion.button>

      <style jsx global>{`
        @keyframes redPulse {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
        .animate-redPulse { animation: redPulse 3s linear infinite; }
      `}</style>
    </div>
  );
}

/* ───────── main component ───────── */
export default function HeroSection({
  onLearnMore,
  onOurLocation, // continua recebendo, mas não usaremos diretamente
}: {
  onLearnMore: () => void;
  onOurLocation: () => void;
}) {
  const [words, setWords] = useState<string[]>([]);
  const [eyeKey, setEyeKey] = useState(0);

  // **Estado para controlar o popup**
  const [showCertPopup, setShowCertPopup] = useState(false);

  useEffect(() => {
    const base = ["Plataformas", "Lojas", "Templates", "aplicações", "Visual Exp"];
    setWords(base);
    setEyeKey(Date.now());
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden">
      {/* título */}
      <div className="text-center px-[50px]">
        <p className="text-xl md:text-3xl leading-tight">
          <span className="text-black block">
            Seu projeto merece mais que uma interface merece uma experiência digital.
          </span>
          <span className="text-black block">
            desenvolva do seu jeito {" "}
            <span className="neon-text inline">
              <Typewriter words={words} />
            </span>
          </span>
        </p>
      </div>

      {/* 3D eye */}
      <div className="w-full h-[50vh] relative">
        <Canvas camera={{ position: [0, 3, 5], fov: 45 }} style={{ touchAction: "none" }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[7, 7, 7]} intensity={9} castShadow />
            <EyeModel
              trigger={eyeKey}
              scale={[0.009, 0.009, 0.009]}
              position={[0, 0, 0]}
              rotation={[0, -Math.PI * 0.45, 0.4]}
            />
            <OrbitControls enableZoom={false} enablePan={false} enableRotate />
          </Suspense>
        </Canvas>
      </div>

      {/* botões, passando o novo handler para abrir o popup */}
      <ActionButtons
        onLearnMore={onLearnMore}
        onShowCertificates={() => setShowCertPopup(true)}
      />

      {/* ——— Popup de Certificados ——— */}
      {showCertPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button
              onClick={() => setShowCertPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Meus Certificados</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <a
                  href="https://trybe.com/certificado-logicaprogramacao"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Lógica de Programação – Trybe
                </a>
              </li>
              <li>
                <a
                  href="https://yourunilink.com/certificado"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Desenvolvimento Front-end – UniEvangélica
                </a>
              </li>
              {/* adicione quantos certificados quiser aqui */}
            </ul>
          </div>
        </div>
      )}

      {/* extras de estilo */}
      <style jsx global>{`
        .blinking-cursor {
          animation: blink 1s step-start infinite;
        }
        @keyframes blink {
          0% { opacity:1 }
          50% { opacity:0 }
          100% { opacity:1 }
        }
        .neon-text {
          color:#ff073a;
          text-shadow:0 0 1px #ff073a, 0 0 2px #ff073a;
        }
      `}</style>
    </section>
  );
}
