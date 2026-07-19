import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const modules = defineCollection({
  loader: glob({ pattern: "*/README.md", base: "../modules" }),
});

export const collections = { modules };
