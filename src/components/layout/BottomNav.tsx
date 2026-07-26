import React from 'react';
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
        className={`flex flex-col items-center gap-1 p-1 transition-colors ${
          activeTab === 'katalog' ? 'text-[#A1315E] font-bold' : 'text-[#757682] font-medium'
        }`}
      >
        <Grid className="w-5 h-5" />
        <span className="text-[11px]">Katalog</span>
      </button>

      {/* Keranjang Button -> Triggers Mobile Cart Drawer */}
      <button
        type="button"
        onClick={onOpenCartMobile}
        className={`relative flex flex-col items-center gap-1 p-1 transition-colors ${
          activeTab === 'keranjang' ? 'text-[#A1315E] font-bold' : 'text-[#757682] font-medium'
        }`}
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-[#A1315E] text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full border border-white">
              {cartItemCount}
            </span>
          )}
        </div>
        <span className="text-[11px]">Keranjang</span>
      </button>

      {/* Pesanan Button -> Navigates to Order History */}
      <button
        type="button"
        onClick={onGoToPesanan || onGoToKatalog}
        className={`flex flex-col items-center gap-1 p-1 transition-colors ${
          activeTab === 'pesanan' ? 'text-[#A1315E] font-bold' : 'text-[#757682] font-medium'
        }`}
      >
        <ClipboardList className="w-5 h-5" />
        <span className="text-[11px]">Pesanan</span>
      </button>
    </div>
  );
};
