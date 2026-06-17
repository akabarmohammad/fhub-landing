# FulFillHub Landing Page

Landing page marketing untuk [FulFillHub](https://fhub.digero.id) — platform fulfillment multi-gudang SaaS untuk brand owner dan operator gudang di Indonesia.

## Stack

- Vite + React + TypeScript
- GSAP (scroll animations)
- Lenis (smooth scroll)

## Quick start

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`

## Build

```bash
npm run build
npm run preview   # preview production build
```

Output deploy: folder `dist/` → Vercel, Netlify, Cloudflare Pages, atau Nginx static.

## Optimasi gambar

Gambar AI asli (~2–3MB/file) di-compress otomatis saat build:

```bash
npm run optimize:images   # manual
npm run build             # otomatis jalan optimize dulu
```

Hasil:
- **WebP** + **JPEG** untuk desktop
- Versi **mobile** lebih kecil di `public/images/mobile/`
- Original backup di `public/images/originals/` (gitignored)

Perkiraan total load mobile: **~500KB–800KB** (vs ~32MB sebelumnya).

## Assets (gambar)

Semua gambar di `public/images/`:

| File | Dipakai di |
|------|-----------|
| `logo.png` | Logo asli (turquoise) — arsip |
| `logo-accent.png` | Logo tema mint `#00e5a0` — dipakai di site |
| `hero-bg.jpeg` | Background hero + fitur Analytics |
| `hero-warehouse.jpeg` | Visual hero kanan + OG preview |
| `feature-*.jpeg` | Fitur 01–03 |
| `feature-inbound-outbound.jpeg` | Fitur 04 Inbound & Outbound |
| `feature-transfer-stock.jpeg` | Fitur 05 Transfer Stok |
| `feature-analytics-sla.jpeg` | Fitur 06 Analytics & SLA |
| `integration-orbit.jpeg` | Section integrasi |
| `cta-bg.jpeg` | Background CTA |

### Gambar opsional (belum ada)

| Kebutuhan | Ukuran | Catatan |
|-----------|--------|---------|
| OG social share | 1200×630 | Preview saat share link WhatsApp/Twitter |
| Section Multi-Role | 600×600 | Opsional, belum di-generate |

Path dikelola di `src/assets/images.ts`.

## Konfigurasi URL

Edit konstanta di `src/App.tsx`:

| Konstanta | Default |
|-----------|---------|
| `DASHBOARD_URL` | `https://fhub.digero.id` |
| `API_DOCS_URL` | `https://api.fhub.digero.id/api/docs` |

## Deploy production (rekomendasi)

| Domain | Repo |
|--------|------|
| `fhub.digero.id` | **fulfillhub-landing** (ini) |
| `app.fhub.digero.id` | fulfillhub-dashboard |

## Repo terkait

| Repo | Isi |
|------|-----|
| **fulfillhub-landing** (ini) | Landing page marketing |
| [fullfilment-multiwarehouse](https://github.com/akabarmohammad/fullfilment-multiwarehouse) | Backend API NestJS |
| fulfillhub-dashboard | Frontend dashboard app |
| [fhub-docs](https://github.com/akabarmohammad/fhub-docs) | PRD & Postman |
