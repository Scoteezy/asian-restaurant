import { SessionProvider } from "next-auth/react";

import { auth } from "@/server/auth";
import { type Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import { redirect } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "A-Food | Админ панель",
  description: "A-Food | Админ панель",
};
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <main>
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="flex h-16 items-center px-6">
            <h1 className="text-xl font-bold">Админ панель</h1>
          </div>
        </header>
          
        <div className="flex">
          <aside className="w-64 border-r min-h-[calc(100vh-4rem)]">
            <nav className="p-4 space-y-2">
              <Link className="block p-2 hover:bg-secondary/20 rounded-md"
                href="/admin/users"
              >
                Пользователи
              </Link>
              <Link className="block p-2 hover:bg-secondary/20 rounded-md"
                href="/admin/menu"
              >
                Меню
              </Link>
              <Link className="block p-2 hover:bg-secondary/20 rounded-md"
                href="/admin/orders"
              >
                Заказы
              </Link>
              <Link className="block p-2 hover:bg-secondary/20 rounded-md"
                href="/"
              >На сайт
              </Link>
            </nav>
          </aside>
            
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </main>
  );
}
