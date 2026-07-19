# Prompt: nightly backups + security audit

Paste this entire file into Claude Code running as user `agent` on the VPS (all previous modules completed). The owner has a private GitHub repo `agent-state` and a token with write access to it.

---

You are making this installation disaster-proof and audit-clean.

1. **Backup script** `/home/agent/workspace/bin/backup.sh`:
   - Init `/home/agent/workspace/state-backup` as a clone of the `agent-state` repo (token via `op read`).
   - Each run copies into it: `~/workspace/CLAUDE.md`, `~/workspace/memory/`, `~/workspace/bridge/state.json` (WITHOUT logs), `~/workspace/mail/state.json`, `~/workspace/cron/*.sh`, crontab dump (`crontab -l`), list of systemd units created by the kit, `ufw status verbose` output, and a `MANIFEST.md` describing the restore order (modules 01→03, then restore files, then re-login subscriptions and OAuth).
   - **Exclude every secret**: no token files, no `~/.config/op`, no OAuth refresh tokens, no `.credentials` from CLIs. Add a guard: grep the staged files for obvious token patterns (`ghp_`, `sk-`, `xoxb`, `ops_`) and abort if found.
   - Commit and push with message `backup <date>`.
   - Cron: `15 3 * * *` for user agent, log to `~/workspace/cron/cron.log`.

2. **Run it once now** and confirm the commit appears on GitHub.

3. **Security audit.** Produce a Ukrainian table for the owner: кожен секрет у сейфі Agent (via `op item list --vault=Agent`): назва, для чого, які права, де використовується. Plus checks:
   - `sudo ufw status verbose`: no public inbound allows.
   - `sudo ss -tlnp`: every listener explained (localhost/tailnet only).
   - `ls -la` on token files: modes 600.
   - fail2ban and unattended-upgrades active.

4. **Report.** Backup repo state, cron entry, audit table, and any finding that needs the owner's action.
