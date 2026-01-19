import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/db";
import type { Schedule, Content } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type ScheduleInput = {
  day: Schedule["day"];
  period: Schedule["period"];
  openTime?: string | null;
  closeTime?: string | null;
  isClosed: boolean;
};

// Récupérer le contenu + horaires
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = await prisma.content.findFirst({
    include: {
      schedules: true,
    },
  });
  return NextResponse.json(content || {});
}

// Mettre à jour le contenu + horaires
export async function POST(req: Request) {

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const body = await req.json();

  const {
    banner,
    // Champs FR
    title,
    histoire,
    menuDesc,
    cuisine,
    paiement,
    // Champs EN
    // Champs EN retirés car non définis dans le type Content
    // Images et fichiers
    histoireImg,
    menuImg,
    menuImg1,
    menuImg2,
    menuImg3,
    menuImg4,
    menuPdf,
    // Contact
    mail,
    tel,
    schedules,
  } = body as Content & { 
    menuImg1?: string | null;
    menuImg2?: string | null;
    menuImg3?: string | null;
    menuImg4?: string | null;
    schedules: ScheduleInput[] 
  };

  // Vérifier si le contenu existe
  const existingContent = await prisma.content.findFirst();

  if (existingContent) {
    // 🟢 Mise à jour du contenu
    await prisma.content.update({
      where: { id: existingContent.id },
      data: {
        banner,
        // FR
        title,
        histoire,
        menuDesc,
        cuisine,
        paiement,
        // EN
        titleEn,
        histoireEn,
        menuDescEn,
        cuisineEn,
        paiementEn,
        // Images
        histoireImg,
        menuImg,
        menuImg1,
        menuImg2,
        menuImg3,
        menuImg4,
        menuPdf,
        mail,
        tel,
      } as Parameters<typeof prisma.content.update>[0]['data'],
    });

    // 🟢 Mise à jour des horaires
    if (schedules && Array.isArray(schedules)) {
      // On supprime les anciens et recrée les nouveaux
      await prisma.schedule.deleteMany({
        where: { contentId: existingContent.id },
      });

      await prisma.schedule.createMany({
        data: schedules.map((s) => ({
          day: s.day,
          period: s.period,
          openTime: s.isClosed ? null : s.openTime || null,
          closeTime: s.isClosed ? null : s.closeTime || null,
          isClosed: s.isClosed,
          contentId: existingContent.id,
        })),
      });
    }

    // Retourner le contenu + horaires à jour
    const result = await prisma.content.findUnique({
      where: { id: existingContent.id },
      include: { schedules: true },
    });

    // Invalider le cache des pages
    revalidatePath("/", "layout");
    revalidatePath("/fr", "layout");
    revalidatePath("/en", "layout");

    return NextResponse.json(result);
  } else {
    // 🟢 Création d'un nouveau contenu
    const newContent = await prisma.content.create({
      data: {
        banner,
        // FR
        title,
        histoire,
        menuDesc,
        cuisine,
        paiement,
        // EN
        titleEn,
        histoireEn,
        menuDescEn,
        cuisineEn,
        paiementEn,
        // Images
        histoireImg,
        menuImg,
        menuImg1,
        menuImg2,
        menuImg3,
        menuImg4,
        menuPdf,
        mail,
        tel,
        schedules: {
          create: schedules?.map((s) => ({
            day: s.day,
            period: s.period,
            openTime: s.isClosed ? null : s.openTime || null,
            closeTime: s.isClosed ? null : s.closeTime || null,
            isClosed: s.isClosed,
          })) || [],
        },
      } as Parameters<typeof prisma.content.create>[0]['data'],
      include: { schedules: true },
    });

    // Invalider le cache des pages
    revalidatePath("/", "layout");
    revalidatePath("/fr", "layout");
    revalidatePath("/en", "layout");

    return NextResponse.json(newContent);
  }
}
