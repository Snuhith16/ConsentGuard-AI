"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeText = async () => {
    if (!text.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      const data = await response.json();
      setResult(data);

      // ---------------------------------------------
      // SAVE LIGHTWEIGHT HISTORY SUMMARY (Option B)
      // ---------------------------------------------
      await fetch("/api/history/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          risk_level: data.risk_level,
          risk_score: data.risk_score,
          summary: data.summary_verdict
        })
      });

    } catch (error) {
      console.error("Error:", error);
      setResult({
        error: "Something went wrong. Try again."
      });
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>ConsentGuard</h1>
      <p>Paste any Terms & Conditions or Privacy Policy text:</p>

      <textarea
        className="input"
        placeholder="Paste text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="btn" onClick={analyzeText} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {/* RESULTS */}
      {result && (
        <div className="glass result-card">
          {result.error && (
            <p style={{ color: "red" }}>{result.error}</p>
          )}

          {!result.error && (
            <>
              <h2>Analysis Result</h2>

              <p><strong>Risk Level:</strong> {result.risk_level}</p>
              <p><strong>Risk Score:</strong> {result.risk_score}</p>
              <p><strong>Summary:</strong> {result.summary_verdict}</p>

              {/* KEY CLAUSES */}
              {Array.isArray(result.key_clauses) && result.key_clauses.length > 0 && (
                <>
                  <h3>Key Clauses:</h3>
                  <ul>
                    {result.key_clauses.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </>
              )}

              {/* HIGHLIGHTED TEXT */}
              {result.highlighted_text && (
                <div
                  className="highlight-card"
                  dangerouslySetInnerHTML={{ __html: result.highlighted_text }}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
