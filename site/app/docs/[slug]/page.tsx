import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Github } from "lucide-react";
import { getModuleHtml, getModules, repoUrl } from "@/lib/modules";
import MarkDone from "@/components/MarkDone";

export function generateStaticParams() {
  return getModules().map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mod = getModules().find((m) => m.slug === slug);
  return {
    title: `${mod?.num}. ${mod?.title} · CEO Agent Kit`,
    description: mod?.summary,
  };
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const modules = getModules();
  const idx = modules.findIndex((m) => m.slug === slug);
  const mod = modules[idx];
  const prev = idx > 0 ? modules[idx - 1] : null;
  const next = idx < modules.length - 1 ? modules[idx + 1] : null;
  const html = getModuleHtml(slug);

  return (
    <main>
      <div className="wrap">
        <div className="doc-grid">
          <nav className="doc-side" aria-label="Модулі">
            {modules.map((m) => (
              <Link
                key={m.slug}
                href={`/docs/${m.slug}/`}
                className={m.slug === slug ? "active" : ""}
              >
                <b>{m.num}</b> {m.title}
              </Link>
            ))}
          </nav>

          <article className="prose">
            <div className="kicker" style={{ marginBottom: 14 }}>
              Модуль {mod.num}
            </div>
            <h1>{mod.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <p>
              <a href={repoUrl(slug)}>
                <Github
                  size={15}
                  aria-hidden
                  style={{ verticalAlign: "-2px", marginRight: 7 }}
                />
                Файли модуля на GitHub
              </a>
            </p>
            <div className="doc-foot">
              <MarkDone slug={slug} />
              <div className="pager">
                {prev && (
                  <Link href={`/docs/${prev.slug}/`}>
                    <ArrowLeft
                      size={14}
                      aria-hidden
                      style={{ verticalAlign: "-2px" }}
                    />{" "}
                    Модуль {prev.num}
                  </Link>
                )}
                {next && (
                  <Link href={`/docs/${next.slug}/`}>
                    Модуль {next.num}{" "}
                    <ArrowRight
                      size={14}
                      aria-hidden
                      style={{ verticalAlign: "-2px" }}
                    />
                  </Link>
                )}
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
