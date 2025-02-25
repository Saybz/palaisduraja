// types/next-auth.d.ts (ou à la racine du projet)

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
  }

  interface Token {
    id?: string;
    email?: string;
  }
}
