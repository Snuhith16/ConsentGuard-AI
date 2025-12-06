"use client";

import "./globals.css";
import { useEffect } from "react";

export default function RootLayout({ children }) {

  // Parallax movement
  useEffect(() => {
    const handleMove = (e) => {
      const x = (window.innerWidth / 2 - e.clientX) / 80;
      const y = (window.innerHeight / 2 - e.clientY) / 80;
      const bg = document.querySelector(".parallax");
      if (bg) bg.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <html lang="en">
      <body>

        {/* MULTI-LAYER BACKGROUND */}
        <div className="parallax"></div>
        <div className="parallax-layer one"></div>
        <div className="parallax-layer two"></div>
        <div className="parallax-layer three"></div>

        {children}

      </body>
    </html>
  );
}
