import { projects, ProjectItem } from "@/data/content";
import { FolderCode, Layers } from "lucide-react";

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <article
      data-reveal
      aria-labelledby={`project-${project.id}-title`}
      className="relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-surface/75 border border-white/10 shadow-elevation backdrop-blur-md hover:border-brand/40 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(76,141,255,0.18)] transition-all duration-300 group overflow-hidden"
    >
      {/* Top subtle blue/cyan gradient accent highlight on hover */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />

      {/* Top Section: Icon badge & Project Name */}
      <div className="flex flex-col">
        {/* Subtle folder / code icon */}
        <div className="w-11 h-11 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand-2 group-hover:bg-brand/20 group-hover:scale-105 transition-all duration-300 mb-5">
          <FolderCode className="w-5 h-5" aria-hidden="true" />
        </div>

        {/* Project Name */}
        <h3
          id={`project-${project.id}-title`}
          className="font-heading font-bold text-xl sm:text-2xl text-text tracking-tight group-hover:text-white transition-colors"
        >
          {project.title}
        </h3>
      </div>

      {/* Technologies Section */}
      <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted/70">
          Technologies
        </span>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-2/90 border border-brand/20 text-xs font-mono text-brand-2/90 hover:border-brand/40 hover:text-white transition-all shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-2/70" />
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Future Link Compatibility (ready for repo / demo URLs without redesigning cards) */}
      {(project.repoUrl || project.liveUrl) && (
        <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-3">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-2 hover:underline"
            >
              Repository
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-2 hover:underline"
            >
              Live Demo
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export default function Projects() {
  const publicProjects = projects.filter((p) => p.visibility === "public");

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-reveal className="mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-2 border border-brand/20 text-xs font-semibold text-brand-2 mb-4 shadow-sm">
            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Featured Work</span>
          </div>
          <h2
            id="projects-heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight"
          >
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-2">
              Projects
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
            Real-world applications built with modern architectures and production-ready technologies.
          </p>
        </div>

        {/* Responsive Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {publicProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
