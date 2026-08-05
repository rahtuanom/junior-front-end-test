import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, ShoppingBag, ClipboardList } from 'lucide-react';

export interface BottomNavProps {
  cartItemCount: number;
  activeTab: 'katalog' | 'keranjang' | 'pesanan';
  onOpenCartMobile: () => void;
  onGoToKatalog: () => void;
  onGoToPesanan?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  cartItemCount,
  activeTab,
  onOpenCartMobile,
  onGoToKatalog,
  onGoToPesanan
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#C5C5D3] px-6 py-2 flex items-center justify-around lg:hidden shadow-lg select-none">
      {/* Katalog Button */}
      <button
        type="button"
        onClick={onGoToKatalog}
        className={`flex flex-col items-center gap-1 p-1 transition-colors ${activeTab === 'katalog' ? 'text-brand-600 font-bold' : 'text-[#757682] font-medium'
          }`}
      >
        <Grid className="w-5 h-5" />
        <span className="text-[11px]">Katalog</span>
      </button>

      {/* Floating Action Button (FAB) Keranjang di Sudut Kanan Bawah */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={cartItemCount > 0 ? { scale: [1, 1.08, 1] } : {}}
        transition={{ duration: 0.3 }}
        type="button"
        onClick={onOpenCartMobile}
        className="fixed bottom-20 right-4 z-40 bg-brand-600 hover:bg-brand-700 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center lg:hidden border-2 border-white"
        title="Buka Keranjang"
        aria-label="Keranjang Belanja"
      >
        <ShoppingBag className="w-6 h-6" />
        <AnimatePresence>
          {cartItemCount > 0 && (
            <motion.span
              key={cartItemCount}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
            >
              {cartItemCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Pesanan Button -> Navigates to Order History */}
      <button
        type="button"
        onClick={onGoToPesanan || onGoToKatalog}
        className={`flex flex-col items-center gap-1 p-1 transition-colors ${activeTab === 'pesanan' ? 'text-brand-600 font-bold' : 'text-[#757682] font-medium'
          }`}
      >
        <ClipboardList className="w-5 h-5" />
        <span className="text-[11px]">Pesanan</span>
      </button>
    </div>
  );
};
