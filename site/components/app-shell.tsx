"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import {
  findTrail,
  HOME,
  NAV,
  NAV_GROUPS,
  type NavItem,
} from "@/components/nav-items";

const cn = (...a: Array<string | false | undefined>) =>
  a.filter(Boolean).join(" ");

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const trail = findTrail(pathname);

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>(
    NAV_GROUPS.map((g) => g.id),
  );

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem("nav-collapsed") === "1");
      const raw = localStorage.getItem("nav-groups");
      if (raw) setOpenGroups(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("nav-collapsed", collapsed ? "1" : "0");
    } catch {}
  }, [collapsed]);
  useEffect(() => {
    try {
      localStorage.setItem("nav-groups", JSON.stringify(openGroups));
    } catch {}
  }, [openGroups]);
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const toggleGroup = (id: string) =>
    setOpenGroups((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
    );

  const isActive = (item: NavItem) => {
    if (item.external) return false;
    if (item.href === "/") return pathname === "/";
    const base = item.href.replace(/\/$/, "");
    return (
      pathname === item.href ||
      pathname === base ||
      pathname.startsWith(base + "/")
    );
  };

  function navLink(item: NavItem, compact: boolean, onNav?: () => void) {
    const active = isActive(item);
    const cls = cn("sb-link", compact && "compact", active && "active");
    const inner = (
      <>
        <item.icon size={17} aria-hidden />
        {!compact && <span>{item.label}</span>}
      </>
    );
    if (item.external)
      return (
        <a
          key={item.href}
          href={item.href}
          className={cls}
          title={compact ? item.label : undefined}
        >
          {inner}
        </a>
      );
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onNav}
        className={cls}
        title={compact ? item.label : undefined}
        aria-current={active ? "page" : undefined}
      >
        {inner}
      </Link>
    );
  }

  const expandedNav = (onNav?: () => void) => (
    <nav className="sb-nav">
      {navLink(HOME, false, onNav)}
      {NAV_GROUPS.map((g) => {
        const open = openGroups.includes(g.id);
        return (
          <div key={g.id} className="sb-group">
            <button
              type="button"
              onClick={() => toggleGroup(g.id)}
              aria-expanded={open}
              className="sb-group-btn"
            >
              {g.label}
              <ChevronDown
                size={14}
                aria-hidden
                className={cn("sb-chev", open && "open")}
              />
            </button>
            {open && (
              <div className="sb-group-items">
                {g.items.map((it) => navLink(it, false, onNav))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  const railNav = () => (
    <nav className="sb-nav rail">{NAV.map((it) => navLink(it, true))}</nav>
  );

  return (
    <div className="shell">
      {/* Desktop sidebar */}
      <aside className={cn("sidebar", collapsed && "collapsed")}>
        <Link href="/" className="sb-brand" title="CEO Agent Kit">
          <span className="dot" aria-hidden />
          {!collapsed && <span className="sb-brand-name">CEO Agent Kit</span>}
        </Link>
        {collapsed ? railNav() : expandedNav()}
        <div className="sb-foot">
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Розгорнути меню" : "Згорнути меню"}
            className="sb-collapse"
          >
            {collapsed ? (
              <PanelLeftOpen size={17} aria-hidden />
            ) : (
              <>
                <PanelLeftClose size={17} aria-hidden />
                <span>Згорнути</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="drawer">
          <div
            className="drawer-scrim"
            aria-hidden
            onClick={() => setMobileOpen(false)}
          />
          <aside className="drawer-panel">
            <div className="drawer-head">
              <span className="sb-brand-name">CEO Agent Kit</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Закрити меню"
                className="drawer-x"
              >
                <X size={19} aria-hidden />
              </button>
            </div>
            {expandedNav(() => setMobileOpen(false))}
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="shell-main">
        <header className="shell-top">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Відкрити меню"
            className="burger"
          >
            <Menu size={19} aria-hidden />
          </button>
          <nav aria-label="Breadcrumb" className="crumbs-top">
            {trail.group && (
              <>
                <span>{trail.group.label}</span>
                <span aria-hidden className="sep">
                  /
                </span>
              </>
            )}
            <b>{trail.item?.label ?? "Огляд"}</b>
          </nav>
          <ThemeToggle />
          <Link href="/checklist/" className="top-cta">
            Почати
          </Link>
        </header>
        {children}
      </div>
    </div>
  );
}
