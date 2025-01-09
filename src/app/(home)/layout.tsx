import { SubHeader } from "@/components/layout/subheader";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SubHeader />
      <main>
        {children}
      </main>
    </>
  );
}
