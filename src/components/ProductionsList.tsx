"use client";

import { useEffect, useState } from "react";
import { supabase, type Production } from "@/lib/supabase";
import ProductionCard from "./ProductionCard";
import ItemModal, { ModalItemData } from "./ItemModal";

interface ProductionsListProps {
  limit?: number;
}

export default function ProductionsList({ limit }: ProductionsListProps) {
  const [productions, setProductions] = useState<Production[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<ModalItemData | null>(null);

  useEffect(() => {
    async function fetch() {
      let query = supabase
        .from("productions")
        .select("*")
        .order("display_order", { ascending: true, nullsFirst: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data } = await query;
      setProductions(data ?? []);
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
            className="bg-surface rounded-2xl p-6 md:p-8 border border-border animate-pulse"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="h-5 bg-surface-hover rounded w-1/4" />
              <div className="h-4 bg-surface-hover rounded w-12" />
            </div>
            <div className="h-5 bg-surface-hover rounded w-3/4 mb-3" />
            <div className="space-y-2">
              <div className="h-3 bg-surface-hover rounded w-full" />
              <div className="h-3 bg-surface-hover rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {productions.map((production, index) => {
          const itemData: ModalItemData = {
            id: production.id,
            title: production.title,
            description: production.description,
            badge: production.type,
            year: production.year,
            coverImageUrl: production.cover_image_url ?? undefined,
            galleryUrls: production.gallery_urls ?? undefined,
            externalUrl: production.external_url ?? undefined,
          };
          
          return (
            <ProductionCard
              key={production.id}
              production={{
                id: production.id,
                title: production.title,
                description: production.description,
                type: production.type,
                year: production.year,
                coverImageUrl: production.cover_image_url ?? undefined,
                externalUrl: production.external_url ?? undefined,
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
