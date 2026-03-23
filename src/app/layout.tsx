import type { Metadata } from "next";
import { Montserrat, Julee } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "700", "900"],
});

const julee = Julee({
  subsets: ["latin"],
  variable: "--font-julee",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Happy Birthday! 🎉",
  description: "A special birthday wish made with love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${julee.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
