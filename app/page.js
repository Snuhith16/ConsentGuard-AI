"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function analyze() {
    setLoading(true);
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div className="window">

      <h1>ConsentGuard</h1>
      <p>Paste any Terms & Conditions or Privacy Policy text:</p>

      <textarea
        placeholder="Paste text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={analyze} disabled={loading || text.length < 3}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div className="result-card">
          <h2>Analysis Result</h2>

          <p><strong>Risk Level:</strong> {result.risk_level}</p>
          <p><strong>Risk Score:</strong> {result.risk_score}</p>
          <p><strong>Summary:</strong> {result.summary_verdict}</p>

          <h3>Key Clauses:</h3>
          <ul>
            {result.key_clauses.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>

          {result.highlighted_text && (
            <div
              dangerouslySetInnerHTML={{ __html: result.highlighted_text }}
            />
          )}
        </div>
      )}

    </div>
  );
}
