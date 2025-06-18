import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

interface TransitionScreenProps {
  fadeOut?: boolean;
}

function Globe() {
  const globeRef = useRef<any>(null);
  
  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <points ref={globeRef}>
      <sphereGeometry args={[5, 64, 64]} />
      <pointsMaterial size={0.1} color={0x87cefa} transparent opacity={0.8} />
    </points>
  );
}

const ClientTransitionScreen: React.FC<TransitionScreenProps> = ({ fadeOut }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(90deg, black, #333)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 1s ease-out",
      }}
    >
      <Canvas
        style={{ width: "500px", height: "500px" }}
        camera={{ position: [15, 15, 15], fov: 50 }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Globe />
        <OrbitControls
          enableZoom={true}
          minDistance={10}
          maxDistance={30}
          enablePan={false}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};

export default ClientTransitionScreen;