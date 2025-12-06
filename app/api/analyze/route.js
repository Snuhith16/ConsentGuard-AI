import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { text } = await req.json();

    if (!text || text.trim() === "") {
      return NextResponse.json(
        { error: "No text provided" },
        { status: 400 }
      );
    }

    // Call OpenAI
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You analyze privacy policies and return structured risk output."
          },
          {
            role: "user",
            content: `
Analyze this text and return JSON only:

Text:
${text}

Return JSON in this EXACT structure:
{
  "risk_level": "Low | Medium | High | Very High",
  "risk_score": number,
  "summary_verdict": "short summary",
  "key_clauses": ["clause1", "clause2"],
  "highlighted_text": "<mark> ... </mark>"
}
`
          }
        ]
      })
    });

    const raw = await completion.json();

    // Parse model output safely
    let clean;
    try {
      clean = JSON.parse(raw.choices[0].message.content);
    } catch (err) {
      console.log("JSON parse failed:", err);
      return NextResponse.json({ error: "Invalid model output" }, { status: 500 });
    }

    // Ensure all fields exist
    const finalResult = {
      risk_level: clean.risk_level ?? "Unknown",
      risk_score: clean.risk_score ?? 0,
      summary_verdict: clean.summary_verdict ?? "",
      key_clauses: Array.isArray(clean.key_clauses) ? clean.key_clauses : [],
      highlighted_text: clean.highlighted_text ?? ""
    };

    return NextResponse.json(finalResult);

  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Server error occurred" },
      { status: 500 }
    );
  }
}
