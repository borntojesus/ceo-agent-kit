export type SignupLink = { label: string; href: string };

/** Quick "create an account here" links per module slug, shown on the checklist. */
export const SIGNUP_LINKS: Record<string, SignupLink[]> = {
  "00-accounts": [
    { label: "ChatGPT · $20", href: "https://chatgpt.com/" },
    { label: "Claude · $20/100", href: "https://claude.ai/" },
    { label: "1Password · $5", href: "https://1password.com/" },
    { label: "Hetzner · CX33", href: "https://www.hetzner.com/" },
    { label: "GoDaddy · домен", href: "https://www.godaddy.com/" },
    { label: "Cloudflare · free", href: "https://www.cloudflare.com/" },
    { label: "Tailscale · free", href: "https://tailscale.com/" },
    { label: "Vercel · free", href: "https://vercel.com/" },
    { label: "GitHub · free", href: "https://github.com/" },
    { label: "Telegram", href: "https://telegram.org/" },
  ],
  "01-hetzner": [
    { label: "Hetzner Console", href: "https://console.hetzner.com/" },
  ],
  "02-tailscale": [
    { label: "Tailscale", href: "https://login.tailscale.com/start" },
    { label: "Завантажити", href: "https://tailscale.com/download" },
  ],
  "03-1password": [
    { label: "1Password", href: "https://1password.com/" },
    {
      label: "Service Account",
      href: "https://my.1password.com/developer-tools/infrastructure-secrets/serviceaccount",
    },
  ],
  "04-domain-cloudflare": [
    { label: "GoDaddy", href: "https://www.godaddy.com/" },
    { label: "Cloudflare", href: "https://dash.cloudflare.com/sign-up" },
    {
      label: "API Tokens",
      href: "https://dash.cloudflare.com/profile/api-tokens",
    },
  ],
  "05-agent-runtime": [
    { label: "Claude Code", href: "https://claude.ai/code" },
    { label: "Codex CLI", href: "https://chatgpt.com/codex" },
  ],
  "06-telegram": [{ label: "@BotFather", href: "https://t.me/BotFather" }],
  "07-email": [
    {
      label: "Google Cloud Console",
      href: "https://console.cloud.google.com/",
    },
  ],
  "08-obsidian": [
    { label: "Obsidian", href: "https://obsidian.md/download" },
    { label: "Нове репо", href: "https://github.com/new" },
  ],
  "09-zed": [{ label: "Zed", href: "https://zed.dev/download" }],
  "11-vibe-coding": [
    { label: "Vercel", href: "https://vercel.com/signup" },
    { label: "Supabase", href: "https://supabase.com/dashboard/sign-up" },
  ],
  "12-agents-skills": [
    { label: "claude-kit", href: "https://github.com/borntojesus/claude-kit" },
  ],
  "13-security-backups": [
    { label: "Нове репо", href: "https://github.com/new" },
  ],
};
