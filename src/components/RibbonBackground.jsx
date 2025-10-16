"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CurvyVerticalLine() {
  const canvasRef = useRef(null);
  const lineProgress = useRef(0); // 0 → 1

  // Precompute 6 segments (relative y and x offsets)
  const segments = [
    { xOffset: 0, yRatio: 0.16 }, // straight
    { xOffset: 40, yRatio: 0.33 }, // curve right
    { xOffset: -30, yRatio: 0.50 }, // curve left
    { xOffset: 0, yRatio: 0.66 }, // straight
    { xOffset: 20, yRatio: 0.83 }, // small right
    { xOffset: -10, yRatio: 1 }, // slight left, ends at midpoint
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const lineX = width / 2; // starting X
    const lineWidth = 4;

    const drawLine = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "#FF0000";
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.beginPath();

      let prevX = lineX;
      let prevY = 0;
      ctx.moveTo(prevX, prevY);

      const maxHeight = height / 2;
      const currentHeight = maxHeight * lineProgress.current;

      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        const segY = seg.yRatio * maxHeight;
        if (segY > currentHeight) break; // stop drawing if progress not reached

        const segX = lineX + seg.xOffset;
        // Draw quadratic curve from previous to this point
        const cpX = (prevX + segX) / 2;
        const cpY = (prevY + segY) / 2;
        ctx.quadraticCurveTo(cpX, cpY, segX, segY);

        prevX = segX;
        prevY = segY;
      }

      ctx.stroke();
    };

    drawLine();

    gsap.to(lineProgress, {
      current: 1,
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "50% bottom",
        scrub: true,
      },
      onUpdate: drawLine,
    });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      drawLine();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed  inset-0 -z-10 pointer-events-none"
    />
  );
}
