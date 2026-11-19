"use client";

import { useEffect, useState } from "react";
import { supabase, type Event } from "@/lib/supabase";
import EventCard from "./EventCard";
import ItemModal, { ModalItemData } from "./ItemModal";

interface EventsListProps {
  limit?: number;
}

export default function EventsList({ limit }: EventsListProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<ModalItemData | null>(null);

  useEffect(() => {
    async function fetch() {
      let query = supabase
        .from("events")
        .select("*")
        .order("display_order", { ascending: true, nullsFirst: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data } = await query;
      setEvents(data ?? []);
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
        {events.map((event, index) => {
          const itemData: ModalItemData = {
            id: event.id,
            title: event.title,
            description: event.description,
            badge: event.category,
            year: event.year,
            coverImageUrl: event.cover_image_url ?? undefined,
            galleryUrls: event.gallery_urls ?? undefined,
            externalUrl: event.external_url ?? undefined,
          };

          return (
            <EventCard
              key={event.id}
              event={{
                id: event.id,
                title: event.title,
                description: event.description,
                category: event.category,
                year: event.year,
                coverImageUrl: event.cover_image_url ?? undefined,
                externalUrl: event.external_url ?? undefined,
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
