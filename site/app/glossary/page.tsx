import type { Metadata } from "next";
import { GLOSSARY } from "@/lib/content";
import { FALLBACK_ICON, GLOSSARY_GROUP_ICONS } from "@/components/icons";

export const metadata: Metadata = {
  title: "Глосарій · CEO Agent Kit",
  description:
    "Всі технічні терміни кіта простими словами: VPS, Tailscale, промпт, токен, cron, деплой та інші.",
};

export default function GlossaryPage() {
  return (
    <main>
      <div className="wrap narrow">
        <div className="page-head">
          <div className="kicker">Глосарій</div>
          <h1>Терміни простими словами</h1>
          <p className="lead">
            Все, що трапляється в модулях, пояснене без жаргону. Читати наперед
            не обовʼязково: повертайтесь сюди, коли зустрінете незнайоме слово.
          </p>
        </div>

        {GLOSSARY.map((g) => {
          const Icon = GLOSSARY_GROUP_ICONS[g.group] ?? FALLBACK_ICON;
          return (
            <div className="gloss-group" key={g.group}>
              <h2>
                <Icon size={20} aria-hidden />
                {g.group}
              </h2>
              <dl className="gloss">
                {g.terms.map((t) => (
                  <div className="gloss-row" key={t.term}>
                    <dt>
                      {t.term}
                      {t.en && <span>{t.en}</span>}
                    </dt>
                    <dd>{t.def}</dd>
                  </div>
                ))}
              </dl>
            </div>
          );
        })}
      </div>
    </main>
  );
}
