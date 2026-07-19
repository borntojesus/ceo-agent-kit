import type { Metadata } from "next";
import Link from "next/link";
import { Bot, Check, Plug, Search } from "lucide-react";
import { DETAILED_USE_CASES, SEARCH_API_OPTIONS } from "@/lib/use-cases";
import { CONTENT_ICONS, FALLBACK_ICON } from "@/components/icons";

export const metadata: Metadata = {
  title: "Юзкейси · CEO Agent Kit",
  description:
    "Детальні сценарії роботи приватного агента: управління поштою, бізнес-ресерч із консіліумом агентів, пошуковий API.",
};

export default function UseCasesPage() {
  return (
    <main>
      <div className="wrap narrow">
        <div className="page-head">
          <div className="kicker">Юзкейси</div>
          <h1>Що агент робить на практиці</h1>
          <p className="lead">
            Десять сценаріїв з переліком агентів, скілів та інтеграцій: шість
            уже працюють у кіті, чотири позначені «скоро» і зʼявляться
            наступними модулями. Наприкінці блок про пошуковий API, який живить
            будь-який ресерч.
          </p>
        </div>

        {DETAILED_USE_CASES.map((uc) => {
          const Icon = CONTENT_ICONS[uc.icon] ?? FALLBACK_ICON;
          return (
            <article className="uc" key={uc.id} id={uc.id}>
              <div className="uc-head">
                <span className="ic">
                  <Icon size={19} aria-hidden />
                </span>
                <h2>{uc.title}</h2>
                {uc.status === "soon" && (
                  <span className="soon-badge">скоро</span>
                )}
              </div>
              <p className="uc-scenario">{uc.scenario}</p>

              <h3>Як це працює</h3>
              <ol className="uc-steps">
                {uc.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>

              <div className="uc-meta">
                <div>
                  <h3>
                    <Bot size={15} aria-hidden /> Агенти і скіли
                  </h3>
                  <ul>
                    {uc.agents.map((a) => (
                      <li key={a}>
                        <Check size={14} aria-hidden />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>
                    <Plug size={15} aria-hidden /> Інтеграції
                  </h3>
                  <ul>
                    {uc.integrations.map((i) => (
                      <li key={i}>
                        <Check size={14} aria-hidden />
                        {i}
                      </li>
                    ))}
                  </ul>
                  <div className="uc-modules">
                    {uc.modules.map((m) => (
                      <Link key={m.slug} href={`/docs/${m.slug}/`}>
                        {m.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        <article className="uc" id="search-api">
          <div className="uc-head">
            <span className="ic">
              <Search size={19} aria-hidden />
            </span>
            <h2>Search API: очі агента в інтернеті</h2>
          </div>
          <p className="uc-scenario">
            Для ресерчів агенту потрібен власний вебпошук: без нього він
            спирається лише на памʼять моделі. Пошуковий API дає свіжі дані,
            ціни конкурентів і новини. Варіанти, від приватного до
            найзручнішого:
          </p>
          <div className="table-scroll">
            <table className="uc-table">
              <thead>
                <tr>
                  <th>Сервіс</th>
                  <th>Ціна</th>
                  <th>Приватність</th>
                  <th>Коментар</th>
                </tr>
              </thead>
              <tbody>
                {SEARCH_API_OPTIONS.map((o) => (
                  <tr key={o.name} className={o.recommended ? "rec" : ""}>
                    <td>
                      {o.name}
                      {o.recommended && (
                        <span className="rec-badge">наш вибір</span>
                      )}
                    </td>
                    <td>{o.price}</td>
                    <td>{o.privacy}</td>
                    <td>{o.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="uc-scenario">
            Рекомендація кіта: SearXNG контейнером на тому самому VPS (нуль
            витрат, запити не покидають ваш сервер) плюс ключ Brave як резерв.
            Ключі зберігаються в 1Password, як і все інше.
          </p>
        </article>
      </div>
    </main>
  );
}
