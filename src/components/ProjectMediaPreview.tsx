"use client";

import { useState } from "react";
import Image from "next/image";
import { ProjectItem } from "@/data/content";
import { Code2, Image as ImageIcon } from "lucide-react";

export default function ProjectMediaPreview({ project }: { project: ProjectItem }) {
  const [activeTab, setActiveTab] = useState<"screenshot" | "code">("screenshot");
  const currentMedia = activeTab === "screenshot" ? project.screenshot : project.code;

  return (
    <div className="flex flex-col rounded-card bg-surface-2/80 border border-white/10 overflow-hidden shadow-elevation">
      {/* Tab Controls (role="tablist") */}
      <div
        role="tablist"
        aria-label={`${project.title} Preview Switcher`}
        className="flex items-center justify-between p-2.5 bg-surface-2 border-b border-white/5"
      >
        <div className="flex items-center gap-1.5 p-1 rounded-pill bg-surface border border-white/5">
          <button
            type="button"
            role="tab"
            suppressHydrationWarning
            id={`tab-${project.id}-screenshot`}
            aria-selected={activeTab === "screenshot"}
            aria-controls={`panel-${project.id}-screenshot`}
            tabIndex={activeTab === "screenshot" ? 0 : -1}
            onClick={() => setActiveTab("screenshot")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-2 ${
              activeTab === "screenshot"
                ? "bg-gradient-to-r from-brand to-brand-2 text-bg font-bold shadow-[0_0_12px_rgba(76,141,255,0.3)]"
                : "text-muted hover:text-text hover:bg-white/5"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Screenshot</span>
          </button>

          <button
            type="button"
            role="tab"
            suppressHydrationWarning
            id={`tab-${project.id}-code`}
            aria-selected={activeTab === "code"}
            aria-controls={`panel-${project.id}-code`}
            tabIndex={activeTab === "code" ? 0 : -1}
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-2 ${
              activeTab === "code"
                ? "bg-gradient-to-r from-brand to-brand-2 text-bg font-bold shadow-[0_0_12px_rgba(76,141,255,0.3)]"
                : "text-muted hover:text-text hover:bg-white/5"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Code Excerpt</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-muted/70 hidden sm:inline px-2">
          {activeTab === "screenshot" ? "Application UI" : "Source Code"}
        </span>
      </div>

      {/* Media Content Display Container with data-lenis-prevent for internal scroll */}
      <div
        id={`panel-${project.id}-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${project.id}-${activeTab}`}
        data-lenis-prevent
        tabIndex={0}
        className="relative aspect-[16/10] w-full bg-surface overflow-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-2"
      >
        <Image
          src={currentMedia.src800 || currentMedia.src}
          alt={currentMedia.alt}
          width={currentMedia.w}
          height={currentMedia.h}
          unoptimized
          loading="lazy"
          className="w-full h-auto min-h-full object-contain object-top select-none"
        />
      </div>

      {/* Honest Caption Bar */}
      <div className="p-3 bg-surface-2 border-t border-white/5 text-xs text-muted leading-relaxed">
        <p className="font-mono text-[11px] text-brand-2/90">{currentMedia.caption}</p>
      </div>
    </div>
  );
}
