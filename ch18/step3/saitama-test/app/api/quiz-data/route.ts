import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "public", "quiz-data.json");

export async function GET() {
  const json = await fs.readFile(filePath, "utf-8");
  return NextResponse.json(JSON.parse(json));
}
