# Prompt: build the Telegram bridge

Paste this entire file into Claude Code running as user `agent` on the VPS (modules 01-05 completed). The owner has created a bot, a forum group with 4 topics, and has the bot token ready.

---

You are building a minimal, dependency-light bridge between a Telegram bot and Claude Code sessions. Design constraints, non-negotiable:

- **Long polling only** (`getUpdates`). No webhook, no listening socket, no public surface.
- One file: `/home/agent/workspace/bridge/bridge.mjs`, Node 22, no npm dependencies (use built-in `fetch`).
- Token comes from 1Password at runtime (`op run` or `op read`), never hardcoded.

Steps:

1. **Store the token.** `op item create --category="API Credential" --vault=Agent --title="Telegram Bot Token (agent)" credential=<token>` — ask the owner to paste the token to you once for this purpose.

2. **Write `bridge.mjs`** with this behavior:
   - Poll `getUpdates` with a 50s timeout loop; track `offset` in `/home/agent/workspace/bridge/state.json`.
   - Ignore updates that are not messages in the configured group (store the group chat id on first message; save to state.json).
   - Map `message_thread_id` (forum topic) → a persistent Claude session: keep `sessions[thread_id] = <claude session id>` in state.json.
   - On each message: run Claude Code non-interactively:
     `claude -p <text> --resume <session_id>` (or start a new session for an unseen topic and record its id). Working directory: `/home/agent/workspace`.
   - Send the reply back with `sendMessage` into the same `message_thread_id`. Split messages over 4000 chars.
   - Errors: reply "Помилка, дивись журнал" and log details to `/home/agent/workspace/bridge/bridge.log`.

3. **systemd unit** `/etc/systemd/system/agent-bridge.service`:
   - `User=agent`, `WorkingDirectory=/home/agent/workspace/bridge`
   - `ExecStart=/usr/bin/op run -- /usr/bin/node bridge.mjs` with `Environment=OP_SERVICE_ACCOUNT_TOKEN=...` sourced via `EnvironmentFile=/home/agent/.config/op/service-account.env` (create that env file, mode 600, from the existing token file).
   - `Restart=always`, `RestartSec=5`, `WantedBy=multi-user.target`.
   - Enable and start it.

4. **Test end-to-end.** Ask the owner to send "тест" into topic Вхідні; confirm the bot replies. Show `systemctl status agent-bridge` and the last log lines.

5. **Report.** Files created, unit status, session map, and a one-line instruction for the owner: each topic is a separate conversation with you.
