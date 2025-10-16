"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Planet() {
  const sphereRef = useRef();
  const ringRef = useRef();
  const lightRef = useRef();

  const [size, setSize] = useState(0.6);
  const [position, setPosition] = useState({ x: 1.5, y: 0, z: 3 });

  // Continuous rotation & tilt
  useFrame((state, delta) => {
    if (sphereRef.current) {
      // Pure white sphere with slight tilt to show ring
      sphereRef.current.rotation.y += delta * 0.05;
      sphereRef.current.rotation.x = 0.25; // fixed tilt to reveal ring
      sphereRef.current.rotation.z = 0.15; // horizontal tilt for ring visibility
    }

    if (ringRef.current) {
  // Make ring horizontal
  ringRef.current.rotation.x = 10;          // flat along XZ-plane
  ringRef.current.rotation.y += delta * 0.02; // subtle rotation
  ringRef.current.rotation.z =90;          // no vertical tilt
}


    if (lightRef.current) {
      lightRef.current.intensity = 0.4 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // Scroll-triggered movement & scaling
  useEffect(() => {
    gsap.to({}, {
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          const x = 1.5 - Math.sin(p * Math.PI) * 1.5;
          const z = 3 - p * 0.5;
          const s = 0.6 + p * 0.6;

          setSize(s);
          setPosition({ x, y: 0, z });

          if (sphereRef.current && ringRef.current) {
            sphereRef.current.position.set(x, 0, z);
            ringRef.current.position.set(x, 0, z);
            sphereRef.current.scale.set(s, s, s);
            ringRef.current.scale.set(s, s, s);
          }
        }
      }
    });
  }, []);

  return (
    <>
      {/* Pure White Sphere */}
      <mesh ref={sphereRef} position={[position.x, 0, position.z]} scale={[size, size, size]}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshStandardMaterial
          color="#ffffff"      // pure white
          roughness={0.7}     // matte
          metalness={0.1}     // subtle shine
          emissive="#ffffff"
          emissiveIntensity={0.02}
        />
      </mesh>

      {/* Glassy Button-Like Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} position={[position.x, 0, position.z]} scale={[size, size, size]}>
        <cylinderGeometry args={[1.25, 1.25, 0.15, 128]} />
        <meshPhysicalMaterial
          color="#2a2a2a"
          transparent
          opacity={0.3}
          roughness={0.05}
          metalness={0.5}
          reflectivity={0.7}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Light attached to planet */}
      <pointLight ref={lightRef} position={[position.x, 0, position.z + 2]} intensity={0.8} />
      <ambientLight intensity={0.8} />
    </>
  );
}

export default function PlanetBackground() {
  return (
    <Canvas
      className="fixed inset-0 -z-10 h-screen"
      style={{ height: "100vh", position:'fixed' }}
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      <Planet />
    </Canvas>
  );
}
