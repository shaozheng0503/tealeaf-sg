/* TEALEAF SG — Cart Drawer
   Style: SG Street Luxe — dark panel sliding from right
*/
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    toast.success('Order placed! 🍵 We\'ll deliver to your door in 1-3 days.', {
      description: `Total: S$${totalPrice.toFixed(2)}`,
      duration: 5000,
    });
    clearCart();
    setIsOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-[420px] bg-[#111] border-l border-white/10 flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <h2 className="font-['Syne'] font-bold text-lg text-white">Your Cart</h2>
            <p className="text-xs text-white/40 font-['JetBrains_Mono'] mt-0.5">{items.length} item{items.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/50 hover:text-white transition-colors p-1"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} strokeWidth={1} className="text-white/20" />
              <p className="font-['Syne'] text-white/40 text-lg">Your cart is empty</p>
              <p className="text-white/30 text-sm font-['Outfit']">Add some teas to get started</p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 px-6 py-2.5 bg-[#A8D5A2] text-[#0D0D0D] font-['Syne'] font-bold text-sm rounded-sm hover:bg-[#8FC98A] transition-colors"
              >
                Browse Teas
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 py-4 border-b border-white/5">
                <div className="w-16 h-16 rounded-sm overflow-hidden flex-shrink-0 bg-white/5">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-['Syne'] font-bold text-sm text-white leading-tight">{item.name}</p>
                      <p className="text-white/40 text-xs font-['Outfit'] mt-0.5">{item.weight}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-white/30 hover:text-red-400 transition-colors flex-shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 border border-white/10 rounded-sm">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-white/60 hover:text-white transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-white text-sm font-['JetBrains_Mono'] w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-white/60 hover:text-white transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="font-['JetBrains_Mono'] text-[#A8D5A2] text-sm font-medium">
                      S${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/60 font-['Outfit'] text-sm">Subtotal</span>
              <span className="font-['JetBrains_Mono'] text-white font-medium">S${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/60 font-['Outfit'] text-sm">Delivery</span>
              <span className="font-['JetBrains_Mono'] text-[#A8D5A2] text-sm">
                {totalPrice >= 60 ? 'FREE' : 'S$4.90'}
              </span>
            </div>
            {totalPrice < 60 && (
              <p className="text-white/30 text-xs font-['Outfit']">
                Add S${(60 - totalPrice).toFixed(2)} more for free delivery
              </p>
            )}
            <div className="h-px bg-white/10" />
            <div className="flex items-center justify-between">
              <span className="font-['Syne'] font-bold text-white">Total</span>
              <span className="font-['JetBrains_Mono'] text-white font-bold text-lg">
                S${(totalPrice + (totalPrice >= 60 ? 0 : 4.90)).toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3.5 bg-[#A8D5A2] text-[#0D0D0D] font-['Syne'] font-bold text-sm tracking-wide rounded-sm hover:bg-[#8FC98A] transition-colors duration-200 active:scale-[0.98]"
            >
              Checkout — S${(totalPrice + (totalPrice >= 60 ? 0 : 4.90)).toFixed(2)}
            </button>
            <p className="text-center text-white/25 text-xs font-['Outfit']">
              Free delivery on orders above S$60 · 1–3 business days
            </p>
          </div>
        )}
      </div>
    </>
  );
}
