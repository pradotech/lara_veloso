"use client";

import { useEffect, useState } from "react";
import { supabase, type Project } from "@/lib/supabase";
import ProjectCard from "./ProjectCard";
import ItemModal, { ModalItemData } from "./ItemModal";
import { useLanguage } from "./LanguageProvider";

interface ProjectsListProps {
  limit?: number;
}

export default function ProjectsList({ limit }: ProjectsListProps) {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<ModalItemData | null>(null);

  useEffect(() => {
    async function fetch() {
      let query = supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true, nullsFirst: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data } = await query;
      setProjects(data ?? []);
      setLoading(false);
    }
    fetch();
  }, [limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {Array.from({ length: limit ?? 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-surface rounded-2xl overflow-hidden border border-border animate-pulse"
          >
            <div className="aspect-video bg-surface-hover" />
            <div className="p-6 space-y-3">
              <div className="h-4 bg-surface-hover rounded w-1/3" />
              <div className="h-5 bg-surface-hover rounded w-2/3" />
              <div className="h-3 bg-surface-hover rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projects.map((project, index) => {
          const itemData: ModalItemData = {
            id: project.id,
            title: project.title,
            description: project.description,
            youtubeId: project.youtube_id,
            badge: project.category,
            year: project.year,
            role: project.role,
            coverImageUrl: project.cover_image_url ?? undefined,
            galleryUrls: project.gallery_urls ?? undefined,
            externalUrl: project.external_url ?? undefined,
          };
          return (
            <ProjectCard
              key={project.id}
              project={{
                id: project.id,
                title: project.title,
                description: project.description,
                youtubeId: project.youtube_id,
                category: project.category,
                year: project.year,
                role: project.role,
                coverImageUrl: project.cover_image_url ?? undefined,
                externalUrl: project.external_url ?? undefined,
              }}
              index={index}
              onClick={() => setSelectedItem(itemData)}
            />
          );
        })}
      </div>

      <ItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}
