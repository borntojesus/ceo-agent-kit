# Prompt: harden this VPS

Paste this entire file into Claude Code running as root on a fresh Ubuntu 24.04 Hetzner VPS.

---

You are configuring a fresh Ubuntu 24.04 VPS that will host a private AI agent. Work step by step, verify each step, and finish with a summary report. Ask before anything destructive.

1. **Create the working user.**
   - Create user `agent` with a home directory and bash shell.
   - Add `agent` to the `sudo` group with passwordless sudo (`/etc/sudoers.d/agent`, mode 0440).
   - Copy `/root/.ssh/authorized_keys` to `/home/agent/.ssh/authorized_keys` with correct ownership (agent:agent) and modes (700 on `.ssh`, 600 on the file).
   - Create `/home/agent/workspace` owned by agent.

2. **Lock down SSH.** Edit `/etc/ssh/sshd_config` (or a drop-in in `sshd_config.d`):
   - `PasswordAuthentication no`
   - `PermitRootLogin prohibit-password`
   - Validate with `sshd -t`, then restart ssh. Do NOT close the current session.

3. **Firewall.**
   - `ufw default deny incoming`, `ufw default allow outgoing`, `ufw allow OpenSSH`, then enable it non-interactively.

4. **Automatic security updates.**
   - Install `unattended-upgrades` and enable it (`dpkg-reconfigure -f noninteractive unattended-upgrades` or write the auto-upgrades config directly).

5. **fail2ban.**
   - Install `fail2ban`, enable the sshd jail with defaults, start the service.

6. **Base tooling for later modules.**
   - `apt install -y git curl tmux jq ripgrep unzip`
   - Install Node.js 22 from NodeSource.

7. **Report.** Print a summary table: user created, SSH settings, ufw status (`ufw status verbose`), fail2ban status, unattended-upgrades status, node --version. List anything that failed.

Important: after this prompt the human will reconnect as `agent@server`. Make sure that login works before finishing (verify the authorized_keys copy).
