"use client";

import Link from "next/link";
import SocialLinks from "./SocialLinks";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = [
    { href: "/", label: t.footer.home },
    { href: "/sobre", label: t.footer.about },
    { href: "/projetos", label: t.footer.projects },
    { href: "/producoes", label: t.footer.productions },
    { href: "/eventos", label: t.footer.events },
    { href: "/contato", label: t.footer.contact },
  ];

  return (
    <footer id="main-footer" className="bg-bg border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-[family-name:var(--font-serif)] text-2xl font-bold text-text hover:text-accent transition-colors duration-300"
            >
              Lara Veloso
            </Link>
            <p className="mt-4 text-muted text-sm leading-relaxed max-w-xs">
              {t.footer.bio}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-text font-[family-name:var(--font-serif)] text-lg mb-4">
              {t.footer.navigation}
            </h3>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted hover:text-accent transition-colors duration-300 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-text font-[family-name:var(--font-serif)] text-lg mb-4">
              {t.footer.social}
            </h3>
            <SocialLinks />
            <p className="mt-4 text-sm text-muted">
              lararosaveloso@gmail.com
            </p>
            <p className="text-sm text-muted">
              (11) 96864-9952
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted/80">
            © {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <p className="text-xs text-muted/60">
            {t.footer.tagline}
          </p>
        </div>

        {/* Developer Credit */}
        <div className="mt-6 text-center">
          <p className="text-[11px] text-muted/50">
            Desenvolvido por{" "}
            <a
              href="https://wa.me/5511964922723"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted/60 hover:text-accent transition-colors duration-300"
            >
              Prado Tecnologia
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
