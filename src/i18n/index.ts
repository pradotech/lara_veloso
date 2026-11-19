import pt, { type Translations } from "./pt";
import en from "./en";
import es from "./es";

export type Locale = "pt" | "en" | "es";

export const locales: Record<Locale, { label: string; flag: string }> = {
  pt: { label: "Português", flag: "🇧🇷" },
  en: { label: "English", flag: "🇺🇸" },
  es: { label: "Español", flag: "🇪🇸" },
};

export const translations: Record<Locale, Translations> = { pt, en, es };

export type { Translations };
