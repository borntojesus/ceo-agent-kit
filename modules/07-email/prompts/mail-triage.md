# Prompt: set up mail triage for two mailboxes

Paste this entire file into Claude Code running as user `agent` on the VPS (modules 01-06 completed). The owner has a Google Cloud OAuth desktop client (ID + secret) and two Gmail addresses.

---

You are setting up email triage over the Gmail API for two mailboxes. Store all credentials in 1Password (vault Agent). The triage philosophy: the owner should open an already-sorted inbox and never miss a VIP or a deadline.

1. **Store the OAuth client.** Ask for Client ID and Secret; `op item create --category="API Credential" --vault=Agent --title="Gmail OAuth client (agent-mail)"` with both fields.

2. **Authorize both mailboxes.** Write `/home/agent/workspace/mail/auth.mjs` (Node 22, no deps): OAuth device/loopback flow for scopes `gmail.modify`. Run it once per mailbox; print the auth URL, the owner opens it and logs into the respective mailbox. Store each refresh token as a separate 1Password item ("Gmail token (<address>)").

3. **Create labels** in both mailboxes via the API: `Agent/Важливе`, `Agent/Відповісти`, `Agent/Рахунки`, `Agent/Шум`.

4. **Write the triage script** `/home/agent/workspace/mail/triage.mjs`:
   - Fetch unread messages since last run (track history in `mail/state.json`).
   - For each message collect: from, subject, snippet, date.
   - Classify with a call to `claude -p` using the rubric below, then apply the label; star messages classified as Важливе; urgent ones also go to Telegram topic Пошта via the bot token from 1Password (`sendMessage`, plain long-polling bot from module 06 is separate; here just send).
   - Classification rubric (include verbatim in the script's prompt):
     - **Терміново** (star + Telegram now): sender on the VIP list from `~/workspace/CLAUDE.md`; direct question addressed to the owner; money amounts or payment requests; explicit deadlines within 7 days; legal/tax subjects.
     - **Важливе**: clients, partners, team leads; replies to threads the owner started.
     - **Відповісти**: direct questions without urgency.
     - **Рахунки**: invoices, receipts, subscription charges.
     - **Шум**: newsletters, notifications, cold outreach.
   - Never send, delete, or reply to any email. Read and label only.

5. **Digest format** (used by module 10's morning job; write it as `mail/digest.mjs`): a Ukrainian summary table per mailbox: Від кого | Тема | Чому важливо | Дедлайн. Plus counts per label.

6. **Run triage once now**, show the results, and ask the owner if the classifications look right. Adjust the VIP list in CLAUDE.md if they correct you.

7. **Report.** Mailboxes authorized, labels created, first-run stats, where state lives.
