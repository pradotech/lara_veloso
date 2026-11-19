"use client";

import { motion } from "framer-motion";
import type { Production } from "@/data/productions";
import { useLanguage } from "./LanguageProvider";
import { useAutoTranslateFields } from "@/lib/useAutoTranslate";

interface ProductionCardProps {
  production: Production & {
    coverImageUrl?: string;
    externalUrl?: string;
  };
  index: number;
  onClick?: () => void;
}

export default function ProductionCard({ production, index, onClick }: ProductionCardProps) {
  const { t, language } = useLanguage();

  // Traduz campos dinâmicos do admin
  const { translations: tr } = useAutoTranslateFields(
    production as unknown as Record<string, unknown>,
    ["title", "description", "type"],
    language,
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      id={`production-card-${production.id}`}
      onClick={onClick}
      className="group bg-surface rounded-2xl overflow-hidden border border-border hover:border-border-hover transition-all duration-500 hover:bg-surface-hover cursor-pointer"
    >
      {/* Cover image */}
      {production.coverImageUrl && (
        <div className="relative aspect-video overflow-hidden">
          <img
            src={production.coverImageUrl}
            alt={tr.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 whitespace-nowrap">{tr.type}</span>
          <span className="text-xs text-muted/60">{production.year}</span>
        </div>
        <h3 className="font-[family-name:var(--font-serif)] text-xl text-text font-semibold mb-3 group-hover:text-accent transition-colors duration-300">{tr.title}</h3>
        <p className="text-sm text-muted leading-relaxed line-clamp-4">{tr.description}</p>

        {/* Botão sutil de ver mais */}
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors duration-300 group/link">
          {t.productionCard.viewDetails}
          <svg className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
    </motion.article>
  );
}

