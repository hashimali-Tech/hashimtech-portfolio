import { services } from "@/data/content";
import { Sparkles } from "lucide-react";

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Background radial accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(76,141,255,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-reveal className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-2 border border-brand/20 text-xs font-semibold text-brand-2 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>What I Offer</span>
          </div>
          <h2
            id="services-heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight"
          >
            Services I{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-2">
              Provide
            </span>
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From modern responsive user interfaces to robust backend architectures and AI integrations.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              data-reveal
              className="group relative flex flex-col h-full p-6 sm:p-7 rounded-2xl bg-surface/75 border border-white/8 hover:border-brand/40 hover:bg-surface/90 hover:shadow-[0_20px_48px_-12px_rgba(76,141,255,0.2)] transition-all duration-300 backdrop-blur-md gap-4"
            >
              {/* Service Icon Box */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand/20 to-brand-2/10 border border-brand/25 flex items-center justify-center text-3xl shadow-sm group-hover:border-brand/50 group-hover:shadow-[0_0_20px_rgba(76,141,255,0.25)] transition-all shrink-0">
                {service.icon}
              </div>

              {/* Service Title */}
              <h3 className="font-heading font-bold text-lg text-text group-hover:text-white transition-colors leading-tight">
                {service.title}
              </h3>

              {/* Service Description */}
              <p className="text-sm text-muted leading-relaxed group-hover:text-text/90 transition-colors flex-1">
                {service.description}
              </p>

              {/* Bottom Glowing Accent Line */}
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
