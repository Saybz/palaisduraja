import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";

// Récupérer tous les plats (API publique)
export async function GET() {
  const dishes = await prisma.dish.findMany({
    orderBy: {
      order: "asc",
    },
  });
  
  return NextResponse.json(dishes);
}
