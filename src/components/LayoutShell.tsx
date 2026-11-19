"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import LanguageProvider from "@/components/LanguageProvider";
import Preloader from "@/components/Preloader";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Preloader />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  );
}
