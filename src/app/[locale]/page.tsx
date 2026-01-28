import { prisma } from "@/utils/db";
import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/HeroSection";
import AnimatedSections from "@/components/AnimatedSections";

// Force le rendu dynamique pour toujours afficher le contenu à jour
export const dynamic = "force-dynamic";

type Schedule = {
  id: number;
  day:
    | "Lundi"
    | "Mardi"
    | "Mercredi"
    | "Jeudi"
    | "Vendredi"
    | "Samedi"
    | "Dimanche";
  period: "MIDI" | "SOIR";
  openTime: string | null;
  closeTime: string | null;
  isClosed: boolean;
};

interface Content {
  banner?: string | null;
  histoireImg?: string | null;
  // Champs FR
  histoire?: string | null;
  title?: string | null;
  menuDesc?: string | null;
  cuisine?: string | null;
  paiement?: string | null;
  // Champs EN
  histoireEn?: string | null;
  titleEn?: string | null;
  menuDescEn?: string | null;
  cuisineEn?: string | null;
  paiementEn?: string | null;
  // Fichiers
  menuImg?: string | null;
  menuImg1?: string | null;
  menuImg2?: string | null;
  menuImg3?: string | null;
  menuImg4?: string | null;
  menuPdf?: string | null;
  mail?: string | null;
  tel?: string | null;
  schedules?: Schedule[];
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

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
          day: (schedule.day.charAt(0).toUpperCase() +
            schedule.day.slice(1).toLowerCase()) as Schedule["day"],
        })),
      }
    : null;

  return (
    <div className="z-0 min-h-screen w-screen font-body flex flex-col items-center">
      <HeroSection
        banner={content?.banner}
        tel={content?.tel}
        // Utiliser systématiquement le PDF local du menu
        menuPdf={"/upload/old_card_pdr.pdf"}
        mail={content?.mail}
      />
      <AnimatedSections content={content} locale={locale} />
    </div>
  );
}
