import localFont from "next/font/local";
import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const berkeleyMono = localFont({
  src: [
    {
      path: "../public/fonts/BerkeleyMono-Regular.woff2",
      weight: "400",
    },
    {
      path: "../public/fonts/BerkeleyMono-Bold.woff2",
      weight: "700",
    },
    {
      path: "../public/fonts/BerkeleyMono-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/BerkeleyMono-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-berkeleyMono",
  display: "swap",
});
