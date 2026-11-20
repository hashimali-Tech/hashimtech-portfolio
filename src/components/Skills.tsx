import { skillGroups } from "@/data/content";
import { Code2 } from "lucide-react";

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Background accent glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(76,141,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-reveal className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-2 border border-brand/20 text-xs font-semibold text-brand-2 mb-4 shadow-sm">
            <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Technical Skills</span>
          </div>
          <h2
            id="skills-heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight"
          >
            Tools &amp; Technologies{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-2">
              I Work With
            </span>
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            A comprehensive stack across web, mobile, desktop and intelligent systems — chosen for stability, developer speed, and user experience.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              data-reveal
              className="group relative flex flex-col h-full p-6 sm:p-7 rounded-2xl bg-surface/75 border border-white/8 hover:border-brand-2/70 hover:bg-surface/90 hover:shadow-[0_0_32px_rgba(76,141,255,0.28)] hover:-translate-y-1 transition-all duration-300 backdrop-blur-md"
            >
              {/* Card Header */}
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand/20 to-brand-2/10 border border-brand/25 flex items-center justify-center text-2xl shadow-sm group-hover:border-brand-2/70 group-hover:shadow-[0_0_18px_rgba(125,211,252,0.4)] group-hover:scale-105 transition-all shrink-0">
                  {group.emoji}
                </div>
                <h3 className="font-heading font-bold text-lg text-text group-hover:text-white transition-colors">
                  {group.title}
                </h3>
              </div>

              {/* Skill Chips */}
              <div className="flex flex-wrap gap-2 flex-1 items-start">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full bg-surface-2/80 border border-white/[0.07] text-xs font-medium text-muted hover:border-brand-2/70 hover:bg-brand/15 hover:text-white hover:shadow-[0_0_12px_rgba(125,211,252,0.35)] hover:scale-105 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Subtle hover accent line at card bottom */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 inset-x-6 h-[1.5px] bg-gradient-to-r from-brand to-brand-2 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
