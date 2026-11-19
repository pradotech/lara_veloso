"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { type Locale, locales } from "@/i18n";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (lang: Locale) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        id="language-switcher"
        aria-label="Trocar idioma"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full hover:bg-surface-hover border border-transparent hover:border-border transition-all duration-300 cursor-pointer text-text"
      >
        <span className="text-lg leading-none">{locales[language].flag}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="14" 
          height="14" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={`transition-transform duration-200 opacity-60 ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 bg-[var(--c-glass-bg)] backdrop-blur-xl border border-border rounded-xl shadow-lg overflow-hidden min-w-[140px] z-50"
          >
            {(Object.keys(locales) as Locale[]).map((lang) => (
              <button
                key={lang}
                onClick={() => handleSelect(lang)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-200 cursor-pointer ${
                  language === lang
                    ? "bg-accent/10 text-accent"
                    : "text-text hover:bg-surface-hover"
                }`}
              >
                <span className="text-base">{locales[lang].flag}</span>
                <span>{locales[lang].label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
