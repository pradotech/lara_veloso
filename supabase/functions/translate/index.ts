import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

/**
 * Traduz um texto via Google Translate API gratuita.
 */
async function translateSingle(
  text: string,
  sl: string,
  tl: string,
): Promise<string> {
  const googleUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;

  const response = await fetch(googleUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; LaraVeloso/1.0)",
    },
  });

  if (!response.ok) {
    throw new Error(`Google API returned ${response.status}`);
  }

  const data = await response.json();
  // Formato do Google: [[["tradução","original",...],...],...]]
  const translated = (data[0] as Array<[string]>)
    .map((segment: [string]) => segment[0])
    .join("");

  return translated;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // ─── POST: Batch de textos ───────────────────────────────
    if (req.method === "POST") {
      const body = await req.json();
      const { texts, sl = "pt", tl } = body as {
        texts: string[];
        sl?: string;
        tl: string;
      };

      if (!texts || !Array.isArray(texts) || !tl) {
        return new Response(
          JSON.stringify({ error: "Missing required: texts (array), tl" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      // Traduzir todos os textos em paralelo (limitado a 20 por batch)
      const batch = texts.slice(0, 20);
      const results = await Promise.all(
        batch.map(async (text) => {
          if (!text || !text.trim()) return text;
          try {
            return await translateSingle(text, sl, tl);
          } catch {
            return text; // fallback ao original em caso de erro
          }
        }),
      );

      return new Response(
        JSON.stringify({ translations: results }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=86400",
          },
        },
      );
    }

    // ─── GET: Texto único (retrocompatível) ──────────────────
    const url = new URL(req.url);
    const text = url.searchParams.get("text");
    const sl = url.searchParams.get("sl") || "pt";
    const tl = url.searchParams.get("tl");

    if (!text || !tl) {
      return new Response(
        JSON.stringify({ error: "Missing required params: text, tl" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const translated = await translateSingle(text, sl, tl);

    return new Response(
      JSON.stringify({ translated }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=86400",
        },
      },
    );
  } catch (error) {
    console.error("Translation error:", error);
    return new Response(
      JSON.stringify({ error: "Internal translation error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
