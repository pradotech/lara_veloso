"use client";

import SectionTitle from "@/components/SectionTitle";
import ProjectsList from "@/components/ProjectsList";
import { useLanguage } from "@/components/LanguageProvider";

export default function ProjetosPage() {
  const { t } = useLanguage();

  return (
    <section className="pt-32 pb-24 md:pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title={t.projects.title}
          subtitle={t.projects.subtitle}
        />

        <ProjectsList />
      </div>
    </section>
  );
}
