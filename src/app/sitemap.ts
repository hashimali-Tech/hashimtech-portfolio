import { MetadataRoute } from "next";
import { projects } from "@/data/content";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const currentDate = new Date();

  // Root homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // Each public project case study page
  projects
    .filter((p) => p.visibility === "public")
    .forEach((project) => {
      routes.push({
        url: `${siteUrl}/work/${project.id}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    });

  return routes;
}
