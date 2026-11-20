import Image from "next/image";
import { about, education, profile } from "@/data/content";
import { GraduationCap, MapPin, Briefcase, Sparkles, CheckCircle2, ExternalLink } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "./Icons";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-reveal className="mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-2 border border-brand/20 text-xs font-semibold text-brand-2 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>About Me</span>
          </div>
          <h2
            id="about-heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight"
          >
            Passionate Developer,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-2">
              Lifelong Learner
            </span>
          </h2>
        </div>

        {/* 2-Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Photo 2 + Identity Highlights (col-span-5) */}
          <div data-reveal className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative rounded-[2rem] bg-surface/85 border border-white/10 p-2 sm:p-2.5 shadow-elevation backdrop-blur-xl overflow-hidden group">
              <div className="relative aspect-[578/750] w-full rounded-[1.6rem] overflow-hidden bg-surface-2">
                {/* Mobile Image (< 640px) */}
                <div className="sm:hidden w-full h-full">
                  <Image
                    src="/profile/hashim-about-400.webp"
                    alt="Hashim Ali — Software Engineer and BSIT Student"
                    width={400}
                    height={519}
                    unoptimized
                    className="w-full h-full object-cover object-top select-none"
                  />
                </div>
                {/* Desktop Image (≥ 640px) */}
                <div className="hidden sm:block w-full h-full">
                  <Image
                    src="/profile/hashim-about-800.webp"
                    alt="Hashim Ali — Software Engineer and BSIT Student"
                    width={578}
                    height={750}
                    unoptimized
                    className="w-full h-full object-cover object-top select-none group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Bottom gradient fade */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface via-surface/40 to-transparent pointer-events-none"
                />

                {/* Overlay Badge */}
                <div className="absolute bottom-4 inset-x-4 p-3.5 rounded-2xl bg-surface/90 border border-white/10 backdrop-blur-xl shadow-lg flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-text leading-tight">{profile.name}</p>
                    <p className="text-[11px] text-muted mt-0.5">{education.school}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-brand/10 border border-brand/30 text-[10px] font-bold text-brand-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand" />
                    BSIT Candidate
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Facts Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-surface/70 border border-white/8 backdrop-blur-md flex flex-col gap-4 shadow-sm">
              <div className="flex items-center gap-3.5 text-sm pb-3.5 border-b border-white/[0.06]">
                <div className="w-9 h-9 rounded-xl bg-brand/10 border border-brand/25 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4 text-brand-2" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted">Education</p>
                  <p className="text-text font-semibold text-xs sm:text-sm mt-0.5 truncate">{education.degree}</p>
                  <p className="text-muted/70 text-[11px]">{education.school} · {education.period}</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-sm pb-3.5 border-b border-white/[0.06]">
                <div className="w-9 h-9 rounded-xl bg-brand/10 border border-brand/25 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-brand-2" />
                </div>
                <div>
                  <p className="text-xs text-muted">Location</p>
                  <p className="text-text font-semibold text-xs sm:text-sm mt-0.5">{profile.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-sm">
                <div className="w-9 h-9 rounded-xl bg-brand/10 border border-brand/25 flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4 text-brand-2" />
                </div>
                <div>
                  <p className="text-xs text-muted">Software House</p>
                  <p className="text-text font-semibold text-xs sm:text-sm mt-0.5">Dev Valley Software House</p>
                  <p className="text-muted/70 text-[11px]">Gujranwala, Pakistan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative, Capabilities & CTA (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div data-reveal className="flex flex-col gap-5">
              {about.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-base sm:text-lg text-muted leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Core Capability Cards Grid */}
            <div data-reveal className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {[
                { icon: "🌐", label: "Full-Stack Web Apps", desc: "React, Node.js, Express, MongoDB" },
                { icon: "🖥️", label: "Desktop Applications", desc: "Electron, SQLite, Cross-platform" },
                { icon: "🤖", label: "AI API Integrations", desc: "LLM endpoints, Local AI models" },
                { icon: "📱", label: "Mobile Development", desc: "React Native, Expo workflow" },
                { icon: "⚙️", label: "REST API Architecture", desc: "Express, JWT auth, MongoDB" },
                { icon: "🗄️", label: "Database Management", desc: "MongoDB Mongoose, SQLite" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-surface/60 border border-white/[0.07] hover:border-brand/40 hover:bg-surface-2/70 transition-all group"
                >
                  <span className="text-2xl shrink-0 mt-0.5" aria-hidden="true">{item.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-text group-hover:text-white transition-colors">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Connect Buttons */}
            <div data-reveal className="flex flex-wrap items-center gap-3.5 pt-4">
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect with Hashim Ali on LinkedIn"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-brand to-brand-2 text-bg font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(76,141,255,0.35)] hover:shadow-[0_0_28px_rgba(125,211,252,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-2 min-h-[46px]"
                >
                  <LinkedInIcon className="w-4 h-4 text-bg" />
                  <span>Connect on LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
                </a>
              )}

              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Hashim Ali's GitHub repositories"
                  className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-surface-2/90 border border-white/10 text-text font-semibold text-sm hover:bg-surface-hover hover:border-brand/40 hover:text-white active:scale-95 transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-2 min-h-[46px]"
                >
                  <GitHubIcon className="w-4 h-4 text-muted" />
                  <span>View GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted ml-0.5" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
