import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Lara Veloso — Portfólio de Cinema",
    template: "%s | Lara Veloso",
  },
  description:
    "Portfólio profissional de Lara Veloso, estudante de cinema. Explore projetos audiovisuais, produções acadêmicas e mais.",
  keywords: [
    "cinema",
    "portfólio",
    "audiovisual",
    "Lara Veloso",
    "estudante de cinema",
    "produção audiovisual",
    "curta-metragem",
  ],
  authors: [{ name: "Lara Veloso" }],
  openGraph: {
    title: "Lara Veloso — Portfólio de Cinema",
    description:
      "Explore os projetos audiovisuais e produções acadêmicas de Lara Veloso.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
