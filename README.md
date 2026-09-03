# Majestic Tower

Marketing site for **Majestic Tower** — premium 2 & 3 BHK residences in
Nalasopara West, Mumbai, by Patil Builders. MahaRERA `P99000079138`.

Built with **Next.js 16 (App Router)**, **TypeScript** and **Tailwind CSS v4**.
Leads from every form and popup are delivered to a **Google Sheet** and an
**email inbox** through a Google Apps Script web app, protected by invisible
**reCAPTCHA v3** verified server-side.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in the endpoint and reCAPTCHA site key
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build       # production build, webpack (fully static)
npm run build:turbo # same build via Turbopack — faster, needs native SWC
npm start           # serve the build
npm run lint
```

> `build` uses `--webpack` because the deploy host falls back to WASM SWC, which
> cannot run Turbopack. See [SETUP.md §9](SETUP.md).

## Configuration

Everything wiring-related — creating the Google Sheet, installing and deploying
the Apps Script, obtaining and placing the reCAPTCHA keys, and the full list of
environment variables — is documented in **[SETUP.md](SETUP.md)**.

The Apps Script itself lives in
[`google-apps-script/Code.gs`](google-apps-script/Code.gs).

## Editing content

All copy, figures, amenity lists, floor plans, landmarks, FAQs and legal text
live in **[`lib/content.ts`](lib/content.ts)**. Nothing is hard-coded inside the
components, so text changes are a single-file edit.

Images are in `public/images/`. `public/Refrences/` holds the design reference
boards and is not used by the site.

## Structure

| Path | What's there |
| --- | --- |
| `app/` | Layout (fonts, metadata, JSON-LD), the page, global CSS + theme tokens |
| `components/site/` | Page sections — header, hero, overview, residences, amenities, connectivity, gallery, journey, FAQ, contact, footer, floating CTAs |
| `components/lead/` | Lead context, the shared form, modal shell, popups, CTA triggers |
| `components/ui/` | Button, scroll-reveal, section heading, icon set |
| `lib/` | Content, validation, lead transport, reCAPTCHA loader |
| `google-apps-script/` | The Sheet + email receiver |

## Notes

- The brochure download is form-gated: the file link is revealed on the success
  screen after a lead is captured. Point `NEXT_PUBLIC_BROCHURE_URL` at the real
  PDF once it exists.
- Animations respect `prefers-reduced-motion`.
