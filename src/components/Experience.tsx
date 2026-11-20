import { experience } from "@/data/content";
import { Briefcase, Building2, MapPin } from "lucide-react";

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-reveal className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-surface-2 border border-brand/20 text-xs font-medium text-brand-2 mb-3">
            <Briefcase className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Work & Industry</span>
          </div>
          <h2
            id="experience-heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight"
          >
            Professional Experience
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted max-w-2xl">
            Software houses and technology centers where engineering work and technical collaborations take place.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-8 ml-2 sm:ml-4 border-l-0">
          {/* Animated Timeline Track */}
          <div
            id="experience-line"
            aria-hidden="true"
            className="absolute left-0 top-3 bottom-3 w-[2px] bg-gradient-to-b from-brand via-brand-2 to-transparent origin-top"
            style={{ willChange: "transform" }}
          />

          <div className="flex flex-col gap-10">
            {experience.map((item, idx) => (
              <div
                key={idx}
                data-reveal
                className="relative flex flex-col gap-3 group"
              >
                {/* Timeline Node Marker */}
                <div
                  aria-hidden="true"
                  className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-surface border-2 border-brand shadow-sm flex items-center justify-center group-hover:border-brand-2 group-hover:shadow-[0_0_12px_rgba(125,211,252,0.6)] group-hover:scale-110 transition-all duration-300"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-2" />
                </div>

                {/* Content Card */}
                <div className="p-6 sm:p-7 rounded-2xl bg-surface/85 border border-white/10 shadow-elevation backdrop-blur-md max-w-3xl hover:border-brand-2/70 hover:shadow-[0_0_32px_rgba(76,141,255,0.25)] hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-brand-2 text-xs font-semibold uppercase tracking-wider">
                      <Building2 className="w-4 h-4 text-brand" aria-hidden="true" />
                      <span>Software House & Incubation Center</span>
                    </div>

                    {item.period && (
                      <span className="text-xs font-mono text-muted bg-surface-2 px-2.5 py-1 rounded-pill border border-white/5 hover:border-brand-2/40 transition-colors">
                        {item.period}
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-bold text-text mt-2">
                    {item.company}
                  </h3>

                  {item.role && (
                    <p className="text-sm font-medium text-brand-2 mt-1">
                      {item.role} {item.type && <span className="text-muted/60">({item.type})</span>}
                    </p>
                  )}

                  {item.location && (
                    <div className="flex items-center gap-1.5 text-xs text-muted mt-2">
                      <MapPin className="w-3.5 h-3.5 text-muted/70" aria-hidden="true" />
                      <span>{item.location}</span>
                    </div>
                  )}

                  {/* Bullet list is only rendered if bullets array has items */}
                  {item.bullets.length > 0 && (
                    <ul className="mt-4 space-y-2 text-xs sm:text-sm text-muted">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0 mt-2" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
