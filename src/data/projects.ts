export interface Project {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: string;
  year: string;
  role: string;
  coverImageUrl?: string;
  externalUrl?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Videoclipe 'Memoria'",
    description:
      "",
    youtubeId: "#",
    category: "Curta-metragem",
    year: "2025",
    role: "Cobertura de making off e fotografia a Still",
  },
  {
    id: "2",
    title: "Caruara - Curta-metragem de terror",
    description:
      "",
    youtubeId: "#",
    category: "Documentário",
    year: "2025",
    role: "Direção de fotografia",
  },
  {
    id: "3",
    title: "Narrativa Reversa - Audiovisual Experimental",
    description:
      "",
    youtubeId: "#",
    category: "Ficção",
    year: "2024",
    role: "Direção de fotografia e Montagem",
  },

];
