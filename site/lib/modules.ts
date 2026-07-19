import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

const MODULES_DIR = path.join(process.cwd(), "..", "modules");
const REPO = "https://github.com/borntojesus/ceo-agent-kit/blob/main/modules";

export type ModuleMeta = {
  slug: string;
  num: string;
  title: string;
  summary: string;
};

export type PromptFile = {
  moduleSlug: string;
  moduleNum: string;
  moduleTitle: string;
  name: string;
  content: string;
};

function parseMeta(slug: string, body: string): ModuleMeta {
  const lines = body.split("\n");
  const titleLine = lines.find((l) => l.startsWith("# ")) ?? `# ${slug}`;
  const title = titleLine.replace(/^#\s*\d+\.\s*/, "").replace(/^#\s*/, "");
  const tIdx = lines.indexOf(titleLine);
  const summary =
    lines
      .slice(tIdx + 1)
      .find((l) => l.trim().length > 0)
      ?.trim() ?? "";
  return { slug, num: slug.slice(0, 2), title, summary };
}

export function getModules(): ModuleMeta[] {
  return fs
    .readdirSync(MODULES_DIR)
    .filter((d) => fs.existsSync(path.join(MODULES_DIR, d, "README.md")))
    .sort()
    .map((slug) =>
      parseMeta(
        slug,
        fs.readFileSync(path.join(MODULES_DIR, slug, "README.md"), "utf8"),
      ),
    );
}

export function getModuleHtml(slug: string): string {
  let body = fs.readFileSync(path.join(MODULES_DIR, slug, "README.md"), "utf8");
  // drop the H1 (the page renders its own header)
  body = body.replace(/^# .*\n/, "");
  // relative prompt links → in-site prompts page anchor
  body = body.replace(/\((prompts\/[^)]+\.md)\)/g, (_m, p: string) => {
    const anchor = p.replace("prompts/", "").replace(".md", "");
    return `(/prompts/#${slug}-${anchor})`;
  });
  return marked.parse(body, { async: false }) as string;
}

export function getPrompts(): PromptFile[] {
  const out: PromptFile[] = [];
  for (const mod of getModules()) {
    const dir = path.join(MODULES_DIR, mod.slug, "prompts");
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).sort()) {
      if (!f.endsWith(".md")) continue;
      out.push({
        moduleSlug: mod.slug,
        moduleNum: mod.num,
        moduleTitle: mod.title,
        name: f.replace(".md", ""),
        content: fs.readFileSync(path.join(dir, f), "utf8"),
      });
    }
  }
  return out;
}

export function repoUrl(slug: string): string {
  return `${REPO}/${slug}`;
}
