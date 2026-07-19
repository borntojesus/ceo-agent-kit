import type { Metadata } from "next";
import Link from "next/link";
import { FileTerminal } from "lucide-react";
import { getPrompts } from "@/lib/modules";
import CopyButton from "@/components/CopyButton";

export const metadata: Metadata = {
  title: "Промпти для Claude · CEO Agent Kit",
  description:
    "Готові промпти для Claude Code: скопіюйте цілком, вставте в Claude Code на сервері, агент налаштує все сам.",
};

export default function PromptsPage() {
  const prompts = getPrompts();
  return (
    <main>
      <div className="wrap narrow">
        <div className="page-head">
          <div className="kicker">Промпти для Claude</div>
          <h1>Копіюєте. Вставляєте. Готово.</h1>
          <p className="lead">
            Кожен промпт розрахований на Claude Code на вашому сервері. Копіюйте
            цілком, разом із заголовком. Порядок той самий, що в{" "}
            <Link href="/checklist/">чеклисті</Link>: не запускайте промпт, поки
            не пройдені попередні модулі.
          </p>
        </div>

        {prompts.map((p) => (
          <div
            className="prompt-card"
            key={`${p.moduleSlug}-${p.name}`}
            id={`${p.moduleSlug}-${p.name}`}
          >
            <div className="prompt-head">
              <FileTerminal
                size={17}
                aria-hidden
                style={{ color: "var(--emerald)", flexShrink: 0 }}
              />
              <span className="name">{p.name}.md</span>
              <span className="mod">
                Модуль {p.moduleNum} · {p.moduleTitle}
              </span>
              <CopyButton text={p.content} />
            </div>
            <pre className="prompt-body">{p.content}</pre>
          </div>
        ))}
      </div>
    </main>
  );
}
