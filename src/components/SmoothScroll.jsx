"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2, // feel of scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth acceleration
      smoothWheel: true,
      smoothTouch: true, // you can set true if you want on mobile
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
