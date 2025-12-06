"use client";

import { useEffect, useState } from "react";

export default function Spotlight({ onSelect }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const items = [
    { name: "Analyze", id: "analyze" },
    { name: "History", id: "history" },
    { name: "Settings", id: "settings" },
  ];

  useEffect(() => {
    function handler(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filtered = items.filter((i) =>
    i.name.toLowerCase().includes(query.toLowerCase())
  );

  if (!open) return null;

  return (
    <div className="spotlight-overlay">
      <div className="spotlight-window glass">
        <input
          autoFocus
          className="spotlight-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search…"
        />

        <div className="spotlight-results">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="spotlight-item"
              onClick={() => {
                onSelect(item.id);
                setOpen(false);
              }}
            >
              {item.name}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="spotlight-empty">No results found</div>
          )}
        </div>
      </div>
    </div>
  );
}
