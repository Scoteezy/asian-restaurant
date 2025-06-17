import type { Metadata } from "next";

import { SessionProvider } from "next-auth/react";

import { Audiowide, Geist, Geist_Mono } from "next/font/google";

import { Toaster } from "@/components/ui/toaster"
import { SpeedInsights } from '@vercel/speed-insights/next';
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: ['400'],
});

export const metadata: Metadata = {
  title: "Nami",
  description: "Nami - доставка еды",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} ${audiowide.variable} antialiased dark font-sans`}>
        <SessionProvider>
          {children}
          <Toaster />
            <SpeedInsights />
        </SessionProvider>
      </body>
    </html>
  );
}
