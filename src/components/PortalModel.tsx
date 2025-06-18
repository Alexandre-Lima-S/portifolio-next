// src/components/PortalModel.tsx
"use client";

import { useGLTF } from "@react-three/drei";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function PortalModel() {
  const modelRef = useRef<THREE.Group>(null);
  const router = useRouter();
  const { scene } = useGLTF("/models/time_machine.glb");

  // Faz o modelo girar lentamente
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.003;
    }
  });

  const handleClick = () => {
    router.push("/dashboard"); // Mude para a rota desejada
  };

  return (
    <primitive
      object={scene}
      ref={modelRef}
      position={[0, -1, 0]}
      scale={[1.5, 1.5, 1.5]}
      onClick={handleClick}
      cursor="pointer"
    />
  );
}

useGLTF.preload("/models/time_machine.glb");
