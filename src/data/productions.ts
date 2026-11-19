export interface Production {
  id: string;
  title: string;
  description: string;
  type: string;
  year: string;
  coverImageUrl?: string;
  externalUrl?: string;
}

export const productions: Production[] = [
  {
    id: "1",
    title: "Relações de trabalho do setor audiovisual na cidade de São Paulo",
    description:
      "Projeto de iniciação científica, Escola Superior de Propaganda e Marketing, curso de Cinema e Audiovisual.",
    type: "",
    year: "2025",
  },
  {
    id: "2",
    title: "Aluno pesquisador",
    description:
      "Grupo de pesquisa audiovisual sobre a produção de documentários no Brasil.",
    type: "",
    year: "2025",
  },

];
