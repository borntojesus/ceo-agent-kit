// @ts-check
import { defineConfig } from "astro/config";
import { visit } from "unist-util-visit";

const REPO = "https://github.com/borntojesus/ceo-agent-kit/blob/main/modules";

/** Rewrite relative prompts/*.md links inside module READMEs to GitHub blob URLs. */
function rehypePromptLinks() {
  return (tree, file) => {
    const m = String(file.path ?? "").match(/modules\/([^/]+)\/README\.md$/);
    if (!m) return;
    const slug = m[1];
    visit(tree, "element", (node) => {
      if (node.tagName !== "a") return;
      const href = node.properties?.href;
      if (typeof href === "string" && href.startsWith("prompts/")) {
        node.properties.href = `${REPO}/${slug}/${href}`;
      }
    });
  };
}

export default defineConfig({
  site: "https://ai-kit.antonyuk.org",
  server: { port: 4982 },
  markdown: {
    rehypePlugins: [rehypePromptLinks],
  },
});
