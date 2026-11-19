"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import YouTubeEmbed from "./YouTubeEmbed";
import { useLanguage } from "./LanguageProvider";
import { useAutoTranslateFields } from "@/lib/useAutoTranslate";

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick?: () => void;
}

export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const { t, language } = useLanguage();

  // Traduz campos dinâmicos do admin
  const { translations: tr } = useAutoTranslateFields(
    project as unknown as Record<string, unknown>,
    ["title", "description", "category", "role"],
    language,
  );

  const hasYouTube = project.youtubeId && project.youtubeId !== "" && project.youtubeId !== "#";
  const hasCoverImage = !!project.coverImageUrl;
  const hasExternalUrl = !!project.externalUrl;

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      id={`project-card-${project.id}`}
      onClick={handleCardClick}
      className="group bg-surface rounded-2xl overflow-hidden border border-border hover:border-border-hover transition-all duration-500 cursor-pointer"
    >
      {/* Video / Thumbnail / Cover Image */}
      <div className="relative aspect-video overflow-hidden">
        {hasCoverImage ? (
          /* ── Imagem de Capa ── */
          <div
            className="w-full h-full relative"
          >
            <img
              src={project.coverImageUrl}
              alt={tr.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Overlay sutil no hover */}
              <div className="absolute inset-0 bg-bg/0 group-hover:bg-bg/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="px-5 py-2.5 rounded-full bg-accent-soft/90 backdrop-blur-sm flex items-center gap-2 shadow-lg shadow-accent/20">
                  <svg className="w-4 h-4 text-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <span className="text-sm font-medium text-brown">{t.projectCard.viewDetails}</span>
                </div>
              </div>
          </div>
        ) : hasYouTube ? (
          /* ── YouTube Thumbnail ── */
          <div className="w-full h-full relative group/play">
            <img
              src={`https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`}
              alt={tr.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Overlay + Play icon */}
            <div className="absolute inset-0 bg-bg/30 group-hover/play:bg-bg/10 transition-all duration-300 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-accent-soft/90 backdrop-blur-sm group-hover/play:scale-110 transition-all duration-300 flex items-center justify-center shadow-lg shadow-accent/30">
                <svg className="w-6 h-6 text-brown ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          /* ── Placeholder se não tem nem imagem nem vídeo ── */
          <div className="w-full h-full bg-surface-hover flex items-center justify-center">
            <span className="text-muted/40 text-4xl">🎬</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">{tr.category}</span>
          <span className="text-xs text-muted">{project.year}</span>
        </div>
        <h3 className="font-[family-name:var(--font-serif)] text-xl text-text font-semibold mb-2 group-hover:text-accent transition-colors duration-300">{tr.title}</h3>
        <p className="text-sm text-muted leading-relaxed line-clamp-3">{tr.description}</p>
        <p className="mt-3 text-xs text-accent/70">{tr.role}</p>

        {/* Botão sutil de ver mais */}
        <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors duration-300 group/link">
          {t.projectCard.viewDetails}
          <svg className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
    </motion.article>
  );
}

