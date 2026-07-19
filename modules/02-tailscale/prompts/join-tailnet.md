# Prompt: join tailnet and close public access (Proxmox host)

Paste this entire file into Claude Code running as root on the Proxmox host (module 01 completed). The owner is present and can click auth links.

---

You are putting the Proxmox host into the owner's Tailscale tailnet, publishing the internal container network through it, and removing all public exposure. Work step by step.

1. **Install Tailscale on the host.**
   - `curl -fsSL https://tailscale.com/install.sh | sh`
   - Enable IP forwarding (`net.ipv4.ip_forward=1` persisted) — required for subnet routing.

2. **Join with SSH and the container subnet advertised.**
   - `tailscale up --ssh --advertise-routes=10.10.10.0/24`
   - Print the auth URL; the owner opens it and approves the device. Then tell them: у [консолі Tailscale](https://login.tailscale.com/admin/machines) відкрийте машину `agent-host` → Edit route settings → увімкніть маршрут `10.10.10.0/24`. Wait for confirmation.
   - Verify: `tailscale status`, note the MagicDNS name.

3. **Verify everything works through the tailnet BEFORE closing anything.** Ask the owner to check from their laptop:
   - `ssh root@agent-host` connects;
   - `https://agent-host:8006` opens the Proxmox web UI (self-signed certificate warning is expected, accept it);
   - `ssh agent@10.10.10.100` reaches the agent container.
     Do not proceed until all three are confirmed.

4. **Close public SSH.**
   - `ufw delete allow OpenSSH && ufw reload`

5. **Prove there is no public surface.**
   - `ufw status verbose`: no allow rules for incoming.
   - `ss -tlnp`: every listener bound to localhost, vmbr1, or tailscale0; nothing on the public interface. Explain each line to the owner.

6. **Report.** Tailnet name, MagicDNS hostname, subnet route status, what is reachable from the owner's devices (host SSH, Proxmox UI :8006, agent container, майбутні контейнери 10.10.10.x), and the reminder: заходьте на сервер тільки як `ssh root@agent-host`, в агента як `ssh agent@10.10.10.100`.
