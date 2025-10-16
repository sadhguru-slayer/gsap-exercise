"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef(null);

  useEffect(()=>{
    const el = container.current;
    gsap.from(
        el.children,
        {
            opacity:0
        },
        {
            opacity:1
        }
    )
  })
  useEffect(() => {
    const el = container.current;
    gsap.fromTo(
      el.children,
      {y:40},
      {
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "bottom 70%", // Adjust based on when you want the fade to start/finish
          // markers: true, // Helps to see the trigger points for debugging
          scrub: 1, // Sync animation to the scroll position
          onEnter: () => {
            // Fade in when entering the viewport
            console.log("Enter")
            gsap.to(el.querySelectorAll(".fade"), { scale: 1,opacity:1, duration: 0.5 });
          },
          onEnterBack: () => {
            // Fade in when scrolling back into the viewport
            console.log("Enter back")
            gsap.to(el.querySelectorAll(".fade"), { scale: 1,opacity:1, duration: 0.5 });
          },
          onLeave: () => {
            // Fade out when leaving the viewport (scrolling down)
            console.log("Leave")
            gsap.to(el.children, { scale: 0.7,opacity:0,duration: 0.5 });
          },
          onLeaveBack: () => {
            console.log("Leave back")
            // Fade out when scrolling back up (leaving the viewport)
            gsap.to(el.children, { scale: 0.7,opacity:0, duration: 0.5 });
          },
        },
      }
    );
  }, []);



  return (
    <section
      ref={container}
      // className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 text-white text-center"
      className="h-screen flex flex-col items-center justify-center text-white text-center"
    >
      <h1 className="fade text-6xl font-bold mb-4">Hey, I'm Sadguru 👋</h1>
      <p className="fade text-xl max-w-xl">
        I design and build interactive web experiences with smooth motion and
        clean design.
      </p>
    </section>
  );
}
