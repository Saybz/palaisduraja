import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Récupérer tous les plats
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dishes = await prisma.dish.findMany({
    orderBy: {
      order: "asc",
    },
  });
  
  return NextResponse.json(dishes);
}

// Créer un nouveau plat
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, description, price, image, order } = body;

  if (!name || !description || !price) {
    return NextResponse.json(
      { error: "Name, description, and price are required" },
      { status: 400 }
    );
  }

  // Si aucun ordre n'est spécifié, mettre à la fin
  const maxOrder = await prisma.dish.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });
  const newOrder = order !== undefined ? order : (maxOrder?.order ?? -1) + 1;

  const dish = await prisma.dish.create({
    data: {
      name,
      description,
      price,
      image: image || null,
      order: newOrder,
    },
  });

  return NextResponse.json(dish);
}

// Mettre à jour un plat
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id, name, description, price, image, order } = body;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const dish = await prisma.dish.update({
    where: { id },
    data: {
      ...(name !== undefined && { name }),
      ...(description !== undefined && { description }),
      ...(price !== undefined && { price }),
      ...(image !== undefined && { image }),
      ...(order !== undefined && { order }),
    },
  });

  return NextResponse.json(dish);
}

// Supprimer un plat
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  await prisma.dish.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json({ success: true });
}
