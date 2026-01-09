import { prisma } from "@/utils/db";
import HeroSection from "@/components/HeroSection";
import AnimatedSections from "@/components/AnimatedSections";

type Schedule = {
  id: number;
  day: "Lundi" | "Mardi" | "Mercredi" | "Jeudi" | "Vendredi" | "Samedi" | "Dimanche";
  period: "MIDI" | "SOIR";
  openTime: string | null;
  closeTime: string | null;
  isClosed: boolean;
};

interface Content {
  banner?: string | null;
  histoireImg?: string | null;
  histoire?: string | null;
  title?: string | null;
  menuImg?: string | null;
  menuImg1?: string | null;
  menuImg2?: string | null;
  menuImg3?: string | null;
  menuImg4?: string | null;
  menuPdf?: string | null;
  menuDesc?: string | null;
  cuisine?: string | null;
  paiement?: string | null;
  mail?: string | null;
  tel?: string | null;
  schedules?: Schedule[]; // ✅ ajout des horaires
}

export default async function Home() {
  const rawContent = await prisma.content.findFirst({
    include: {
      schedules: true,
    },
  });

  const content: Content | null = rawContent
    ? {
        ...rawContent,
        schedules: rawContent.schedules.map((schedule) => ({
          ...schedule,
          day: schedule.day.charAt(0).toUpperCase() + schedule.day.slice(1).toLowerCase() as Schedule["day"],
        })),
      }
    : null;
  

  return (
    <div className="z-0 min-h-screen w-screen font-body flex flex-col mt-18 items-center">
      <HeroSection banner={content?.banner} tel={content?.tel} />
      <AnimatedSections content={content} />
    </div>
  );
}
