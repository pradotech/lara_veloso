"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import Button from "@/components/Button";
import { useLanguage } from "@/components/LanguageProvider";

export default function SobrePage() {
  const { t } = useLanguage();

  return (
    <>
      {/* ═══════ HERO SECTION ═══════ */}
      <section
        id="about-hero"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 left-[15%]">
          <Image
            src="/hero-sobre.jpg"
            alt="Lara Veloso"
            fill
            priority
            unoptimized
            className="object-cover opacity-40"
            style={{ objectPosition: "center 70%" }}
            quality={100}
          />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, var(--c-bg) 35%, transparent 75%), linear-gradient(to top, var(--c-bg) 5%, transparent 40%)" }} />

        {/* Content à esquerda */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-xl"
          >
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">
              {t.about.label}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text mb-6 leading-tight">
              {t.about.heroTitle1}
              <br />
              <span className="text-gradient">{t.about.heroTitle2}</span>.
            </h1>
            <h2 className="text-xl md:text-2xl font-[family-name:var(--font-serif)] text-text/80 mb-6 italic">
              {t.about.heroWelcome}
            </h2>
            <p className="text-text/80 text-base md:text-lg leading-relaxed mb-8">
              {t.about.heroText}
            </p>
            <div className="line-accent" />
          </motion.div>
        </div>
      </section>

      {/* ═══════ FORMAÇÃO ACADÊMICA ═══════ */}
      <AnimatedSection id="formacao" className="w-full overflow-hidden bg-bg">
        <div className="flex flex-col lg:flex-row items-stretch w-full min-h-screen lg:min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 order-1 p-6 lg:p-12 xl:p-16 flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg aspect-[3/4] rounded-2xl overflow-hidden shadow-sm">
              <Image
                src="/formacao-academica.jpg"
                alt="Lara Veloso com câmera"
                fill
                unoptimized
                className="object-cover"
                quality={100}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-center w-full lg:w-1/2 px-6 py-20 lg:px-16 xl:px-24 order-2"
          >
            <p className="text-accent text-sm tracking-[0.2em] uppercase mb-3">{t.about.educationLabel}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">{t.about.educationTitle}</h2>
            <div className="line-accent mb-8" />

            <div className="space-y-4 text-text/80 text-base md:text-lg leading-relaxed">
              <p>
                {t.about.educationText1}
                <span className="text-text font-medium">
                  {t.about.educationSchool}
                </span>
                {t.about.educationText2}
                <span className="text-text font-medium">
                  {t.about.educationAreas}
                </span>
                .
              </p>
              <p>
                {t.about.educationText3}
              </p>
              <p>
                {t.about.educationText4}
                <span className="text-accent font-medium">
                  {t.about.educationResearch}
                </span>
                {t.about.educationText5}
              </p>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ═══════ EXPERIÊNCIA PROFISSIONAL ═══════ */}
      <AnimatedSection id="experiencia" className="w-full overflow-hidden bg-bg-alt">
        <div className="flex flex-col lg:flex-row items-stretch w-full min-h-screen lg:min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center w-full lg:w-1/2 px-6 py-20 lg:px-16 xl:px-24 order-2 lg:order-1"
          >
            <p className="text-accent text-sm tracking-[0.2em] uppercase mb-3">{t.about.experienceLabel}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">{t.about.experienceTitle}</h2>
            <div className="line-accent mb-8" />

            <div className="space-y-4 text-text/80 text-base md:text-lg leading-relaxed">
              <p>
                {t.about.experienceText1}
                <span className="text-text font-medium">{t.about.experienceCompany1}</span>
                {t.about.experienceText2}
              </p>
              <p>
                {t.about.experienceText3}
                <span className="text-text font-medium">{t.about.experienceCompany2}</span>
                {t.about.experienceText4}
              </p>
              <p>
                {t.about.experienceText5}
                <span className="text-text font-medium">{t.about.experienceCompany3}</span>
                {t.about.experienceText6}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full lg:w-1/2 order-1 lg:order-2 p-6 lg:p-12 xl:p-16 flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg aspect-[3/4] rounded-2xl overflow-hidden shadow-sm">
              <Image
                src="/experiencia-profissional.jpg"
                alt="Lara Veloso"
                fill
                unoptimized
                className="object-cover"
                quality={100}
              />
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ═══════ INTERESSES ═══════ */}
      <AnimatedSection id="interesses" className="w-full overflow-hidden bg-bg">
        <div className="flex flex-col lg:flex-row items-stretch w-full min-h-screen lg:min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 order-1 p-6 lg:p-12 xl:p-16 flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg aspect-[3/4] rounded-2xl overflow-hidden shadow-sm">
              <Image
                src="/interesses.jpg"
                alt="Lara Veloso"
                fill
                unoptimized
                className="object-cover"
                quality={100}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-center w-full lg:w-1/2 px-6 py-20 lg:px-16 xl:px-24 order-2"
          >
            <p className="text-accent text-sm tracking-[0.2em] uppercase mb-3">{t.about.interestsLabel}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">{t.about.interestsTitle}</h2>
            <div className="line-accent mb-8" />

            <div className="space-y-4 text-text/80 text-base md:text-lg leading-relaxed">
              <p>
                {t.about.interestsText1}
                <span className="text-text font-medium">{t.about.interestsProduction}</span>
                {t.about.interestsText2}
              </p>
              <p>
                {t.about.interestsText3}
                <span className="text-accent font-medium">
                  {t.about.interestsResearch}
                </span>
                {t.about.interestsText4}
              </p>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ═══════ CTA FINAL ═══════ */}
      <section
        id="about-cta"
        className="relative py-20 md:py-28 px-6 overflow-hidden bg-bg-alt"
      >

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-text mb-6">
              {t.about.ctaTitle}
            </h2>
            <p className="text-text/80 text-lg mb-10 leading-relaxed">
              {t.about.ctaText}
            </p>
            <Button href="/contato" variant="primary" id="about-contact-btn">
              {t.about.ctaBtn}
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
