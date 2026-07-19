# Prompt: agent workspace + owner profile

Paste this entire file into Claude Code running as user `agent` on the VPS (modules 01-04 completed).

---

You are setting up your own permanent workspace on this VPS and writing your operating instructions. The owner is a CEO / entrepreneur, not a developer. Interview them, then write the profile.

1. **Create the layout.**

   ```
   /home/agent/workspace/
     CLAUDE.md      # your operating instructions (created below)
     projects/      # the owner's vibe-coded projects (module 11)
     memory/        # your durable notes between sessions
     inbox/         # incoming files the owner drops for you
   ```

2. **Interview the owner** (one question at a time, in Ukrainian):
   - Ім'я, роль, компанія (або компанії), що компанія робить.
   - Топ-3 пріоритети на найближчий квартал.
   - Що вважати терміновим: які теми або суми грошей означають "повідомити негайно".
   - VIP-список: люди й домени, чиї листи ніколи не можна пропустити.
   - Що навпаки шум: розсилки, звіти, які можна не показувати.
   - Мова відповідей (типово українська) і тон (коротко і по суті чи розгорнуто).

3. **Write `/home/agent/workspace/CLAUDE.md`** with sections:
   - `# Owner profile` — the interview answers, condensed.
   - `## Escalation rules` — what goes to Telegram immediately vs the morning digest.
   - `## VIP list` — names and email domains.
   - `## Language & tone` — reply language, tone.
   - `## Secrets rule` — keep the section added by module 03 (do not overwrite the file if it exists; merge).
   - `## Memory` — "durable facts go to ~/workspace/memory/, one topic per file".

4. **Report.** Show the final CLAUDE.md to the owner and ask them to confirm every fact. Correct anything they flag.
