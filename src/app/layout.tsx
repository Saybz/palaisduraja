"use client";
import { Geist, Poppins } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
// export const metadata = {
//   title: "Palais du Raja",
//   description: "Restaurant indien",
// };
const geistSans = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

const geistMono = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-head",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}
