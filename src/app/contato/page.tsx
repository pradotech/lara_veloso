"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";
import { useLanguage } from "@/components/LanguageProvider";

export default function ContatoPage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">
              {t.contact.label}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-text mb-6">
              {t.contact.title}
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              {t.contact.subtitle}
            </p>
            <div className="line-accent mx-auto mt-8" />
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <AnimatedSection className="pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-bold text-text mb-8 font-[family-name:var(--font-serif)]">
              {t.contact.formTitle}
            </h2>
            <ContactForm />
          </div>

          {/* Info */}
          <div>
            <h2 className="text-2xl font-bold text-text mb-8 font-[family-name:var(--font-serif)]">
              {t.contact.infoTitle}
            </h2>

            <div className="space-y-8">
              {/* Availability */}
              <div className="bg-surface rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-text font-medium">
                    {t.contact.available}
                  </span>
                </div>
                <p className="text-sm text-muted">
                  {t.contact.availableText}
                </p>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-sm text-muted mb-2">{t.contact.location}</h3>
                <p className="text-text">{t.contact.locationValue}</p>
              </div>

              {/* Email */}
              <div>
                <h3 className="text-sm text-muted mb-2">{t.contact.email}</h3>
                <a
                  href="mailto:lararosaveloso@gmail.com"
                  className="text-accent hover:text-accent-hover transition-colors duration-300"
                >
                  lararosaveloso@gmail.com
                </a>
              </div>

              {/* Telefone */}
              <div>
                <h3 className="text-sm text-muted mb-2">{t.contact.phone}</h3>
                <a
                  href="tel:+5511968649952"
                  className="text-text hover:text-accent transition-colors duration-300"
                >
                  (11) 96864-9952
                </a>
              </div>

              {/* Social */}
              <div>
                <h3 className="text-sm text-muted mb-4">{t.contact.social}</h3>
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
