"use client";

import "./globals.css";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Parallax movement
  useEffect(() => {
    const handleMove = (e) => {
      const x = (window.innerWidth / 2 - e.clientX) / 70;
      const y = (window.innerHeight / 2 - e.clientY) / 70;
      const bg = document.querySelector(".parallax");
      if (bg) bg.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Spotlight (CMD + Space)
  useEffect(() => {
    const handler = (e) => {
      if (e.metaKey && e.code === "Space") {
        e.preventDefault();
        setSpotlightOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <html lang="en">
      <body>

        {/* BACKGROUND LAYERS */}
        <div className="parallax"></div>
        <div className="parallax-layer layer1"></div>
        <div className="parallax-layer layer2"></div>
        <div className="parallax-layer layer3"></div>

        {/* MAIN LAYOUT */}
        <div className="layout">

          {/* SIDEBAR */}
          <aside className="sidebar glass">
            <div className="traffic-lights">
              <span className="light red"></span>
              <span className="light yellow"></span>
              <span className="light green"></span>
            </div>

            <h2 className="sidebar-title">ConsentGuard</h2>

            <ul className="sidebar-menu">
              <li>
                <a href="/">🔍 Analyze</a>
              </li>

              <li>
                <a href="/history">📄 History</a>
              </li>

              <li>
                <a href="#">⚙️ Settings</a>
              </li>
            </ul>

            <div className="shortcut">⌘ + Space</div>
          </aside>

          {/* MAIN PANEL */}
          <main className="main-panel glass fade-in">
            {children}
          </main>
        </div>

        {/* SPOTLIGHT SEARCH */}
        {spotlightOpen && (
          <div className="spotlight-overlay" onClick={() => setSpotlightOpen(false)}>
            <div className="spotlight-box glass" onClick={(e) => e.stopPropagation()}>
              <input
                autoFocus
                className="spotlight-input"
                placeholder="Search settings, history, features…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        )}

      </body>
    </html>
  );
}
