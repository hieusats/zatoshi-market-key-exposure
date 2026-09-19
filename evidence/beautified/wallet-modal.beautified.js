(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [5174, 9907], {
        80950: function() {},
        46601: function() {},
        8623: function() {},
        7748: function() {},
        85568: function() {},
        56619: function() {},
        77108: function() {},
        52361: function() {},
        94616: function() {},
        55684: function(e, t, o) {
            "use strict";
            o.r(t), o.d(t, {
                default: function() {
                    return b
                }
            });
            var a = o(57437),
                r = o(2265),
                l = o(16463),
                n = o(49718),
                s = o(5585),
                i = o(98098),
                c = o(76864),
                d = o(43072),
                u = o(2707),
                h = o(19783),
                g = o(38408);
            let p = new Map;

            function b(e) {
                let {
                    isOpen: t,
                    onClose: o,
                    desktopExpanded: b,
                    setDesktopExpanded: x
                } = e, m = (0, l.useRouter)(), {
                    wallet: f,
                    connectWallet: v,
                    disconnectWallet: y,
                    mounted: w,
                    hasStoredKeystore: k,
                    unlockWallet: j,
                    saveEncrypted: N,
                    lockWallet: C,
                    points: S
                } = (0, n.O)(), [E, A] = (0, r.useState)({
                    confirmed: 0,
                    unconfirmed: 0
                }), [T, I] = (0, r.useState)(0), [L, P] = (0, r.useState)(!1), [F, z] = (0, r.useState)(!1), [U, W] = (0, r.useState)(!1), [O, D] = (0, r.useState)(!1), [R, K] = (0, r.useState)(!1), [B, Z] = (0, r.useState)(!1), [H, M] = (0, r.useState)(!1), [_, q] = (0, r.useState)(""), [X, Y] = (0, r.useState)({
                    to: "",
                    amount: ""
                }), [G, V] = (0, r.useState)(!1), [J, $] = (0, r.useState)([]), [Q, ee] = (0, r.useState)(!1), [et, eo] = (0, r.useState)({}), [ea, er] = (0, r.useState)({}), [el, en] = (0, r.useState)({}), [es, ei] = (0, r.useState)({}), [ec, ed] = (0, r.useState)([]), [eu, eh] = (0, r.useState)({}), [eg, ep] = (0, r.useState)({}), [eb, ex] = (0, r.useState)({}), [em, ef] = (0, r.useState)("all"), [ev, ey] = (0, r.useState)(!1), [ew, ek] = (0, r.useState)(!1), [ej, eN] = (0, r.useState)(!1), [eC, eS] = (0, r.useState)(!1), [eE, eA] = (0, r.useState)(!1), eT = (0, r.useCallback)(async function() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    if (!(null == f ? void 0 : f.address)) return;
                    console.log("\uD83D\uDCCA Fetching balance for:", f.address, e ? "(force refresh)" : "(cached ok)");
                    let t = await i.o.getBalance(f.address, e);
                    console.log("\uD83D\uDCCA Balance:", t), A(t)
                }, [null == f ? void 0 : f.address]), eI = (0, r.useCallback)(async () => {
                    I(await i.o.getPrice())
                }, []), [eL, eP] = (0, r.useState)({}), eF = (0, r.useCallback)(async function() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    if (null == f ? void 0 : f.address) {
                        ee(!0), console.log("\uD83C\uDFA8 Fetching inscriptions for:", f.address, e ? "(force refresh)" : "(cached ok)");
                        try {
                            let o = (await i.o.getInscriptions(f.address, e)).inscriptions || [];
                            console.log("\uD83C\uDFA8 Found ".concat(o.length, " inscriptions")), $(o);
                            let a = {},
                                r = {},
                                l = {};
                            for (let e = 0; e < o.length; e += 8) {
                                let t = o.slice(e, e + 8);
                                await Promise.all(t.map(async e => {
                                    if (null == e ? void 0 : e.id) try {
                                        let t = await fetch("/api/zcash/inscription-content/".concat(e.id));
                                        if (!t.ok) return;
                                        let o = t.headers.get("Content-Type") || "application/octet-stream";
                                        if (l[e.id] = o, o.startsWith("image/")) {
                                            let o = await t.blob();
                                            r[e.id] = URL.createObjectURL(o)
                                        } else a[e.id] = await t.text()
                                    } catch (t) {
                                        console.error("Failed to fetch content for ".concat(e.id, ":"), t)
                                    }
                                }))
                            }
                            eo(a), er(r), eP(l), en({}), ei({}), ep({}), ex({});
                            let n = {};
                            for (let [e, o] of Object.entries(a)) try {
                                let a = JSON.parse(o),
                                    l = String((null == a ? void 0 : a.p) || "").toLowerCase();
                                if ("zrc-721" === l && (null == a ? void 0 : a.id)) {
                                    var t;
                                    let o = Number(a.id);
                                    if (Number.isNaN(o)) continue;
                                    let l = String(a.collection || a.slug || a.tick || "ZRC-721"),
                                        s = l.toLowerCase(),
                                        i = s || l.toLowerCase().replace(/\s+/g, "-"),
                                        c = s ? (0, d.c)(s) : null,
                                        h = c ? "".concat(c.slug, ":").concat(o) : "".concat(i, ":").concat(o),
                                        g = p.get(h);
                                    if (!g && c) try {
                                        let e = await (0, u.nY)(c, o),
                                            t = (0, u.aH)(c, o, e);
                                        g = {
                                            name: (0, u.NH)(c, o, e),
                                            imageUrls: t,
                                            collectionName: c.name
                                        }, p.set(h, g)
                                    } catch (e) {
                                        console.error("Failed to load zrc721 asset", e)
                                    }
                                    let b = "".concat(l, " #").concat(o),
                                        x = r[e] ? [r[e]] : [],
                                        m = (null == g ? void 0 : g.collectionName) || (null == c ? void 0 : c.name) || l;
                                    n[e] = {
                                        collection: (null == c ? void 0 : c.slug) || i,
                                        tokenId: o,
                                        name: (null == g ? void 0 : g.name) || b,
                                        collectionName: m,
                                        imageUrls: (null == g ? void 0 : null === (t = g.imageUrls) || void 0 === t ? void 0 : t.length) ? g.imageUrls : x
                                    }
                                }
                            } catch (e) {}
                            eh(n)
                        } catch (e) {
                            console.error("Failed to fetch inscriptions:", e), $([]), ed([]), eo({}), er({}), eh({})
                        } finally {
                            ee(!1)
                        }
                    }
                }, [null == f ? void 0 : f.address]), ez = (0, r.useCallback)(async function() {
                    if (arguments.length > 0 && void 0 !== arguments[0] && arguments[0], null == f ? void 0 : f.address) try {
                        let e = await g.c.getAddressPortfolio(f.address);
                        if (null == e ? void 0 : e.balances) {
                            let t = e.balances.map(e => ({
                                tick: e.tick.toUpperCase(),
                                balance: e.overall,
                                transferableCount: 0,
                                mintCount: 0,
                                totalInscriptions: 0
                            }));
                            t.sort((e, t) => e.tick.localeCompare(t.tick)), ed(t)
                        }
                    } catch (e) {
                        console.error("Failed to fetch ZRC-20 portfolio:", e)
                    }
                }, [null == f ? void 0 : f.address]), eU = async () => {
                    if (!ev && (null == f ? void 0 : f.address)) {
                        ey(!0);
                        try {
                            await Promise.all([eT(!0), eI(), eF(!0), ez(!0)])
                        } finally {
                            setTimeout(() => ey(!1), 1e3)
                        }
                    }
                };
                (0, r.useEffect)(() => {
                    if (t) return window.innerWidth < 1024 && (document.body.style.overflow = "hidden", document.body.style.position = "fixed", document.body.style.width = "100%", document.body.style.touchAction = "none"), () => {
                        document.body.style.overflow = "", document.body.style.position = "", document.body.style.width = "", document.body.style.touchAction = ""
                    }
                }, [t]), (0, r.useEffect)(() => {
                    (null == f ? void 0 : f.address) && t && (ew ? (eT(), eF(), ez()) : (eT(!0), eF(!0), ez(!0), ek(!0)), eI())
                }, [null == f ? void 0 : f.address, t, ew, eT, eI, eF, ez]);
                let eW = async () => {
                    P(!0);
                    try {
                        let e = await (0, s.Hl)(),
                            t = prompt("Set a password to encrypt your wallet (required):");
                        if (!t || t.length < 8) {
                            alert("Password required (min 8 chars). Wallet not saved.");
                            return
                        }
                        await N(e, t), v(e), z(!0)
                    } catch (t) {
                        let e = t instanceof Error ? t.message : String(t);
                        alert("Failed to generate wallet: ".concat(e)), console.error("Wallet generation error:", t)
                    } finally {
                        P(!1)
                    }
                }, eO = async () => {
                    let e = prompt("Enter your private key (WIF):");
                    if (!e) return;
                    let t = e.trim();
                    try {
                        P(!0), console.log("\uD83D\uDD11 Attempting private key import...");
                        let e = await (0, s.i_)(t);
                        console.log("✅ Private key import successful:", e.address);
                        let o = prompt("Set a password to encrypt your wallet (required):");
                        if (!o || o.length < 8) {
                            alert("Password required (min 8 chars). Wallet not saved.");
                            return
                        }
                        await N(e, o), v(e), alert("Wallet imported successfully! Address: ".concat(e.address))
                    } catch (e) {
                        console.error("❌ Import error:", e), alert("Invalid private key. Please enter a valid Zcash private key (starts with L or K).")
                    } finally {
                        P(!1)
                    }
                }, eD = async () => {
                    let e = prompt("Enter your 12-word seed phrase:");
                    if (!e) return;
                    let t = e.trim().toLowerCase();
                    try {
                        P(!0), console.log("\uD83D\uDD11 Attempting mnemonic import...");
                        let e = await (0, s.wK)(t);
                        console.log("✅ Mnemonic import successful:", e.address);
                        let o = prompt("Set a password to encrypt your wallet (required):");
                        if (!o || o.length < 8) {
                            alert("Password required (min 8 chars). Wallet not saved.");
                            return
                        }
                        await N(e, o), v(e), alert("Wallet imported successfully! Address: ".concat(e.address))
                    } catch (e) {
                        console.error("❌ Import error:", e), alert("Invalid seed phrase. Please check your words and try again.")
                    } finally {
                        P(!1)
                    }
                }, eR = async () => {
                    let e = prompt("Enter your wallet password:");
                    if (e) {
                        P(!0);
                        try {
                            await j(e) || alert("Incorrect password")
                        } finally {
                            P(!1)
                        }
                    }
                }, eK = async () => {
                    (null == f ? void 0 : f.address) && (q(await h.toDataURL(f.address, {
                        width: 256,
                        margin: 2,
                        color: {
                            dark: "#000000",
                            light: "#FFFFFF"
                        }
                    })), W(!0))
                }, eB = () => {
                    (null == f ? void 0 : f.address) && (navigator.clipboard.writeText(f.address), alert("Address copied!"))
                }, eZ = (0, r.useCallback)(() => {
                    (null == f ? void 0 : f.address) && (m.push("/u/".concat(f.address.toLowerCase())), o())
                }, [null == f ? void 0 : f.address, o, m]), eH = (e, t) => {
                    navigator.clipboard.writeText(e), alert("".concat(t, " copied to clipboard! Keep it safe."))
                }, eM = async () => {
                    if (!(null == f ? void 0 : f.address) || !f.privateKey) {
                        alert("Wallet not available");
                        return
                    }
                    let e = X.to.trim(),
                        t = parseFloat(X.amount);
                    if (!e || !e.startsWith("t1")) {
                        alert("Invalid recipient address. Must be a Zcash t-address (starts with t1)");
                        return
                    }
                    if (isNaN(t) || t <= 0) {
                        alert("Invalid amount. Must be greater than 0");
                        return
                    }
                    if (t > e_) {
                        alert("Insufficient balance. You have ".concat(e_.toFixed(4), " ZEC"));
                        return
                    }
                    if (confirm("Send ".concat(t, " ZEC to:\n").concat(e, "\n\nThis action cannot be undone. Continue?"))) {
                        V(!0);
                        try {
                            let o = await (0, c.K)(f.address, e, t, f.privateKey);
                            alert("✅ Transaction sent!\n\nTXID: ".concat(o.txid, "\n\nAmount: ").concat(o.sentAmount, " ZEC\nFee: ").concat(o.fee, " ZEC\n\nView on explorer: https://blockchair.com/zcash/transaction/").concat(o.txid)), Y({
                                to: "",
                                amount: ""
                            }), D(!1), eT()
                        } catch (t) {
                            let e = t instanceof Error ? t.message : "Unknown error";
                            alert("❌ Transaction failed:\n".concat(e)), console.error("Send transaction error:", t)
                        } finally {
                            V(!1)
                        }
                    }
                }, e_ = E.confirmed + E.unconfirmed, eq = e => {
                    let t = null == e ? void 0 : e.match(/\/(.+)$/);
                    return t ? t[1].toUpperCase() : (e || "UNKNOWN").toUpperCase()
                };
                return w && t ? (0, a.jsxs)(a.Fragment, {
                    children: [(0, a.jsx)("div", {
                        className: "fixed inset-0 z-40 lg:hidden pointer-events-none",
                        children: (0, a.jsx)("div", {
                            className: "absolute top-16 left-0 right-0 bottom-0 bg-black/60 pointer-events-auto",
                            onClick: o
                        })
                    }), (0, a.jsx)("button", {
                        onClick: () => x(!b),
                        className: "hidden lg:flex fixed top-1/2 -translate-y-1/2 z-40\n          w-8 h-16 bg-black/30 backdrop-blur-xl border border-gold-500/20\n          items-center justify-center text-gold-400 hover:text-gold-300 hover:bg-black/50 transition-all duration-300\n          ".concat(b ? "right-[400px]" : "right-0", "\n        "),
                        children: b ? "→" : "←"
                    }), (0, a.jsx)("div", {
                        className: "fixed backdrop-blur-xl bg-black/30\n        top-16 bottom-0 left-0 right-0\n        z-50 lg:z-40\n        lg:right-0 lg:left-auto lg:w-[400px]\n        transition-all duration-300 flex flex-col\n        lg:border-l lg:border-gold-500/20\n        ".concat(b ? "lg:translate-x-0" : "lg:translate-x-full", "\n      "),
                        children: (0, a.jsx)("div", {
                            className: "px-6 pt-3 pb-6 overflow-y-auto flex-1 no-overscroll",
                            children: f ? (0, a.jsxs)("div", {
                                className: "space-y-6",
                                children: [(0, a.jsxs)("div", {
                                    className: "flex justify-between items-center",
                                    children: [(0, a.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [(0, a.jsx)("h2", {
                                            className: "text-xl text-gold-400 font-bold",
                                            children: "WALLET"
                                        }), (0, a.jsx)("button", {
                                            onClick: () => {
                                                (null == f ? void 0 : f.address) && (navigator.clipboard.writeText(f.address), eN(!0), setTimeout(() => eN(!1), 2e3))
                                            },
                                            className: "p-1.5 hover:bg-gold-500/20 rounded transition-all",
                                            title: "Copy address",
                                            children: ej ? (0, a.jsx)("svg", {
                                                className: "w-4 h-4 text-white",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: (0, a.jsx)("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M5 13l4 4L19 7"
                                                })
                                            }) : (0, a.jsx)("svg", {
                                                className: "w-4 h-4 text-gold-400",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: (0, a.jsx)("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                })
                                            })
                                        }), S && (0, a.jsxs)("span", {
                                            className: "px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-100",
                                            children: [S.total, " pts"]
                                        }), (0, a.jsx)("button", {
                                            onClick: eZ,
                                            className: "px-2 py-1 text-[10px] font-semibold uppercase tracking-wide rounded-full border border-gold-500/30 text-gold-100 hover:bg-gold-500/10 transition",
                                            children: "Profile"
                                        })]
                                    }), (0, a.jsx)("button", {
                                        onClick: o,
                                        className: "text-gold-400 hover:text-gold-300 text-1xl mr-3"
                                    })]
                                }), (0, a.jsxs)("div", {
                                    className: "text-center py-6",
                                    children: [(0, a.jsxs)("div", {
                                        className: "flex items-center justify-center gap-2 text-sm text-gold-200/60 mb-2",
                                        children: [(0, a.jsx)("span", {
                                            children: "BALANCE"
                                        }), (0, a.jsx)("button", {
                                            onClick: eU,
                                            disabled: ev,
                                            className: "p-1 hover:bg-gold-500/20 rounded transition-all ".concat(ev ? "animate-spin" : ""),
                                            title: "Refresh balance",
                                            children: (0, a.jsx)("svg", {
                                                className: "w-4 h-4",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: (0, a.jsx)("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                })
                                            })
                                        })]
                                    }), (0, a.jsxs)("div", {
                                        className: "text-4xl font-bold mb-2",
                                        children: [(0, a.jsx)("span", {
                                            className: "text-white",
                                            children: e_.toFixed(4)
                                        }), (0, a.jsx)("span", {
                                            className: "text-gold-400 ml-2",
                                            children: "ZEC"
                                        })]
                                    }), (0, a.jsxs)("div", {
                                        className: "text-lg text-gold-200/60",
                                        children: ["$", (e_ * T).toFixed(2)]
                                    })]
                                }), (0, a.jsxs)("div", {
                                    className: "grid grid-cols-2 gap-3",
                                    children: [(0, a.jsx)("button", {
                                        onClick: eK,
                                        className: "px-6 py-3 border-2 border-gold-500 text-gold-400 font-bold rounded hover:bg-gold-500/10 transition-all",
                                        children: "Receive"
                                    }), (0, a.jsx)("button", {
                                        disabled: !0,
                                        className: "px-6 py-3 bg-gold-400/30 text-black/50 font-bold rounded cursor-not-allowed opacity-50",
                                        title: "Send feature temporarily disabled",
                                        children: "Send"
                                    })]
                                }), (0, a.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [(0, a.jsxs)("div", {
                                        className: "flex items-center justify-between gap-2",
                                        children: [(0, a.jsxs)("div", {
                                            className: "flex items-center gap-2",
                                            children: [(0, a.jsx)("h3", {
                                                className: "text-sm font-bold text-gold-400 uppercase tracking-wide",
                                                children: "Inscriptions"
                                            }), (0, a.jsxs)("div", {
                                                className: "group relative",
                                                children: [(0, a.jsx)("div", {
                                                    className: "w-4 h-4 rounded-full border border-gold-500/50 flex items-center justify-center text-gold-500/70 text-xs cursor-help",
                                                    children: "i"
                                                }), (0, a.jsx)("div", {
                                                    className: "absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-black/90 border border-gold-500/30 rounded text-xs text-gold-300 text-center z-10",
                                                    children: "Some inscriptions may not be shown"
                                                })]
                                            })]
                                        }), (0, a.jsxs)("div", {
                                            className: "flex gap-2 text-[11px]",
                                            children: [(0, a.jsx)("button", {
                                                onClick: () => ef("all"),
                                                className: "px-3 py-1 rounded border text-xs transition whitespace-nowrap ".concat("all" === em ? "border-gold-500 text-gold-100 bg-gold-500/10" : "border-gold-500/20 text-gold-300/70"),
                                                children: "All"
                                            }), (0, a.jsx)("button", {
                                                onClick: () => ef("zrc20"),
                                                className: "px-3 py-1 rounded border text-xs transition whitespace-nowrap ".concat("zrc20" === em ? "border-gold-500 text-gold-100 bg-gold-500/10" : "border-gold-500/20 text-gold-300/70"),
                                                children: "ZRC-20"
                                            }), (0, a.jsx)("button", {
                                                onClick: () => ef("zrc721"),
                                                className: "px-3 py-1 rounded border text-xs transition whitespace-nowrap ".concat("zrc721" === em ? "border-gold-500 text-gold-100 bg-gold-500/10" : "border-gold-500/20 text-gold-300/70"),
                                                children: "ZRC-721"
                                            })]
                                        })]
                                    }), (0, a.jsx)("div", {
                                        children: "zrc20" === em ? (0, a.jsx)("div", {
                                            className: "space-y-2 max-h-[300px] overflow-y-auto",
                                            children: 0 === ec.length ? (0, a.jsx)("div", {
                                                className: "p-8 text-center text-gold-200/60 text-sm",
                                                children: "No tokens found"
                                            }) : ec.map(e => (0, a.jsxs)("div", {
                                                className: "bg-black/40 border border-gold-500/20 rounded p-3 flex justify-between items-center hover:border-gold-500/40 transition-all cursor-pointer",
                                                onClick: () => {
                                                    window.location.href = "/tokens/trade/".concat(e.tick.toLowerCase())
                                                },
                                                children: [(0, a.jsxs)("div", {
                                                    children: [(0, a.jsx)("div", {
                                                        className: "font-bold text-gold-100",
                                                        children: e.tick
                                                    }), (0, a.jsx)("div", {
                                                        className: "text-[10px] text-gold-200/50 uppercase tracking-wider",
                                                        children: "ZRC-20"
                                                    })]
                                                }), (0, a.jsx)("div", {
                                                    className: "text-right",
                                                    children: (0, a.jsx)("div", {
                                                        className: "font-mono text-gold-300",
                                                        children: function(e) {
                                                            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 18;
                                                            if (!e) return "0";
                                                            try {
                                                                let o = BigInt(10) ** BigInt(t),
                                                                    a = BigInt(e),
                                                                    r = a / o,
                                                                    l = a % o;
                                                                if (l === BigInt(0)) return r.toLocaleString();
                                                                let n = l.toString().padStart(t, "0");
                                                                return n = n.replace(/0+$/, ""), "".concat(r.toLocaleString(), ".").concat(n)
                                                            } catch (e) {
                                                                return "0"
                                                            }
                                                        }(e.balance)
                                                    })
                                                })]
                                            }, e.tick))
                                        }) : Q ? (0, a.jsx)("div", {
                                            className: "grid grid-cols-3 lg:grid-cols-2 gap-2",
                                            children: [1, 2, 3].map(e => (0, a.jsxs)("div", {
                                                className: "bg-black/40 border border-gold-500/20 rounded p-2",
                                                children: [(0, a.jsx)("div", {
                                                    className: "bg-gold-500/10 rounded p-2 mb-1.5 h-[60px] skeleton"
                                                }), (0, a.jsxs)("div", {
                                                    className: "flex items-center justify-between",
                                                    children: [(0, a.jsx)("div", {
                                                        className: "w-12 h-3 skeleton rounded"
                                                    }), (0, a.jsx)("div", {
                                                        className: "w-8 h-4 skeleton rounded"
                                                    })]
                                                })]
                                            }, e))
                                        }) : 0 === J.length ? (0, a.jsx)("div", {
                                            className: "p-8 text-center text-gold-200/60 text-sm",
                                            children: "No inscriptions"
                                        }) : (0, a.jsxs)("div", {
                                            className: "relative",
                                            children: [(0, a.jsx)("div", {
                                                className: "grid grid-cols-3 lg:grid-cols-2 gap-2 max-h-[220px] lg:max-h-[300px] overflow-y-auto",
                                                children: J.filter(e => "all" === em || !!eu[e.id]).map(e => {
                                                    let t = eu[e.id],
                                                        o = eL[e.id] || e.contentType || e.content_type || "text/plain",
                                                        r = eg[e.id],
                                                        l = eb[e.id],
                                                        n = et[e.id];
                                                    if (t) {
                                                        let o = Array.isArray(t.imageUrls) && t.imageUrls.length > 0,
                                                            n = o ? t.imageUrls[0] : null;
                                                        return (0, a.jsxs)("div", {
                                                            className: "bg-black/40 border border-gold-500/20 rounded p-2 hover:border-gold-500/40 transition-all cursor-pointer",
                                                            onClick: () => {
                                                                window.location.href = "/inscription/".concat(e.id)
                                                            },
                                                            children: [o ? (0, a.jsxs)("div", {
                                                                className: "relative bg-black/60 rounded mb-1.5 aspect-square overflow-hidden border border-gold-500/10",
                                                                children: [(0, a.jsx)("img", {
                                                                    src: n,
                                                                    "data-index": 0,
                                                                    loading: "lazy",
                                                                    onLoad: () => ep(t => ({
                                                                        ...t,
                                                                        [e.id]: !0
                                                                    })),
                                                                    onError: o => {
                                                                        let a = Number(o.currentTarget.dataset.index || "0") + 1,
                                                                            r = t.imageUrls[a];
                                                                        r ? (ep(t => ({
                                                                            ...t,
                                                                            [e.id]: !1
                                                                        })), ex(t => ({
                                                                            ...t,
                                                                            [e.id]: !1
                                                                        })), o.currentTarget.dataset.index = String(a), o.currentTarget.src = r) : (ex(t => ({
                                                                            ...t,
                                                                            [e.id]: !0
                                                                        })), o.currentTarget.onerror = null)
                                                                    },
                                                                    alt: "",
                                                                    className: "w-full h-full object-contain transition-opacity duration-300 ".concat(r ? "opacity-100" : "opacity-0", " ").concat(r || l ? "" : "skeleton")
                                                                }), l && (0, a.jsx)("div", {
                                                                    className: "absolute inset-0 flex items-center justify-center bg-black/70 text-gold-200/70 text-[11px]",
                                                                    children: "Artwork unavailable"
                                                                })]
                                                            }) : (0, a.jsx)("div", {
                                                                className: "bg-black/60 rounded mb-1.5 aspect-square border border-gold-500/10 flex items-center justify-center text-[11px] text-gold-200/70",
                                                                children: "Metadata syncing..."
                                                            }), (0, a.jsxs)("div", {
                                                                className: "space-y-1",
                                                                children: [(0, a.jsx)("div", {
                                                                    className: "text-[11px] font-semibold text-gold-100/90 truncate",
                                                                    children: t.name || "".concat(t.collectionName, " #").concat(t.tokenId)
                                                                }), (0, a.jsx)("div", {
                                                                    className: "text-[10px] uppercase tracking-[0.2em] text-gold-200/60",
                                                                    children: t.collectionName
                                                                }), (0, a.jsx)("div", {
                                                                    className: "text-[10px] text-gold-200/50 font-mono break-all line-clamp-2",
                                                                    children: e.id
                                                                })]
                                                            })]
                                                        }, e.id)
                                                    }
                                                    let s = "",
                                                        i = !1;
                                                    if (n) {
                                                        if (o.includes("json")) {
                                                            i = !0;
                                                            try {
                                                                let e = JSON.parse(n);
                                                                s = JSON.stringify(e, null, 2)
                                                            } catch (e) {
                                                                s = n
                                                            }
                                                        } else s = o.includes("text") ? n : eq(o)
                                                    } else s = "Loading...";
                                                    return (0, a.jsxs)("div", {
                                                        className: "bg-black/40 border border-gold-500/20 rounded p-2 hover:border-gold-500/40 transition-all cursor-pointer",
                                                        onClick: () => {
                                                            window.location.href = "/inscription/".concat(e.id)
                                                        },
                                                        children: [ea[e.id] ? (0, a.jsxs)("div", {
                                                            className: "relative bg-black/60 rounded mb-1.5 aspect-square overflow-hidden border border-gold-500/10 ".concat(el[e.id] || es[e.id] ? "" : "skeleton"),
                                                            children: [(0, a.jsx)("img", {
                                                                src: ea[e.id],
                                                                loading: "lazy",
                                                                onLoad: () => en(t => ({
                                                                    ...t,
                                                                    [e.id]: !0
                                                                })),
                                                                onError: () => ei(t => ({
                                                                    ...t,
                                                                    [e.id]: !0
                                                                })),
                                                                alt: "",
                                                                className: "w-full h-full object-contain transition-opacity duration-300 ".concat(el[e.id] ? "opacity-100" : "opacity-0")
                                                            }), es[e.id] && (0, a.jsx)("div", {
                                                                className: "absolute inset-0 flex items-center justify-center bg-black/70 text-gold-200/70 text-[11px]",
                                                                children: "Artwork unavailable"
                                                            })]
                                                        }) : (0, a.jsx)("div", {
                                                            className: "bg-black/60 rounded p-2 mb-1.5 h-[60px] overflow-hidden",
                                                            children: (0, a.jsx)("pre", {
                                                                className: "text-gold-300 text-[10px] font-mono whitespace-pre-wrap break-all line-clamp-3",
                                                                children: s
                                                            })
                                                        }), (0, a.jsx)("div", {
                                                            className: "flex items-center justify-between text-[10px]",
                                                            children: (0, a.jsx)("div", {
                                                                className: "px-1.5 py-0.5 rounded text-[9px] font-bold ".concat(i ? "bg-blue-500/20 text-blue-300" : "bg-gold-500/20 text-gold-300"),
                                                                children: i ? "JSON" : eq(o)
                                                            })
                                                        })]
                                                    }, e.id)
                                                })
                                            }), J.length > 6 && (0, a.jsx)("div", {
                                                className: "absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none"
                                            })]
                                        })
                                    })]
                                }), (0, a.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [(0, a.jsx)("button", {
                                        onClick: C,
                                        className: "w-full px-6 py-2 bg-gold-500/10 text-gold-400 text-sm border border-gold-500/30 rounded hover:bg-gold-500/20 transition-all",
                                        children: "Lock Wallet"
                                    }), (0, a.jsx)("button", {
                                        onClick: () => K(!0),
                                        className: "w-full px-6 py-2 bg-gold-500/10 text-gold-400 text-sm border border-gold-500/30 rounded hover:bg-gold-500/20 transition-all",
                                        children: "Export Wallet"
                                    }), (0, a.jsx)("button", {
                                        onClick: () => {
                                            confirm("Disconnect wallet?") && (y(), o())
                                        },
                                        className: "w-full px-6 py-2 text-gold-400/60 text-sm hover:text-gold-400 transition-all",
                                        children: "Disconnect (Forget) Wallet"
                                    })]
                                }), (0, a.jsx)("div", {
                                    onClick: eB,
                                    className: "hidden lg:block p-3 bg-black/40 rounded cursor-pointer hover:bg-black/60 transition-all",
                                    children: (0, a.jsx)("p", {
                                        className: "text-white font-mono text-xs break-all text-center",
                                        children: f.address
                                    })
                                }), (0, a.jsxs)("div", {
                                    className: "lg:hidden space-y-3 mt-6 pt-6 border-t border-gold-500/20",
                                    children: [(0, a.jsx)("div", {
                                        onClick: eB,
                                        className: "p-3 bg-black/40 rounded cursor-pointer hover:bg-black/60 transition-all",
                                        children: (0, a.jsx)("p", {
                                            className: "text-white font-mono text-xs text-center break-all",
                                            children: f.address
                                        })
                                    }), (0, a.jsx)("button", {
                                        onClick: o,
                                        className: "w-full py-3 bg-black/60 backdrop-blur-sm text-gold-400 text-xl font-bold rounded hover:bg-black/80 transition-all",
                                        children: "\\/"
                                    })]
                                })]
                            }) : (0, a.jsxs)("div", {
                                className: "space-y-6",
                                children: [(0, a.jsxs)("div", {
                                    className: "flex justify-between items-center",
                                    children: [(0, a.jsx)("h2", {
                                        className: "text-2xl font-bold text-gold-300",
                                        children: "WALLET"
                                    }), (0, a.jsx)("button", {
                                        onClick: o,
                                        className: "text-gold-400 hover:text-gold-300 text-2xl",
                                        children: "\xd7"
                                    })]
                                }), (0, a.jsx)("div", {
                                    className: "p-4 bg-gold-500/10 border border-gold-500/30 rounded",
                                    children: (0, a.jsx)("p", {
                                        className: "text-sm text-gold-300",
                                        children: "Client-side wallet. Your keys stay in your browser. Encrypted at rest with your password."
                                    })
                                }), (0, a.jsxs)("div", {
                                    className: "space-y-3",
                                    children: [k && (0, a.jsx)("button", {
                                        onClick: eR,
                                        disabled: L,
                                        className: "w-full px-6 py-3 bg-gold-500 text-black font-bold rounded hover:bg-gold-400 transition-all disabled:opacity-50",
                                        children: L ? "UNLOCKING..." : "UNLOCK WALLET"
                                    }), (0, a.jsx)("button", {
                                        onClick: eW,
                                        disabled: L,
                                        className: "w-full px-6 py-3 bg-gold-500 text-black font-bold rounded hover:bg-gold-400 transition-all disabled:opacity-50",
                                        children: L ? "GENERATING..." : "CREATE WALLET"
                                    }), (0, a.jsx)("button", {
                                        onClick: eO,
                                        className: "w-full px-6 py-3 bg-gold-500/10 text-gold-400 font-bold rounded border border-gold-500/30 hover:bg-gold-500/20 transition-all",
                                        children: "IMPORT PRIVATE KEY"
                                    }), (0, a.jsx)("button", {
                                        onClick: eD,
                                        className: "w-full px-6 py-3 bg-gold-500/10 text-gold-400 font-bold rounded border border-gold-500/30 hover:bg-gold-500/20 transition-all",
                                        children: "IMPORT SEED PHRASE"
                                    })]
                                })]
                            })
                        })
                    }), F && f && (0, a.jsx)("div", {
                        className: "fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-6 overflow-y-auto",
                        children: (0, a.jsxs)("div", {
                            className: "backdrop-blur-xl bg-black/40 border border-gold-500/30 rounded max-w-3xl w-full p-8 my-8",
                            children: [(0, a.jsx)("h3", {
                                className: "text-2xl font-bold text-gold-300 mb-4",
                                children: "WALLET CREATED - BACKUP NOW"
                            }), (0, a.jsx)("div", {
                                className: "bg-gold-500/10 border border-gold-500/30 rounded p-4 mb-6",
                                children: (0, a.jsxs)("p", {
                                    className: "text-sm text-gold-300",
                                    children: [(0, a.jsx)("strong", {
                                        children: "CRITICAL:"
                                    }), " Save both your private key and 12-word phrase. Store them securely offline. You need these to recover your wallet."]
                                })
                            }), (0, a.jsxs)("div", {
                                className: "mb-6",
                                children: [(0, a.jsx)("h4", {
                                    className: "text-lg font-bold text-gold-300 mb-3",
                                    children: "Private Key (WIF)"
                                }), (0, a.jsx)("div", {
                                    className: "bg-black/40 p-4 rounded mb-2 break-all",
                                    children: (0, a.jsx)("p", {
                                        className: "text-gold-300 font-mono text-sm",
                                        children: f.privateKey
                                    })
                                }), (0, a.jsx)("button", {
                                    onClick: () => {
                                        navigator.clipboard.writeText(f.privateKey), alert("Private key copied to clipboard!")
                                    },
                                    className: "w-full px-4 py-2 bg-gold-500/10 text-gold-400 text-sm border border-gold-500/30 rounded hover:bg-gold-500/20 transition-all",
                                    children: "Copy Private Key"
                                })]
                            }), (0, a.jsxs)("div", {
                                className: "mb-6",
                                children: [(0, a.jsx)("h4", {
                                    className: "text-lg font-bold text-gold-300 mb-3",
                                    children: "12-Word Recovery Phrase"
                                }), (0, a.jsx)("div", {
                                    className: "grid grid-cols-3 gap-3 mb-2",
                                    children: f.mnemonic.split(" ").map((e, t) => (0, a.jsxs)("div", {
                                        className: "bg-black/40 p-3 rounded text-center",
                                        children: [(0, a.jsxs)("span", {
                                            className: "text-gold-200/60 text-xs",
                                            children: [t + 1, ". "]
                                        }), (0, a.jsx)("span", {
                                            className: "text-gold-300 font-mono text-sm",
                                            children: e
                                        })]
                                    }, t))
                                }), (0, a.jsx)("button", {
                                    onClick: () => {
                                        (null == f ? void 0 : f.mnemonic) && (navigator.clipboard.writeText(f.mnemonic), alert("Mnemonic copied!"))
                                    },
                                    className: "w-full px-4 py-2 bg-gold-500/10 text-gold-400 text-sm border border-gold-500/30 rounded hover:bg-gold-500/20 transition-all",
                                    children: "Copy 12-Word Phrase"
                                })]
                            }), (0, a.jsx)("button", {
                                onClick: () => z(!1),
                                className: "w-full px-6 py-3 bg-gold-500 text-black font-bold rounded hover:bg-gold-400 transition-all",
                                children: "I HAVE SAVED MY BACKUP"
                            })]
                        })
                    }), U && (0, a.jsx)("div", {
                        className: "fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60] p-6",
                        children: (0, a.jsxs)("div", {
                            className: "backdrop-blur-xl bg-black/30 border border-gold-500/20 rounded max-w-md w-full p-6 text-center",
                            children: [(0, a.jsx)("h3", {
                                className: "text-xl font-bold text-gold-400 mb-6 uppercase tracking-wide",
                                children: "RECEIVE ZEC"
                            }), _ && (0, a.jsx)("div", {
                                className: "bg-white p-4 rounded mb-6 inline-block",
                                children: (0, a.jsx)("img", {
                                    src: _,
                                    alt: "Wallet QR",
                                    className: "w-64 h-64"
                                })
                            }), (0, a.jsx)("div", {
                                className: "bg-black/40 p-3 rounded mb-6",
                                children: (0, a.jsx)("p", {
                                    className: "text-white font-mono text-xs break-all",
                                    children: null == f ? void 0 : f.address
                                })
                            }), (0, a.jsxs)("div", {
                                className: "grid grid-cols-2 gap-3",
                                children: [(0, a.jsx)("button", {
                                    onClick: eB,
                                    className: "px-6 py-3 bg-gold-500 text-black font-bold rounded hover:bg-gold-400 transition-colors",
                                    children: "COPY"
                                }), (0, a.jsx)("button", {
                                    onClick: () => W(!1),
                                    className: "px-6 py-3 bg-black/60 backdrop-blur-sm text-gold-400 font-bold rounded hover:bg-black/80 transition-colors",
                                    children: "CLOSE"
                                })]
                            })]
                        })
                    }), O && (0, a.jsx)("div", {
                        className: "fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-6",
                        children: (0, a.jsxs)("div", {
                            className: "backdrop-blur-xl bg-black/40 border border-gold-500/30 rounded max-w-md w-full p-8",
                            children: [(0, a.jsx)("h3", {
                                className: "text-2xl font-bold text-gold-300 mb-6",
                                children: "SEND ZEC"
                            }), (0, a.jsxs)("div", {
                                className: "space-y-4 mb-6",
                                children: [(0, a.jsxs)("div", {
                                    children: [(0, a.jsx)("label", {
                                        className: "block text-gold-200/80 text-sm mb-2",
                                        children: "To Address"
                                    }), (0, a.jsx)("input", {
                                        type: "text",
                                        value: X.to,
                                        onChange: e => Y({
                                            ...X,
                                            to: e.target.value
                                        }),
                                        disabled: G,
                                        className: "w-full bg-black/40 border border-gold-500/30 rounded px-4 py-3 text-gold-300 font-mono text-sm disabled:opacity-50",
                                        placeholder: "t1..."
                                    })]
                                }), (0, a.jsxs)("div", {
                                    children: [(0, a.jsx)("label", {
                                        className: "block text-gold-200/80 text-sm mb-2",
                                        children: "Amount (ZEC)"
                                    }), (0, a.jsx)("input", {
                                        type: "number",
                                        step: "0.0001",
                                        value: X.amount,
                                        onChange: e => Y({
                                            ...X,
                                            amount: e.target.value
                                        }),
                                        disabled: G,
                                        className: "w-full bg-black/40 border border-gold-500/30 rounded px-4 py-3 text-gold-300 disabled:opacity-50",
                                        placeholder: "0.0000"
                                    })]
                                }), (0, a.jsxs)("div", {
                                    className: "text-sm text-gold-200/60",
                                    children: ["Available: ", e_.toFixed(4), " ZEC"]
                                })]
                            }), (0, a.jsxs)("div", {
                                className: "grid grid-cols-2 gap-4",
                                children: [(0, a.jsx)("button", {
                                    onClick: eM,
                                    disabled: G || !X.to || !X.amount,
                                    className: "px-6 py-3 bg-gold-500 text-black font-bold rounded hover:bg-gold-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                                    children: G ? "SENDING..." : "SEND"
                                }), (0, a.jsx)("button", {
                                    onClick: () => D(!1),
                                    disabled: G,
                                    className: "px-6 py-3 bg-gold-500/20 text-gold-400 font-bold rounded border border-gold-500/30 hover:bg-gold-500/30 transition-all disabled:opacity-50",
                                    children: "CANCEL"
                                })]
                            })]
                        })
                    }), R && f && (0, a.jsx)("div", {
                        className: "fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-6",
                        children: (0, a.jsxs)("div", {
                            className: "backdrop-blur-xl bg-black/40 border border-gold-500/30 rounded max-w-lg w-full p-8",
                            children: [(0, a.jsx)("h3", {
                                className: "text-xl font-bold text-gold-400 mb-4",
                                children: "Export Wallet"
                            }), (0, a.jsx)("div", {
                                className: "p-4 bg-red-500/10 border border-red-500/30 rounded mb-6",
                                children: (0, a.jsx)("p", {
                                    className: "text-red-400 text-sm font-bold",
                                    children: "WARNING: Never share these keys. Anyone with them can steal your funds."
                                })
                            }), (0, a.jsxs)("div", {
                                className: "space-y-6",
                                children: [(0, a.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [(0, a.jsxs)("div", {
                                        className: "flex items-center justify-between",
                                        children: [(0, a.jsx)("label", {
                                            className: "text-xs text-gold-200/60 uppercase tracking-wider",
                                            children: "Private Key (WIF)"
                                        }), (0, a.jsx)("button", {
                                            onClick: () => eS(!eC),
                                            className: "text-[10px] text-gold-400 hover:text-gold-300 uppercase tracking-wider",
                                            children: eC ? "Hide" : "Show"
                                        })]
                                    }), (0, a.jsxs)("div", {
                                        className: "p-3 bg-black/60 border border-gold-500/20 rounded break-all font-mono text-xs text-gold-100/80 relative ".concat(eC ? "" : "cursor-pointer"),
                                        onClick: () => !eC && eS(!0),
                                        children: [(0, a.jsx)("div", {
                                            className: eC ? "" : "blur-sm select-none",
                                            children: f.privateKey
                                        }), !eC && (0, a.jsx)("div", {
                                            className: "absolute inset-0 flex items-center justify-center",
                                            children: (0, a.jsx)("span", {
                                                className: "text-gold-400/50 text-[10px] uppercase tracking-widest font-bold",
                                                children: "Click to Reveal"
                                            })
                                        })]
                                    }), (0, a.jsx)("button", {
                                        onClick: () => eH(f.privateKey, "Private Key"),
                                        className: "w-full py-2 bg-gold-500/10 text-gold-400 text-xs border border-gold-500/30 rounded hover:bg-gold-500/20 transition-all",
                                        children: "Copy Private Key"
                                    })]
                                }), (0, a.jsxs)("div", {
                                    className: "space-y-2 pt-4 border-t border-gold-500/10",
                                    children: [(0, a.jsxs)("div", {
                                        className: "flex items-center justify-between",
                                        children: [(0, a.jsx)("label", {
                                            className: "text-xs text-gold-200/60 uppercase tracking-wider",
                                            children: "Recovery Phrase"
                                        }), f.mnemonic && (0, a.jsx)("button", {
                                            onClick: () => eA(!eE),
                                            className: "text-[10px] text-gold-400 hover:text-gold-300 uppercase tracking-wider",
                                            children: eE ? "Hide" : "Show"
                                        })]
                                    }), f.mnemonic ? (0, a.jsxs)(a.Fragment, {
                                        children: [(0, a.jsxs)("div", {
                                            className: "p-3 bg-black/60 border border-gold-500/20 rounded break-words font-mono text-xs text-gold-100/80 relative ".concat(eE ? "" : "cursor-pointer"),
                                            onClick: () => !eE && eA(!0),
                                            children: [(0, a.jsx)("div", {
                                                className: eE ? "" : "blur-sm select-none",
                                                children: f.mnemonic
                                            }), !eE && (0, a.jsx)("div", {
                                                className: "absolute inset-0 flex items-center justify-center",
                                                children: (0, a.jsx)("span", {
                                                    className: "text-gold-400/50 text-[10px] uppercase tracking-widest font-bold",
                                                    children: "Click to Reveal"
                                                })
                                            })]
                                        }), (0, a.jsx)("button", {
                                            onClick: () => eH(f.mnemonic, "Seed Phrase"),
                                            className: "w-full py-2 bg-gold-500/10 text-gold-400 text-xs border border-gold-500/30 rounded hover:bg-gold-500/20 transition-all",
                                            children: "Copy Seed Phrase"
                                        })]
                                    }) : (0, a.jsx)("div", {
                                        className: "p-3 bg-black/20 border border-gold-500/10 rounded text-center",
                                        children: (0, a.jsx)("p", {
                                            className: "text-gold-400/30 text-xs italic",
                                            children: "No recovery phrase available (imported via private key)"
                                        })
                                    })]
                                })]
                            }), (0, a.jsx)("div", {
                                className: "mt-8 flex justify-end",
                                children: (0, a.jsx)("button", {
                                    onClick: () => {
                                        K(!1), eS(!1), eA(!1)
                                    },
                                    className: "px-6 py-2 bg-gold-500 text-black font-bold rounded hover:bg-gold-400 transition-all",
                                    children: "Done"
                                })
                            })]
                        })
                    })]
                }) : null
            }
        },
        43072: function(e, t, o) {
            "use strict";
            o.d(t, {
                c: function() {
                    return r
                },
                s: function() {
                    return a
                }
            });
            let a = {
                zgods: {
                    slug: "zgods",
                    name: "ZGODS",
                    description: "Official PFP collection of the $ZERO ZRC20 Community.",
                    supply: 1e4,
                    metaCid: "bafybeicqjqzixdtawkbcuyaagrmk3vyfweidwzb6hwbucadhoxoe2pd3qm",
                    imageCid: "bafybeiaqmceddfi4y3dyqwepjs6go477x35ypaojwgegcsee2vgy63yobq",
                    claimWhitelistPath: "/collections/zgods/claim/whitelist.csv",
                    themeColor: "#0b0b0b"
                }
            };

            function r(e) {
                var t;
                return null !== (t = a[e.toLowerCase()]) && void 0 !== t ? t : null
            }
        },
        2707: function(e, t, o) {
            "use strict";
            o.d(t, {
                aH: function() {
                    return i
                },
                NH: function() {
                    return c
                },
                nY: function() {
                    return s
                }
            });
            let a = ["https://dweb.link/ipfs", "https://ipfs.io/ipfs", "https://cloudflare-ipfs.com/ipfs", "https://gateway.pinata.cloud/ipfs"];
            a.filter(e => !e.startsWith("/"));
            let r = e => Array.from(new Set(e.filter(Boolean))),
                l = (e, t) => {
                    let o = new URLSearchParams;
                    return o.set("cid", e), t && o.set("path", t.replace(/^\/+/, "")), "/api/ipfs/proxy?".concat(o.toString())
                },
                n = function(e, t) {
                    let o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
                    return "".concat(a[o], "/").concat(e, "/").concat(t)
                };
            async function s(e, t) {
                let o;
                for (let s of function(e, t) {
                        let o = [];
                        return o.push("/collections/".concat(e.slug, "/claim/metadata/").concat(t, ".json")), e.metaCid && (o.push(l(e.metaCid, "".concat(t, ".json"))), a.forEach((a, r) => {
                            o.push(n(e.metaCid, "".concat(t, ".json"), r))
                        })), r(o)
                    }(e, t)) try {
                    let e = await fetch(s, {
                        cache: "force-cache"
                    });
                    if (!e.ok) continue;
                    return await e.json()
                } catch (e) {
                    o = e
                }
                return o && console.warn("Metadata fetch failed for ".concat(e.slug, " #").concat(t), o), null
            }

            function i(e, t, o) {
                let s = (null == o ? void 0 : o.img) || ("string" == typeof(null == o ? void 0 : o.image) ? o.image : void 0);
                return r([...e.imageCid ? [l(e.imageCid, "".concat(t, ".png"))] : [], ...e.imageCid ? a.map((o, a) => n(e.imageCid, "".concat(t, ".png"), a)) : [], s || void 0])
            }

            function c(e, t, o) {
                return (null == o ? void 0 : o.name) || "".concat(e.name, " ").concat(t)
            }
        },
        5585: function(e, t, o) {
            "use strict";
            o.d(t, {
                Hl: function() {
                    return u
                },
                i_: function() {
                    return g
                },
                wK: function() {
                    return h
                }
            });
            var a = o(9109),
                r = o(71739),
                l = o(62921),
                n = o(15238),
                s = o(45710),
                i = o(65530),
                c = o(27973);
            let d = o(3489);
            async function u() {
                let e = (0, r.OF)(l.U, 128),
                    t = (0, r.Z1)(e),
                    o = a.Buffer.from(t),
                    n = d.HDPrivateKey.fromSeed(o, d.Networks.livenet).derive("m/44'/133'/0'/0/0").privateKey,
                    s = n.toWIF(),
                    i = n.publicKey.toString();
                return {
                    address: n.toAddress().toString(),
                    privateKey: s,
                    publicKey: i,
                    mnemonic: e
                }
            }
            async function h(e) {
                try {
                    if (!(0, r._I)(e, l.U)) throw Error("Invalid mnemonic phrase");
                    let t = (0, r.Z1)(e),
                        o = a.Buffer.from(t),
                        n = d.HDPrivateKey.fromSeed(o, d.Networks.livenet).derive("m/44'/133'/0'/0/0").privateKey,
                        s = n.toWIF(),
                        i = n.publicKey.toString();
                    return {
                        address: n.toAddress().toString(),
                        privateKey: s,
                        publicKey: i,
                        mnemonic: e
                    }
                } catch (e) {
                    throw console.error("Wallet import failed:", e instanceof Error ? e.message : String(e)), Error("Failed to import wallet. Please check your seed phrase.")
                }
            }
            async function g(e) {
                let {
                    privateKey: t,
                    compressed: o
                } = function(e) {
                    let t = n.default.decode(e);
                    if (128 !== t[0]) throw Error("Invalid WIF version");
                    if (33 !== t.length && 34 !== t.length) throw Error("Invalid WIF length");
                    let o = 34 === t.length && 1 === t[t.length - 1],
                        a = t.slice(1, 33);
                    if (!s.utils.isValidPrivateKey(a)) throw Error("Invalid private key");
                    return {
                        privateKey: a,
                        compressed: o,
                        version: t[0]
                    }
                }(e), r = s.getPublicKey(t, !1 !== o), l = a.Buffer.from(r).toString("hex");
                return {
                    address: function(e) {
                        let t = (0, i.JQ)(e),
                            o = (0, c.b)(t),
                            r = a.Buffer.from([28, 184]),
                            l = a.Buffer.concat([r, a.Buffer.from(o)]);
                        return n.default.encode(l)
                    }(a.Buffer.from(r)),
                    privateKey: e,
                    publicKey: l
                }
            }
        },
        38408: function(e, t, o) {
            "use strict";
            o.d(t, {
                c: function() {
                    return r
                }
            });
            class a {
                async apiCall(e, t) {
                    let o = await fetch("".concat(this.baseUrl).concat(e), {
                        ...t,
                        headers: {
                            "Content-Type": "application/json",
                            ...null == t ? void 0 : t.headers
                        },
                        cache: "no-store"
                    });
                    if (!o.ok) {
                        let t = await o.text();
                        throw Error("Ordinal Index API error (".concat(e, "): ").concat(o.status, " ").concat(t))
                    }
                    return await o.json()
                }
                async getTokens() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100,
                        o = arguments.length > 2 ? arguments[2] : void 0,
                        a = new URLSearchParams({
                            page: e.toString(),
                            limit: t.toString()
                        });
                    return o && a.set("q", o), this.apiCall("/api/v1/tokens?".concat(a.toString()))
                }
                async getStatus() {
                    return this.apiCall("/api/v1/status")
                }
                async getHealth() {
                    return this.apiCall("/api/v1/healthz")
                }
                async getZRC20Status() {
                    return this.apiCall("/api/v1/zrc20/status")
                }
                async getTokenBalances(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 100,
                        a = arguments.length > 3 ? arguments[3] : void 0,
                        r = new URLSearchParams({
                            page: t.toString(),
                            limit: o.toString()
                        });
                    return (null == a ? void 0 : a.positiveOnly) && r.set("positive_only", "true"), this.apiCall("/api/v1/zrc20/token/".concat(e.toLowerCase(), "/balances?").concat(r.toString()))
                }
                async getTokenSummary(e) {
                    return this.apiCall("/api/v1/zrc20/token/".concat(e.toLowerCase(), "/summary"))
                }
                async getTokenIntegrity(e) {
                    return this.apiCall("/api/v1/zrc20/token/".concat(e.toLowerCase(), "/integrity"))
                }
                async getAddressPortfolio(e) {
                    return this.apiCall("/api/v1/zrc20/address/".concat(e))
                }
                async getTransfer(e) {
                    return this.apiCall("/api/v1/zrc20/transfer/".concat(e))
                }
                async getZRC721Collections() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 50;
                    return this.apiCall("/api/v1/zrc721/collections?page=".concat(e, "&limit=").concat(t))
                }
                async getZRC721Collection(e) {
                    return this.apiCall("/api/v1/zrc721/collection/".concat(e))
                }
                async getZRC721CollectionTokens(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 200;
                    return this.apiCall("/api/v1/zrc721/collection/".concat(e, "/tokens?page=").concat(t, "&limit=").concat(o))
                }
                async getZRC721Status() {
                    return this.apiCall("/api/v1/zrc721/status")
                }
                async getNames() {
                    var e, t, o, a, r;
                    let l = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                        n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 50,
                        s = arguments.length > 2 ? arguments[2] : void 0,
                        i = new URLSearchParams({
                            page: String(l),
                            limit: String(n)
                        });
                    s && i.set("tld", s);
                    let c = await this.apiCall("/api/v1/names?".concat(i.toString())),
                        d = Array.isArray(c) ? c : null !== (e = null == c ? void 0 : c.items) && void 0 !== e ? e : [];
                    return {
                        page: null !== (t = null == c ? void 0 : c.page) && void 0 !== t ? t : l,
                        limit: null !== (o = null == c ? void 0 : c.limit) && void 0 !== o ? o : n,
                        total: null !== (a = null == c ? void 0 : c.total) && void 0 !== a ? a : void 0,
                        has_more: null !== (r = null == c ? void 0 : c.has_more) && void 0 !== r ? r : Array.isArray(d) && d.length === n,
                        items: d
                    }
                }
                constructor() {
                    this.baseUrl = "/api/ordinal-index"
                }
            }
            let r = new a
        },
        76864: function(e, t, o) {
            "use strict";
            o.d(t, {
                K: function() {
                    return c
                }
            });
            var a = o(3489),
                r = o(98098),
                l = o(79737);
            async function n(e) {
                try {
                    let t = (await r.o.getFeeEstimate()).feerate || 1e-4;
                    return Math.ceil(e / 1e3 * t * 1e8)
                } catch (t) {
                    return console.warn("Failed to get fee estimate, using default:", t), Math.ceil(e / 1e3 * 1e4)
                }
            }

            function s(e, t) {
                return 180 * e + 34 * t + 10
            }
            async function i(e, t, o, r, l) {
                if (o <= 0) throw Error("Amount must be greater than 0");
                if (0 === r.length) throw Error("No UTXOs available");
                try {
                    a.Address.fromString(t), a.Address.fromString(e)
                } catch (e) {
                    throw Error("Invalid Zcash address")
                }
                let i = Math.floor(1e8 * o),
                    c = function(e, t) {
                        let o = [...e].sort((e, t) => e.satoshis - t.satoshis),
                            a = [],
                            r = 0,
                            l = e => Math.ceil(e / 1e3 * 1e4);
                        for (let e of o)
                            if (a.push(e), (r += e.satoshis) >= t + l(s(a.length, 2))) break;
                        let n = l(s(a.length, 2));
                        if (r < t + n) throw Error("Insufficient funds. Need ".concat((t + n) / 1e8, " ZEC, have ").concat(r / 1e8, " ZEC"));
                        return a
                    }(r, i),
                    d = c.reduce((e, t) => e + t.satoshis, 0),
                    u = new a.Transaction,
                    h = c.map(t => new a.Transaction.UnspentOutput({
                        txId: t.txid,
                        outputIndex: t.vout,
                        address: e,
                        script: a.Script.buildPublicKeyHashOut(a.Address.fromString(e)).toHex(),
                        satoshis: t.satoshis
                    }));
                u.from(h), u.to(t, i);
                let g = s(c.length, 2),
                    p = await n(g),
                    b = d - i - p;
                if (b > 546) u.to(e, b);
                else if (b < 0) throw Error("Insufficient funds to cover fee. Need ".concat(p / 1e8, " ZEC fee"));
                try {
                    let e = a.PrivateKey.fromWIF(l);
                    return u.sign(e), {
                        signedTx: u.serialize(),
                        fee: p,
                        selectedUtxos: c
                    }
                } catch (e) {
                    throw Error("Failed to sign transaction: ".concat(e instanceof Error ? e.message : "Unknown error"))
                }
            }
            async function c(e, t, o, a) {
                console.log("\uD83D\uDCE4 Sending ZEC..."), console.log("   From: ".concat(e)), console.log("   To: ".concat(t)), console.log("   Amount: ".concat(o, " ZEC")), console.log("   Fetching UTXOs...");
                let n = await r.o.getUTXOs(e);
                if (0 === n.length) throw Error("No UTXOs available. Address may have no balance.");
                console.log("   Found ".concat(n.length, " UTXOs")), console.log("   Checking for inscribed UTXOs...");
                let s = await (0, l.fY)(e, n, "send");
                console.log("   Using ".concat(s.length, " safe UTXOs")), console.log("   Building and signing transaction...");
                let {
                    signedTx: c,
                    fee: d,
                    selectedUtxos: u
                } = await i(e, t, o, s, a);
                console.log("   Using ".concat(u.length, " inputs")), console.log("   Fee: ".concat(d / 1e8, " ZEC")), console.log("   Broadcasting transaction...");
                let h = await r.o.broadcastTransaction(c);
                console.log("   ✅ Transaction broadcast!"), console.log("   TXID: ".concat(h));
                let g = u.reduce((e, t) => e + t.satoshis, 0) - 1e8 * o - d;
                return {
                    txid: h,
                    fee: d / 1e8,
                    sentAmount: o,
                    changeAmount: g / 1e8
                }
            }
        },
        98098: function(e, t, o) {
            "use strict";
            o.d(t, {
                o: function() {
                    return r
                }
            });
            class a {
                async apiCall(e) {
                    try {
                        let t = await fetch("".concat(this.apiUrl).concat(e), {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });
                        if (!t.ok) throw Error("API call failed: ".concat(t.statusText));
                        return await t.json()
                    } catch (t) {
                        throw console.error("Zcash API error (".concat(e, "):"), t), t
                    }
                }
                async getBlockCount() {
                    var e, t;
                    return null !== (t = null === (e = (await this.apiCall("/node-status")).blockchainInfo) || void 0 === e ? void 0 : e.blocks) && void 0 !== t ? t : 0
                }
                async getBlockchainInfo() {
                    var e;
                    let t = (await this.apiCall("/node-status")).blockchainInfo || {};
                    return {
                        chain: t.chain || "main",
                        blocks: t.blocks || 0,
                        headers: t.headers || t.blocks || 0,
                        bestblockhash: t.bestblockhash || "",
                        difficulty: t.difficulty || 0,
                        verificationprogress: null !== (e = t.verificationprogress) && void 0 !== e ? e : 1,
                        chainwork: t.chainwork || "",
                        pruned: !!t.pruned,
                        commitments: t.commitments,
                        valuePools: t.valuePools,
                        softforks: t.softforks,
                        upgrades: t.upgrades,
                        consensus: t.consensus
                    }
                }
                async getNodeStatus() {
                    return this.apiCall("/node-status")
                }
                async getBlockHash(e) {
                    return (await this.apiCall("/dashboards/block/".concat(e))).data.block.hash
                }
                async getBlock(e) {
                    let t = (await this.apiCall("/dashboards/block/".concat(e))).data.block;
                    return {
                        hash: t.hash,
                        confirmations: 1,
                        height: t.id,
                        version: t.version,
                        merkleroot: "",
                        time: new Date(t.time).getTime() / 1e3,
                        nonce: "",
                        bits: "",
                        difficulty: t.difficulty,
                        previousblockhash: t.previous_block_hash,
                        nextblockhash: t.next_block_hash
                    }
                }
                async getBlockByHeight(e) {
                    return this.getBlock(e.toString())
                }
                async getBestBlockHash() {
                    return (await this.apiCall("/stats")).data.best_block_hash
                }
                async getNetworkHashPS() {
                    return (await this.apiCall("/stats")).data.hashrate_24h
                }
                async getMiningInfo() {
                    return this.apiCall("/stats")
                }
                async getBalance(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    try {
                        let o = await fetch(t ? "/api/zcash/balance/".concat(e, "?refresh=true") : "/api/zcash/balance/".concat(e)),
                            a = await o.json();
                        return {
                            confirmed: a.confirmed || 0,
                            unconfirmed: a.unconfirmed || 0
                        }
                    } catch (e) {
                        return console.error("Balance API failed:", e), {
                            confirmed: 0,
                            unconfirmed: 0
                        }
                    }
                }
                async getPrice() {
                    try {
                        let e = await fetch("/api/zcash/price");
                        return (await e.json()).usd || 0
                    } catch (e) {
                        return console.error("Failed to fetch price:", e), 0
                    }
                }
                async getFeeEstimate() {
                    try {
                        let e = await fetch("/api/zcash/fees");
                        return await e.json()
                    } catch (e) {
                        return console.error("Failed to fetch fees:", e), {
                            feerate: 1e-4,
                            blocks: 6
                        }
                    }
                }
                async broadcastTransaction(e) {
                    try {
                        let t = await fetch("/api/zcash/broadcast", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    signedTx: e
                                })
                            }),
                            o = await t.json();
                        if (o.error) throw Error(o.error);
                        return o.txid
                    } catch (e) {
                        throw console.error("Failed to broadcast transaction:", e), e
                    }
                }
                async getUTXOs(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    try {
                        let o = await fetch(t ? "/api/zcash/utxos/".concat(e, "?refresh=true") : "/api/zcash/utxos/".concat(e));
                        return (await o.json()).utxos || []
                    } catch (e) {
                        return console.error("Failed to fetch UTXOs:", e), []
                    }
                }
                async getInscriptions(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    try {
                        let o = await fetch(t ? "/api/zcash/inscriptions/".concat(e, "?refresh=true") : "/api/zcash/inscriptions/".concat(e)),
                            a = await o.json();
                        return {
                            inscribedLocations: a.inscribedLocations || [],
                            count: a.count || 0,
                            inscriptions: a.inscriptions || []
                        }
                    } catch (e) {
                        return console.error("Failed to fetch inscriptions:", e), {
                            inscribedLocations: [],
                            count: 0,
                            inscriptions: []
                        }
                    }
                }
                constructor() {
                    this.apiUrl = "/api/zcash"
                }
            }
            let r = new a
        },
        79737: function(e, t, o) {
            "use strict";
            async function a(e) {
                try {
                    let t = await fetch("/api/zcash/inscriptions/".concat(e)),
                        o = await t.json();
                    return {
                        inscribedLocations: o.inscribedLocations || [],
                        count: o.count || 0
                    }
                } catch (e) {
                    return console.error("Failed to fetch inscriptions:", e), {
                        inscribedLocations: [],
                        count: 0
                    }
                }
            }
            async function r(e, t) {
                let o = await a(e),
                    r = new Set(o.inscribedLocations),
                    l = [],
                    n = [];
                for (let e of t) {
                    let t = "".concat(e.txid, ":").concat(e.vout);
                    r.has(t) ? n.push(e) : l.push(e)
                }
                return {
                    safeUtxos: l,
                    inscribedUtxos: n,
                    totalUtxos: t.length,
                    inscribedCount: n.length,
                    inscriptionCount: o.count
                }
            }
            async function l(e, t) {
                let o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "transaction";
                if (0 === t.length) throw Error("No UTXOs available");
                let {
                    safeUtxos: a,
                    inscribedCount: l,
                    totalUtxos: n
                } = await r(e, t);
                if (l > 0 && console.log("⚠️  Inscription Protection: Filtered out ".concat(l, "/").concat(n, " inscribed UTXOs")), 0 === a.length) throw Error("Cannot proceed with ".concat(o, ": All ").concat(n, " UTXOs contain inscriptions. ") + "Spending inscribed UTXOs would destroy your inscriptions permanently.");
                return a
            }
            o.d(t, {
                fY: function() {
                    return l
                }
            })
        }
    }
]);