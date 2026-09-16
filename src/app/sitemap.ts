import type { MetadataRoute } from "next";

const baseUrl = "https://nfhs-up.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/compare", "/rankings", "/districts"].map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date("2026-09-15"),
      changeFrequency: "monthly",
      priority: path === "" ? 1 : 0.8,
    }),
  );
}
