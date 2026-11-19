import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* ── Types ── */

export interface Project {
  id: string;
  title: string;
  description: string;
  youtube_id: string;
  category: string;
  year: string;
  role: string;
  cover_image_url?: string | null;
  gallery_urls?: string[] | null;
  external_url?: string | null;
  display_order?: number | null;
  created_at?: string;
}

export interface Production {
  id: string;
  title: string;
  description: string;
  type: string;
  year: string;
  cover_image_url?: string | null;
  gallery_urls?: string[] | null;
  external_url?: string | null;
  display_order?: number | null;
  created_at?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  cover_image_url?: string | null;
  gallery_urls?: string[] | null;
  external_url?: string | null;
  display_order?: number | null;
  created_at?: string;
}
