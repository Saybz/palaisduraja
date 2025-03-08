import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

// Récupère les identifiants depuis les variables d'environnement
const adminUsername = process.env.NEXTAUTH_ADMIN_USERNAME;
const adminPassword = process.env.NEXTAUTH_ADMIN_PASSWORD;

// Définition de la configuration de NextAuth
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Vérifier que les informations d'identification correspondent
        if (
          credentials?.username === adminUsername &&
          credentials?.password === adminPassword
        ) {
          // Si l'utilisateur est authentifié, retourner un objet user
          return { id: "1", name: "Admin" };
        }
        // Si les identifiants sont incorrects, retourner null
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Page de connexion personnalisée
  },
  session: {
    strategy: "jwt", // Utiliser des JWT pour gérer les sessions
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback:", { token, user });
      // Ajouter les informations d'utilisateur au token JWT
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token; // Le token retourné doit être de type JWT
    },
    async session({ session, token }) {
      // Ajouter les informations du token dans la session
      console.log("Session callback:", { session, token });
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
};

// Exportation des méthodes HTTP nommées
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, authOptions);
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, authOptions);
}
