# Prompt: join tailnet and close public access

Paste this entire file into Claude Code running as user `agent` on the VPS (module 01 completed).

---

You are putting this VPS into the owner's Tailscale tailnet and removing all public network exposure. The owner is present and can click auth links. Work step by step.

1. **Install Tailscale.**
   - `curl -fsSL https://tailscale.com/install.sh | sh`

2. **Join the tailnet with Tailscale SSH enabled.**
   - Run `sudo tailscale up --ssh`.
   - Print the auth URL it produces and tell the owner: "Open this link and approve the device." Wait for confirmation.
   - Verify with `tailscale status` and note the tailnet IP (100.x.y.z) and MagicDNS name.

3. **Verify Tailscale SSH works before closing anything.**
   - Ask the owner to run `ssh agent@<magicdns-name>` from their laptop and confirm it works. Do not proceed until they confirm.

4. **Close public SSH.**
   - `sudo ufw delete allow OpenSSH`
   - `sudo ufw reload`

5. **Prove there is no public surface.**
   - Show `sudo ufw status verbose` (expect: no allow rules for incoming).
   - Show `sudo ss -tlnp` and explain each listener: everything must be bound to localhost, the tailnet interface, or be tailscaled itself.

6. **Report.** Summary: tailnet name and IP, MagicDNS hostname, ufw state, confirmation that the only way in is via the owner's tailnet. Remind the owner: from now on connect with `ssh agent@<magicdns-name>`.
