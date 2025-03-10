// Route apellée pour mettre à jour le contenus du site

import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";

// Récupérer le contenu
export async function GET() {
  const content = await prisma.content.findFirst(); // Récupère le premier contenu
  return NextResponse.json(content || {});
}

// Mettre à jour le contenu
export async function POST(req: Request) {
  const body = await req.json();

  const {
    banner,
    title,
    histoire,
    histoireImg,
    menuDesc,
    menuImg,
    menuPdf,
    cuisine,
    paiement,
    horaire1,
    horaire1state,
    horaire2,
    horaire2state,
    mail,
    tel,
  } = body;

  // Vérifier si le contenu existe
  const existingContent = await prisma.content.findFirst();
  if (existingContent) {
    // Mise à jour
    const updatedContent = await prisma.content.update({
      where: { id: existingContent.id },
      data: {
        banner,
        title,
        histoire,
        histoireImg,
        menuDesc,
        menuImg,
        menuPdf,
        cuisine,
        paiement,
        horaire1,
        horaire1state,
        horaire2,
        horaire2state,
        mail,
        tel,
      },
    });
    return NextResponse.json(updatedContent);
  } else {
    // Création
    const newContent = await prisma.content.create({
      data: {
        banner,
        title,
        histoire,
        histoireImg,
        menuDesc,
        menuImg,
        menuPdf,
        cuisine,
        paiement,
        horaire1,
        horaire1state,
        horaire2,
        horaire2state,
        mail,
        tel,
      },
    });
    return NextResponse.json(newContent);
  }
}
