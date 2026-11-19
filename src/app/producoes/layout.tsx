import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produções Acadêmicas",
  description:
    "Conheça as produções acadêmicas de Lara Veloso — artigos, roteiros, ensaios audiovisuais e projetos de pesquisa em cinema.",
};

export default function ProducoesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
