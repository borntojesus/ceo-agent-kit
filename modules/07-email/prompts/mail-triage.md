# Prompt: connect two mailboxes and set up sorting

Paste this entire file into Claude Code running as user `agent` on the VPS (modules 01-06 completed). The owner has a Google Cloud OAuth desktop client (ID + secret) and two Gmail addresses.

---

You are setting up email sorting over the Gmail API for two mailboxes. Store all credentials in 1Password (vault Agent). Philosophy: every incoming message lands in exactly one folder; the owner opens an already-sorted mailbox and never misses a VIP or a deadline.

1. **Store the OAuth client.** Ask for Client ID and Secret; `op item create --category="API Credential" --vault=Agent --title="Gmail OAuth client (agent-mail)"` with both fields.

2. **Authorize both mailboxes.** Write `/home/agent/workspace/mail/auth.mjs` (Node 22, no deps): OAuth loopback flow for scope `gmail.modify`. Run it once per mailbox; print the auth URL, the owner opens it and logs into the respective mailbox. Store each refresh token as a separate 1Password item ("Gmail token (<address>)").

3. **Create the seven labels** in both mailboxes via the API:
   `Agent/Важливе`, `Agent/Відповісти`, `Agent/Рахунки`, `Agent/Розсилки`, `Agent/Сповіщення`, `Agent/Холодне`, `Agent/Шум`.

4. **Learn the owner's rules.** Interview the owner (in Ukrainian) and write the answers to `/home/agent/workspace/mail/rules.md`:
   - VIP list: names + email domains that always land in Важливе (merge with the VIP list already in `~/workspace/CLAUDE.md`).
   - Money threshold: from what amount a payment request is urgent.
   - Newsletters they actually read (these skip the weekly digest and stay visible).
   - Senders to always archive silently.
     `rules.md` is the single source of truth for classification; every later run re-reads it.

5. **Write the triage script** `/home/agent/workspace/mail/triage.mjs`:
   - Fetch messages since last run (track history id in `mail/state.json`).
   - For each message collect: from, subject, snippet, List-Unsubscribe header presence.
   - Classify with a call to `claude -p` using `rules.md` plus this rubric, then apply exactly one Agent/\* label:
     - **Важливе** (star + Telegram topic Пошта immediately): VIP match; direct question from a client/partner/investor; money above the threshold; explicit deadline within 7 days; legal/tax subjects.
     - **Відповісти**: direct questions to the owner without urgency.
     - **Рахунки**: invoices, receipts, subscription charges.
     - **Розсилки**: newsletters and digests (List-Unsubscribe header is a strong signal).
     - **Сповіщення**: automated service and social notifications.
     - **Холодне**: unsolicited outreach and sales pitches.
     - **Шум**: everything else.
   - Never send, never delete. Read and label only (archiving comes in mail-manage.md).

6. **Digest builder** `mail/digest.mjs` (used by module 10's morning job): per mailbox a Ukrainian table: Від кого | Тема | Чому важливо | Дедлайн; plus counts per folder and the invoices total for the week.

7. **Run triage once now**, show the results per folder, and ask the owner if the classifications look right. Move anything they correct AND append the correction as a rule to `rules.md` so it sticks.

8. **Report.** Mailboxes authorized, labels created, first-run stats per folder, where rules and state live.
