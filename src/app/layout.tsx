import type { Metadata } from "next";

import { SessionProvider } from "next-auth/react";

import { Geist, Geist_Mono } from "next/font/google";

import { UserDataModal } from "@/components/features/auth/afterAuth";
import { HeaderServer } from "@/components/layout/header";
import { Toaster } from "@/components/ui/toaster"

import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}>
        <SessionProvider>
          <HeaderServer />

          <UserDataModal />
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
