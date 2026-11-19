"use client";

import SectionTitle from "@/components/SectionTitle";
import EventsList from "@/components/EventsList";
import { useLanguage } from "@/components/LanguageProvider";

export default function EventosPage() {
  const { t } = useLanguage();

  return (
    <section className="pt-32 pb-24 md:pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title={t.events.title}
          subtitle={t.events.subtitle}
        />

        <EventsList />
      </div>
    </section>
  );
}
