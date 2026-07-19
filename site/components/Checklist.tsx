"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ModuleMeta } from "@/lib/modules";
import { FALLBACK_ICON, MODULE_ICONS } from "@/components/icons";

const KEY = "ceo-agent-kit-progress";

export function readProgress(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function writeProgress(state: Record<string, boolean>) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export default function Checklist({ modules }: { modules: ModuleMeta[] }) {
  const [state, setState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setState(readProgress());
  }, []);

  const done = modules.filter((m) => state[m.slug]).length;

  const toggle = (slug: string) => {
    const next = { ...state, [slug]: !state[slug] };
    setState(next);
    writeProgress(next);
  };

  return (
    <>
      <div className="progress-box">
        <div className="wrap narrow">
          <div className="progress-label">
            <span>Ваш прогрес</span>
            <span>
              {done} з {modules.length}
            </span>
          </div>
          <div className="progress-bar">
            <div style={{ width: `${(done / modules.length) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="wrap narrow">
        <ol className="mods">
          {modules.map((m) => {
            const Icon = MODULE_ICONS[m.slug] ?? FALLBACK_ICON;
            return (
              <li
                key={m.slug}
                className={`mod-card${state[m.slug] ? " done" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={!!state[m.slug]}
                  onChange={() => toggle(m.slug)}
                  aria-label={`Модуль ${m.num} виконано`}
                />
                <span className="mod-ic">
                  <Icon size={19} aria-hidden />
                </span>
                <span>
                  <span className="mod-num">Модуль {m.num}</span>
                  <span className="mod-title" style={{ display: "block" }}>
                    <Link href={`/docs/${m.slug}/`}>{m.title}</Link>
                  </span>
                  <span className="mod-summary" style={{ display: "block" }}>
                    {m.summary}
                  </span>
                </span>
                <ArrowRight className="mod-arrow" size={17} aria-hidden />
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
