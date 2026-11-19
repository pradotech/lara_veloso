export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/lara.rveloso?igsh=MTNlc2kwdXJtdGJkdQ%3D%3D&utm_source=qr",
    icon: "instagram",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/lara-veloso-982113312",
    icon: "linkedin",
  },
  {
    name: "Currículo Lattes",
    url: "http://lattes.cnpq.br/3943201914569172",
    icon: "lattes",
  },
];

export const contactInfo = {
  email: "lararosaveloso@gmail.com",
  phone: "(11) 96864-9952",
  lattesUrl: "http://lattes.cnpq.br/3943201914569172",
};
