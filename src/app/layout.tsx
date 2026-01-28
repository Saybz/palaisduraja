import "@/styles/globals.css";
import type { ReactNode } from "react";
import type { Viewport } from "next";
import { Tangerine, Karma } from "next/font/google";

export const viewport: Viewport = {
  themeColor: "#75192E",
};

// Polices globales, appliquées sur le <body>
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

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${karmaBody.variable} ${TangerineHead.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
