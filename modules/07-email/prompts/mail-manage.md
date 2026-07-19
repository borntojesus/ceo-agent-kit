# Prompt: email management (inbox zero, drafts, unsubscribe, Telegram commands)

Paste this entire file into Claude Code running as user `agent` on the VPS, AFTER mail-triage.md is set up and the owner has confirmed the sorting looks right.

---

You are upgrading email from "sorted" to "managed". Hard safety rules, non-negotiable, repeat them in your report:

- **Never send email.** You create drafts in the Gmail Drafts folder; only the owner presses Send.
- **Never delete email.** Archive only; everything stays searchable.
- **Unsubscribe only via the List-Unsubscribe header** (RFC 8058 one-click POST or mailto variant), and only after the owner confirms in Telegram. Never follow "unsubscribe" links from the message body: they can be trackers or phishing.

1. **Inbox zero sweep.** Extend `mail/triage.mjs`: after a message is labeled, archive it (remove INBOX) for every folder except `Agent/Важливе` and `Agent/Відповісти`, which stay in the inbox until handled. Add a `mail/rules.md` override list for senders the owner wants to keep in the inbox regardless.

2. **Draft replies.** For every message labeled `Agent/Відповісти`: generate a reply draft via `claude -p` using the owner's profile and tone from `~/workspace/CLAUDE.md` (Ukrainian or the sender's language), create it as a Gmail draft attached to the thread, and post a two-line summary + the draft text into Telegram topic Пошта. The owner edits and sends from Gmail, or replies in Telegram "перепиши коротше/інакше" and you update the draft.

3. **Weekly newsletter digest.** Sunday 18:00 cron: collect the week's `Agent/Розсилки`, summarize into one Ukrainian digest (3-5 bullets per newsletter worth reading, the rest as one line each), post to Telegram topic Звіти and append to the vault daily note.

4. **Monthly unsubscribe review.** First Saturday cron: list senders in `Agent/Розсилки` and `Agent/Холодне` whose messages the owner has not opened in 60 days (use message read state), post the list to Telegram as numbered candidates. On the owner's confirmation ("відпишись від 1, 3, 5"), unsubscribe via List-Unsubscribe header only, and add the sender to the always-archive rule as a fallback.

5. **Telegram commands.** Extend the bridge conventions (append to `~/workspace/CLAUDE.md`, section `## Email commands`): in topic Пошта you respond to natural-language commands, including:
   - "що нового" → unread summary across both mailboxes, grouped by folder;
   - "драфт відповіді на лист від <name>" → find the thread, create a draft, show the text;
   - "знайди лист про <topic>" → Gmail search across both mailboxes, top 5 results with dates;
   - "відпишись від <sender>" → the safe unsubscribe flow from step 4;
   - "додай <name/domain> у VIP" / "прибери з VIP" → edit `mail/rules.md` immediately and confirm;
   - "заархівуй все з <sender>" → bulk archive + add an always-archive rule.

6. **Invoice folder for the accountant.** For every `Agent/Рахунки` message with a PDF attachment: save the file to `~/workspace/inbox/invoices/YYYY-MM/` and append a line (date, sender, amount if parseable) to `~/workspace/inbox/invoices/YYYY-MM/log.md`. Monthly cron posts "рахунки за місяць зібрані, тека готова для бухгалтера" with the count and total.

7. **Test end-to-end** with the owner: one draft reply, one "що нового", one archive command. Fix until all three work.

8. **Report.** What changed vs triage-only, the cron entries added, the safety rules restated, and one line telling the owner: інбокс тепер порожніється сам; важливе і відповіді чекають на вас, решта по папках.
