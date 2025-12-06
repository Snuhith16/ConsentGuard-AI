import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "history.json");
    const data = await fs.readFile(filePath, "utf8");
    const history = JSON.parse(data);

    return new Response(JSON.stringify(history), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify([]), { status: 200 });
  }
}
