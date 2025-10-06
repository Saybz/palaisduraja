import { PrismaClient, WeekDay, Period } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Vérifie si du contenu existe déjà
  let content = await prisma.content.findFirst();

  if (!content) {
    content = await prisma.content.create({
      data: {
        title: "Mon Restaurant",
        histoire: "Bienvenue dans notre restaurant...",
        cuisine: "Française",
        paiement: "Carte / Espèces",
        mail: "contact@restaurant.com",
        tel: "0600000000",
      },
    });
  }

  // Enum jours + périodes
  const days: WeekDay[] = [
    "LUNDI",
    "MARDI",
    "MERCREDI",
    "JEUDI",
    "VENDREDI",
    "SAMEDI",
    "DIMANCHE",
  ];
  const periods: Period[] = ["MIDI", "SOIR"];

  // Crée 14 horaires si aucun n’existe encore
  for (const day of days) {
    for (const period of periods) {
      const existing = await prisma.schedule.findFirst({
        where: { day, period, contentId: content.id },
      });

      if (!existing) {
        await prisma.schedule.create({
          data: {
            day,
            period,
            isClosed: true, // fermé par défaut
            contentId: content.id,
          },
        });
      }
    }
  }

  console.log("✅ Seed terminé : horaires générés !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
