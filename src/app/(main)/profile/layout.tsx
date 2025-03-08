import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Личный кабинет | A-Food " ,
  description: "Личный кабинет пользователя",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
