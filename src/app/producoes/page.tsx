"use client";

import SectionTitle from "@/components/SectionTitle";
import ProductionsList from "@/components/ProductionsList";
import { useLanguage } from "@/components/LanguageProvider";

export default function ProducoesPage() {
  const { t } = useLanguage();

  return (
    <section className="pt-32 pb-24 md:pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title={t.productions.title}
          subtitle={t.productions.subtitle}
        />

        <ProductionsList />
      </div>
    </section>
  );
}
