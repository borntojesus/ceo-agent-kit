import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { Github } from "lucide-react";

export const metadata: Metadata = {
  title: "Швидкий старт · CEO Agent Kit",
  description:
    "Встановіть Claude Code на Windows або Mac, вставте один майстер-промпт, і агент налаштує все сам: сервер, Telegram, пошту, нотатки, бекапи.",
};

export default function StartPage() {
  let body = fs.readFileSync(
    path.join(process.cwd(), "..", "START.md"),
    "utf8",
  );
  body = body.replace(/^# .*\n/, "");
  body = body.replace(
    /\((?:modules|prompts)\/[^)]+\)/g,
    (m) =>
      `(https://github.com/borntojesus/ceo-agent-kit/blob/main/${m.slice(1, -1)})`,
  );
  const html = marked.parse(body, { async: false }) as string;

  return (
    <main>
      <div className="wrap narrow">
        <div className="page-head">
          <div className="kicker">Швидкий старт</div>
          <h1>Один промпт, і агент збирає себе сам</h1>
        </div>
        <article className="prose">
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <p>
            <a href="https://github.com/borntojesus/ceo-agent-kit/blob/main/prompts/master-bootstrap.md">
              <Github
                size={15}
                aria-hidden
                style={{ verticalAlign: "-2px", marginRight: 7 }}
              />
              Майстер-промпт на GitHub (копіювати звідси)
            </a>
          </p>
        </article>
      </div>
    </main>
  );
}
