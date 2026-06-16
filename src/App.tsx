import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { Logo } from './components/Logo'
import { images } from './assets/images'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const DASHBOARD_URL = 'https://fhub-omega.vercel.app'

const features = [
  {
    num: '01',
    title: 'Multi-Gudang',
    desc: 'Kelola beberapa gudang sekaligus — Maluku, Papua, Surabaya, dan lokasi lainnya dalam satu dashboard terpusat.',
    tag: 'Core',
    image: images.features.multiWarehouse,
  },
  {
    num: '02',
    title: 'Auto-Routing',
    desc: 'Pesanan otomatis diarahkan ke gudang terdekat dengan stok tersedia. Hemat waktu, kurangi ongkir.',
    tag: 'Smart',
    image: images.features.autoRouting,
  },
  {
    num: '03',
    title: 'Integrasi JNE',
    desc: 'Generate AWB, tracking real-time, dan ongkir langsung dari API JNE & RajaOngkir — bukan estimasi buatan.',
    tag: 'Shipping',
    image: images.features.shipping,
  },
  {
    num: '04',
    title: 'Inbound & Outbound',
    desc: 'Alur lengkap dari request inbound brand, konfirmasi staff, picking-packing, hingga pengiriman keluar.',
    tag: 'Ops',
    image: images.features.inboundOutbound,
  },
  {
    num: '05',
    title: 'Transfer Stok',
    desc: 'Pindahkan inventory antar gudang dengan workflow request → approve → dispatch → receive.',
    tag: 'Inventory',
    image: images.features.transfer,
  },
  {
    num: '06',
    title: 'Analytics & SLA',
    desc: 'Fulfillment rate, stock aging, selisih ongkir, margin HPP, dan SLA breach — semua terukur.',
    tag: 'Insights',
    image: images.features.analytics,
  },
]

const steps = [
  { step: '01', title: 'Brand buat pesanan', desc: 'Import bulk atau input manual, sistem hitung ongkir JNE real-time.', image: images.workflow.step01 },
  { step: '02', title: 'Auto-route ke gudang', desc: 'Algoritma pilih gudang terdekat dengan stok lengkap.', image: images.workflow.step02 },
  { step: '03', title: 'Staff proses outbound', desc: 'Picking, packing, generate AWB JNE, upload bukti.', image: images.workflow.step03 },
  { step: '04', title: 'Tracking & delivered', desc: 'Auto-tracking setiap 5 menit, status delivered otomatis.', image: images.workflow.step04 },
]

const stats = [
  { value: '3+', label: 'Gudang terintegrasi' },
  { value: '5min', label: 'Interval auto-tracking' },
  { value: '100%', label: 'Ongkir dari API resmi' },
  { value: '24/7', label: 'Operasional cloud' },
]

const warehouses = ['Maluku', 'Papua', 'Surabaya', 'Jakarta', 'Bandung', 'Makassar', 'Medan', 'Bali']

function App() {
  const glowRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    lenis.on('scroll', ScrollTrigger.update)
    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    const ctx = gsap.context(() => {
      gsap.from('.nav-inner', { y: -20, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2 })
      gsap.from('.hero-badge', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.4 })
      gsap.from('.hero-title .line', {
        y: 120,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.5,
      })
      gsap.from('.hero-sub', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 1.1 })
      gsap.from('.hero-actions', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 1.3 })
      gsap.from('.hero-visual', { scale: 0.9, opacity: 0, duration: 1.4, ease: 'power3.out', delay: 0.8 })

      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        })
      })

      gsap.utils.toArray<HTMLElement>('.feature-card').forEach((el, i) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
        })
      })

      gsap.utils.toArray<HTMLElement>('.step-item').forEach((el, i) => {
        const isMobile = window.matchMedia('(max-width: 768px)').matches
        gsap.from(el, {
          x: isMobile ? 0 : i % 2 === 0 ? -40 : 40,
          y: isMobile ? 30 : 0,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        })
      })
    }, heroRef)

    const handleMouse = (e: MouseEvent) => {
      if (glowRef.current) {
        gsap.to(glowRef.current, { x: e.clientX, y: e.clientY, duration: 0.6, ease: 'power2.out' })
      }
    }
    window.addEventListener('mousemove', handleMouse)

    return () => {
      ctx.revert()
      lenis.destroy()
      gsap.ticker.remove(onTick)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [])

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="cursor-glow" ref={glowRef} aria-hidden="true" />

      <nav className="nav">
        <div className="nav-inner container">
          <Logo />
          <div className="nav-links">
            <a href="#fitur">Fitur</a>
            <a href="#alur">Alur</a>
            <a href="#integrasi">Integrasi</a>
          </div>
          <div className="nav-actions">
            <a href={DASHBOARD_URL} className="btn-ghost">Masuk</a>
            <a href={DASHBOARD_URL} className="btn-primary">Mulai Sekarang</a>
          </div>
          <div className="nav-mobile">
            <a href={DASHBOARD_URL} className="nav-mobile-cta btn-primary">Masuk</a>
            <button
              type="button"
              className="nav-toggle"
              aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <span className="nav-toggle-bar" />
              <span className="nav-toggle-bar" />
            </button>
          </div>
        </div>
        <div className={`nav-mobile-panel ${mobileMenuOpen ? 'is-open' : ''}`}>
          <a href="#fitur" onClick={() => setMobileMenuOpen(false)}>Fitur</a>
          <a href="#alur" onClick={() => setMobileMenuOpen(false)}>Alur</a>
          <a href="#integrasi" onClick={() => setMobileMenuOpen(false)}>Integrasi</a>
          <a href={DASHBOARD_URL} className="btn-primary">Mulai Sekarang</a>
        </div>
      </nav>

      <main ref={heroRef}>
        <section className="hero">
          <div className="hero-bg">
            <img src={images.heroBg} alt="" className="hero-bg-img" aria-hidden="true" />
            <div className="hero-bg-overlay" aria-hidden="true" />
            <div className="hero-grid" aria-hidden="true" />
            <div className="hero-orb hero-orb-1" aria-hidden="true" />
            <div className="hero-orb hero-orb-2" aria-hidden="true" />
          </div>

          <div className="container hero-content">
            <div className="hero-left">
              <div className="hero-badge">
                <span className="badge-dot" />
                Platform Fulfillment #1 untuk Brand Indonesia
              </div>

              <h1 className="hero-title">
                <span className="line">Fulfillment</span>
                <span className="line">
                  <span className="serif">Multi-Gudang</span>
                </span>
                <span className="line accent-line">Tanpa Batas.</span>
              </h1>

              <p className="hero-sub">
                Satu platform untuk brand owner dan operator gudang.
                Auto-routing pesanan, integrasi JNE native, analytics real-time —
                semua dalam ekosistem SaaS multi-tenant.
              </p>

              <div className="hero-actions">
                <a href={DASHBOARD_URL} className="btn-primary btn-lg">
                  Akses Dashboard
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-image-wrap">
                <img
                  src={images.heroWarehouse}
                  alt="Gudang fulfillment modern FulfillHub"
                  className="hero-image"
                  loading="eager"
                />
                <div className="hero-image-border" aria-hidden="true" />
              </div>
              <div className="mock-float mock-float-1">
                <span className="float-icon">📦</span>
                <div>
                  <strong>Auto-Routed</strong>
                  <span>→ Gudang Surabaya</span>
                </div>
              </div>
              <div className="mock-float mock-float-2">
                <span className="float-icon">✓</span>
                <div>
                  <strong>AWB Generated</strong>
                  <span>JNE8829123456</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="marquee-section" aria-label="Lokasi gudang">
          <div className="marquee">
            <div className="marquee-track">
              {[...warehouses, ...warehouses].map((wh, i) => (
                <span key={i} className="marquee-item">
                  {wh}
                  <span className="marquee-sep">✦</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="fitur" className="section features-section">
          <div className="container">
            <div className="section-header reveal">
              <span className="section-tag">Fitur Utama</span>
              <h2 className="section-title">
                Semua yang dibutuhkan<br />
                <span className="serif">operasional fulfillment</span>
              </h2>
              <p className="section-desc">
                Dari inbound hingga delivered — platform end-to-end untuk brand owner,
                admin gudang, picker, hingga super admin platform.
              </p>
            </div>

            <div className="features-grid">
              {features.map((f) => (
                <article key={f.num} className={`feature-card ${f.image ? 'feature-card--visual' : ''}`}>
                  {f.image && (
                    <div className="feature-image-wrap">
                      <img
                        src={f.image}
                        alt={f.title}
                        className="feature-image"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="feature-body">
                    <div className="feature-top">
                      <span className="feature-num">{f.num}</span>
                      <span className="feature-tag">{f.tag}</span>
                    </div>
                    <h3 className="feature-title">{f.title}</h3>
                    <p className="feature-desc">{f.desc}</p>
                    <div className="feature-line" aria-hidden="true" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="alur" className="section workflow-section">
          <div className="container">
            <div className="workflow-layout">
              <div className="workflow-sticky reveal">
                <span className="section-tag">Alur Kerja</span>
                <h2 className="section-title">
                  Dari pesanan<br />
                  <span className="serif">sampai delivered</span>
                </h2>
                <p className="section-desc">
                  Workflow otomatis yang mengurangi human error dan mempercepat
                  time-to-ship brand Anda.
                </p>
              </div>
              <div className="steps-list">
                {steps.map((s) => (
                  <div key={s.step} className="step-item">
                    <div className="step-image-wrap">
                      <img src={s.image} alt={s.title} className="step-image" loading="lazy" />
                    </div>
                    <div className="step-body">
                      <span className="step-num">{s.step}</span>
                      <div className="step-content">
                        <h3>{s.title}</h3>
                        <p>{s.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section stats-section">
          <div className="container">
            <div className="stats-grid reveal">
              {stats.map((s) => (
                <div key={s.label} className="stat-item">
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="integrasi" className="section integrations-section">
          <div className="container">
            <div className="integrations-card reveal">
              <div className="integrations-content">
                <span className="section-tag">Integrasi Native</span>
                <h2 className="section-title">
                  Terhubung langsung<br />
                  <span className="serif">dengan ekosistem logistik</span>
                </h2>
                <ul className="integrations-list">
                  <li>
                    <span className="int-icon">🚚</span>
                    <div>
                      <strong>JNE API</strong>
                      <span>Generate AWB, tracking, master data cabang & origin</span>
                    </div>
                  </li>
                  <li>
                    <span className="int-icon">📍</span>
                    <div>
                      <strong>RajaOngkir Komerce</strong>
                      <span>Ongkir & lokasi real-time untuk seluruh Indonesia</span>
                    </div>
                  </li>
                  <li>
                    <span className="int-icon">☁️</span>
                    <div>
                      <strong>Cloud Storage</strong>
                      <span>Upload bukti foto inbound ke S3-compatible storage</span>
                    </div>
                  </li>
                  <li>
                    <span className="int-icon">📱</span>
                    <div>
                      <strong>Notifikasi</strong>
                      <span>In-app notification, WhatsApp (Fonnte), email SMTP</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="integrations-visual">
                <img
                  src={images.integrationOrbit}
                  alt="Diagram integrasi ekosistem logistik FulfillHub"
                  className="integrations-image"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section roles-section">
          <div className="container">
            <div className="section-header reveal">
              <span className="section-tag">Multi-Role</span>
              <h2 className="section-title">
                Satu platform,<br />
                <span className="serif">banyak peran</span>
              </h2>
            </div>
            <div className="roles-grid">
              {[
                { role: 'Brand Owner', desc: 'Kelola produk, stok, pesanan, dan monitor analytics brand.' },
                { role: 'Admin Gudang', desc: 'Proses inbound, outbound, transfer, dan assign picker.' },
                { role: 'Picker', desc: 'Eksekusi picking & packing dengan workflow terstruktur.' },
                { role: 'Super Admin', desc: 'Kelola tenant, gudang, user, dan audit log platform.' },
              ].map((r) => (
                <div key={r.role} className="role-card reveal">
                  <h3>{r.role}</h3>
                  <p>{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section cta-section">
          <div className="container">
            <div className="cta-card reveal">
              <img src={images.ctaBg} alt="" className="cta-bg-img" aria-hidden="true" />
              <div className="cta-overlay" aria-hidden="true" />
              <div className="cta-bg-text" aria-hidden="true">FH</div>
              <h2 className="cta-title">
                Siap scale<br />
                <span className="serif">fulfillment brand Anda?</span>
              </h2>
              <p className="cta-desc">
                Bergabung dengan platform fulfillment multi-gudang yang dirancang
                khusus untuk ekosistem e-commerce Indonesia.
              </p>
              <div className="cta-actions">
                <a href={DASHBOARD_URL} className="btn-primary btn-lg">
                  Buka Dashboard
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="mailto:hello@digero.id" className="btn-outline btn-lg">Hubungi Kami</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <Logo height={32} />
            <p className="footer-tagline">Fulfillment multi-gudang untuk brand Indonesia.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <strong>Platform</strong>
              <a href={DASHBOARD_URL}>Dashboard</a>
            </div>
            <div className="footer-col">
              <strong>Produk</strong>
              <a href="#fitur">Fitur</a>
              <a href="#alur">Alur Kerja</a>
              <a href="#integrasi">Integrasi</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} FulfillHub · Digero</span>
            <span className="footer-made">Built with precision</span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
