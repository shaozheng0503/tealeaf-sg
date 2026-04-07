/* TEALEAF SG — About Us Page
   Design: SG Street Luxe
   Sections:
   1. Hero — full-bleed tea plantation image with editorial headline
   2. Origin Story — asymmetric split: large pull-quote left, narrative right
   3. Sourcing Standards — 5 criteria in a bold numbered grid
   4. Sourcing photo — full-width immersive image with overlay stats
   5. Team Philosophy — 3 principles in offset card layout
   6. Team photo — cinematic team image
   7. Numbers / Milestones — mono-spaced data strip
   8. CTA — back to shop
*/
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'wouter';
import {
  ArrowRight, MapPin, Leaf, ShieldCheck, Zap,
  Users, Star, Package, ChevronRight, ArrowLeft
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const HERO_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663454933582/UT4XBBxqMPEmepzbGVazUf/about-hero-kCAVaFgyBkmFZnYkB2qCiB.webp';
const SOURCING_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663454933582/UT4XBBxqMPEmepzbGVazUf/about-sourcing-mPVZntthaZqU8pkWeKzGo3.webp';
const TEAM_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663454933582/UT4XBBxqMPEmepzbGVazUf/about-team-WcdCSNKErjqCq7U8y2FazN.webp';

/* ── Fade-up animation wrapper ── */
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── Sourcing criteria ── */
const sourcingCriteria = [
  {
    num: '01',
    title: 'Farm-Direct Only',
    desc: 'We purchase exclusively from the growers themselves — no brokers, no aggregators. Every supplier has been visited in person by our team.',
    icon: MapPin,
  },
  {
    num: '02',
    title: 'Single-Origin Batches',
    desc: 'Each tea is traceable to a single farm and a single harvest season. We never blend origins to mask inconsistency.',
    icon: Leaf,
  },
  {
    num: '03',
    title: 'Pesticide-Free Standard',
    desc: 'All farms we work with adhere to pesticide-free or certified organic growing practices, verified through third-party lab testing.',
    icon: ShieldCheck,
  },
  {
    num: '04',
    title: 'Freshness Window',
    desc: 'We import in small batches every 6–8 weeks. Tea sitting in our warehouse for more than 3 months gets donated — never sold.',
    icon: Zap,
  },
  {
    num: '05',
    title: 'Fair Farmer Pricing',
    desc: 'We pay above-market rates to our farm partners. Quality tea requires skilled labour — we believe farmers should be paid accordingly.',
    icon: Users,
  },
];

/* ── Team principles ── */
const principles = [
  {
    label: 'Radical Transparency',
    body: 'Every product page shows the exact farm, harvest date, and batch number. You should know exactly what you\'re drinking and where it came from.',
    accent: '#A8D5A2',
  },
  {
    label: 'No Gatekeeping',
    body: 'Fine tea has historically been gatekept by ceremony and mystique. We strip that away — great tea should be accessible to anyone curious enough to try.',
    accent: '#ffffff',
  },
  {
    label: 'Singapore First',
    body: 'We\'re a Singapore brand through and through. Our team, our warehouse, our community events — all rooted here. We\'re building something local that can go global.',
    accent: '#A8D5A2',
  },
];

/* ── Milestone numbers ── */
const milestones = [
  { value: '12+', label: 'Farm Partners' },
  { value: '6', label: 'Countries Sourced' },
  { value: '2K+', label: 'SG Customers' },
  { value: '4.9★', label: 'Avg. Rating' },
  { value: '2022', label: 'Founded' },
  { value: '100%', label: 'Pesticide-Free' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Navbar />

      {/* ── 1. HERO ─────────────────────────────────────── */}
      <section className="relative h-[92vh] min-h-[560px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Tea plantation at golden hour" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 pb-20 w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/30 text-xs font-['Outfit'] mb-8">
            <Link href="/"><span className="hover:text-white/60 transition-colors cursor-pointer">Home</span></Link>
            <ChevronRight size={12} />
            <span className="text-white/60">Our Story</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="chapter-number text-[11px] tracking-[0.2em]">02 — OUR STORY</span>
            <h1
              className="font-['Syne'] font-extrabold text-white mt-3 leading-[0.9] max-w-3xl"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
            >
              Born in<br />
              <span className="text-[#A8D5A2]">Singapore.</span><br />
              Brewed with<br />Purpose.
            </h1>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <span className="text-[10px] font-['JetBrains_Mono'] tracking-widest rotate-90 origin-center translate-y-4">SCROLL</span>
            <div className="w-px h-12 bg-white/20 mt-4" />
          </motion.div>
        </div>
      </section>

      {/* ── 2. ORIGIN STORY ─────────────────────────────── */}
      <section className="py-28 max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start">

          {/* Pull-quote left */}
          <FadeUp>
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="w-12 h-px bg-[#A8D5A2]" />
              <blockquote
                className="font-['Syne'] font-extrabold text-white leading-tight"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
              >
                "We were tired of paying S$8 for a tea bag that tasted like cardboard."
              </blockquote>
              <p className="font-['Outfit'] text-white/40 text-sm">
                — Wei Jie &amp; Priya, Co-Founders · 2022
              </p>
            </div>
          </FadeUp>

          {/* Narrative right */}
          <FadeUp delay={0.15}>
            <div className="space-y-6 font-['Outfit'] text-white/60 text-[1.05rem] leading-relaxed">
              <p>
                TEALEAF SG started in a Tiong Bahru flat in 2022. Wei Jie had just returned from three months in Yunnan, China, where he spent time with small tea farmers who had been growing the same cultivars for generations. The tea he drank there — picked that morning, dried by afternoon — was nothing like anything available in Singapore.
              </p>
              <p>
                He came back with 2kg of samples and a problem: there was no good way to get this quality of tea to people here. The specialty tea market was either overpriced boutique shops catering to an older crowd, or mass-market supermarket brands with no traceability.
              </p>
              <p>
                Priya, a product designer, joined six months later. Together they built TEALEAF SG with a single premise: <span className="text-white font-medium">premium loose-leaf tea, sourced directly from farms, sold at honest prices, designed for people who actually live in Singapore.</span>
              </p>
              <p>
                No tea ceremonies. No gatekeeping. Just exceptional tea, delivered to your door within 24 hours.
              </p>

              {/* Timeline */}
              <div className="pt-6 space-y-4 border-t border-white/5">
                {[
                  { year: '2022', event: 'Founded in Tiong Bahru. First 50 orders shipped from a HDB kitchen.' },
                  { year: '2023', event: 'Expanded to 8 farm partners across China, Taiwan and Japan.' },
                  { year: '2024', event: 'Crossed 2,000 customers. Moved to a proper warehouse in Ubi.' },
                  { year: '2025', event: 'Launched same-day delivery islandwide. 12 farm partners, 6 countries.' },
                ].map(item => (
                  <div key={item.year} className="flex gap-6">
                    <span className="font-['JetBrains_Mono'] text-[#A8D5A2] text-sm flex-shrink-0 w-10">{item.year}</span>
                    <p className="text-white/50 text-sm">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 3. SOURCING STANDARDS ───────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeUp>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <span className="chapter-number text-[11px] tracking-[0.2em]">03 — SOURCING</span>
                <h2
                  className="font-['Syne'] font-extrabold text-white mt-2 leading-tight"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
                >
                  Our 5 Non-<br className="hidden md:block" />
                  <span className="text-[#A8D5A2]">Negotiables</span>
                </h2>
              </div>
              <p className="font-['Outfit'] text-white/40 text-sm max-w-xs leading-relaxed">
                Every tea we carry must pass all five criteria. No exceptions. No compromises.
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {sourcingCriteria.map((item, i) => (
              <FadeUp key={item.num} delay={i * 0.08}>
                <div className="bg-[#0D0D0D] p-8 h-full group hover:bg-[#111] transition-colors duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-['JetBrains_Mono'] text-[#A8D5A2]/40 text-xs tracking-widest">{item.num}</span>
                    <item.icon size={18} className="text-white/20 group-hover:text-[#A8D5A2] transition-colors duration-300" />
                  </div>
                  <h3 className="font-['Syne'] font-bold text-white text-xl mb-3 group-hover:text-[#A8D5A2] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="font-['Outfit'] text-white/45 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeUp>
            ))}

            {/* Filler cell with CTA */}
            <FadeUp delay={0.4}>
              <div className="bg-[#0D0D0D] p-8 h-full flex flex-col justify-end">
                <p className="font-['Outfit'] text-white/25 text-xs leading-relaxed mb-6">
                  Want to know exactly which farm your tea came from? Every product page includes full traceability information.
                </p>
                <Link href="/#shop">
                  <button className="flex items-center gap-2 text-[#A8D5A2] font-['Syne'] font-bold text-sm hover:gap-3 transition-all duration-200">
                    Browse Teas <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── 4. SOURCING PHOTO — full-width immersive ────── */}
      <section className="relative h-[70vh] min-h-[400px] overflow-hidden my-0">
        <img src={SOURCING_IMG} alt="Tea farmer hands" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/80 via-transparent to-[#0D0D0D]/40" />

        {/* Overlay stats */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1280px] mx-auto px-6 w-full">
            <FadeUp>
              <div className="max-w-sm space-y-4">
                <span className="chapter-number text-[11px] tracking-[0.2em]">HAND-PICKED</span>
                <p
                  className="font-['Syne'] font-extrabold text-white leading-tight"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                >
                  Every leaf selected<br />
                  <span className="text-[#A8D5A2]">by hand.</span>
                </p>
                <p className="font-['Outfit'] text-white/50 text-sm leading-relaxed">
                  Machine harvesting damages the leaf cell structure and degrades flavour. All our farm partners hand-pick only the top two leaves and a bud — the gold standard for quality tea.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── 5. TEAM PHILOSOPHY ──────────────────────────── */}
      <section className="py-28 max-w-[1280px] mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <span className="chapter-number text-[11px] tracking-[0.2em]">04 — PHILOSOPHY</span>
            <h2
              className="font-['Syne'] font-extrabold text-white mt-2 leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              How We Think<br />
              About <span className="text-[#A8D5A2]">Tea</span>
            </h2>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-6">
          {principles.map((p, i) => (
            <FadeUp key={p.label} delay={i * 0.12}>
              <div
                className={`p-8 border rounded-sm h-full flex flex-col gap-5 ${i === 1 ? 'bg-[#111] border-white/10 md:mt-10' : 'bg-[#0A0A0A] border-white/5'}`}
              >
                <div className="w-8 h-1 rounded-full" style={{ backgroundColor: p.accent }} />
                <h3
                  className="font-['Syne'] font-extrabold text-xl leading-tight"
                  style={{ color: p.accent }}
                >
                  {p.label}
                </h3>
                <p className="font-['Outfit'] text-white/55 text-sm leading-relaxed flex-1">{p.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── 6. TEAM PHOTO ───────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-6 pb-4">
        <FadeUp>
          <div className="relative rounded-sm overflow-hidden aspect-[16/7]">
            <img src={TEAM_IMG} alt="TEALEAF SG team tasting session" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/70 to-transparent" />
            <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between">
              <div>
                <p className="font-['Syne'] font-bold text-white text-lg">The TEALEAF SG Team</p>
                <p className="font-['Outfit'] text-white/50 text-xs mt-1">Tasting session, Tiong Bahru Studio · 2025</p>
              </div>
              <div className="flex items-center gap-1.5 bg-[#0D0D0D]/60 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                <Star size={12} fill="#A8D5A2" className="text-[#A8D5A2]" />
                <span className="font-['JetBrains_Mono'] text-white text-xs">4.9 avg across all products</span>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── 7. MILESTONES STRIP ─────────────────────────── */}
      <section className="py-20 border-t border-b border-white/5 mt-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5">
            {milestones.map((m, i) => (
              <FadeUp key={m.label} delay={i * 0.06}>
                <div className="bg-[#0D0D0D] px-6 py-8 text-center">
                  <p
                    className="font-['JetBrains_Mono'] font-bold text-[#A8D5A2] leading-none mb-2"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
                  >
                    {m.value}
                  </p>
                  <p className="font-['Outfit'] text-white/35 text-xs tracking-wide uppercase">{m.label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CTA ──────────────────────────────────────── */}
      <section className="py-28 max-w-[1280px] mx-auto px-6">
        <FadeUp>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div>
              <span className="chapter-number text-[11px] tracking-[0.2em]">READY?</span>
              <h2
                className="font-['Syne'] font-extrabold text-white mt-2 leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                Try the tea.<br />
                <span className="text-[#A8D5A2]">Taste the difference.</span>
              </h2>
              <p className="font-['Outfit'] text-white/40 text-sm mt-4 max-w-sm leading-relaxed">
                Free delivery on orders above S$60. Ships within 24 hours islandwide.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link href="/#shop">
                <button className="flex items-center gap-2 px-8 py-4 bg-[#A8D5A2] text-[#0D0D0D] font-['Syne'] font-bold text-sm tracking-wide rounded-sm hover:bg-white transition-colors duration-200">
                  Shop Now <ArrowRight size={16} />
                </button>
              </Link>
              <Link href="/">
                <button className="flex items-center gap-2 px-8 py-4 border border-white/15 text-white/60 font-['Syne'] font-bold text-sm tracking-wide rounded-sm hover:border-white/30 hover:text-white transition-colors duration-200">
                  <ArrowLeft size={16} /> Back Home
                </button>
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Footer mini */}
      <footer className="bg-[#0A0A0A] border-t border-white/5 py-8 px-6">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-['Syne'] font-extrabold text-xl text-white">
            TEA<span className="text-[#A8D5A2]">LEAF</span>
            <span className="text-[#A8D5A2] text-xs font-['JetBrains_Mono'] ml-1 align-super">SG</span>
          </span>
          <p className="text-white/25 text-xs font-['Outfit']">© 2025 TEALEAF SG. All rights reserved.</p>
          <div className="flex items-center gap-4 text-white/25 text-xs font-['Outfit']">
            <Link href="/"><span className="hover:text-white/50 cursor-pointer transition-colors">Home</span></Link>
            <Link href="/#shop"><span className="hover:text-white/50 cursor-pointer transition-colors">Shop</span></Link>
            <Link href="/about"><span className="text-[#A8D5A2]">About</span></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
