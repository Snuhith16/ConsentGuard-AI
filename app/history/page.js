"use client";
import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("/api/history/get")
      .then(res => res.json())
      .then(data => setHistory(data));
  }, []);

  return (
    <div className="glass main-panel fade-in" style={{ padding: "35px" }}>
      <h1>History</h1>
      <p>Your recent analysis summaries:</p>

      {history.length === 0 && <p>No history found.</p>}

      <ul style={{ marginTop: "20px", listStyle: "none", paddingLeft: 0 }}>
        {history.map((item) => (
          <li key={item.id} className="glass" style={{
            padding: "16px",
            borderRadius: "12px",
            marginBottom: "12px"
          }}>
            <strong>{item.timestamp}</strong>
            <p>Risk Level: {item.risk_level}</p>
            <p>Risk Score: {item.risk_score}</p>
            <p>Summary: {item.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
