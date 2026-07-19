import type { Metadata } from "next";
import Link from "next/link";
import { getModules } from "@/lib/modules";
import { FALLBACK_ICON, MODULE_ICONS } from "@/components/icons";

export const metadata: Metadata = {
  title: "Документація · CEO Agent Kit",
  description:
    "Документація всіх 14 модулів: що зробити руками, що зробить агент, як перевірити результат.",
};

export default function DocsIndex() {
  const modules = getModules();
  return (
    <main>
      <div className="wrap">
        <div className="page-head">
          <div className="kicker">Документація</div>
          <h1>Модулі кіта</h1>
          <p className="lead">
            Кожен модуль: що ви робите руками, що робить агент за промптом і як
            перевірити, що все спрацювало.
          </p>
        </div>
        <div className="grid-3">
          {modules.map((m) => {
            const Icon = MODULE_ICONS[m.slug] ?? FALLBACK_ICON;
            return (
              <Link
                href={`/docs/${m.slug}/`}
                className="card"
                key={m.slug}
                style={{ display: "block" }}
              >
                <div className="ic">
                  <Icon size={19} aria-hidden />
                </div>
                <div className="mod-num">Модуль {m.num}</div>
                <h3 style={{ color: "var(--ivory)" }}>{m.title}</h3>
                <p>{m.summary}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
