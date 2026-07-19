# Prompt: harden the host, install Proxmox, create the agent container

Paste this entire file into Claude Code running as root on a fresh Debian 12 Hetzner CX33. Work step by step, verify each step, ask before anything destructive.

---

You are turning this fresh Debian 12 VPS into a small Proxmox node that will host a private AI agent in one LXC container and future services in others.

1. **Harden the host first.**
   - `apt update && apt full-upgrade -y`.
   - SSH: `PasswordAuthentication no`, `PermitRootLogin prohibit-password` (key stays); validate with `sshd -t`, restart ssh, do NOT close the current session.
   - Install and enable `fail2ban` (sshd jail) and `unattended-upgrades`.
   - Base tools: `apt install -y curl git tmux jq ripgrep unzip`.

2. **Install Proxmox VE on top of Debian 12** (official supported path):
   - Set a proper FQDN in `/etc/hosts` (e.g. `agent-host.local`) mapped to the public IP.
   - Add the Proxmox VE no-subscription repository and key per the official pve wiki instructions for Debian 12 (Proxmox VE 8.x).
   - `apt install proxmox-ve postfix open-iscsi` (postfix: local only). Remove the enterprise repo file and `pve-enterprise` warnings; keep no-subscription repo.
   - Set a strong root password for the Proxmox web UI (`passwd`); show it ONCE to the owner and tell them to store it in 1Password immediately.
   - Reboot into the Proxmox kernel. Reconnect and verify: `pveversion`.

3. **Firewall on the host.** Proxmox web UI (8006) and everything else must NOT be public:
   - `ufw default deny incoming; ufw allow OpenSSH; ufw enable` (temporary: OpenSSH stays open only until module 02 closes it in favor of Tailscale).
   - Do NOT open 8006 publicly. It becomes reachable only через Tailscale in module 02.

4. **Internal network for containers.**
   - Create bridge `vmbr1` with a private subnet `10.10.10.1/24` and NAT to the public interface (iptables MASQUERADE, persist via `/etc/network/interfaces` post-up rules).
   - Containers get static IPs from `10.10.10.0/24`; the host is their gateway.

5. **Create the agent container.**
   - Download the Ubuntu 24.04 LXC template (`pveam update && pveam download local ubuntu-24.04-standard...`).
   - `pct create 100` name `agent`, 3 GB RAM, 2 cores, 25 GB disk, net0 on vmbr1 with IP `10.10.10.100/24`, gateway `10.10.10.1`, unprivileged, features `nesting=1` (needed for some tools), onboot 1.
   - Inside CT 100: create user `agent` with passwordless sudo, copy the host's authorized_keys, install the same base tools + Node 22 (NodeSource), install Claude Code.
   - SSH into the CT is via the internal net; after module 02 the owner reaches it through Tailscale.

6. **Reserve the map for future services.** Write `/root/SERVICES.md` on the host: table of CTs (100 agent, 110 search «reserved», 120+ free), the bridge subnet, and the rule «кожен новий сервіс = новий контейнер, ніколи не в agent».

7. **Report.** Table: pveversion, ufw state, bridge config, CT 100 status (`pct list`), what login goes where. Remind the owner: наступний модуль (Tailscale) сховає і хост, і контейнери від інтернету; Proxmox веб-інтерфейс стане доступний за адресою `https://agent-host:8006` тільки з ваших пристроїв.
