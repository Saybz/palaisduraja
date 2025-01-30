import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Prévenir la création multiple de clients Prisma en mode développement
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") {
  global.prisma = prisma;
}

export { prisma };