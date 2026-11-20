"use client";

import { useEffect, useRef, useState } from "react";
import { Home, User, FolderKanban, Briefcase, Mail } from "lucide-react";
import { useSmoothScroll } from "./SmoothScroll";

interface DockItem {
  id: string;
  label: string;
  icon: typeof Home;
}

const dockItems: DockItem[] = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function MobileDock() {
  const { scrollTo } = useSmoothScroll();
  const [activeSection, setActiveSection] = useState("hero");
  const dockRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const isHiddenRef = useRef(false);

  // ScrollSpy via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: 0,
      }
    );

    dockItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Dock hides on fast downscroll and returns on upscroll (hardware-accelerated CSS transform)
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;

      // Downscroll > 15px hides dock
      if (diff > 15 && currentScrollY > 120 && !isHiddenRef.current) {
        isHiddenRef.current = true;
        if (dockRef.current) {
          dockRef.current.style.transform = "translateY(84px)";
        }
      } else if (diff < -8 && isHiddenRef.current) {
        // Upscroll shows dock
        isHiddenRef.current = false;
        if (dockRef.current) {
          dockRef.current.style.transform = "translateY(0)";
        }
      }

      lastScrollY.current = currentScrollY;

      // When scroll stops, restore dock
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (isHiddenRef.current) {
          isHiddenRef.current = false;
          if (dockRef.current) {
            dockRef.current.style.transform = "translateY(0)";
          }
        }
      }, 350);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      scrollTo(target, -20);
      setActiveSection(id);
    }
  };

  return (
    <nav
      aria-label="Mobile Navigation Dock"
      ref={dockRef}
      className="lg:hidden fixed bottom-3 inset-x-0 z-40 flex justify-center pointer-events-none px-4 transition-transform duration-300 ease-out"
    >
      <div className="pointer-events-auto flex items-center justify-between gap-1 p-1.5 rounded-pill bg-surface/90 glass-dock border border-white/10 shadow-elevation backdrop-blur-md safe-pb">
        {dockItems.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex items-center justify-center min-w-[50px] min-h-[46px] px-3 py-2 rounded-pill transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-2 ${
                isActive ? "text-brand-2 font-semibold" : "text-muted hover:text-text"
              }`}
            >
              {/* Active sliding background highlight */}
              {isActive && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-brand/20 to-brand-2/20 border border-brand/40 rounded-full shadow-[0_0_12px_rgba(76,141,255,0.3)]"
                />
              )}

              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                {isActive && (
                  <span className="text-xs tracking-tight transition-opacity duration-200">
                    {item.label}
                  </span>
                )}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
