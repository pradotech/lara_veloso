"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import { useLanguage } from "./LanguageProvider";

export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao enviar mensagem.");
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar mensagem. Tente novamente.");
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      id="contact-form"
      className="space-y-6 max-w-xl mx-auto"
    >
      <div>
        <label htmlFor="contact-name" className="block text-sm text-muted mb-2">{t.contactForm.name}</label>
        <input
          type="text" id="contact-name" required value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text text-sm placeholder:text-muted/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
          placeholder={t.contactForm.namePlaceholder}
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm text-muted mb-2">{t.contactForm.email}</label>
        <input
          type="email" id="contact-email" required value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text text-sm placeholder:text-muted/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
          placeholder={t.contactForm.emailPlaceholder}
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm text-muted mb-2">{t.contactForm.message}</label>
        <textarea
          id="contact-message" required rows={5} value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text text-sm placeholder:text-muted/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300 resize-none"
          placeholder={t.contactForm.messagePlaceholder}
          disabled={isLoading}
        />
      </div>
      <div className="pt-2">
        <Button type="submit" variant="primary" id="contact-submit" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Enviando...
            </span>
          ) : t.contactForm.submit}
        </Button>
      </div>
      {isSubmitted && (
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-accent text-sm text-center">
          {t.contactForm.success}
        </motion.p>
      )}
      {error && (
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm text-center">
          {error}
        </motion.p>
      )}
    </motion.form>
  );
}
