// import { isPrimaryPointer } from "framer-motion";
/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        head: ["var(--font-head)"],
        body: ["var(--font-body)"],
      },
      colors: {
        primary: "#75192E",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      maxWidth: {
        main: "1440px",
      },
      maxHeight: {
        desktop: "1440px",
      },
    },
  },
  plugins: [],
} satisfies Config;
