import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

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
      // Ajouter les informations d'utilisateur au token JWT
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Ajouter les informations du token dans la session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
};

