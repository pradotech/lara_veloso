"use client";

import { useState, useEffect, useRef } from "react";
import type { Locale } from "@/i18n";

/**
 * Cache global de traduções para evitar chamadas repetidas.
 * Chave: `${locale}:${text}` → valor traduzido.
 */
const translationCache = new Map<string, string>();

/**
 * ─── Batching System ────────────────────────────────────────
 * Agrupa traduções pendentes e envia em lote para a Edge Function.
 * Reduz drasticamente o número de requests.
 */
interface PendingTranslation {
  text: string;
  resolve: (value: string) => void;
}

const pendingBatches = new Map<string, PendingTranslation[]>();
const batchTimers = new Map<string, ReturnType<typeof setTimeout>>();

const BATCH_DELAY_MS = 50;
const MAX_BATCH_SIZE = 20;

/**
 * Envia o batch acumulado para a Edge Function via POST.
 */
async function flushBatch(targetLang: string): Promise<void> {
  const pending = pendingBatches.get(targetLang);
  if (!pending || pending.length === 0) return;

  // Limpar a fila
  pendingBatches.delete(targetLang);
  batchTimers.delete(targetLang);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    pending.forEach((p) => p.resolve(p.text));
    return;
  }

  // Dividir em sub-batches se necessário
  for (let i = 0; i < pending.length; i += MAX_BATCH_SIZE) {
    const chunk = pending.slice(i, i + MAX_BATCH_SIZE);
    const texts = chunk.map((p) => p.text);

    try {
      const res = await fetch(`${supabaseUrl}/functions/v1/translate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${supabaseKey}`,
          apikey: supabaseKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ texts, sl: "pt", tl: targetLang }),
      });

      if (res.ok) {
        const data = await res.json();
        const translations: string[] = data.translations || [];
        chunk.forEach((p, idx) => {
          const result = translations[idx] || p.text;
          translationCache.set(`${targetLang}:${p.text}`, result);
          p.resolve(result);
        });
      } else {
        chunk.forEach((p) => p.resolve(p.text));
      }
    } catch {
      chunk.forEach((p) => p.resolve(p.text));
    }
  }
}

/**
 * Traduz um texto, agrupando com outras traduções pendentes.
 */
async function translateText(
  text: string,
  targetLang: string,
): Promise<string> {
  if (!text || !text.trim()) return text;

  const cacheKey = `${targetLang}:${text}`;
  const cached = translationCache.get(cacheKey);
  if (cached) return cached;

  return new Promise<string>((resolve) => {
    if (!pendingBatches.has(targetLang)) {
      pendingBatches.set(targetLang, []);
    }
    pendingBatches.get(targetLang)!.push({ text, resolve });

    // Reiniciar timer para agrupar mais traduções
    const existingTimer = batchTimers.get(targetLang);
    if (existingTimer) clearTimeout(existingTimer);

    batchTimers.set(
      targetLang,
      setTimeout(() => flushBatch(targetLang), BATCH_DELAY_MS),
    );
  });
}

/**
 * Hook que traduz automaticamente um texto baseado no locale atual.
 * Se o locale for 'pt', retorna o texto original sem tradução.
 */
export function useAutoTranslate(
  text: string,
  locale: Locale,
): { translated: string; loading: boolean } {
  const [translated, setTranslated] = useState(text);
  const [loading, setLoading] = useState(false);
  const latestText = useRef(text);
  const latestLocale = useRef(locale);

  useEffect(() => {
    latestText.current = text;
    latestLocale.current = locale;

    if (locale === "pt" || !text || !text.trim()) {
      setTranslated(text);
      setLoading(false);
      return;
    }

    // Verificar cache
    const cacheKey = `${locale}:${text}`;
    const cached = translationCache.get(cacheKey);
    if (cached) {
      setTranslated(cached);
      setLoading(false);
      return;
    }

    setLoading(true);

    translateText(text, locale).then((result) => {
      if (latestText.current === text && latestLocale.current === locale) {
        setTranslated(result);
        setLoading(false);
      }
    });
  }, [text, locale]);

  return { translated, loading };
}

/**
 * Traduz múltiplos campos de um objeto de uma vez.
 * Retorna um objeto com os campos traduzidos.
 */
export function useAutoTranslateFields<T extends Record<string, unknown>>(
  item: T,
  fields: (keyof T & string)[],
  locale: Locale,
): { translations: Record<string, string>; loading: boolean } {
  const [translations, setTranslations] = useState<Record<string, string>>(
    () => {
      const initial: Record<string, string> = {};
      for (const f of fields) {
        initial[f] = (item[f] as string) || "";
      }
      return initial;
    },
  );
  const [loading, setLoading] = useState(false);

  // Chave estável baseada nos valores dos campos
  const itemKey = fields.map((f) => item[f] || "").join("|||");

  useEffect(() => {
    const values: Record<string, string> = {};
    for (const f of fields) {
      values[f] = (item[f] as string) || "";
    }

    if (locale === "pt") {
      setTranslations(values);
      setLoading(false);
      return;
    }

    // Verificar quais campos precisam tradução
    const needsTranslation: string[] = [];
    const cached: Record<string, string> = {};

    for (const f of fields) {
      const text = values[f];
      if (!text || !text.trim()) {
        cached[f] = text;
        continue;
      }
      const cacheKey = `${locale}:${text}`;
      const c = translationCache.get(cacheKey);
      if (c) {
        cached[f] = c;
      } else {
        needsTranslation.push(f);
      }
    }

    if (needsTranslation.length === 0) {
      setTranslations(cached);
      setLoading(false);
      return;
    }

    setLoading(true);

    Promise.all(
      needsTranslation.map((f) =>
        translateText(values[f], locale).then((result) => ({
          field: f,
          result,
        })),
      ),
    ).then((results) => {
      const final = { ...cached };
      for (const { field, result } of results) {
        final[field] = result;
      }
      setTranslations(final);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemKey, locale]);

  return { translations, loading };
}
