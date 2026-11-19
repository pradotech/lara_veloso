import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import YouTubeEmbed from "./YouTubeEmbed";
import { useLanguage } from "./LanguageProvider";
import { useAutoTranslateFields } from "@/lib/useAutoTranslate";

export interface ModalItemData {
  id: string;
  title: string;
  description: string;
  year: string;
  badge?: string;
  role?: string;
  youtubeId?: string;
  coverImageUrl?: string;
  galleryUrls?: string[];
  externalUrl?: string;
}

interface ItemModalProps {
  item: ModalItemData | null;
  onClose: () => void;
}

export default function ItemModal({ item, onClose }: ItemModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language, t } = useLanguage();

  // Traduz campos dinâmicos do item
  const { translations: tr } = useAutoTranslateFields(
    (item ?? { title: "", description: "", badge: "", role: "" }) as Record<string, unknown>,
    ["title", "description", "badge", "role"],
    language,
  );

  // Fecha com ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Travar scroll do body
  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  if (!item) return null;

  const hasYouTube = item.youtubeId && item.youtubeId !== "" && item.youtubeId !== "#";
  const hasCoverImage = !!item.coverImageUrl;

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollRef.current.clientWidth, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
      setCurrentIndex(index);
    }
  };

  const mediaCount = (hasYouTube ? 1 : 0) + 
    (item.galleryUrls && item.galleryUrls.length > 0 
      ? item.galleryUrls.length 
      : (hasCoverImage && !hasYouTube ? 1 : 0));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
        />

        {/* Modal content */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-4xl bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-full"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label={language === "pt" ? "Fechar" : language === "es" ? "Cerrar" : "Close"}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-bg/50 hover:bg-bg/80 backdrop-blur-md rounded-full flex items-center justify-center text-text transition-colors duration-200 border border-border"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="overflow-y-auto overflow-x-hidden flex-1 scrollbar-hide">
            {/* Header Media */}
            {(hasYouTube || hasCoverImage || (item.galleryUrls && item.galleryUrls.length > 0)) && (
              <div className="w-full bg-black/80 aspect-video relative group/gallery">
                <div 
                  ref={scrollRef}
                  onScroll={handleScroll}
                  className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide relative"
                >
                  {/* 1. YouTube se existir sempre entra primeiro */}
                  {hasYouTube && (
                    <div className="w-full h-full shrink-0 snap-center relative">
                      <YouTubeEmbed videoId={item.youtubeId!} title={tr.title} />
                    </div>
                  )}
                  
                  {/* 2. Galeria se existir */}
                  {item.galleryUrls && item.galleryUrls.length > 0 ? (
                    item.galleryUrls.map((url, idx) => (
                      <div key={idx} className="w-full h-full shrink-0 snap-center relative">
                        <img
                          src={url}
                          alt={`${tr.title} - Imagem ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))
                  ) : (
                    /* 3. Caso não tenha galeria, mas tenha coverImage (projeto antigo), mostra 1 imagem */
                    hasCoverImage && !hasYouTube && (
                      <div className="w-full h-full shrink-0 snap-center relative">
                        <img
                          src={item.coverImageUrl!}
                          alt={tr.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )
                  )}
                </div>
                
                {/* Dica visual de rolagem caso tenha múltiplos itens na galeria */}
                {mediaCount > 1 && (
                  <>
                    <button
                      onClick={scrollPrev}
                      disabled={currentIndex === 0}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white/90 opacity-0 group-hover/gallery:opacity-100 disabled:opacity-0 transition-opacity duration-300 z-10"
                    >
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={scrollNext}
                      disabled={currentIndex === mediaCount - 1}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white/90 opacity-0 group-hover/gallery:opacity-100 disabled:opacity-0 transition-opacity duration-300 z-10"
                    >
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 pointer-events-none">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-white/90 text-xs rounded-full font-medium tracking-wide">
                        {currentIndex + 1} / {mediaCount}
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Content info */}
            <div className="p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {tr.badge && (
                  <span className="text-sm px-4 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                    {tr.badge}
                  </span>
                )}
                <span className="text-sm text-muted font-medium bg-surface-hover px-4 py-1.5 rounded-full">
                  {item.year}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-serif)] font-bold text-text mb-4 leading-tight">
                {tr.title}
              </h2>

              {tr.role && (
                <p className="text-accent font-medium mb-6">{tr.role}</p>
              )}

              <div className="prose prose-invert max-w-none text-muted leading-relaxed">
                <p className="whitespace-pre-wrap">{tr.description}</p>
              </div>

              {item.externalUrl && (
                <div className="mt-10 pt-6 border-t border-border">
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg font-medium rounded-full hover:bg-accent-hover transition-colors duration-300 group"
                  >
                    {t.projectCard.accessProject}
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

