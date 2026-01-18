import { Tangerine, Karma } from "next/font/google";
import Providers from "@/components/Providers";

// Forcer le rendu dynamique pour les pages admin (utilisant useSession)
export const dynamic = "force-dynamic";

const karmaBody = Karma({
  variable: "--font-body",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const TangerineHead = Tangerine({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-head",
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${karmaBody.variable} ${TangerineHead.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
