import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
  },
});

export const config = {
  matcher: ["/admin/:path*"], // Applique la protection sur toutes les pages sous /admin
};
