import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";


const adminUser = {
  username: process.env.ADMIN_USERNAME!,
  password: process.env.ADMIN_PASSWORD!, // Mot de passe en clair ou haché
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Tentative de connexion :", credentials); // Debug
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Nom d'utilisateur et mot de passe requis");
        }

        // Vérifie si l'username correspond
        if (credentials.username !== adminUser.username) {
          throw new Error("Nom d'utilisateur incorrect");
        }

        // Vérifie si le mot de passe correspond (haché ou non)
        const isValidPassword = await compare(credentials.password, adminUser.password);
        if (!isValidPassword) {
          throw new Error("Mot de passe incorrect");
        }

        return { id: "1", username: adminUser.username };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' as 'jwt' },
  callbacks: {
    async session({ session }: { session: any }) {
      session.user = { username: adminUser.username };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
