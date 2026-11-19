"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import SectionTitle from "@/components/SectionTitle";
import ProjectsList from "@/components/ProjectsList";
import ProductionsList from "@/components/ProductionsList";
import EventsList from "@/components/EventsList";
import Button from "@/components/Button";
import { useLanguage } from "@/components/LanguageProvider";

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      {/* ═══════ HERO SECTION ═══════ */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Background Image — Desktop (lg+) */}
        <div className="absolute inset-0 hidden lg:block">
          <Image
            src="/lara-hero.jpg"
            alt="Lara Veloso — Estudante de Cinema"
            fill
            priority
            unoptimized
            className="object-cover object-[center_55%]"
            quality={100}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, var(--c-overlay-from), var(--c-overlay-via), var(--c-overlay-to))" }} />
        </div>

        {/* Background Image — Mobile (< lg) */}
        <div className="absolute inset-0 lg:hidden">
          <Image
            src="/lara-hero-mobile.jpg"
            alt="Lara Veloso — Estudante de Cinema"
            fill
            priority
            unoptimized
            className="object-cover object-[center_55%] opacity-40"
            quality={100}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, var(--c-overlay-from), var(--c-overlay-via), var(--c-overlay-to))" }} />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex items-end lg:items-center py-32 pb-24 lg:py-0">
          {/* Coluna à esquerda: Logo + Texto + Botões */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col items-center lg:items-start w-full"
          >
            {/* Logo flutuante */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/logo-lara.png"
                alt="Logo Lara Rosa Veloso"
                width={400}
                height={280}
                unoptimized
                className="w-64 md:w-80 lg:w-96 h-auto logo-themed drop-shadow-2xl"
              />
            </motion.div>

            {/* Texto — escondido no mobile */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 text-text/80 text-base md:text-lg lg:text-xl text-center lg:text-left max-w-md leading-relaxed font-[family-name:var(--font-serif)] italic"
            >
              {t.home.heroSubtitle}
            </motion.p>

            {/* Botões — escondidos no mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="hidden lg:flex mt-8 flex-col sm:flex-row items-center lg:items-start gap-4"
            >
              <Button href="/projetos" variant="primary" id="hero-cta">
                {t.home.heroBtn}
              </Button>
              <Button href="/sobre" variant="outline" id="hero-cta-about">
                {t.home.heroBtnAbout}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-text/30 flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-accent rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════ SOBRE MIM (PREVIEW) ═══════ */}
      <AnimatedSection className="py-24 md:py-32 px-6 bg-bg-alt">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Fotos à esquerda */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src="/lara-about-1.jpg"
                  alt="Lara Veloso"
                  fill
                  unoptimized
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mt-8">
                <Image
                  src="/lara-about-2.jpg"
                  alt="Lara Veloso"
                  fill
                  unoptimized
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>

            {/* Logo + Texto à direita */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col items-center lg:items-start"
            >
              {/* Logo */}
              <Image
                src="/logo-lara.png"
                alt="Lara Rosa Veloso"
                width={300}
                height={200}
                unoptimized
                className="w-56 md:w-64 h-auto logo-themed mb-8"
              />

              {/* Bio */}
              <p className="text-text/80 text-base md:text-lg leading-relaxed text-center lg:text-left">
                {t.home.aboutBioText1}
                <span className="text-text font-medium">{t.home.aboutBioName}</span>
                {t.home.aboutBioText2}
                <span className="text-text font-medium">
                  {t.home.aboutBioSchool}
                </span>
                {t.home.aboutBioText3}
                <a
                  href="http://lattes.cnpq.br/3943201914569172"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover underline underline-offset-4 transition-colors duration-300"
                >
                  {t.home.aboutBioLattes}
                </a>
                .
              </p>

              {/* Botão */}
              <div className="mt-8">
                <Button href="/sobre" variant="outline" id="home-about-btn">
                  {t.home.aboutBtn}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════ PROJETOS AUDIOVISUAIS (PREVIEW) ═══════ */}
      <AnimatedSection className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title={t.home.projectsTitle}
            subtitle={t.home.projectsSubtitle}
          />

          <ProjectsList limit={3} />

          <div className="mt-12 text-center">
            <Button href="/projetos" variant="outline" id="home-all-projects">
              {t.home.projectsBtn}
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════ PRODUÇÕES ACADÊMICAS (PREVIEW) ═══════ */}
      <AnimatedSection className="py-24 md:py-32 px-6 bg-bg-alt">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title={t.home.productionsTitle}
            subtitle={t.home.productionsSubtitle}
          />

          <ProductionsList limit={3} />

          <div className="mt-12 text-center">
            <Button
              href="/producoes"
              variant="outline"
              id="home-all-productions"
            >
              {t.home.productionsBtn}
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════ EVENTOS E PREMIAÇÕES (PREVIEW) ═══════ */}
      <AnimatedSection className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title={t.home.eventsTitle}
            subtitle={t.home.eventsSubtitle}
          />

          <EventsList limit={3} />

          <div className="mt-12 text-center">
            <Button
              href="/eventos"
              variant="outline"
              id="home-all-events"
            >
              {t.home.eventsBtn}
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════ CONTATO (CTA) ═══════ */}
      <section id="home-contact-cta" className="relative py-32 md:py-40 px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/cta-home.jpg"
            alt="Lara Veloso com câmera"
            fill
            unoptimized
            className="object-cover object-center"
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-xl ml-auto text-right"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-text mb-6">
              {t.home.ctaTitle1}
              <span className="text-gradient">{t.home.ctaHighlight}</span>
              {t.home.ctaTitle2}
            </h2>
            <p className="text-text/80 text-lg mb-10 leading-relaxed">
              {t.home.ctaText}
            </p>
            <Button href="/contato" variant="primary" id="home-contact-btn">
              {t.home.ctaBtn}
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
