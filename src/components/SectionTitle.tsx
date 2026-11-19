"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
}

export default function SectionTitle({ title, subtitle, alignment = "center" }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`mb-12 md:mb-16 ${alignment === "center" ? "text-center" : "text-left"}`}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      )}
      <div className={`line-accent mt-6 ${alignment === "center" ? "mx-auto" : ""}`} />
    </motion.div>
  );
}
