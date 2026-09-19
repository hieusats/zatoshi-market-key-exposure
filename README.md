# zatoshi.market — Wallet Private Key Exposure Audit

> **Public security research.** Static code audit of the former Zcash inscription
> marketplace `zatoshi.market` (build `xTsbW6rskz7glzG6TbLdM`, served from
> November 2025 until ~March 2026, still reachable at
> <https://zatoshi-market.vercel.app>).
>
> **Finding: the site's client code transmitted users' raw WIF private keys to a
> server-side backend (`cool-panda-546.convex.cloud`) as part of its core
> ZRC-20 transfer, mint and batch-mint features.**

---

## TL;DR

1. The marketplace's ZRC-20 **transfer**, **mint** and **batch-mint** features
   called server-side Convex actions with the user's **raw WIF private key**
   passed as a plain argument (`wif: privateKey`).
2. Convex actions execute **on the operator's server**
   (`cool-panda-546.convex.cloud`). Every key passed this way therefore left the
   user's browser and reached the operator's infrastructure.
3. This contradicts the site's own security model elsewhere: the wallet was
   stored locally encrypted (PBKDF2-SHA256 250k + AES-GCM-256) and the single
   inscription flow used a clean *build-unsigned → sign locally → broadcast
   signature* pattern. The token transfer/mint paths bypassed that pattern.
4. All of this is proven against the **exact build** that was live in
   **May 2026** (the period during which users reportedly imported wallets),
   verified byte-for-byte via Wayback Machine captures, the still-live Vercel
   deployment, and a urlscan.io capture from 2026-05-19.

> **Scope note.** This audit proves *exposure* (keys reached the server as
> routine traffic). It does not by itself prove that the operator stored or
> misused those keys — that would require server-side data (Convex logs/DB),
> which only the operator or Convex support can inspect. Community reports of
> wallets drained on **2026-06-22 14:48:39 UTC** are consistent with, but not
> proven by, this finding.

---

## The three key-transmitting code paths

All excerpts below are from the recovered build (see
[`evidence/beautified/`](evidence/beautified) for readable versions, and
[`evidence/chunks/`](evidence/chunks) for the original minified files with
SHA-256 checksums).

### 1. Batch mint — `inscriptionsActions.batchMintAction`

Source: `evidence/chunks/page-0c93fed19555e002.js` (route `/inscribe`),
readable version `evidence/beautified/inscribe-page.beautified.js` (line ~862):

```js
let a = await e.action(c.api.inscriptionsActions.batchMintAction, {
    wif: S.privateKey,            // <-- RAW WIF PRIVATE KEY SENT TO SERVER
    address: S.address,
    count: eY,
    contentJson: s,               // {"p":"zrc-20","op":"mint","tick":...,"amt":...}
    contentType: "application/json",
    inscriptionAmount: n.inscriptionOutput,
    fee: n.networkFee,
    waitMs: 1e4,
    feeTier: eQ.key
});
// returns a.jobId -> server-side async job
```

### 2. ZRC-20 transfer — `jobsActions.createMintJobAndRun`

Source: `evidence/chunks/9653-b90603d1235d437c.js` (route `/tokens/trade`),
readable version `evidence/beautified/zrc20-transfer.beautified.js` (line ~379):

```js
let z = (0, l.BH)(a.api.jobsActions.createMintJobAndRun);   // Convex action hook
// ... inside the transfer handler:
let l = await z({
    wif: j.privateKey,            // <-- RAW WIF PRIVATE KEY SENT TO SERVER
    address: j.address,
    contentJson: JSON.stringify({ p: "zrc-20", op: "transfer", tick: w, amt: t }),
    contentType: "application/json",
    inscriptionAmount: 6e4,
    fee: 5e4,
    waitMs: 5e3
});
// returns l.jobId -> server-side async processing
```

### 3. Mint — `inscriptionsActions.mintInscriptionAction`

Source: `evidence/chunks/9653-b90603d1235d437c.js` (registered Convex action,
line ~99):

```js
(0, l.BH)(a.api.inscriptionsActions.mintInscriptionAction);
```

### Where do these calls go?

`e.action(...)` / `l.BH(...)` are the Convex React client (`useAction`) from
chunk `1871-2ee38b1c61d9c0d0.js` (`s.d(t,{...BH:...})` in
`91735:function(e,t,s)`). `useAction(fn)` → `convexClient.action(fn, args)`
serializes `args` to JSON and executes the function **server-side** over
`wss://cool-panda-546.convex.cloud` (confirmed live in the
[urlscan 2026-05-19 capture](evidence/urlscan/urlscan-result-2026-05-19.json),
`data.websockets[0]`).

### The clean pattern the site used elsewhere (for contrast)

Single custom inscriptions and splits used a signature-only protocol — the
server only ever received **sighashes** and **signatures**, never keys:

```js
// 1. server builds UNSIGNED commit tx, returns sighashes
await s.action(c.api.inscriptionsActions.buildUnsignedCommitAction, {
    address, pubKeyHex, content, ...          // public key only - no private key
});
// 2. client signs LOCALLY
let s = await m.sign(t, r);                   // r = private key bytes, stays in browser
// 3. server receives signatures only
await s.action(c.api.inscriptionsActions.broadcastSignedRevealAction, {
    contextId, revealSignatureRawHex: o
});
```

The same clean pattern was used for `buildUnsignedSplitAction` /
`broadcastSignedSplitAction`. The ZRC-20 transfer/mint paths did **not** use
it: they shipped the raw WIF instead.

### Wallet storage (for context)

`app/layout-740a0ce74d7a0f08.js` (module 49718) stores the wallet locally as
`localStorage["zatoshi_keystore_v1"]` = `{v:1, s:salt, i:iv, d:ciphertext}`,
PBKDF2-SHA256 (250,000 iterations) + AES-GCM-256 with a user-chosen password.
It also ships a migration prompt from an older **plaintext**
`localStorage["zatoshi_wallet"]` — evidence that earlier builds kept wallets
unencrypted locally. The local encryption is rendered moot for any user of the
transfer/mint flows, since the app itself decrypted the key and sent it to the
server.

---

## Chain of custody (why this code is what users actually got)

Three independent captures agree on the exact same build:

| # | Source | Date | Proof |
|---|--------|------|-------|
| 1 | Wayback Machine | 2026-01-07/08 | 39 captures of `www.zatoshi.market`; CDX: `https://web.archive.org/cdx/search/cdx?url=zatoshi.market&matchType=domain&output=json` |
| 2 | Frozen Vercel deployment | still live (checked 2026-09-19) | <https://zatoshi-market.vercel.app> serves build `xTsbW6rskz7glzG6TbLdM`; every overlapping file **byte-identical (SHA-256)** to the Wayback captures |
| 3 | urlscan.io | **2026-05-19** 19:08 UTC | scan `019e41a3-bb95-775f-b92d-37b0d2b0508f`: every chunk **etag + byte size matches** the recovered files exactly (see [`evidence/urlscan/may19-response-sizes-etags.json`](evidence/urlscan/may19-response-sizes-etags.json)) |

Point 3 is the decisive one for the incident window: **on 2026-05-19 the live
site served exactly the audited code**, including the key-transmitting route
chunks. The production Vercel alias serves the *latest* production deployment;
since it still serves the January build, no newer marketplace production build
ever existed. The replacement landing page (build `JQAxQGVdSnmuDxp7kn9kX`) is
tied to the Solana Mobile "Clock In" hackathon (Sep 8 – Oct 8, 2026) and only
appeared ~September 2026.

Build ID: `xTsbW6rskz7glzG6TbLdM` (extracted from the captured RSC flight data;
confirmed by the webpack runtime chunk map).

### Full file inventory + hashes

[`evidence/chunks/SHA256SUMS.txt`](evidence/chunks/SHA256SUMS.txt) lists
SHA-256 for all 21 recovered files, including:

| File | Role |
|------|------|
| `page-0c93fed19555e002.js` | `/inscribe` route — **batchMintAction with `wif`** |
| `9653-b90603d1235d437c.js` | `/tokens/trade` route — **createMintJobAndRun with `wif`** |
| `5174.1f6726a207f59b9f.js` | wallet modal (create/import/mnemonic handling, all local) |
| `3489-9512a5c3f19b64df.js` | bitcore-lib Zcash (signing library) |
| `9523-3cbcf1ec4bfda2fb.js` | scure-bip39 (mnemonic library) |
| `app/layout-740a0ce74d7a0f08.js` | WalletProvider + AES-GCM keystore |
| `1871-2ee38b1c61d9c0d0.js` | Convex client (`useAction`/`BH` + WebSocket) |
| `index.html` | captured homepage (RSC flight data with build ID) |

---

## Timeline (reconstructed from public records)

| Date | Event | Source |
|------|-------|--------|
| 2025-11-16..21 | First TLS certificates; marketplace goes live | crt.sh; urlscan scans `019a9896…`, `019aaba7…` |
| 2026-01-07/08 | Wayback captures build `xTsbW6rskz7glzG6TbLdM` (39 URLs) | Wayback CDX |
| 2026-01-19..22 | urlscan scans (marketplace era) | urlscan |
| 2026-05-19 19:08 | urlscan captures live site = **audited build** (etag/size match) | scan `019e41a3…` |
| 2026-05 | Community reports: users **import wallets** into the site | community reports (unverified individually) |
| **2026-06-22 14:48:39 UTC** | Reported wallet drain event | community reports |
| 2026-09 | Domain replaced by an invite-only Solana launchpad landing page; marketplace code removed from production | live site; landing build tied to the "Clock In" hackathon (Sep 8 – Oct 8, 2026) |

Backend infrastructure noted during the audit: Convex deployment
`cool-panda-546.convex.cloud` (still responds; known function paths return
"Server Error"), API server `http://135.181.6.234:3333` (plain HTTP, now
offline, whitelisted in the build's CSP `connect-src`), subdomains
`dev.zatoshi.market` (Vercel SSO-protected), `rpc.` and `mempool.` (Cloudflare,
origin down).

---

## What is proven vs. what is not

**Proven by code + captures (this repo):**

- The client transmitted raw WIF private keys to `cool-panda-546.convex.cloud`
  for ZRC-20 transfer, mint and batch-mint operations.
- This build was live in May 2026 when wallet imports were reported.
- The exposure was avoidable: the codebase already contained a
  sign-locally/send-signatures pattern used by its own inscription and split
  flows.

**Not proven (requires server-side access or on-chain correlation):**

- That the Convex actions **stored** the keys (persistence is technically
  possible for Convex actions but invisible client-side).
- That the 2026-06-22 drain was executed using these keys.
- Whether any SSL/TLS interception, Convex-side breach, or operator action
  turned exposure into theft.

Readers can correlate on-chain: wallets that performed ZRC-20
transfer/mint inscriptions through zatoshi.market are identifiable by their
inscription history (`op:"transfer"` / `op:"mint"` records referencing the
site), and their drain status on 2026-06-22 can be checked against public
explorers.

---

## Evidence preservation (anti-deletion)

If the frozen Vercel deployment is ever removed, the exact bytes remain
retrievable from urlscan.io's permanent response storage (bodies stored by
SHA-256; served gzip-compressed - decompress to match the checksums):

| Artifact | SHA-256 | Retrieval |
|---|---|---|
| Wallet modal `5174.1f6726a207f59b9f.js` | `8aed272969a6c77015bc96597452bd5558a2b824d326d93cd93f848f5bc049d1` | `https://urlscan.io/responses/8aed272969a6c77015bc96597452bd5558a2b824d326d93cd93f848f5bc049d1/` (gunzip) |
| ZRC-20 transfer chunk `9653-b90603d1235d437c.js` (contains `wif: j.privateKey`) | `342d24f5eea10778a8f3a68d0178dbd5607efb47cbc5b09dfad2d56b2e05ea56` | `https://urlscan.io/responses/342d24f5eea10778a8f3a68d0178dbd5607efb47cbc5b09dfad2d56b2e05ea56/` (gunzip) |

Public urlscan scans of the frozen deployment (submitted 2026-09-19, capture
every served resource with its SHA-256):

- Homepage: <https://urlscan.io/result/01a0b8f2-e901-7361-a85f-36dfe6392228/>
- `/inscribe` route (batchMintAction): <https://urlscan.io/result/01a0b8f2-fd9e-7077-9490-9c9433610cbc/>
- `/tokens/trade` route (createMintJobAndRun): <https://urlscan.io/result/01a0b8f3-0d5a-719c-8a2d-4178fe152d86/>
- This GitHub repository: <https://urlscan.io/result/01a0b8f5-42dc-7669-9b95-8946d01812d5/>

Historical captures (pre-existing): Wayback Machine 2026-01-07/08 (39 URLs,
CDX link above) and urlscan 2026-05-19 scan `019e41a3-bb95-775f-b92d-37b0d2b0508f`.
Note: Wayback "Save Page Now" rejected anonymous submissions during this audit
(HTTP 429/500 - login required). If the Vercel deployment disappears, the
urlscan response storage + this repository are the surviving copies.

## Verify it yourself

Prerequisites: `curl`, `node`, `npx js-beautify`. Then see
[`verify/verify.sh`](verify/verify.sh), or run manually:

1. **The frozen deployment is still up and identical:**

   ```bash
   curl -s https://zatoshi-market.vercel.app/ | grep -o 'xTsbW6rskz7glzG6TbLdM'
   # -> build ID of the January 2026 marketplace
   sha256sum evidence/chunks/5174.1f6726a207f59b9f.js
   # compare with evidence/chunks/SHA256SUMS.txt and with the live URL:
   curl -s https://zatoshi-market.vercel.app/_next/static/chunks/5174.1f6726a207f59b9f.js | sha256sum
   ```

2. **The Wayback Machine agrees:**

   ```bash
   curl -s "https://web.archive.org/cdx/search/cdx?url=zatoshi.market&matchType=domain&output=json&limit=200"
   # fetch the layout chunk as captured on 2026-01-07:
   curl -sL "https://web.archive.org/web/20260107234716id_/https://www.zatoshi.market/_next/static/chunks/app/layout-740a0ce74d7a0f08.js" | sha256sum
   # compare with evidence/chunks/app/layout-740a0ce74d7a0f08.js
   ```

3. **The urlscan capture from 2026-05-19 agrees** (free account required for
   unlisted scans; scan id `019e41a3-bb95-775f-b92d-37b0d2b0508f`):

   ```bash
   curl -s -H "API-Key: $URLSCAN_KEY" \
     "https://urlscan.io/api/v1/result/019e41a3-bb95-775f-b92d-37b0d2b0508f/" \
     | jq '.data.requests[].response.response.headers.etag'
   # every etag/size matches evidence/urlscan/may19-response-sizes-etags.json
   ```

4. **Read the key-transmission code:**

   ```bash
   npx js-beautify evidence/chunks/9653-b90603d1235d437c.js | grep -n -A9 'wif:'
   npx js-beautify evidence/chunks/page-0c93fed19555e002.js | grep -n -B2 -A9 'batchMintAction'
   ```

---

## Recommendations

- **If you ever created or imported a wallet on zatoshi.market** (especially if
  you used ZRC-20 transfer/mint/batch-mint, or used the site before January
  2026): treat that wallet's seed as compromised and move any remaining funds
  to a freshly generated wallet on a trusted device.
- Builders: never transmit raw keys to server-side functions. The site's own
  commit/reveal flow shows the correct pattern (server gets sighashes, client
  signs locally, server receives signatures only).
- Researchers: the Convex deployment `cool-panda-546.convex.cloud` still
  responds; the functions `inscriptionsActions.batchMintAction`,
  `jobsActions.createMintJobAndRun`, `inscriptionsActions.mintInscriptionAction`
  and the DB behind them are the place to look for persisted keys (operator /
  Convex trust & safety).

## Repository layout

```
README.md                                  this report
evidence/chunks/                           original minified chunks (SHA256SUMS.txt)
evidence/chunks/index.html                 captured homepage (contains build ID)
evidence/beautified/                       js-beautify output of the key files
evidence/urlscan/urlscan-result-2026-05-19.json   full scan result (48 requests)
evidence/urlscan/may19-response-sizes-etags.json  per-file etag/size table
evidence/urlscan/may19-request-urls.txt           all requests captured that day
verify/verify.sh                           re-verification script
```

## References

- Wayback Machine CDX (all 39 captures, 2026-01-07/08):
  <https://web.archive.org/cdx/search/cdx?url=zatoshi.market&matchType=domain&output=json>
- Frozen marketplace deployment: <https://zatoshi-market.vercel.app>
- urlscan scan of 2026-05-19: <https://urlscan.io/result/019e41a3-bb95-775f-b92d-37b0d2b0508f/>
- Solana Mobile "Clock In" hackathon (dates the landing page):
  <https://solanamobile.com/blog/clock-in-the-solana-mobile-hackathon>
- Zcash block explorer for on-chain correlation:
  <https://blockchair.com/zcash>, <https://mainnet.zcashexplorer.app>

## License / disclaimer

This repository contains copyrighted third-party JavaScript chunks, reproduced
in excerpt and in full **solely for security research and verification
purposes** (fair use / interoperability analysis). All trademarks belong to
their owners. The authors of this audit are not affiliated with zatoshi.market,
Zcash, or Convex. Claims about intent are explicitly NOT made; the documented
finding is code-level key exposure. If you are the operator and believe any
conclusion here is wrong, the correct fix is to publish the server-side code
and data-handling policy of the affected Convex actions.
