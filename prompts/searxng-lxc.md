# Prompt: SearXNG container + the kit search stack

Paste this entire file into Claude Code as root on the Proxmox host (modules 01-02 completed). Optional but recommended service: the agent's own private web search, plus wiring of the full search stack (Tavily primary for research, SearXNG private default, Serper fallback).

---

You are adding the first extra service to the Proxmox node: a private SearXNG metasearch instance, and configuring the agent's search hierarchy.

1. **Create the container.**
   - `pct create 110` name `search`, Ubuntu 24.04 template, 1 GB RAM, 1 core, 8 GB disk, net0 on vmbr1 IP `10.10.10.110/24` gw `10.10.10.1`, unprivileged, `nesting=1`, onboot 1.
   - Inside: install Docker (official get.docker.com script).

2. **Run SearXNG** (docker compose in `/opt/searxng`):
   - Image `searxng/searxng:latest`, port 8080 bound to the CT IP.
   - `settings.yml`: `formats: [html, json]` (JSON API on), **limiter disabled** (single-user private instance, otherwise the agent gets throttled as a bot).
   - Engines: enable brave, mojeek, startpage, qwant, duckduckgo, wikipedia, wikidata; disable google and bing (2026 reality: they block datacenter IPs; keep the list wide so blocked engines degrade gracefully).
   - Weekly cron on the host: `pct exec 110 -- docker compose -f /opt/searxng/docker-compose.yml pull && ... up -d` (engine scrapers rot without updates).

3. **Verify** from the agent container: `curl 'http://10.10.10.110:8080/search?q=test&format=json'` returns results JSON.

4. **Wire the search stack into the agent.** Ask the owner for two keys and store via `op` in vault Agent:
   - "Tavily API key (research)": primary for research tasks; company pays for credits; free tier 1000/mo to start.
   - "Serper API key (fallback)": google-quality and Ukrainian queries; free 2500 credits to start.
     Append to the agent CT's `~/workspace/CLAUDE.md`, section `## Search stack`:

   ```markdown
   ## Search stack

   - Research tasks (консіліуми, go/no-go, глибокі ресерчі): Tavily API first
     (returns cleaned content; watch credit usage, report monthly count).
   - Everyday lookups: private SearXNG at http://10.10.10.110:8080/search?q=...&format=json
     (free, private; results may lack Google).
   - When google-quality or Ukrainian-language results matter: Serper.dev API.
   - Never put personal/sensitive data of the owner into cloud search queries;
     prefer SearXNG for anything sensitive.
   ```

5. **Report.** CT status, SearXNG test result, which keys are stored, the hierarchy as written. Remind the owner: SearXNG доступний тільки зсередини вашої мережі, назовні його не існує.
