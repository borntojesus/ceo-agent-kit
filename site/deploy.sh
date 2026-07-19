#!/usr/bin/env bash
# Deploy the checklist site to homelab Caddy CT 213 → https://ai-kit.antonyuk.org
# Build locally, push via PVE host (pct push has no recursive mode, so tar over ssh).
set -euo pipefail
cd "$(dirname "$0")"

PVE=root@192.168.31.182
CT=213
DOCROOT=/var/www/ai-kit-antonyuk

npm run build

tar -C dist -czf /tmp/ai-kit-site.tgz .
scp -q /tmp/ai-kit-site.tgz "$PVE":/tmp/ai-kit-site.tgz
ssh "$PVE" "pct push $CT /tmp/ai-kit-site.tgz /tmp/ai-kit-site.tgz && pct exec $CT -- sh -c 'rm -rf $DOCROOT.new && mkdir -p $DOCROOT.new && tar -xzf /tmp/ai-kit-site.tgz -C $DOCROOT.new && rm -rf $DOCROOT.old && { [ -d $DOCROOT ] && mv $DOCROOT $DOCROOT.old || true; } && mv $DOCROOT.new $DOCROOT && rm /tmp/ai-kit-site.tgz' && rm /tmp/ai-kit-site.tgz"
rm /tmp/ai-kit-site.tgz

echo "Deployed. Check: https://ai-kit.antonyuk.org"
