// types/next-auth.d.ts

import { JWT } from "next-auth/jwt"; // Importation du type JWT

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  // Utilisation du type JWT pour l'extension
  interface JWT {
    id?: string;
    name?: string | null;
  }
}

export { JWT };
