/* TEALEAF SG — ProductCard
   Style: SG Street Luxe — dark card with hover overlay and add-to-cart
   Click image/title → product detail page
   Click "Add to Cart" button → adds to cart (stops propagation)
*/
import { useState } from 'react';
import { Plus, Thermometer, Clock, Zap } from 'lucide-react';
import { Link } from 'wouter';
import { type Product } from '@/lib/products';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index: number;
}

const caffeineColors: Record<string, string> = {
  None: 'text-white/40',
  Low: 'text-blue-400',
  Medium: 'text-yellow-400',
  High: 'text-[#A8D5A2]',
};

export default function ProductCard({ product, index }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      weight: product.weight,
      image: product.image,
    });
    toast.success(`${product.name} added to cart`, {
      description: `S$${product.price} · ${product.weight}`,
    });
  };

  return (
    <div
      className="group relative flex flex-col bg-[#111] border border-white/5 rounded-sm overflow-hidden transition-all duration-300 hover:border-white/15 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image — click to product detail */}
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-[#0A0A0A] cursor-pointer">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Overlay on hover */}
          <div className={`absolute inset-0 bg-[#0D0D0D]/60 flex items-center justify-center transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#A8D5A2] text-[#0D0D0D] font-['Syne'] font-bold text-sm rounded-sm hover:bg-white transition-colors duration-200 active:scale-95"
            >
              <Plus size={16} />
              Add to Cart
            </button>
          </div>

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3">
              <span className={`px-2 py-1 text-[10px] font-['JetBrains_Mono'] font-bold tracking-wider rounded-sm ${
                product.badge === 'BESTSELLER' ? 'bg-[#A8D5A2] text-[#0D0D0D]' :
                product.badge === 'NEW' ? 'bg-white text-[#0D0D0D]' :
                'bg-yellow-400/90 text-[#0D0D0D]'
              }`}>
                {product.badge}
              </span>
            </div>
          )}

          {/* Price overlay */}
          <div className="absolute bottom-3 right-3">
            <span className="font-['JetBrains_Mono'] text-white font-bold text-base bg-[#0D0D0D]/80 px-2 py-1 rounded-sm">
              S${product.price}
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <Link href={`/product/${product.id}`}>
        <div className="p-4 flex flex-col gap-2 flex-1 cursor-pointer">
          <div>
            <p className="chapter-number text-[10px] mb-1">{product.subtitle}</p>
            <h3 className="font-['Syne'] font-bold text-white text-base leading-tight group-hover:text-[#A8D5A2] transition-colors">{product.name}</h3>
            <p className="text-white/50 text-xs font-['Outfit'] mt-1 leading-relaxed">{product.description}</p>
          </div>

          {/* Brew info */}
          <div className="flex items-center gap-3 mt-auto pt-3 border-t border-white/5">
            <div className="flex items-center gap-1 text-white/30">
              <Thermometer size={11} />
              <span className="text-[10px] font-['JetBrains_Mono']">{product.brewTemp}</span>
            </div>
            <div className="flex items-center gap-1 text-white/30">
              <Clock size={11} />
              <span className="text-[10px] font-['JetBrains_Mono']">{product.brewTime}</span>
            </div>
            <div className={`flex items-center gap-1 ml-auto ${caffeineColors[product.caffeine]}`}>
              <Zap size={11} />
              <span className="text-[10px] font-['JetBrains_Mono']">{product.caffeine}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
