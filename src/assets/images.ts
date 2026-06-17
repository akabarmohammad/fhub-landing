import type { ImageAsset } from '../types/image'

function asset(
  name: string,
  alt: string,
  options: Partial<ImageAsset> = {},
): ImageAsset {
  const base = `/images/${name}`
  return {
    alt,
    jpeg: `${base}.jpeg`,
    webp: `${base}.webp`,
    mobileJpeg: `/images/mobile/${name}.jpeg`,
    mobileWebp: `/images/mobile/${name}.webp`,
    ...options,
  }
}

export const images = {
  logo: '/images/logo-accent.png',
  heroBg: asset('hero-bg', '', { desktopOnly: true, sizes: '100vw' }),
  heroWarehouse: asset('hero-warehouse', 'Gudang fulfillment modern FulFillHub', {
    sizes: '(max-width: 768px) 100vw, 560px',
  }),
  features: {
    multiWarehouse: asset('feature-multi-warehouse', 'Multi-Gudang'),
    autoRouting: asset('feature-auto-routing', 'Auto-Routing'),
    shipping: asset('feature-shipping', 'Integrasi JNE'),
    inboundOutbound: asset('feature-inbound-outbound', 'Inbound & Outbound'),
    transfer: asset('feature-transfer-stock', 'Transfer Stok'),
    analytics: asset('feature-analytics-sla', 'Analytics & SLA'),
  },
  workflow: {
    step01: asset('workflow-step-01', 'Brand buat pesanan'),
    step02: asset('workflow-step-02', 'Auto-route ke gudang'),
    step03: asset('workflow-step-03', 'Staff proses outbound'),
    step04: asset('workflow-step-04', 'Tracking & delivered'),
  },
  integrationOrbit: asset('integration-orbit', 'Diagram integrasi ekosistem logistik FulFillHub', {
    sizes: '(max-width: 768px) 100vw, 480px',
  }),
  ctaBg: asset('cta-bg', '', { sizes: '100vw' }),
  og: '/images/hero-warehouse.jpeg',
} as const

export type FeatureKey = keyof typeof images.features
