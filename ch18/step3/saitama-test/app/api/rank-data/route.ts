import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "public", "rank-data.json");

export async function GET() {
  try {
    const json = await fs.readFile(filePath, "utf-8");
    return NextResponse.json(JSON.parse(json));
  } catch (e) {
    console.error("Failed to save data", e);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    // JSONを整形して書き込み
    await fs.writeFile(filePath, JSON.stringify(body, null, 2), "utf-8");
    return NextResponse.json({ message: "Saved to public/rank-data.json!" });
  } catch (e) {
    return NextResponse.json(
      { error: `Failed to save: ${e}` },
      { status: 500 },
    );
  }
}
