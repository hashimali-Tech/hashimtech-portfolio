import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { projects } from "@/data/content";
import { getSiteUrl } from "@/lib/site";
import { ArrowLeft, Code2, Layers, CheckCircle2, Users, ExternalLink, Github } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects
    .filter((p) => p.visibility === "public")
    .map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug && p.visibility === "public");

  if (!project) {
    return {
      title: "Project Not Found | Hashim Ali",
    };
  }

  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/work/${project.id}`;

  return {
    title: `${project.title} — Case Study | Hashim Ali`,
    description: project.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${project.title} — Case Study | Hashim Ali`,
      description: project.summary,
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${project.title} — Case Study`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Case Study | Hashim Ali`,
      description: project.summary,
      images: ["/opengraph-image"],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug && p.visibility === "public");

  if (!project) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/work/${project.id}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.summary,
    applicationCategory: project.kind,
    programmingLanguage: project.stack,
    url: canonicalUrl,
    author: {
      "@type": "Person",
      name: "Hashim Ali",
      url: siteUrl,
    },
  };

  return (
    <main id="main-content" className="relative min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back to Projects Navigation */}
      <div className="mb-10">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-2 hover:text-white px-3.5 py-2 rounded-full bg-surface-2/80 border border-white/10 hover:border-brand-2/60 transition-all duration-300 shadow-sm"
          aria-label="Back to featured projects list"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>← Back to Selected Projects</span>
        </Link>
      </div>

      {/* Project Header Article */}
      <article className="flex flex-col gap-8 p-6 sm:p-10 rounded-3xl bg-surface/85 border border-white/10 hover:border-brand-2/50 shadow-elevation backdrop-blur-xl transition-all duration-500">
        {/* Kind badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/30 text-xs font-bold text-brand-2 w-fit">
          <Layers className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{project.kind}</span>
        </div>

        {/* Main Title - Single Clear H1 */}
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text tracking-tight leading-tight">
          {project.title}
        </h1>

        {/* Project Summary */}
        <p className="text-base sm:text-lg text-muted leading-relaxed">
          {project.summary}
        </p>

        {/* Tech Stack Section */}
        <section aria-labelledby="technologies-heading" className="flex flex-col gap-3 pt-4 border-t border-white/[0.08]">
          <h2 id="technologies-heading" className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-2">
            <Code2 className="w-4 h-4 text-brand-2" aria-hidden="true" />
            <span>Technologies Used</span>
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface-2 border border-brand/25 text-xs font-mono text-brand-2 hover:border-brand-2/70 hover:shadow-[0_0_12px_rgba(125,211,252,0.35)] transition-all cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-2" aria-hidden="true" />
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Workflows / Features */}
        {project.workflows && project.workflows.length > 0 && (
          <section aria-labelledby="workflows-heading" className="flex flex-col gap-3 pt-4 border-t border-white/[0.08]">
            <h2 id="workflows-heading" className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>Key Capabilities &amp; Architecture</span>
            </h2>
            <ul className="space-y-2.5">
              {project.workflows.map((workflow, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" aria-hidden="true" />
                  <span>{workflow}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Target Audience */}
        {project.audience && (
          <section aria-labelledby="audience-heading" className="flex flex-col gap-2 pt-4 border-t border-white/[0.08]">
            <h2 id="audience-heading" className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-2" aria-hidden="true" />
              <span>Target Audience</span>
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              {project.audience}
            </p>
          </section>
        )}

        {/* Links (Only rendered if actually present) */}
        {(project.liveUrl || project.repoUrl) && (
          <section aria-label="External Project Links" className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/[0.08]">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand text-bg font-bold text-xs hover:bg-brand-2 transition-all shadow-md"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-2 border border-white/10 text-text font-semibold text-xs hover:border-brand/40 transition-all"
              >
                <Github className="w-3.5 h-3.5 text-muted" aria-hidden="true" />
                <span>Source Repository</span>
              </a>
            )}
          </section>
        )}
      </article>

      {/* Footer Return CTA */}
      <div className="mt-12 text-center">
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted hover:text-brand-2 transition-colors"
        >
          <span>Interested in discussing a similar project?</span>
          <span className="text-brand-2 underline underline-offset-4">Get in touch →</span>
        </Link>
      </div>
    </main>
  );
}
