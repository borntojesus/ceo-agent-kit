# Master bootstrap: set up the entire CEO Agent Kit

Paste this entire file into Claude Code running on the OWNER'S PERSONAL COMPUTER (Windows PowerShell or macOS Terminal). One prompt drives the whole setup: modules 00-13 of https://github.com/borntojesus/ceo-agent-kit.

---

You are setting up a private AI chief-of-staff for the owner, end to end. The owner is a CEO, not a developer: they pay, click consent buttons, and answer your questions in Ukrainian. Everything else is your job. Speak Ukrainian to the owner at all times; keep commands and files in English.

## Operating rules

- **Drive, don't instruct.** Run commands yourself whenever possible. Only ask the owner to act when a human is genuinely required: payments, logins, OAuth consents, clicking links, physical devices.
- **State file.** Keep progress in `~/ceo-agent-kit-setup.md` (create on first run): a checklist of modules 00-13 with status and key facts (server IP, tailnet name, chosen domain). Re-read it first on every run; if it exists, greet the owner with a short status and continue from the first unfinished step. Never store secrets in this file.
- **Reference docs.** The canonical instructions live in the repo. When you start a module, fetch its files from
  `https://raw.githubusercontent.com/borntojesus/ceo-agent-kit/main/modules/<NN-slug>/README.md` and `.../prompts/<name>.md`
  and follow the agent-side steps yourself. Module list, in order:
  `00-accounts, 01-hetzner, 02-tailscale, 03-1password, 04-domain-cloudflare, 05-agent-runtime, 06-telegram, 07-email, 08-obsidian, 09-zed, 10-cron, 11-vibe-coding, 12-agents-skills, 13-security-backups`.
- **Safety.** Ask before anything destructive. Never echo secrets into chat or shell history when avoidable; from module 03 onward store every credential in the owner's 1Password vault `Agent` via `op`. Never create public DNS records for the agent server. Never send emails or money.
- **One module at a time.** Finish, verify per the module's «Перевірка» section, update the state file, report in one short paragraph, then move on.

## Phase 0: this computer

1. Detect the OS and shell (Windows PowerShell vs macOS).
2. Verify tools; install what is missing:
   - Windows: check `ssh -V` (OpenSSH client ships with Windows 10+; enable the optional feature if absent), `git --version` (install via `winget install Git.Git` if missing).
   - macOS: check `ssh -V`, `git --version` (trigger Xcode CLT install if missing).
3. Create `~/ceo-agent-kit-setup.md` with the module checklist.

## Phase 1: accounts (module 00)

Fetch module 00 and walk the owner through the table one service at a time: state the price, open the signup URL for them (`start <url>` on Windows, `open <url>` on macOS), wait for «готово». Required before continuing: ChatGPT Plus, Claude (Pro or Max), 1Password, Hetzner, GoDaddy domain, Cloudflare, Tailscale, Vercel, GitHub, Telegram. Record confirmations in the state file.

## Phase 2: server (modules 01-02)

1. Generate an SSH key if `~/.ssh/id_ed25519` does not exist (`ssh-keygen -t ed25519 -N ""`). Show the public key.
2. Guide the owner through Hetzner Console: project `agent`, server CX33, Ubuntu 24.04, Nuremberg or Helsinki, paste the public key, name `agent-1`. Ask for the resulting IP; save it to the state file.
3. From now on execute remote steps yourself over SSH (`ssh root@IP '<command>'`), non-interactively. Perform module 01's harden-vps work: user `agent` with passwordless sudo and your key, SSH lockdown, ufw, unattended-upgrades, fail2ban, base tooling, Node 22. Verify `ssh agent@IP` works.
4. Module 02: install Tailscale on the server, run `tailscale up --ssh`, give the owner the auth link, wait for confirmation. Ask the owner to install Tailscale on this computer and phone too, and log in. Verify `ssh agent@agent-1` works from here, THEN close public SSH (ufw delete allow OpenSSH). All later SSH goes via the tailnet name.

## Phase 3: foundations (modules 03-04)

- Module 03: owner creates vault `Agent` and a service account in the 1Password web UI (open the URL for them); install `op` on the server; the owner pastes the token directly into a file over an editor you open for them via ssh, mode 600; smoke-test; write the secrets convention into the server's `~/workspace/CLAUDE.md`.
- Module 04: owner adds the GoDaddy domain to Cloudflare (open both dashboards, dictate the NS change per the module); owner creates the scoped DNS token; store it via `op`; verify zone access with the API. Hard rule: no DNS records for the agent server, ever.

## Phase 4: the agent itself (modules 05-06)

- Module 05: install Claude Code and Codex CLI on the server under user `agent`. Subscription logins are interactive: open an SSH session in tmux for the owner (tell them exactly what to type: `claude`, then `codex`), wait until both are logged in. Then create the workspace layout and run the owner-profile interview from `agent-workspace.md` yourself, writing the server's CLAUDE.md.
- Module 06: owner creates the bot via @BotFather, the forum group, 4 topics (Вхідні, Пошта, Проєкти, Звіти), adds the bot as admin. Store the token via `op`. Build and install the long-polling bridge and systemd unit per `telegram-bridge.md`, running the build on the server over SSH. Test: owner sends «тест» in Вхідні, bot answers. Reboot the server once and re-test.

## Phase 5: daily value (modules 07-10)

Execute each module's prompt-work on the server over SSH, in order:

- 07: Gmail OAuth client (owner clicks in Google Cloud Console with your navigation), authorize BOTH mailboxes, seven labels, triage + manage scripts, first run reviewed by the owner.
- 08: owner installs Obsidian and creates the private `brain` repo (open URLs, dictate); clone to the server, 15-minute git sync cron, starter structure, conventions.
- 09: owner installs Zed; help them add the SSH remote to `agent@agent-1`. This module is owner-side only; just verify it opens.
- 10: install the three cron jobs (timezone first, ask the owner), run the morning digest once so they see it in Звіти.

## Phase 6: projects and hardening (modules 11-13)

- 11: owner creates Vercel + Supabase accounts and three tokens (navigate them); store via `op`; verify CLIs on the server; offer to vibe-code a test page on a subdomain as the check.
- 12: on the server, install claude-kit via the plugin marketplace commands from the module; restart the VPS Claude Code session.
- 13: owner creates the private `agent-state` repo; set up the nightly backup with the secret-pattern guard, run it once, then produce the full security audit table for the owner.

## Finish

Update the state file to «все готово», then give the owner a closing summary in Ukrainian: what lives where, the five Telegram commands to try first, where backups go, and the rule that the server has zero public ports. Remind them: чеклист на https://ai-kit.antonyuk.org/checklist можна відмітити повністю.
