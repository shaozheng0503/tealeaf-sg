/* TEALEAF SG — Home Page
   Design: SG Street Luxe
   - Dark moody (#0D0D0D) base with matcha green (#A8D5A2) accents
   - Syne ExtraBold headings, Outfit body, JetBrains Mono prices
   - Asymmetric split-screen hero, brick-wall product grid, marquee strip
   - Framer Motion entrance animations
*/
import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import Navbar from '@/components/Navbar';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Leaf, Package, Star, ChevronDown, MapPin, Truck, ShieldCheck } from 'lucide-react';
import { products, categories } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const HERO_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663454933582/UT4XBBxqMPEmepzbGVazUf/hero-banner-NJ7Fyoib5uK6fAjJ4wTFWb.webp';
const LIFESTYLE_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663454933582/UT4XBBxqMPEmepzbGVazUf/lifestyle-tea-EMkaLjmbfii6ewX2GKE7bw.webp';

const marqueeItems = [
  'FREE DELIVERY ABOVE S$60',
  'SOURCED DIRECTLY FROM FARMS',
  'CEREMONIAL GRADE MATCHA',
  'SHIP WITHIN 24 HOURS',
  'YOUNG SINGAPORE BRAND',
  'PREMIUM LOOSE-LEAF TEAS',
];

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [heroLoaded, setHeroLoaded] = useState(false);
  const { addItem } = useCart();

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0D0D0D] grain-overlay">
      <Navbar />

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Hero"
            className={`w-full h-full object-cover transition-opacity duration-1000 ${heroLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setHeroLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/60 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 pb-20 pt-32 w-full">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="chapter-number text-xs tracking-[0.2em]">01 — WELCOME TO TEALEAF SG</span>
            </motion.div>

            <motion.h1
              className="font-['Syne'] font-extrabold text-white mt-4 leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              Tea for the<br />
              <span className="text-[#A8D5A2]">New Wave</span><br />
              Singapore.
            </motion.h1>

            <motion.p
              className="font-['Outfit'] text-white/60 text-lg mt-6 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              Premium loose-leaf teas sourced directly from farms across Asia.
              No fuss, no fluff — just exceptional tea delivered to your door.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <a
                href="#shop"
                className="flex items-center gap-2 px-7 py-3.5 bg-[#A8D5A2] text-[#0D0D0D] font-['Syne'] font-bold text-sm rounded-sm hover:bg-white transition-colors duration-200 active:scale-[0.98]"
              >
                Shop Now <ArrowRight size={16} />
              </a>
              <a
                href="#story"
                className="flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white font-['Syne'] font-bold text-sm rounded-sm hover:border-white/50 transition-colors duration-200"
              >
                Our Story
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {[
                { num: '12+', label: 'Tea Origins' },
                { num: '2K+', label: 'Happy Customers' },
                { num: '4.9★', label: 'Average Rating' },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="font-['JetBrains_Mono'] text-[#A8D5A2] text-2xl font-bold">{stat.num}</p>
                  <p className="text-white/40 text-xs font-['Outfit'] mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/30"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-[10px] font-['JetBrains_Mono'] tracking-widest rotate-90 mb-2">SCROLL</span>
          <ChevronDown size={16} />
        </motion.div>
      </section>

      {/* ─── MARQUEE STRIP ────────────────────────────────── */}
      <div className="bg-[#A8D5A2] py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 mx-6 font-['Syne'] font-bold text-[#0D0D0D] text-xs tracking-[0.15em] uppercase">
              <Leaf size={12} />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ─── SHOP SECTION ─────────────────────────────────── */}
      <section id="shop" className="py-24 px-6 max-w-[1280px] mx-auto">
        <FadeInSection>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="chapter-number">02 — THE COLLECTION</span>
              <h2 className="font-['Syne'] font-extrabold text-white text-4xl md:text-5xl mt-2 leading-tight">
                Find Your<br /><span className="text-[#A8D5A2]">Perfect Cup</span>
              </h2>
            </div>
            <p className="text-white/50 font-['Outfit'] max-w-xs text-sm leading-relaxed">
              Every tea is hand-selected, freshness-dated, and shipped in resealable packaging to preserve maximum flavour.
            </p>
          </div>
        </FadeInSection>

        {/* Category filter */}
        <FadeInSection delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs font-['Syne'] font-bold tracking-wide rounded-sm border transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#A8D5A2] text-[#0D0D0D] border-[#A8D5A2]'
                    : 'bg-transparent text-white/50 border-white/15 hover:border-white/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeInSection>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProducts.map((product, i) => (
            <FadeInSection key={product.id} delay={i * 0.07}>
              <ProductCard product={product} index={i} />
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* ─── LIFESTYLE / STORY SECTION ────────────────────── */}
      <section id="story" className="py-24 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <FadeInSection>
              <div className="relative">
                <div className="aspect-[4/5] rounded-sm overflow-hidden">
                  <img
                    src={LIFESTYLE_IMG}
                    alt="Young Singaporean with matcha"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating card */}
                <div className="absolute -bottom-6 -right-6 bg-[#A8D5A2] p-5 rounded-sm max-w-[180px] hidden md:block">
                  <p className="font-['JetBrains_Mono'] text-[#0D0D0D] text-3xl font-bold">4.9</p>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="#0D0D0D" className="text-[#0D0D0D]" />
                    ))}
                  </div>
                  <p className="font-['Outfit'] text-[#0D0D0D]/70 text-xs mt-2">from 2,000+ reviews</p>
                </div>
              </div>
            </FadeInSection>

            {/* Text */}
            <FadeInSection delay={0.15}>
              <div className="space-y-6">
                <span className="chapter-number">03 — OUR STORY</span>
                <h2 className="font-['Syne'] font-extrabold text-white text-4xl md:text-5xl leading-tight mt-2">
                  Born in Singapore.<br />
                  <span className="text-[#A8D5A2]">Brewed with Purpose.</span>
                </h2>
                <p className="font-['Outfit'] text-white/60 leading-relaxed">
                  TEALEAF SG was founded by a group of tea-obsessed Singaporeans who were tired of choosing between overpriced boutique teas and supermarket dust. We go directly to farms in Japan, Taiwan, China, and India to source teas that are fresh, traceable, and genuinely exceptional.
                </p>
                <p className="font-['Outfit'] text-white/60 leading-relaxed">
                  Our mission is simple: make premium tea accessible to every young Singaporean who wants to slow down, sip something real, and actually enjoy the ritual.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  {[
                    { icon: Leaf, title: 'Farm Direct', desc: 'No middlemen. Direct relationships with 12+ farms.' },
                    { icon: Package, title: 'Freshness Dated', desc: 'Every batch stamped with harvest and pack dates.' },
                    { icon: Truck, title: 'Fast Delivery', desc: 'Ship within 24 hours. Free above S$60.' },
                    { icon: ShieldCheck, title: 'Quality Assured', desc: 'Tested for pesticides. 100% natural.' },
                  ].map(item => (
                    <div key={item.title} className="flex gap-3">
                      <div className="w-8 h-8 rounded-sm bg-[#A8D5A2]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <item.icon size={16} className="text-[#A8D5A2]" />
                      </div>
                      <div>
                        <p className="font-['Syne'] font-bold text-white text-sm">{item.title}</p>
                        <p className="text-white/40 text-xs font-['Outfit'] mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ─── BREW GUIDE ───────────────────────────────────── */}
      <section id="brew" className="py-24 bg-[#0A0A0A]">
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="chapter-number">04 — BREW GUIDE</span>
              <h2 className="font-['Syne'] font-extrabold text-white text-4xl md:text-5xl mt-2">
                Brew It <span className="text-[#A8D5A2]">Right</span>
              </h2>
              <p className="text-white/50 font-['Outfit'] mt-4 max-w-md mx-auto">
                Great tea starts with the right technique. Follow these simple steps.
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Measure', desc: 'Use 2–3g of loose leaf per 200ml of water. A bamboo scoop works perfectly.', icon: '🍃' },
              { step: '02', title: 'Heat Water', desc: 'Temperature matters. Green & white teas: 70–80°C. Oolong: 85–90°C. Black: 95°C.', icon: '🌡️' },
              { step: '03', title: 'Steep', desc: 'First steep is usually 1–2 minutes. Most premium teas can be re-steeped 3–5 times.', icon: '⏱️' },
              { step: '04', title: 'Enjoy', desc: 'Pour, breathe, sip. No milk, no sugar needed for quality tea. Just you and the cup.', icon: '🍵' },
            ].map((item, i) => (
              <FadeInSection key={item.step} delay={i * 0.1}>
                <div className="relative p-6 border border-white/5 rounded-sm bg-[#111] hover:border-[#A8D5A2]/30 transition-colors duration-300 group">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <span className="font-['JetBrains_Mono'] text-[#A8D5A2] text-xs tracking-widest">{item.step}</span>
                  <h3 className="font-['Syne'] font-bold text-white text-xl mt-1">{item.title}</h3>
                  <p className="text-white/50 text-sm font-['Outfit'] mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DELIVERY / LOCAL INFO ────────────────────────── */}
      <section id="delivery" className="py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <div>
                <span className="chapter-number">05 — DELIVERY</span>
                <h2 className="font-['Syne'] font-extrabold text-white text-4xl md:text-5xl mt-2 leading-tight">
                  Singapore-Wide<br />
                  <span className="text-[#A8D5A2]">Next-Day Delivery</span>
                </h2>
                <p className="font-['Outfit'] text-white/60 mt-6 leading-relaxed">
                  We ship to all parts of Singapore including Jurong, Tampines, Woodlands, and the CBD. Orders placed before 2pm are dispatched same day.
                </p>

                <div className="space-y-4 mt-8">
                  {[
                    { label: 'Standard Delivery', detail: '1–3 business days · S$4.90', highlight: false },
                    { label: 'Free Delivery', detail: 'On orders above S$60', highlight: true },
                    { label: 'Express (Same Day)', detail: 'Order before 12pm · S$9.90', highlight: false },
                  ].map(item => (
                    <div key={item.label} className={`flex items-center justify-between p-4 rounded-sm border ${item.highlight ? 'border-[#A8D5A2]/40 bg-[#A8D5A2]/5' : 'border-white/5 bg-[#111]'}`}>
                      <div className="flex items-center gap-3">
                        <Truck size={16} className={item.highlight ? 'text-[#A8D5A2]' : 'text-white/30'} />
                        <span className="font-['Syne'] font-bold text-white text-sm">{item.label}</span>
                      </div>
                      <span className={`font-['JetBrains_Mono'] text-xs ${item.highlight ? 'text-[#A8D5A2]' : 'text-white/40'}`}>{item.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>

            {/* Map placeholder / SG visual */}
            <FadeInSection delay={0.15}>
              <div className="relative aspect-square rounded-sm overflow-hidden bg-[#111] border border-white/5 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin size={48} className="text-[#A8D5A2] mx-auto" strokeWidth={1} />
                  <p className="font-['Syne'] font-bold text-white text-2xl">Singapore</p>
                  <p className="text-white/40 font-['Outfit'] text-sm">Delivering island-wide</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-xs mx-auto">
                    {['Orchard', 'Tampines', 'Jurong', 'Woodlands', 'Punggol', 'Clementi', 'Bedok', 'Bishan'].map(area => (
                      <span key={area} className="px-2 py-1 bg-white/5 text-white/40 text-xs font-['Outfit'] rounded-sm border border-white/5">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ──────────────────────────────────────── */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeInSection>
            <div className="text-center mb-12">
              <span className="chapter-number">06 — REVIEWS</span>
              <h2 className="font-['Syne'] font-extrabold text-white text-4xl mt-2">
                What Singapore <span className="text-[#A8D5A2]">Says</span>
              </h2>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Priya S.', location: 'Tampines', rating: 5, text: 'The ceremonial matcha is absolutely insane. I\'ve tried so many brands and this is genuinely the best I\'ve had outside of Japan. Will never go back to cafe matcha.' },
              { name: 'Marcus T.', location: 'Orchard', rating: 5, text: 'Fast delivery, beautiful packaging, and the Dong Ding oolong is complex and smooth. Ordered three times already. My morning ritual has completely changed.' },
              { name: 'Aisha R.', location: 'Jurong West', rating: 5, text: 'Love that it\'s a local SG brand. The silver needle white tea is so delicate and calming. Perfect for winding down after work. Highly recommend!' },
            ].map((review, i) => (
              <FadeInSection key={review.name} delay={i * 0.1}>
                <div className="p-6 border border-white/5 rounded-sm bg-[#111] hover:border-white/15 transition-colors duration-300">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} size={14} fill="#A8D5A2" className="text-[#A8D5A2]" />
                    ))}
                  </div>
                  <p className="text-white/70 font-['Outfit'] text-sm leading-relaxed italic">"{review.text}"</p>
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                    <div className="w-8 h-8 rounded-full bg-[#A8D5A2]/20 flex items-center justify-center">
                      <span className="font-['Syne'] font-bold text-[#A8D5A2] text-xs">{review.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-['Syne'] font-bold text-white text-sm">{review.name}</p>
                      <p className="text-white/30 text-xs font-['Outfit']">{review.location}, Singapore</p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <FadeInSection>
            <div className="relative rounded-sm overflow-hidden bg-[#A8D5A2] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="font-['Syne'] font-extrabold text-[#0D0D0D] text-4xl md:text-5xl leading-tight">
                  Ready to Sip<br />Something Real?
                </h2>
                <p className="font-['Outfit'] text-[#0D0D0D]/70 mt-3 max-w-sm">
                  Join 2,000+ Singaporeans who've made the switch to premium loose-leaf tea.
                </p>
              </div>
              <a
                href="#shop"
                className="flex-shrink-0 flex items-center gap-2 px-8 py-4 bg-[#0D0D0D] text-white font-['Syne'] font-bold text-sm rounded-sm hover:bg-[#1a1a1a] transition-colors duration-200 active:scale-[0.98]"
              >
                Shop the Collection <ArrowRight size={16} />
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────── */}
      <footer className="bg-[#0A0A0A] border-t border-white/5 py-12 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <span className="font-['Syne'] font-extrabold text-2xl text-white">
                TEA<span className="text-[#A8D5A2]">LEAF</span>
                <span className="text-[#A8D5A2] text-xs font-['JetBrains_Mono'] ml-1 align-super">SG</span>
              </span>
              <p className="text-white/40 font-['Outfit'] text-sm mt-3 max-w-xs leading-relaxed">
                Premium loose-leaf teas sourced directly from farms across Asia. Made for the modern Singaporean.
              </p>
              <div className="flex gap-4 mt-4">
                {['Instagram', 'TikTok', 'Telegram'].map(s => (
                  <button
                    key={s}
                    onClick={() => toast.info(`Follow us on ${s}!`)}
                    className="text-white/30 hover:text-[#A8D5A2] text-xs font-['Outfit'] transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-['Syne'] font-bold text-white text-sm mb-4">Shop</p>
              <div className="space-y-2">
                {['Matcha', 'Oolong', 'White Tea', 'Green Tea', 'Black Tea', 'Gift Sets'].map(item => (
                  <button
                    key={item}
                    onClick={() => {
                      setActiveCategory(item === 'Gift Sets' ? 'All' : item);
                      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="block text-white/40 hover:text-white text-sm font-['Outfit'] transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-['Syne'] font-bold text-white text-sm mb-4">Info</p>
              <div className="space-y-2">
                {['About Us', 'Brew Guide', 'Delivery & Returns', 'FAQ', 'Contact Us', 'Wholesale'].map(item => (
                  <button
                    key={item}
                    onClick={() => toast.info('Coming soon!')}
                    className="block text-white/40 hover:text-white text-sm font-['Outfit'] transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
            <p className="text-white/25 text-xs font-['Outfit']">
              © 2025 TEALEAF SG. All rights reserved. Registered in Singapore.
            </p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookies'].map(item => (
                <button
                  key={item}
                  onClick={() => toast.info('Coming soon!')}
                  className="text-white/25 hover:text-white/50 text-xs font-['Outfit'] transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
