# Prompt: set up the Karpathy method in the vault

Paste this entire file into Claude Code running as user `agent` on the VPS, AFTER vault-sync.md is done (the vault is cloned at `/home/agent/workspace/brain` and syncing).

---

You are installing a working method into the owner's second brain: spec before work, small verifiable steps, decisions written down and linked. Then you teach yourself to maintain it.

1. **Create the structure** (only what does not exist; never overwrite the owner's notes):

   ```
   brain/
     specs/            # one note per project/goal, from the template below
     decisions/        # one dated note per important decision
     templates/spec.md
     templates/decision.md
   ```

2. **Write `templates/spec.md`** (Ukrainian, this exact structure):

   ```markdown
   # Спека: {назва}

   Дата: {дата} · Статус: чернетка | в роботі | готово

   ## Що робимо і навіщо

   ## Як зрозуміємо, що вийшло

   (перевірювані критерії, 2-4 пункти)

   ## Кроки

   - [ ] маленький крок, який можна перевірити окремо

   ## Рішення по дорозі

   (лінки на нотатки в decisions/)

   ## Звʼязане

   [[...]]
   ```

3. **Write `templates/decision.md`**:

   ```markdown
   # Рішення: {назва}

   Дата: {дата} · Переглянути: {дата+90днів}

   ## Контекст

   ## Варіанти, які розглядали

   ## Що вирішили і чому

   ## Припущення

   (що має бути правдою, щоб рішення лишалось правильним)

   ## Звʼязане

   [[...]]
   ```

4. **Teach yourself the conventions.** Append to `~/workspace/CLAUDE.md`, section `## Second brain method`:
   - «нова спека: X» in Telegram → create `specs/<slug>.md` from the template, interview the owner briefly (in Ukrainian) to fill it, then decompose the goal into small verifiable steps.
   - «рішення: X» or a decision spotted in a meeting debrief / email thread → create `decisions/YYYY-MM-DD-<slug>.md`, link it from the related spec.
   - Every note you create links to related notes with `[[wikilinks]]`; prefer linking to creating duplicates.
   - Morning digest includes: open spec steps due, decisions whose review date arrived («вирішили X 90 днів тому, припускаючи Y: ще правда?»).
   - When a spec's steps are all done, ask the owner whether to mark it готово and write a 3-line outcome summary into the spec.

5. **Wire the review cron.** Add to the morning digest script a check over `decisions/*`: parse `Переглянути:` dates, surface due ones in the digest.

6. **Test with the owner:** they send «нова спека: тест методу» in Telegram; walk the flow end to end; show the resulting note. Then create one demo decision note and show how the review reminder will look.

7. **Report.** Structure created, conventions written, cron updated, test passed. One line to the owner: тепер кожна велика справа починається зі спеки, а рішення не зникають.
