import type { Metadata } from "next";
import { Piazzolla, Golos_Text, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import {
  BookOpenText,
  CalendarCheck,
  Github,
  ListChecks,
  Terminal,
} from "lucide-react";
import "./globals.css";

const piazzolla = Piazzolla({
  subsets: ["latin", "cyrillic"],
  variable: "--piazzolla",
});
const golos = Golos_Text({
  subsets: ["latin", "cyrillic"],
  variable: "--golos",
});
const jbmono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--jbmono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-kit.antonyuk.org"),
  title: "CEO Agent Kit: приватний AI-агент для керівника",
  description:
    "Розгорніть власного приватного AI-агента на своєму сервері за 14 модулів. Для CEO, підприємців та C-level. Документація, промпти для Claude Code, глосарій.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2242%22 fill=%22%234fd9a2%22/></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="uk"
      className={`${piazzolla.variable} ${golos.variable} ${jbmono.variable}`}
    >
      <body>
        <header className="topbar">
          <div className="topbar-in">
            <Link href="/" className="wordmark">
              <span className="dot" aria-hidden />
              CEO Agent Kit
            </Link>
            <nav className="nav" aria-label="Головна навігація">
              <Link href="/checklist/">
                <ListChecks size={16} aria-hidden />
                <span>Чеклист</span>
              </Link>
              <Link href="/docs/">
                <BookOpenText size={16} aria-hidden />
                <span>Документація</span>
              </Link>
              <Link href="/prompts/">
                <Terminal size={16} aria-hidden />
                <span>Промпти</span>
              </Link>
              <Link href="/glossary/">
                <BookOpenText size={16} aria-hidden />
                <span>Глосарій</span>
              </Link>
              <a
                href="https://github.com/borntojesus/ceo-agent-kit"
                aria-label="GitHub"
              >
                <Github size={16} aria-hidden />
                <span>GitHub</span>
              </a>
              <Link href="/checklist/" className="cta">
                Почати
              </Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="footer">
          <div className="wrap">
            <span>CEO Agent Kit</span>
            <a href="https://github.com/borntojesus/ceo-agent-kit">GitHub</a>
            <a href="https://github.com/borntojesus/claude-kit">claude-kit</a>
            <a href="https://antonyuk.org">Дмитро Антонюк</a>
            <a href="https://cal.antonyuk.org/dmytro/scoping-call">
              <CalendarCheck
                size={14}
                aria-hidden
                style={{ verticalAlign: "-2px", marginRight: 6 }}
              />
              Забронювати дзвінок
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
