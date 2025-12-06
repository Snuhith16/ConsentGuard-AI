import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();
    const filePath = path.join(process.cwd(), "data", "history.json");

    // Read file
    let history = [];
    try {
      const data = await fs.readFile(filePath, "utf8");
      history = JSON.parse(data);
    } catch (e) {
      history = [];
    }

    // Add new record
    const entry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      risk_level: body.risk_level,
      risk_score: body.risk_score,
      summary: body.summary
    };

    history.unshift(entry);

    // Save back
    await fs.writeFile(filePath, JSON.stringify(history, null, 2));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
