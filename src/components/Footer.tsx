import { profile, navLinks } from "@/data/content";
import { GitHubIcon, LinkedInIcon } from "./Icons";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.08] py-14 overflow-hidden bg-surface/30">
      {/* Subtle top gradient glow line */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start mb-12">
          {/* Brand & Location (md:col-span-5) */}
          <div className="md:col-span-5 flex flex-col gap-3.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand to-brand-2 flex items-center justify-center text-bg font-black text-sm shadow-sm">
                HA
              </div>
              <span className="font-heading font-bold text-lg text-text">{profile.name}</span>
            </div>
            <p className="text-xs sm:text-sm text-muted max-w-sm leading-relaxed">
              Full-Stack Developer &amp; AI Enthusiast building modern business applications. Based in {profile.location}.
            </p>
            <div className="flex items-center gap-2.5 mt-2">
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-9 h-9 rounded-xl bg-surface-2 border border-white/8 flex items-center justify-center hover:border-brand/40 hover:bg-surface-hover hover:text-white transition-all text-muted"
                >
                  <GitHubIcon className="w-4 h-4" />
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-xl bg-surface-2 border border-white/8 flex items-center justify-center hover:border-brand/40 hover:bg-surface-hover transition-all text-[#0A66C2]"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Navigation Links (md:col-span-4) */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-text/70 mb-1">
              Navigation
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs sm:text-sm text-muted hover:text-brand-2 transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Back to top & Status (md:col-span-3) */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end gap-4">
            <a
              href="#hero"
              aria-label="Back to top"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-2/90 border border-white/10 text-xs font-bold text-text hover:border-brand/40 hover:bg-surface-hover active:scale-95 transition-all shadow-sm"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-brand-2" aria-hidden="true" />
            </a>
            <div className="flex items-center gap-2 text-xs text-muted/70">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for hire</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted/60">
          <span>&copy; {currentYear} {profile.name} ({profile.brand}). All rights reserved.</span>
          <span className="hidden sm:inline">Built with Next.js 16 · React 19 · TypeScript · Tailwind CSS</span>
          <span>Gujranwala, Pakistan</span>
        </div>
      </div>
    </footer>
  );
}
