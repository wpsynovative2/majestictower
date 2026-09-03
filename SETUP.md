# Majestic Tower — Setup Guide

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4.
Leads go to a Google Sheet **and** an email inbox via a Google Apps Script web
app, with invisible reCAPTCHA v3 verified server-side.

---

## 1. Run it locally

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev
```

The site is a single page at `/`. It builds fully static — `npm run build`.

---

## 2. Google Apps Script (Sheet + Email)

### 2.1 Create the sheet

1. Create a new Google Sheet, name it e.g. **Majestic Tower Leads**.
2. Copy the ID out of the URL:
   `https://docs.google.com/spreadsheets/d/`**`<THIS_IS_THE_ID>`**`/edit`

### 2.2 Add the script

1. In that sheet: **Extensions → Apps Script**.
2. Delete the placeholder `Code.gs` contents and paste
   [`google-apps-script/Code.gs`](google-apps-script/Code.gs) in full.
3. Save.

### 2.3 Script properties

**Project Settings** (gear icon) → **Script properties** → *Add script property*:

| Property | Value | Notes |
| --- | --- | --- |
| `SHEET_ID` | `<your sheet id>` | Required. |
| `SHEET_NAME` | `Leads` | Tab name; created automatically. |
| `NOTIFY_EMAIL` | `sales@patilbuilders.in` | Comma-separate for several recipients. |
| `RECAPTCHA_SECRET` | `6L…` | The **secret** key from reCAPTCHA (see §3). |
| `RECAPTCHA_MIN_SCORE` | `0.5` | Below this, the lead is rejected as spam. |
| `REQUIRE_RECAPTCHA` | `true` | Set `false` only while testing without keys. |
| `SHARED_TOKEN` | *(optional)* | Leave empty unless you also send it from the client. |

### 2.4 Authorise and test

1. In the editor, pick the `setup` function → **Run**. Approve the OAuth prompts
   (Google will warn the app is unverified — it is your own script; choose
   *Advanced → Go to project*).
2. Temporarily set `REQUIRE_RECAPTCHA` to `false`, run `testSubmission`, and
   confirm a row lands in the sheet and an email arrives. Set it back to `true`.

### 2.5 Deploy as a web app

**Deploy → New deployment → Web app**

| Field | Value |
| --- | --- |
| Description | `Majestic Tower lead receiver` |
| Execute as | **Me** |
| Who has access | **Anyone** |

Copy the resulting `…/exec` URL into `NEXT_PUBLIC_LEAD_ENDPOINT`.

> **After every code change:** *Deploy → Manage deployments → ✏️ → Version:
> New version → Deploy.* Without this the live URL keeps serving the old code.

Sanity check: opening the `/exec` URL in a browser should return
`{"ok":true,"service":"Majestic Tower lead receiver"}`.

---

## 3. reCAPTCHA v3

1. Go to <https://www.google.com/recaptcha/admin/create>.
2. **Label:** Majestic Tower · **Type:** reCAPTCHA v3.
3. **Domains:** add your production domain *and* `localhost` for development.
4. Accept the terms and submit. You get two keys:

| Key | Goes in | Why |
| --- | --- | --- |
| **Site key** (public) | `.env.local` → `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Loaded in the browser to mint tokens. |
| **Secret key** | Apps Script property `RECAPTCHA_SECRET` | Used server-side to call `siteverify`. Never ship it to the browser. |

The widget is invisible — no checkbox, no image challenge. The badge is
suppressed and replaced by the required text attribution under each form.

Every submit mints a fresh, single-use token with an action name derived from
the form's source (`enquiry_popup`, `exit_intent_popup`, `site_visit_form`, …).
The Apps Script verifies it, checks the score against `RECAPTCHA_MIN_SCORE`, and
records the score in the sheet so you can tune the threshold from real data.

---

## 4. Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_LEAD_ENDPOINT` | ✅ | Apps Script `/exec` URL. Without it, forms show a configuration error. |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | ✅ | reCAPTCHA v3 site key. If absent, forms still work but send no token. |
| `NEXT_PUBLIC_SITE_URL` | recommended | Absolute URLs for Open Graph, Twitter cards, JSON-LD. |
| `NEXT_PUBLIC_BROCHURE_URL` | optional | Where the gated brochure download points. Default `/majestic-tower-brochure.pdf`. |
| `NEXT_PUBLIC_GTM_ID` | optional | Google Tag Manager container. Defaults to `GTM-54X3PCH8`; set it empty to drop the GTM tags. |

Set the same variables in your host's dashboard (Vercel → Settings →
Environment Variables) before the production build.

---

## 5. Google Tag Manager

The container snippet is rendered in `app/layout.tsx`:

- the loader is a raw `<script>` inside an explicit `<head>`, so it sits in the
  server-rendered head exactly where GTM expects it;
- the `<noscript>` iframe is the first element rendered in `<body>`.

`next/script` with `strategy="beforeInteractive"` is **not** used here: in
Next 16 that emits the script at the top of `<body>` rather than in `<head>`,
whatever the docs say about hoisting.

The container ID comes from `NEXT_PUBLIC_GTM_ID` and falls back to
`GTM-54X3PCH8`. Setting the variable to an empty string removes both tags,
which is handy for staging environments you do not want polluting analytics.

---

## 6. How a submission travels

```
LeadForm  ──validate──▶  reCAPTCHA v3 token  ──▶  POST (text/plain JSON)
                                                        │
                                            Apps Script doPost
                                                        │
                       ┌────────────────────────────────┼──────────────────┐
                  siteverify                     appendRow()         MailApp
              (score ≥ threshold)            → Google Sheet      → sales inbox
```

`Content-Type: text/plain` is deliberate: it keeps the request a CORS *simple
request*, so the browser skips the preflight `OPTIONS` that Apps Script cannot
answer. The script reads the raw JSON from `e.postData.contents`. If the fetch
still fails, the client retries once with `mode: "no-cors"` so the lead is not
lost — the response is then opaque, and the user still sees the success state.

### After a successful submit

Every form — the inline site-visit form and all three popups — redirects to
**`/thank-you?source=<form>`** on success. The page:

- greets the visitor by first name and repeats the number we will call, read
  from `sessionStorage` rather than the URL so no personal data ends up in a
  shareable link or in analytics;
- offers the brochure download when the lead came from the brochure CTA;
- pushes a `generate_lead` dataLayer event carrying `lead_source`, so GTM can
  hang a conversion trigger on it (either that event or the `/thank-you`
  pageview);
- is `noindex, follow` — it has no standalone search value.

Visiting `/thank-you` directly, with nothing in `sessionStorage`, degrades to a
generic thank-you with no name, number or brochure link.

### Fields captured on every form

| Field | Visible | Validation |
| --- | --- | --- |
| Full Name | ✅ | Required, min 2 characters. |
| Contact No | ✅ | Required. 10 digits starting 6/7/8/9; `+91`, `0`, spaces and dashes are stripped first. |
| Email | ✅ | Required, standard `name@domain.tld` shape. |
| Configuration Type | ✅ | 2 BHK / 3 BHK / Not Sure — optional, pre-filled from floor-plan cards. |
| Privacy consent | ✅ | Required checkbox. |
| **Page URL** | ⛔ hidden | `window.location.href` at submit time. |
| **Date & time** | ⛔ hidden | IST-formatted stamp plus an ISO timestamp. |
| Source | ⛔ hidden | Which CTA opened the form. |
| Referrer | ⛔ hidden | `document.referrer`. |
| Honeypot | ⛔ hidden | Off-screen `company` field; if filled, the script silently drops the lead. |

Errors appear inline under each field, with `aria-invalid` and
`role="alert"` so screen readers announce them. The first invalid field is
focused on a failed submit.

---

## 7. Where things live

```
app/
  layout.tsx           fonts, metadata, GTM, JSON-LD, LeadProvider, popups
  page.tsx             section order
  thank-you/page.tsx   post-submit confirmation
  globals.css          Tailwind v4 @theme tokens, keyframes, .reveal
components/
  site/                Header, Hero, Overview, Residences, Amenities,
                       CtaBanner, Connectivity, Gallery, Journey, Faq,
                       Contact, Footer, FloatingCta, Lightbox, ThankYou
  lead/                LeadContext, LeadForm, Modal, Popups, CtaTriggers
  ui/                  Button, Reveal, SectionHeading, Icons
lib/
  content.ts           all copy and figures, in one typed place
  validation.ts        Indian mobile + email rules
  leads.ts             payload assembly and transport
  recaptcha.ts         v3 script loader and token minting
google-apps-script/
  Code.gs              the receiver
```

To change any copy, edit `lib/content.ts` — nothing is hard-coded in the
components.

---

## 8. Popups

| Popup | Trigger | Frequency |
| --- | --- | --- |
| **Enquiry** | Every "Enquire Now" / "Book a Site Visit" / "Download Brochure" / "Request Details" CTA | On demand; heading, source tag and pre-selected configuration vary by trigger. |
| **Exit intent — "Unlock Exclusive Offers"** | Pointer leaves through the top of the window (desktop) or 34 s dwell (touch) | Once per session, armed after 6 s, suppressed once a lead is captured. |
| **Privacy Commitment** | Auto after 14 s on a first visit; any "Privacy Policy" link re-opens it | Acknowledgement stored in `localStorage`. |
| **Toast notification** | Form success or failure | Auto-dismisses after 6 s. |

All four are original designs; the enquiry, exit-intent and privacy popups
mirror the purpose of the ones on the reference site.

---

## 9. Deploying to Hostinger

Hostinger's build image ships an old glibc (< 2.29), so Next cannot load its
native SWC binary and falls back to `@next/swc-wasm-nodejs`:

```
⚠ Attempted to load @next/swc-linux-x64-gnu, but an error occurred:
  /lib64/libm.so.6: version `GLIBC_2.29' not found
Using cached swc package @next/swc-wasm-nodejs…
```

Those two warnings are survivable — the build just runs slower on the WASM
compiler. What is **not** survivable is a TypeScript config: under the WASM
fallback Next fails to compile `next.config.ts`, and the build dies with

```
× Failed to load next.config.ts
Error: Cannot find module '…/<hash>.next.config'
       imported from '…/next.config.compiled.js'  (ERR_MODULE_NOT_FOUND)
```

**This is why the config is `next.config.mjs`, not `next.config.ts`.** Plain
ESM is imported directly with no compile step, so that path is never taken.
Do not convert it back to TypeScript unless the host's glibc is upgraded.

Set the environment variables from §4 in *Deployments → Environment variables*
before triggering a build — they are inlined at build time, so a rebuild is
required after changing any of them.

### If builds stay slow or run out of memory

Every route in this project prerenders as static HTML. If the WASM build proves
too slow on shared hosting, the alternatives, in order of preference:

1. Build in CI (GitHub Actions on `ubuntu-latest` has a current glibc, so it
   uses the fast native SWC) and deploy the output.
2. Add `output: "export"` plus `images: { unoptimized: true }` to
   `next.config.mjs` and serve the generated `out/` directory as plain static
   files — no Node process at all. The trade-off is losing `next/image`
   optimisation, which matters on an image-heavy page like this one, so weigh
   it before switching.

---

## 10. Before going live

- [ ] Drop the real brochure PDF into `public/` and point `NEXT_PUBLIC_BROCHURE_URL` at it.
- [ ] Add the production domain to the reCAPTCHA key's allow-list.
- [ ] Re-deploy the Apps Script as a **new version** after any edit.
- [ ] Send one real test lead and confirm both the sheet row and the email.
- [ ] Confirm the starting price and MahaRERA number are still current.
