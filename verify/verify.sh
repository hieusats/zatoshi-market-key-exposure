#!/usr/bin/env bash
# Re-verification script for the zatoshi.market key-exposure audit.
# Usage: bash verify/verify.sh [URLSCAN_API_KEY]
set -u

DEPLOY="https://zatoshi-market.vercel.app"
SCAN_ID="019e41a3-bb95-775f-b92d-37b0d2b0508f"
KEY="${1:-}"
HERE="$(cd "$(dirname "$0")/.." && pwd)"
pass=0; fail=0

ok()  { echo "  [OK]   $1"; pass=$((pass+1)); }
bad() { echo "  [FAIL] $1"; fail=$((fail+1)); }

echo "== 1. Frozen Vercel deployment serves the January 2026 marketplace build =="
html="$(curl -s --max-time 60 "$DEPLOY/")"
if echo "$html" | grep -q 'xTsbW6rskz7glzG6TbLdM'; then
  ok "build ID xTsbW6rskz7glzG6TbLdM present in live HTML"
else
  bad "build ID not found in live HTML (deployment may have been removed)"
fi

echo "== 2. Live chunks match the audited evidence (SHA-256) =="
for f in 5174.1f6726a207f59b9f.js 9653-b90603d1235d437c.js 3489-9512a5c3f19b64df.js; do
  local_hash="$(sha256sum "$HERE/evidence/chunks/$f" | cut -d' ' -f1)"
  remote_hash="$(curl -s --max-time 60 "$DEPLOY/_next/static/chunks/$f" | sha256sum | cut -d' ' -f1)"
  if [ "$local_hash" = "$remote_hash" ]; then
    ok "$f matches live deployment ($local_hash)"
  else
    bad "$f differs (local=$local_hash remote=$remote_hash)"
  fi
  sleep 2  # let the Vercel edge cache warm up; retry once on mismatch
  if [ "$local_hash" != "$remote_hash" ]; then
    sleep 5
    remote_hash="$(curl -s --max-time 60 "$DEPLOY/_next/static/chunks/$f" | sha256sum | cut -d' ' -f1)"
    [ "$local_hash" = "$remote_hash" ] && { ok "$f matches on retry (edge cache warmed)"; }
  fi
done

echo "== 3. Wayback Machine captures agree (January 2026) =="
wb_hash="$(curl -sL --max-time 90 "https://web.archive.org/web/20260107234716id_/https://www.zatoshi.market/_next/static/chunks/app/layout-740a0ce74d7a0f08.js" | sha256sum | cut -d' ' -f1)"
local_hash="$(sha256sum "$HERE/evidence/chunks/app/layout-740a0ce74d7a0f08.js" | cut -d' ' -f1)"
if [ "$wb_hash" = "$local_hash" ]; then
  ok "layout chunk identical to 2026-01-07 Wayback capture ($wb_hash)"
else
  bad "layout chunk differs from Wayback capture (wb=$wb_hash local=$local_hash)"
fi

echo "== 4. urlscan 2026-05-19 scan shows the same build (needs API key for unlisted scans) =="
if [ -n "$KEY" ]; then
  etag_live="$(curl -sI --max-time 60 "$DEPLOY/_next/static/chunks/e6f60f2f-5aab482fb117d4b5.js" | tr -d '\r' | awk 'tolower($1)=="etag:"{print $2}' | tr -d '"')"
  etag_scan="$(curl -s --max-time 60 -H "API-Key: $KEY" "https://urlscan.io/api/v1/result/$SCAN_ID/" \
    | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{let j=JSON.parse(d);for(const r of j.data.requests){const res=r.response;if(res&&res.response&&res.response.url.includes("e6f60f2f")){console.log((res.response.headers.etag||"").replace(/"/g,""));}}})')"
  if [ -n "$etag_scan" ] && [ "$etag_live" = "$etag_scan" ]; then
    ok "etag of modal-vendor chunk identical between 2026-05-19 scan and live deployment ($etag_live)"
  else
    bad "etag mismatch (live=$etag_live scan=$etag_scan)"
  fi
else
  echo "  [SKIP] pass URLSCAN key as first argument to check the 2026-05-19 scan"
fi

echo "== 5. The key-transmission code is present in the audited chunks =="
b="$(npx --yes js-beautify "$HERE/evidence/chunks/9653-b90603d1235d437c.js" 2>/dev/null)"
echo "$b" | grep -q 'wif: j.privateKey' \
  && ok "zrc20-transfer chunk passes 'wif: j.privateKey' to Convex action createMintJobAndRun" \
  || bad "wif argument not found in 9653 chunk"
b2="$(npx --yes js-beautify "$HERE/evidence/chunks/page-0c93fed19555e002.js" 2>/dev/null)"
echo "$b2" | grep -q 'wif: S.privateKey' \
  && ok "inscribe chunk passes 'wif: S.privateKey' to Convex action batchMintAction" \
  || bad "wif argument not found in inscribe chunk"
if grep -q 'cool-panda-546' "$HERE/evidence/chunks/app/layout-740a0ce74d7a0f08.js"; then
  ok "Convex deployment cool-panda-546.convex.cloud referenced in the bundle (layout chunk, getConvexClient)"
else
  bad "Convex deployment reference not found"
fi

echo
echo "== RESULT: $pass passed, $fail failed =="
[ "$fail" -eq 0 ]
