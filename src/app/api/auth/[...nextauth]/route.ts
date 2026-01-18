// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Créer le handler NextAuth
const handler = NextAuth(authOptions);

// Exporter les méthodes HTTP
export { handler as GET, handler as POST };
