

import { UserDataModal } from "@/components/features/auth/afterAuth";
import { HeaderServer } from "@/components/layout/header";

import "@/styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderServer />
      <UserDataModal />
      {children}
    </>
  );
}
