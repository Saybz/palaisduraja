// Route pour upload de fichiers vers Vercel Blob
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  // Vérifier l'authentification
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const data = await req.formData();
  const file = data.get("file") as File;

  if (!file) {
    return NextResponse.json(
      { error: "Aucun fichier fourni" },
      { status: 400 }
    );
  }

  try {
    // Générer un nom de fichier unique
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    
    // Upload vers Vercel Blob
    const blob = await put(fileName, file, {
      access: "public",
    });

    // Retourner l'URL du fichier uploadé
    return NextResponse.json({ fileUrl: blob.url });
  } catch (error) {
    console.error("Erreur upload Vercel Blob:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'upload" },
      { status: 500 }
    );
  }
}
