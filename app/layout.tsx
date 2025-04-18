import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import SmoothScroll from './components/SmoothScroll';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VELA",
  description: "Experience luxury living at its finest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${inter.variable} antialiased`}>
      <body className="font-cormorant">
        <SmoothScroll />
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
