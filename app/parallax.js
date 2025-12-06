"use client";

import { useEffect, useState } from "react";

export function ParallaxLayer() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setOffset({ x, y });
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      className="parallax-bg"
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`
      }}
    />
  );
}
