import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
  try {
    const { text } = await req.json();

    const prompt = `
You are an AI that analyzes Terms & Conditions for risky clauses.
Break down the text and return:

1. "summary" – short summary.
2. "riskLevel" – HIGH, MEDIUM, LOW.
3. "riskScore" – number between 0-100.
4. "keyClauses" – bullet list.
5. "highlightedText" – return the SAME text but wrap dangerous clauses in: <mark class="risk"> ... </mark>

Dangerous clauses include:
• Data selling
• Location/device tracking
• Indefinite data retention
• Advertiser sharing
• Third-party data transfer
• Consent bypassing
• Automatic renewal

Text to analyze:
${text}
    `;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt
    });

    const output = JSON.parse(response.output_text);

    return Response.json(output);

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Analysis failed" }, { status: 500 });
  }
}
