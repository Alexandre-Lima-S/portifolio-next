// src/components/GoboPet.tsx
"use client";

import React, { type MouseEventHandler } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Scene() {
  const { scene } = useGLTF("/models/gobo.glb");
  const ref = useRef<THREE.Group>(null!);

  if (ref.current) {
    ref.current.rotation.y = 0;
  }

  return (
    <group ref={ref} scale={[0.7, 0.7, 0.7]}>
      <primitive object={scene} dispose={null} />
    </group>
  );
}

export default function GoboPet({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="fixed bottom-4 right-4 z-50 transform transition-transform duration-300 hover:scale-110 cursor-pointer group"
      style={{ width: 150, height: 150 }}
      onClick={onClick as MouseEventHandler}
    >
      {/* Tooltip no hover */}
      <div className="absolute bottom-full mb-2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Roy
      </div>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[0, 2, 2]} intensity={0.4} />
        <Scene />
      </Canvas>
    </div>
  );
}