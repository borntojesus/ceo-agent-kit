import Link from "next/link";
import { ArrowRight, Check, Terminal } from "lucide-react";
import { FEATURES, STEPS, USE_CASES } from "@/lib/content";
import { CONTENT_ICONS, FALLBACK_ICON } from "@/components/icons";

export default function Home() {
  return (
    <main>
      <div className="wrap">
        <section className="hero">
          <div className="kicker">
            Власний сервер · Власні дані · 14 модулів
          </div>
          <h1 className="display">
            Особистий AI-агент.
            <br />
            <em>Тільки ваш.</em>
          </h1>
          <p className="lead">
            Кіт для CEO, підприємців і C-level: розгорніть приватного
            агента-асистента на власному сервері. Він розбирає пошту, пише вам у
            Telegram, веде нотатки і будує ваші проєкти. Руками ви робите тільки
            оплати, решту налаштовує Claude Code за готовими промптами.
          </p>
          <div className="hero-actions">
            <Link href="/checklist/" className="btn btn-primary">
              Почати з чеклиста <ArrowRight size={17} aria-hidden />
            </Link>
            <Link href="/prompts/" className="btn btn-ghost">
              <Terminal size={17} aria-hidden /> Промпти для Claude
            </Link>
          </div>

          <div className="stats">
            <div className="stat">
              <b>14</b>
              <span>модулів від акаунтів до бекапів</span>
            </div>
            <div className="stat">
              <b>~$55</b>
              <span>на місяць разом із підписками</span>
            </div>
            <div className="stat">
              <b>0</b>
              <span>публічних портів у сервера</span>
            </div>
            <div className="stat">
              <b>2</b>
              <span>поштові скриньки під наглядом</span>
            </div>
          </div>

          <div className="chat" aria-hidden>
            <div className="chat-head">
              <span
                className="dot"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 99,
                  background: "var(--emerald)",
                }}
              />
              Мій агент · топік Звіти
            </div>
            <div className="chat-body">
              <div className="msg bot">
                Доброго ранку. За ніч: 14 листів, 2 важливі. Інвестор з учора
                відповів, чекає дзвінка до четверга. Рахунок від підрядника
                поклав у Рахунки. Дайджест у щоденній нотатці.
                <span className="t">07:30</span>
              </div>
              <div className="msg me">
                Зроби дослідження ринку перед дзвінком і кинь тези
                <span className="t">07:42</span>
              </div>
              <div className="msg bot">
                Прийняв. Тези будуть у топіку Звіти за годину.
                <span className="t">07:42</span>
              </div>
            </div>
          </div>
        </section>

        <section className="block" id="features">
          <div className="sec-head">
            <span className="sec-num">01</span>
            <h2 className="sec-title">Що вміє агент</h2>
          </div>
          <div className="grid-3">
            {FEATURES.map((f) => {
              const Icon = CONTENT_ICONS[f.icon] ?? FALLBACK_ICON;
              return (
                <div className="card" key={f.title}>
                  <div className="ic">
                    <Icon size={19} aria-hidden />
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="block" id="how">
          <div className="sec-head">
            <span className="sec-num">02</span>
            <h2 className="sec-title">Як це працює</h2>
          </div>
          <div className="steps">
            {STEPS.map((s) => (
              <div className="step" key={s.num}>
                <span className="n">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="block" id="use-cases">
          <div className="sec-head">
            <span className="sec-num">03</span>
            <h2 className="sec-title">Юзкейси</h2>
          </div>
          <div className="grid-3">
            {USE_CASES.map((u) => {
              const Icon = CONTENT_ICONS[u.icon] ?? FALLBACK_ICON;
              return (
                <div className="card" key={u.title}>
                  <div className="ic">
                    <Icon size={19} aria-hidden />
                  </div>
                  <h3>{u.title}</h3>
                  <p>{u.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <div className="band">
          <div>
            <h2>Приватність за замовчуванням</h2>
            <p>
              Це не SaaS і не чужа платформа. Сервер ваш, акаунти ваші, дані
              ваші. Агент недосяжний з інтернету: він сам ходить до Telegram і
              пошти, а до нього не ходить ніхто.
            </p>
          </div>
          <ul>
            <li>
              <Check size={17} aria-hidden />
              Доступ тільки через ваш Tailscale VPN
            </li>
            <li>
              <Check size={17} aria-hidden />
              Всі секрети у вашому 1Password
            </li>
            <li>
              <Check size={17} aria-hidden />
              Telegram через long polling, без відкритих портів
            </li>
            <li>
              <Check size={17} aria-hidden />
              Нічні бекапи у ваше приватне репо
            </li>
          </ul>
        </div>

        <div className="final-cta">
          <h2>Один вікенд до власного агента</h2>
          <p>
            Пройдіть чеклист за порядком. Застрягли: забронюйте дзвінок,
            пройдемо разом.
          </p>
          <div
            className="hero-actions"
            style={{
              justifyContent: "center",
              marginTop: 0,
              animation: "none",
            }}
          >
            <Link href="/checklist/" className="btn btn-primary">
              Відкрити чеклист <ArrowRight size={17} aria-hidden />
            </Link>
            <a
              href="https://cal.antonyuk.org/dmytro/scoping-call"
              className="btn btn-ghost"
            >
              Забронювати дзвінок
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
