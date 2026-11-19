import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eventos e Premiações",
  description:
    "Conheça os eventos, festivais e premiações de Lara Veloso ao longo da sua trajetória no audiovisual.",
};

export default function EventosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
