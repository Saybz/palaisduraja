// Route pour gérer les fichiers Blob (lister, supprimer)
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { list, del } from "@vercel/blob";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { blobs } = await list();
    return NextResponse.json({ blobs });
  } catch (error) {
    console.error("Erreur lors de la récupération des fichiers:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des fichiers" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json(
        { error: "URL manquante" },
        { status: 400 }
      );
    }

    await del(url);
    return NextResponse.json({ success: true, message: "Fichier supprimé" });
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du fichier" },
      { status: 500 }
    );
  }
}

