/* TEALEAF SG — Product Detail Page
   Design: SG Street Luxe
   - Asymmetric two-column layout: sticky image left, scrollable info right
   - Brew parameters displayed as mono-spaced data table
   - Related products carousel at bottom
   - Framer Motion entrance animations
*/
import { useState, useRef } from 'react';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Plus, Minus, ShoppingBag, Thermometer,
  Clock, Zap, MapPin, Leaf, Star, ChevronRight, Package
} from 'lucide-react';
import { products } from '@/lib/products';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';

const caffeineColors: Record<string, string> = {
  None: 'text-white/40 bg-white/5',
  Low: 'text-blue-400 bg-blue-400/10',
  Medium: 'text-yellow-400 bg-yellow-400/10',
  High: 'text-[#A8D5A2] bg-[#A8D5A2]/10',
};

const caffeineBar: Record<string, number> = {
  None: 0,
  Low: 25,
  Medium: 55,
  High: 85,
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'brew' | 'origin'>('details');
  const { addItem } = useCart();
  const imgRef = useRef<HTMLImageElement>(null);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center gap-6">
        <Navbar />
        <p className="font-['Syne'] text-white/40 text-2xl">Product not found</p>
        <Link href="/">
          <button className="flex items-center gap-2 px-6 py-3 bg-[#A8D5A2] text-[#0D0D0D] font-['Syne'] font-bold text-sm rounded-sm">
            <ArrowLeft size={16} /> Back to Shop
          </button>
        </Link>
      </div>
    );
  }

  const related = products.filter(p => p.id !== product.id && (p.category === product.category || p.tags.some(t => product.tags.includes(t)))).slice(0, 3);
  const fallbackRelated = products.filter(p => p.id !== product.id).slice(0, 3);
  const relatedProducts = related.length >= 2 ? related : fallbackRelated;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        weight: product.weight,
        image: product.image,
      });
    }
    toast.success(`${qty}× ${product.name} added to cart`, {
      description: `S$${(product.price * qty).toFixed(2)} · ${product.weight}`,
    });
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-6 pt-28 pb-4">
        <div className="flex items-center gap-2 text-white/30 text-xs font-['Outfit']">
          <Link href="/">
            <span className="hover:text-white/60 transition-colors cursor-pointer">Home</span>
          </Link>
          <ChevronRight size={12} />
          <Link href="/#shop">
            <span className="hover:text-white/60 transition-colors cursor-pointer">Shop</span>
          </Link>
          <ChevronRight size={12} />
          <span className="text-white/60">{product.name}</span>
        </div>
      </div>

      {/* Main product section */}
      <div className="max-w-[1280px] mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── LEFT: Image ── */}
          <motion.div
            className="lg:sticky lg:top-28"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-[#111]">
              <img
                ref={imgRef}
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0D0D0D]/60 to-transparent" />

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1.5 text-xs font-['JetBrains_Mono'] font-bold tracking-wider rounded-sm ${
                    product.badge === 'BESTSELLER' ? 'bg-[#A8D5A2] text-[#0D0D0D]' :
                    product.badge === 'NEW' ? 'bg-white text-[#0D0D0D]' :
                    'bg-yellow-400/90 text-[#0D0D0D]'
                  }`}>
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Origin tag */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-[#0D0D0D]/80 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                <MapPin size={12} className="text-[#A8D5A2]" />
                <span className="text-white/70 text-xs font-['Outfit']">{product.origin}</span>
              </div>
            </div>

            {/* Thumbnail strip (same image shown at different crops for visual interest) */}
            <div className="flex gap-3 mt-3">
              {[
                { label: 'Dry Leaf', style: 'object-top' },
                { label: 'Brewed', style: 'object-center' },
                { label: 'Package', style: 'object-bottom' },
              ].map((thumb, i) => (
                <div
                  key={thumb.label}
                  className={`flex-1 aspect-square rounded-sm overflow-hidden bg-[#111] border cursor-pointer transition-colors ${i === 0 ? 'border-[#A8D5A2]/60' : 'border-white/5 hover:border-white/20'}`}
                >
                  <img
                    src={product.image}
                    alt={thumb.label}
                    className={`w-full h-full object-cover ${thumb.style} scale-110`}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Info ── */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            {/* Category + name */}
            <div>
              <span className="chapter-number text-[11px] tracking-[0.2em]">{product.category.toUpperCase()} · {product.subtitle}</span>
              <h1 className="font-['Syne'] font-extrabold text-white mt-2 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
                {product.name}
              </h1>
              <p className="font-['Outfit'] text-white/50 text-base mt-3 leading-relaxed">
                {product.longDescription}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#A8D5A2" className="text-[#A8D5A2]" />
                ))}
              </div>
              <span className="font-['JetBrains_Mono'] text-white/50 text-xs">4.9 · 128 reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-['JetBrains_Mono'] text-[#A8D5A2] font-bold" style={{ fontSize: '2.25rem' }}>
                S${product.price}
              </span>
              {product.originalPrice && (
                <span className="font-['JetBrains_Mono'] text-white/30 text-xl line-through">
                  S${product.originalPrice}
                </span>
              )}
              <span className="text-white/30 font-['Outfit'] text-sm">/ {product.weight}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-white/50 text-xs font-['Outfit'] rounded-sm">
                  {tag}
                </span>
              ))}
            </div>

            {/* Quick brew stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Thermometer, label: 'Temperature', value: product.brewTemp },
                { icon: Clock, label: 'Steep Time', value: product.brewTime },
                { icon: Zap, label: 'Caffeine', value: product.caffeine },
              ].map(stat => (
                <div key={stat.label} className="p-3 bg-[#111] border border-white/5 rounded-sm text-center">
                  <stat.icon size={16} className="text-[#A8D5A2] mx-auto mb-1.5" />
                  <p className="font-['JetBrains_Mono'] text-white text-sm font-medium">{stat.value}</p>
                  <p className="text-white/30 text-[10px] font-['Outfit'] mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Quantity + Add to cart */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-white/15 rounded-sm">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="px-4 py-3 text-white/60 hover:text-white transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 font-['JetBrains_Mono'] text-white text-base w-10 text-center">{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="px-4 py-3 text-white/60 hover:text-white transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-white/30 font-['JetBrains_Mono'] text-sm">
                  = S${(product.price * qty).toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-3 py-4 bg-[#A8D5A2] text-[#0D0D0D] font-['Syne'] font-bold text-sm tracking-wide rounded-sm hover:bg-white transition-colors duration-200 active:scale-[0.99]"
              >
                <ShoppingBag size={18} />
                Add to Cart — S${(product.price * qty).toFixed(2)}
              </button>

              <div className="flex items-center gap-2 justify-center text-white/25 text-xs font-['Outfit']">
                <Package size={12} />
                Free delivery above S$60 · Ships within 24 hours
              </div>
            </div>

            {/* Tabs: Details / Brew Guide / Origin */}
            <div>
              <div className="flex border-b border-white/10">
                {(['details', 'brew', 'origin'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-3 text-xs font-['Syne'] font-bold tracking-wide capitalize transition-colors border-b-2 -mb-px ${
                      activeTab === tab
                        ? 'text-[#A8D5A2] border-[#A8D5A2]'
                        : 'text-white/30 border-transparent hover:text-white/60'
                    }`}
                  >
                    {tab === 'brew' ? 'Brew Guide' : tab}
                  </button>
                ))}
              </div>

              <div className="pt-5">
                {activeTab === 'details' && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="space-y-3">
                      {[
                        { label: 'Category', value: product.category },
                        { label: 'Weight', value: product.weight },
                        { label: 'Caffeine Level', value: product.caffeine },
                        { label: 'Origin', value: product.origin },
                        { label: 'Harvest', value: 'Spring 2025' },
                        { label: 'Storage', value: 'Cool, dry place · Away from light' },
                        { label: 'Best Before', value: '18 months from pack date' },
                      ].map(row => (
                        <div key={row.label} className="flex items-start justify-between py-2.5 border-b border-white/5">
                          <span className="text-white/40 text-xs font-['Outfit']">{row.label}</span>
                          <span className="text-white/80 text-xs font-['JetBrains_Mono'] text-right max-w-[55%]">{row.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Caffeine bar */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/40 text-xs font-['Outfit']">Caffeine Level</span>
                        <span className={`text-xs font-['JetBrains_Mono'] px-2 py-0.5 rounded-sm ${caffeineColors[product.caffeine]}`}>
                          {product.caffeine}
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-[#A8D5A2] rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${caffeineBar[product.caffeine]}%` }}
                          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'brew' && (
                  <motion.div
                    key="brew"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    {[
                      { step: '01', title: 'Measure', desc: `Use 2–3g of ${product.name} per 200ml of water. A bamboo scoop or kitchen scale works best.` },
                      { step: '02', title: 'Heat Water', desc: `Heat water to ${product.brewTemp}. Avoid boiling water for delicate teas — it scorches the leaves and creates bitterness.` },
                      { step: '03', title: 'Steep', desc: `Steep for ${product.brewTime}. Adjust to taste — shorter for lighter, longer for more body. This tea can be re-steeped 3–5 times.` },
                      { step: '04', title: 'Pour & Enjoy', desc: 'Pour immediately after steeping to stop the infusion. Drink as-is — no milk or sugar needed for quality tea.' },
                    ].map(item => (
                      <div key={item.step} className="flex gap-4">
                        <span className="font-['JetBrains_Mono'] text-[#A8D5A2] text-xs pt-0.5 flex-shrink-0 w-6">{item.step}</span>
                        <div>
                          <p className="font-['Syne'] font-bold text-white text-sm">{item.title}</p>
                          <p className="text-white/50 text-xs font-['Outfit'] mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'origin' && (
                  <motion.div
                    key="origin"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="flex items-start gap-3 p-4 bg-[#111] border border-white/5 rounded-sm">
                      <MapPin size={18} className="text-[#A8D5A2] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-['Syne'] font-bold text-white text-sm">{product.origin}</p>
                        <p className="text-white/40 text-xs font-['Outfit'] mt-1">Farm-direct sourcing</p>
                      </div>
                    </div>
                    <p className="text-white/50 text-sm font-['Outfit'] leading-relaxed">
                      We visit every farm we source from. This tea is purchased directly from the growers, ensuring fair prices for farmers and maximum freshness for you. No warehouses, no middlemen.
                    </p>
                    <div className="flex items-center gap-2 p-3 bg-[#A8D5A2]/5 border border-[#A8D5A2]/20 rounded-sm">
                      <Leaf size={14} className="text-[#A8D5A2]" />
                      <p className="text-white/60 text-xs font-['Outfit']">
                        Batch #{Math.floor(Math.random() * 900 + 100)} · Harvested Spring 2025 · Packed {new Date().toLocaleDateString('en-SG', { month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── RELATED PRODUCTS ── */}
      {relatedProducts.length > 0 && (
        <section className="py-20 border-t border-white/5 mt-12">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="chapter-number">YOU MAY ALSO LIKE</span>
                <h2 className="font-['Syne'] font-extrabold text-white text-3xl mt-2">
                  More <span className="text-[#A8D5A2]">Teas</span>
                </h2>
              </div>
              <Link href="/#shop">
                <button className="flex items-center gap-2 text-white/40 hover:text-white text-sm font-['Outfit'] transition-colors">
                  View All <ChevronRight size={16} />
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link href={`/product/${p.id}`}>
                    <div className="group cursor-pointer bg-[#111] border border-white/5 rounded-sm overflow-hidden hover:border-white/15 hover:-translate-y-1 transition-all duration-300">
                      <div className="aspect-[3/4] overflow-hidden bg-[#0A0A0A] relative">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute bottom-3 right-3">
                          <span className="font-['JetBrains_Mono'] text-white font-bold text-sm bg-[#0D0D0D]/80 px-2 py-1 rounded-sm">
                            S${p.price}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="chapter-number text-[10px] mb-1">{p.subtitle}</p>
                        <h3 className="font-['Syne'] font-bold text-white text-base">{p.name}</h3>
                        <p className="text-white/40 text-xs font-['Outfit'] mt-1">{p.description}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer mini */}
      <footer className="bg-[#0A0A0A] border-t border-white/5 py-8 px-6 mt-0">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-['Syne'] font-extrabold text-xl text-white">
            TEA<span className="text-[#A8D5A2]">LEAF</span>
            <span className="text-[#A8D5A2] text-xs font-['JetBrains_Mono'] ml-1 align-super">SG</span>
          </span>
          <p className="text-white/25 text-xs font-['Outfit']">© 2025 TEALEAF SG. All rights reserved.</p>
          <Link href="/">
            <button className="flex items-center gap-2 text-white/40 hover:text-[#A8D5A2] text-sm font-['Outfit'] transition-colors">
              <ArrowLeft size={14} /> Back to Shop
            </button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
