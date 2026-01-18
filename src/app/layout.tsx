import "@/styles/globals.css";
import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#75192E",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
