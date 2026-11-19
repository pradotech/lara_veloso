import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projetos Audiovisuais",
  description:
    "Explore todos os projetos audiovisuais de Lara Veloso — curtas-metragens, documentários, vídeos experimentais e mais.",
};

export default function ProjetosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
