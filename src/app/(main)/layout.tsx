

import { Loader } from "lucide-react";
import { Suspense } from "react";

import { UserDataModal } from "@/components/features/auth/afterAuth";
import { Footer } from "@/components/layout/Footer";
import { HeaderServer } from "@/components/layout/header";

import "@/styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <HeaderServer />
        <Suspense fallback={<div className="flex-center"><Loader size={24} /></div>}>
          <UserDataModal />
        </Suspense>
        {children}
      </div>
      <Footer />
    </>
  );
}
