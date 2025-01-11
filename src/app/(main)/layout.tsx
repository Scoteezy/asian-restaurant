import type { Metadata } from "next";

import { SessionProvider } from "next-auth/react";

import { Geist, Geist_Mono } from "next/font/google";

import { UserDataModal } from "@/components/features/auth/afterAuth";
import { HeaderServer } from "@/components/layout/header";
import { SubHeader } from "@/components/layout/subheader";
import { Toaster } from "@/components/ui/toaster"

import "@/styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderServer />
      <SubHeader />
      <UserDataModal />
      {children}
    </>
  );
}
