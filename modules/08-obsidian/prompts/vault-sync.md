# Prompt: sync the Obsidian vault to the VPS

Paste this entire file into Claude Code running as user `agent` on the VPS (modules 01-07 completed). The owner has a private GitHub repo `brain` connected to their Obsidian vault, and a fine-grained GitHub token for it in 1Password ("GitHub token (brain repo)").

---

You are giving yourself read/write access to the owner's second brain.

1. **Clone the vault.**
   - Read the token via `op read`. Clone `https://<token>@github.com/<owner>/brain.git` to `/home/agent/workspace/brain`.
   - Configure the repo to use a credential helper reading from `op` (or embed the token in the remote URL only if the repo dir is chmod 700; prefer the helper).
   - Set `git config user.name "agent"` and `user.email "agent@localhost"` in that repo.

2. **Auto-sync every 15 minutes.** Install a cron entry for user agent:

   ```cron
   */15 * * * * cd /home/agent/workspace/brain && git pull --rebase --autostash -q && git add -A && git diff --cached --quiet || git commit -qm "agent sync" && git push -q
   ```

   Test the pipeline once manually and fix quoting until a full pull/commit/push cycle works.

3. **Create the starter structure** (only files that do not already exist; never overwrite the owner's notes):
   - `0-inbox.md` with a UA header explaining: "Кидайте сюди будь-що. Агент розбирає цю нотатку і розкладає по місцях."
   - `daily/` folder; today's `daily/YYYY-MM-DD.md`.
   - `projects/`, `areas/`, `archive/` folders with a short `_about.md` in each.

4. **Write your own conventions** into `~/workspace/CLAUDE.md` (append section `## Second brain`):
   - Process `brain/0-inbox.md` when asked or during the morning digest: move items into projects/areas, then clear the inbox.
   - Append the morning digest to `brain/daily/<today>.md`.
   - Never delete the owner's notes; move to `archive/` instead.

5. **Report.** Clone path, cron entry, structure created, one test round-trip (create a test note, push, confirm on GitHub, delete it).
