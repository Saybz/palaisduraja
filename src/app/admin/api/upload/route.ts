// Route apellée pour mettre à jour le contenu fichier pdf (upload)
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file") as File;

  if (!file) {
    return NextResponse.json(
      { error: "Aucun fichier fourni" },
      { status: 400 }
    );
  }

  const uploadsDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadsDir, fileName);

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  return NextResponse.json({ fileUrl: `/uploads/${fileName}` });
}
