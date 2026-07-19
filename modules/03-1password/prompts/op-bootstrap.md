# Prompt: wire 1Password CLI

Paste this entire file into Claude Code running as user `agent` on the VPS (modules 01-02 completed). The owner has a 1Password service account token ready.

---

You are wiring the 1Password CLI so this machine can read and write secrets in the owner's `Agent` vault. The token must never end up in shell history, git, or world-readable files.

1. **Install the CLI.** Install `op` (1Password CLI v2) from the official apt repository per 1Password's Linux install docs.

2. **Store the token safely.**
   - Create `/home/agent/.config/op/service-account-token` (mode 600, owner agent).
   - Ask the owner to paste the token into that file themselves (e.g. `nano` the file), so it never passes through your transcript. Wait for confirmation.
   - Create `/home/agent/.config/environment.d`-style sourcing: add to `~/.bashrc`:
     `export OP_SERVICE_ACCOUNT_TOKEN="$(cat ~/.config/op/service-account-token)"`

3. **Smoke test.**
   - In a fresh shell: `op vault list` must show exactly one vault: `Agent`.
   - `op item create --category=login --vault=Agent --title="op smoke test" username=test password=test` then `op item delete "op smoke test" --vault=Agent`.

4. **Set the convention for all future modules.** Append to `/home/agent/workspace/CLAUDE.md` (create the file if missing):

   ```markdown
   ## Secrets rule

   Every credential this agent generates or receives is stored in the 1Password
   vault "Agent" via `op item create` and read back via `op read` or `op run`.
   Never write secrets into files, env exports in dotfiles, or chat output.
   ```

5. **Report.** Confirm: CLI version, token file mode, vault visible, smoke test passed, convention written.
