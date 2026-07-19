# Prompt: save and group Fathom meeting transcripts in the vault

Paste this entire file into Claude Code running as user `agent` on the VPS, AFTER vault-sync.md and vault-method.md are done. Optional module: requires a Fathom account (free plan works) recording the owner's meetings.

---

You are wiring meeting memory: every recorded meeting lands in the owner's second brain, grouped and linked, so they can ask "що ми вирішили з X на останніх трьох зустрічах" and get a real answer.

1. **Store the API key.** The owner creates a Fathom API key (Fathom → Settings → API). Store it via `op item create --category="API Credential" --vault=Agent --title="Fathom API key (agent)"`.

2. **Write the sync script** `/home/agent/workspace/meetings/fathom-sync.mjs` (Node 22, no deps):
   - Poll the Fathom API for new completed recordings since the last run (track cursor in `meetings/state.json`).
   - For each meeting fetch: title, date, attendees, summary, full transcript, action items.
   - Save to the vault as `brain/meetings/YYYY-MM-DD-<slug>.md` with this structure (Ukrainian headers):

     ```markdown
     # {назва зустрічі}

     Дата: {дата} · Учасники: [[Імʼя Прізвище]], [[...]]
     Проєкт: [[...]] (якщо визначено)

     ## Резюме

     ## Рішення

     ## Домовленості (хто, що, до коли)

     ## Транскрипт

     (повний текст, згорнутий під заголовком)
     ```

3. **Group and link (the important part):**
   - Every attendee becomes a `[[wikilink]]`; ensure a stub note `brain/people/<name>.md` exists (create with one line if missing) so meetings cluster per person automatically via backlinks.
   - Classify the meeting against existing `brain/specs/*` and `brain/projects/*` notes; when confident, add the `Проєкт:` link and append a one-line reference to that spec's «Рішення по дорозі» section.
   - Decisions spotted in the meeting also become `brain/decisions/` notes per the vault-method templates, linked back to the meeting note.
   - Commitments (хто, що, до коли) are appended to the meeting note now; when the commitments module ships they will feed the ledger.

4. **Cron + notification.** Add a cron entry every 30 minutes running the sync; on each new meeting processed, send a short message to Telegram topic Звіти: назва, 3 рядки резюме, лінк-шлях нотатки у vault.

5. **Query behavior.** Append to `~/workspace/CLAUDE.md` (`## Meetings` section): when the owner asks about past meetings, decisions, or what a person said, search `brain/meetings/` and the linked people/spec notes first; answer with dates and quote the relevant transcript lines.

6. **Privacy notes for the report:** transcripts live only in the owner's private vault repo; the Fathom key is read-only for recordings; remind the owner that meeting participants must be informed the call is recorded (EU requirement).

7. **Test:** process at least one past recording end to end, show the resulting note and the Telegram message. Then report: script path, cron entry, how many meetings imported, how grouping worked.
