import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Si ces interfaces sont déjà définies dans types/next-auth.d.ts, il n'est pas nécessaire de les redéfinir
// mais pour la clarté, on les importe/ajoute à notre fichier de configuration
import { Session, User, Token } from "next-auth";

// Définition de la configuration de NextAuth
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Vérification des identifiants
        if (
          credentials?.username === "admin" &&
          credentials?.password === "password"
        ) {
          return { id: "1", name: "Admin", email: "admin@example.com" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Redirige vers la page de login si non authentifié
  },
  session: {
    strategy: "jwt", // Utilise des JWT pour les sessions
  },
  callbacks: {
    async jwt({ token, user }: { token: Token; user?: User }) {
      // Si un utilisateur est authentifié, ajoute les infos au token JWT
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: Token }) {
      // Ajoute les infos supplémentaires à la session
      if (session.user) {
        session.user.id = token.id!;
        session.user.email = token.email!;
      }
      return session;
    },
  },
};

// Utilisation correcte de NextAuth
export default NextAuth(authOptions);
