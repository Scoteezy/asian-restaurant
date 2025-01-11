import type { Metadata } from "next";

import { SessionProvider } from "next-auth/react";

import { Geist, Geist_Mono } from "next/font/google";

import { UserDataModal } from "@/components/features/auth/afterAuth";
import { HeaderServer } from "@/components/layout/header";
import { SubHeader } from "@/components/layout/subheader";
import { Toaster } from "@/components/ui/toaster"

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

export const metadata: Metadata = {
  title: "A-Food",
  description: "A-Food - доставка еды",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased dark font-sans`}>
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
