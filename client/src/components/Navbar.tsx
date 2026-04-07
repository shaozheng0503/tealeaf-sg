/* TEALEAF SG — Navbar
   Style: SG Street Luxe — dark glass morphism on scroll, bold Syne brand mark
   "Our Story" links to /about page; other items are anchor links on home
*/
import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link, useLocation } from 'wouter';

type NavLink = { label: string } & ({ href: string; to?: never } | { to: string; href?: never });

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const [location] = useLocation();
  const isHome = location === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { label: 'Shop', href: isHome ? '#shop' : '/#shop' },
    { label: 'Our Story', to: '/about' },
    { label: 'Brew Guide', href: isHome ? '#brew' : '/#brew' },
    { label: 'Delivery', href: isHome ? '#delivery' : '/#delivery' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0D0D0D]/90 backdrop-blur-md border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <span className="font-['Syne'] font-800 text-xl tracking-tight text-white cursor-pointer">
              TEA<span className="text-[#A8D5A2]">LEAF</span>
              <span className="text-[#A8D5A2] text-xs font-['JetBrains_Mono'] ml-1 align-super">SG</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              link.to ? (
                <Link key={link.label} href={link.to}>
                  <span className={`text-sm font-['Outfit'] font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                    location === link.to ? 'text-[#A8D5A2]' : 'text-white/60 hover:text-white'
                  }`}>
                    {link.label}
                  </span>
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/60 hover:text-white text-sm font-['Outfit'] font-medium tracking-wide transition-colors duration-200"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="relative text-white/80 hover:text-white transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#A8D5A2] text-[#0D0D0D] text-[10px] font-['JetBrains_Mono'] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className="md:hidden text-white/80 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0D0D0D]/95 backdrop-blur-lg transition-all duration-300 flex flex-col justify-center items-center gap-8 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map((link, i) => (
          link.to ? (
            <Link key={link.label} href={link.to}>
              <span
                onClick={() => setMobileOpen(false)}
                className={`font-['Syne'] font-bold text-4xl transition-colors cursor-pointer ${
                  location === link.to ? 'text-[#A8D5A2]' : 'text-white/80 hover:text-[#A8D5A2]'
                }`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {link.label}
              </span>
            </Link>
          ) : (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-['Syne'] font-bold text-4xl text-white/80 hover:text-[#A8D5A2] transition-colors"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
            </a>
          )
        ))}
      </div>
    </>
  );
}
