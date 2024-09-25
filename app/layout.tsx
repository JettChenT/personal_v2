import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./navbar";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Jett Chen",
  description: "Jett Chen's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container lg:w-1/2 xl:w-2/5 mt-10 lg:mt-20">
          <Navbar />
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  );
}
