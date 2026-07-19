# Prompt: install the standard cron jobs

Paste this entire file into Claude Code running as user `agent` on the VPS (modules 01-08 completed).

---

You are installing three scheduled jobs for yourself. Each job runs `claude -p` non-interactively from `/home/agent/workspace` and posts results to Telegram via the bot token in 1Password (reuse the send helper from the bridge or write `/home/agent/workspace/bin/tg-send.mjs <topic> <text>` reading topic ids from `bridge/state.json`).

1. **Write the runner scripts** in `/home/agent/workspace/cron/`:
   - `morning-digest.sh`: runs the mail digest (`mail/digest.mjs`), processes `brain/0-inbox.md` (file items into projects/areas per the Second brain convention), reads CLAUDE.md priorities, then composes a Ukrainian digest: Пошта (з таблицею), Інбокс (що розкладено), Пріоритети дня (топ-3). Appends the digest to `brain/daily/<today>.md` and sends it to topic Звіти.
   - `mail-sweep.sh`: runs `mail/triage.mjs`; only urgent items produce Telegram messages (topic Пошта); otherwise silent.
   - `weekly-report.sh`: reviews the week's daily notes and memory, composes: Зроблено, Зависло, На наступний тиждень. Sends to Звіти and saves to `brain/daily/weekly-<ISO week>.md`.

2. **Install the crontab** for user agent (merge with existing entries, do not clobber the brain sync from module 08):

   ```cron
   30 7 * * *  /home/agent/workspace/cron/morning-digest.sh >> /home/agent/workspace/cron/cron.log 2>&1
   0 * * * *   /home/agent/workspace/cron/mail-sweep.sh     >> /home/agent/workspace/cron/cron.log 2>&1
   0 17 * * 5  /home/agent/workspace/cron/weekly-report.sh  >> /home/agent/workspace/cron/cron.log 2>&1
   ```

   Set the system timezone to the owner's timezone first (ask them; e.g. `timedatectl set-timezone Europe/Kyiv`).

3. **Test.** Run `morning-digest.sh` once now; the owner must see the digest in topic Звіти. Fix until it lands.

4. **Report.** Crontab listing, timezone, test result, log location.
