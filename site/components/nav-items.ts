import type { LucideIcon } from "lucide-react";
import {
  BookMarked,
  BookOpenText,
  CalendarCheck,
  Github,
  House,
  ListChecks,
  Terminal,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  external?: boolean;
};

export type NavGroup = { id: string; label: string; items: NavItem[] };

export const HOME: NavItem = { href: "/", label: "Огляд", icon: House };

export const NAV_GROUPS: NavGroup[] = [
  {
    id: "kit",
    label: "Кіт",
    items: [
      { href: "/checklist/", label: "Чеклист", icon: ListChecks },
      { href: "/docs/", label: "Документація", icon: BookOpenText },
      { href: "/prompts/", label: "Промпти", icon: Terminal },
      { href: "/glossary/", label: "Глосарій", icon: BookMarked },
    ],
  },
  {
    id: "links",
    label: "Посилання",
    items: [
      {
        href: "https://github.com/borntojesus/ceo-agent-kit",
        label: "GitHub",
        icon: Github,
        external: true,
      },
      {
        href: "https://github.com/borntojesus/claude-kit",
        label: "claude-kit",
        icon: Github,
        external: true,
      },
      {
        href: "https://cal.antonyuk.org/dmytro/scoping-call",
        label: "Дзвінок",
        icon: CalendarCheck,
        external: true,
      },
    ],
  },
];

export const NAV: NavItem[] = [HOME, ...NAV_GROUPS.flatMap((g) => g.items)];

export function findTrail(pathname: string): {
  group?: NavGroup;
  item?: NavItem;
} {
  if (pathname === "/") return { item: HOME };
  for (const g of NAV_GROUPS)
    for (const it of g.items) {
      if (it.external) continue;
      const base = it.href.replace(/\/$/, "");
      if (
        pathname === it.href ||
        pathname === base ||
        pathname.startsWith(base + "/")
      )
        return { group: g, item: it };
    }
  return {};
}
