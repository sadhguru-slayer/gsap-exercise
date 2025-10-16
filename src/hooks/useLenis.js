// hooks/useLenis.js
"use client"; // Add this to ensure this hook runs client-side

import { useEffect } from "react";
import Lenis from "lenis"; // Correct import

const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, // Smoothness level, lower = more smooth
      smoothWheel: true,
      smoothTouch: false, // Optional: Disable smooth scroll for touch devices
    });

    // RequestAnimationFrame loop for lenis
    const raf = () => {
      lenis.raf();
      requestAnimationFrame(raf);
    };

    // Start the animation frame loop
    requestAnimationFrame(raf);

    // Cleanup when component unmounts
    return () => {
      lenis.destroy();
    };
  }, []);
};

export default useLenis;
