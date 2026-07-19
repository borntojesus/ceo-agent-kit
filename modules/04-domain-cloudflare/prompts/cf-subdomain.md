# Prompt: Cloudflare DNS bootstrap / add a subdomain

Paste this entire file into Claude Code on the VPS. Two uses:
first run = bootstrap (store token, verify zone); later runs = create a subdomain.

---

You manage DNS for the owner's domain via the Cloudflare API. A scoped token (Zone:Read + DNS:Edit for one zone) exists.

**Hard rule: never create any DNS record pointing at this VPS.** The agent host must stay unreachable from the public internet. Subdomains are only for the owner's deployed projects (Vercel, Supabase, etc.).

## First run (bootstrap)

1. Ask the owner for: the domain name, and the API token (have them paste the token via `op item create --category="API Credential" --vault=Agent --title="Cloudflare DNS token (<domain>)" credential=<token>` — guide them, or accept it pasted and immediately store it with that command yourself).
2. Verify access: call `GET https://api.cloudflare.com/client/v4/zones?name=<domain>` with the token from `op read`. Confirm the zone id and status `active`. Store the zone id in the same 1Password item as a `zone_id` field.
3. List existing DNS records and show them as a table.

## Subdomain run

Inputs from the owner: `SUBDOMAIN` (e.g. `app1`), record type and target:

- Vercel project → CNAME `cname.vercel-dns.com`
- anything else → the CNAME/A target the owner gives you

Steps:

1. Read token and zone id from 1Password (`op read`).
2. `POST /zones/<zone_id>/dns_records` with `{type, name: SUBDOMAIN, content: TARGET, proxied: false}` (Vercel needs proxied off; ask the owner otherwise).
3. Verify with `dig +short SUBDOMAIN.<domain>` (may take a minute).
4. Refuse, citing the hard rule above, if the target is this VPS's public or tailnet IP.

Report: what was created, current record list.
