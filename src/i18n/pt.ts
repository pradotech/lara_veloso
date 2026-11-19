export interface Translations {
  nav: {
    home: string;
    about: string;
    projects: string;
    productions: string;
    events: string;
    contact: string;
    education: string;
    experience: string;
    interests: string;
  };
  home: {
    heroSubtitle: string;
    heroBtn: string;
    heroBtnAbout: string;
    aboutBio: (jsx: any) => any;
    aboutBioText1: string;
    aboutBioName: string;
    aboutBioText2: string;
    aboutBioSchool: string;
    aboutBioText3: string;
    aboutBioLattes: string;
    aboutBtn: string;
    projectsTitle: string;
    projectsSubtitle: string;
    projectsBtn: string;
    productionsTitle: string;
    productionsSubtitle: string;
    productionsBtn: string;
    eventsTitle: string;
    eventsSubtitle: string;
    eventsBtn: string;
    ctaTitle1: string;
    ctaHighlight: string;
    ctaTitle2: string;
    ctaText: string;
    ctaBtn: string;
  };
  about: {
    label: string;
    heroTitle1: string;
    heroTitle2: string;
    heroWelcome: string;
    heroText: string;
    educationLabel: string;
    educationTitle: string;
    educationText1: string;
    educationSchool: string;
    educationText2: string;
    educationAreas: string;
    educationText3: string;
    educationText4: string;
    educationResearch: string;
    educationText5: string;
    experienceLabel: string;
    experienceTitle: string;
    experienceText1: string;
    experienceCompany1: string;
    experienceText2: string;
    experienceText3: string;
    experienceCompany2: string;
    experienceText4: string;
    experienceText5: string;
    experienceCompany3: string;
    experienceText6: string;
    interestsLabel: string;
    interestsTitle: string;
    interestsText1: string;
    interestsProduction: string;
    interestsText2: string;
    interestsText3: string;
    interestsResearch: string;
    interestsText4: string;
    ctaTitle: string;
    ctaText: string;
    ctaBtn: string;
  };
  contact: {
    label: string;
    title: string;
    subtitle: string;
    formTitle: string;
    infoTitle: string;
    available: string;
    availableText: string;
    location: string;
    locationValue: string;
    email: string;
    phone: string;
    social: string;
  };
  contactForm: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    success: string;
  };
  projects: {
    title: string;
    subtitle: string;
  };
  productions: {
    title: string;
    subtitle: string;
  };
  events: {
    title: string;
    subtitle: string;
  };
  projectCard: {
    watch: string;
    access: string;
    accessProject: string;
    viewDetails: string;
  };
  productionCard: {
    viewDetails: string;
  };
  eventCard: {
    viewDetails: string;
  };
  footer: {
    bio: string;
    navigation: string;
    home: string;
    about: string;
    projects: string;
    productions: string;
    contact: string;
    social: string;
    copyright: string;
    tagline: string;
    events: string;
  };
}

const pt: Translations = {
  nav: {
    home: "Home",
    about: "Sobre",
    projects: "Projetos Audiovisuais",
    productions: "Produções Acadêmicas",
    events: "Eventos e Premiações",
    contact: "Contato",
    // Sobre page sub-nav
    education: "Formação",
    experience: "Experiência",
    interests: "Interesses",
  },
  home: {
    heroSubtitle: "Projetos que transformam ideias em imagem",
    heroBtn: "Ver projetos",
    heroBtnAbout: "Conheça-me",
    aboutBio: (jsx: any) => jsx,
    aboutBioText1: "Me chamo ",
    aboutBioName: "Lara Veloso",
    aboutBioText2: " e sou estudante de Cinema e Audiovisual pela ",
    aboutBioSchool: "Escola Superior de Propaganda e Marketing (ESPM)",
    aboutBioText3:
      " em São Paulo. Atualmente atuo no time de produção para uma produtora audiovisual de conteúdo e grandes eventos. Paralelamente, desenvolvo pesquisa acadêmica sobre as relações de trabalho e condições dos trabalhadores no audiovisual paulistano. ",
    aboutBioLattes: "Clique aqui para acessar meu Lattes",
    aboutBtn: "Saiba mais sobre mim",
    projectsTitle: "Projetos Audiovisuais",
    projectsSubtitle:
      "Uma seleção dos meus trabalhos mais recentes em cinema e audiovisual",
    projectsBtn: "Todos os projetos",
    productionsTitle: "Produções Acadêmicas",
    productionsSubtitle:
      "Trabalhos desenvolvidos durante a formação em cinema",
    productionsBtn: "Todas as produções",
    eventsTitle: "Eventos e Premiações",
    eventsSubtitle:
      "Festivais, mostras e reconhecimentos ao longo da trajetória",
    eventsBtn: "Todos os eventos",
    ctaTitle1: "Vamos criar algo ",
    ctaHighlight: "incrível",
    ctaTitle2: " juntos?",
    ctaText:
      "Estou sempre aberta a novos projetos, colaborações e oportunidades no mundo audiovisual.",
    ctaBtn: "Entrar em contato",
  },
  about: {
    label: "Sobre mim",
    heroTitle1: "Olá, sou a Lara",
    heroTitle2: "Veloso",
    heroWelcome: "Seja bem-vindo(a) ao meu site!",
    heroText:
      "Montei este site para reunir e compartilhar um pouco do meu trabalho com pessoas interessadas no meio artístico e audiovisual. Neste espaço eletrônico, espero despertar a curiosidade sobre temas que me inspiram e constroem minha trajetória. Abaixo, conheça um pouco sobre mim: minha formação, minha experiência profissional e acadêmica, meus contatos.",
    educationLabel: "Formação",
    educationTitle: "Formação Acadêmica",
    educationText1: "Sou estudante de Cinema e Audiovisual pela ",
    educationSchool: "Escola Superior de Propaganda e Marketing (ESPM)",
    educationText2:
      ", em São Paulo, atualmente cursando o 7º semestre. Ao longo da graduação, tive a oportunidade de explorar diferentes áreas da produção audiovisual, desenvolvendo conhecimentos e experiências em ",
    educationAreas: "Direção, Produção, Direção de Fotografia, Direção de Arte, Montagem e Edição",
    educationText3:
      "Durante esse percurso, também participei de entidades estudantis, grupos de pesquisa, projetos audiovisuais, assistências e iniciativas de trabalho voluntário, ampliando minha vivência acadêmica e profissional.",
    educationText4:
      "Além disso, desenvolvi, ao longo de mais de um ano, uma ",
    educationResearch:
      "Pesquisa de Iniciação Científica sobre as relações de trabalho no setor audiovisual na cidade de São Paulo",
    educationText5:
      ", aprofundando meus conhecimentos sobre a estrutura e a dinâmica profissional do mercado audiovisual brasileiro.",
    experienceLabel: "Experiência",
    experienceTitle: "Experiência Profissional",
    experienceText1:
      "Atualmente, atuo como estagiária de produção na ",
    experienceCompany1: "VHS Multimídia",
    experienceText2:
      ", produtora de conteúdo audiovisual e grandes eventos. Minha função envolve o suporte às diferentes etapas do processo de produção, colaborando no desenvolvimento e na execução de projetos diversos, como campanhas publicitárias, eventos corporativos e podcasts.",
    experienceText3:
      "Anteriormente, trabalhei por 10 meses nas áreas administrativa e de comunicação da ",
    experienceCompany2: "Barcelona Filmes",
    experienceText4:
      ", renomada locadora de equipamentos cinematográficos. Nesse período, fui responsável pela elaboração de orçamentos, organização de reservas e suporte aos processos de locação de equipamentos, além de contribuir para a comunicação digital da empresa por meio da criação de conteúdo para as redes sociais.",
    experienceText5:
      "Também atuei como videomaker freelancer na ",
    experienceCompany3: "Cacciari Models",
    experienceText6:
      ", durante dois meses, sendo responsável pelo desenvolvimento e pela realização de dois vídeos institucionais. Minha atuação contemplou todas as etapas do processo criativo e de produção, desde a elaboração dos roteiros e o planejamento das gravações até a captação de imagens e a edição final dos vídeos.",
    interestsLabel: "Interesses",
    interestsTitle: "Interesses Pessoais e Profissionais",
    interestsText1:
      "Meu principal interesse profissional no audiovisual está na área de ",
    interestsProduction: "produção",
    interestsText2:
      ", com a qual me identifico pela possibilidade de articular processos criativos, organização e viabilização de projetos. Tenho interesse em acompanhar o desenvolvimento de produções audiovisuais em suas diferentes etapas, contribuindo para transformar ideias em projetos concretos.",
    interestsText3:
      "No âmbito acadêmico, a pesquisa sobre as ",
    interestsResearch: "relações de trabalho no setor audiovisual",
    interestsText4:
      " amplia meu olhar crítico sobre a indústria, seus processos de produção e as dinâmicas que envolvem os profissionais do meio.",
    ctaTitle: "Gostou do que viu?",
    ctaText:
      "Ficarei feliz em conversar sobre projetos, colaborações ou qualquer ideia criativa. Entre em contato!",
    ctaBtn: "Entrar em contato",
  },
  contact: {
    label: "Contato",
    title: "Vamos conversar",
    subtitle:
      "Tem um projeto, uma ideia ou uma oportunidade? Adoraria ouvir sobre. Entre em contato e vamos criar algo especial juntos.",
    formTitle: "Envie uma mensagem",
    infoTitle: "Informações",
    available: "Disponível para projetos",
    availableText:
      "Aberta a colaborações e novas oportunidades no audiovisual.",
    location: "Localização",
    locationValue: "São Paulo, SP — Brasil",
    email: "Email",
    phone: "Telefone",
    social: "Redes Sociais",
  },
  contactForm: {
    name: "Nome",
    namePlaceholder: "Seu nome",
    email: "Email",
    emailPlaceholder: "seu@email.com",
    message: "Mensagem",
    messagePlaceholder: "Sua mensagem...",
    submit: "Enviar mensagem",
    success: "✓ Mensagem enviada com sucesso! Retornarei em breve.",
  },
  projects: {
    title: "Projetos Audiovisuais",
    subtitle:
      "Todos os meus trabalhos em cinema e audiovisual. Clique no play para assistir.",
  },
  productions: {
    title: "Produções Acadêmicas",
    subtitle:
      "Trabalhos desenvolvidos ao longo da minha formação em cinema e audiovisual.",
  },
  events: {
    title: "Eventos e Premiações",
    subtitle:
      "Festivais, mostras e reconhecimentos ao longo da minha trajetória no audiovisual.",
  },
  projectCard: {
    watch: "Assistir",
    access: "Acessar",
    accessProject: "Acessar projeto",
    viewDetails: "Ver detalhes",
  },
  productionCard: {
    viewDetails: "Ver detalhes",
  },
  eventCard: {
    viewDetails: "Ver detalhes",
  },
  footer: {
    bio: "Estudante de Cinema apaixonada por contar histórias através da linguagem audiovisual.",
    navigation: "Navegação",
    home: "Home",
    about: "Sobre",
    projects: "Projetos",
    productions: "Produções",
    contact: "Contato",
    social: "Redes Sociais",
    copyright: "Lara Veloso. Todos os direitos reservados.",
    tagline: "Portfólio de Cinema & Audiovisual",
    events: "Eventos",
  },
};

export default pt;
