import React from 'react';
import { ShoppingBag, Bell, Search, RefreshCw, Loader2 } from 'lucide-react';
import { Input } from '../ui/Input';
import logoAnemone from '@/assets/icons/LogoColor.svg';
import userProfileImg from '@/assets/user/user_profile.png';

export interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartItemCount: number;
  onOpenCartMobile: () => void;
  onResetSession: () => void;
  isResettingSession?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  cartItemCount,
  onOpenCartMobile,
  onResetSession,
  isResettingSession = false
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#EFF4FF] border-b border-[#C5C5D3] shadow-xs">
      <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <img src={logoAnemone} alt="Anemone Logo" className="h-8 w-auto object-contain" />
        </div>

        {/* Search Input (Desktop) */}
        <div className="flex-1 max-w-lg mx-4 hidden md:block">
          <Input
            placeholder="Cari katalog..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-[#757682]" />}
            className="border-[#C5C5D3] bg-white rounded-lg focus:border-[#A1315E]"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Mobile Search Input */}
          <div className="md:hidden w-36 sm:w-48">
            <Input
              placeholder="Cari..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="border-[#C5C5D3] bg-white text-xs py-1.5 rounded-lg"
            />
          </div>

          {/* Dev Button: Reset Sesi */}
          <button
            onClick={onResetSession}
            disabled={isResettingSession}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#C5C5D3] hover:border-[#A1315E] hover:text-[#A1315E] text-[#0D1C2F] text-xs font-semibold rounded-lg transition-all shadow-2xs disabled:opacity-60"
            title="Reset stok dan sesi (Dev Button)"
          >
            {isResettingSession ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#A1315E]" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5 text-[#A1315E]" />
            )}
            <span className="hidden sm:inline">Reset Sesi</span>
          </button>

          {/* Cart Icon Mobile Button */}
          <button
            onClick={onOpenCartMobile}
            className="relative lg:hidden p-2 text-[#0D1C2F] hover:bg-white/60 rounded-lg transition-colors"
            title="Buka Keranjang"
            aria-label="Keranjang Belanja"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#A1315E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Cart Icon (Desktop) */}
          <button
            onClick={onOpenCartMobile}
            className="relative p-2 text-[#0D1C2F] hover:bg-white/60 rounded-lg transition-colors hidden lg:flex"
            title="Keranjang"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button
            className="p-2 text-[#0D1C2F] hover:bg-white/60 rounded-lg transition-colors hidden sm:flex"
            title="Notifikasi"
          >
            <Bell className="w-5 h-5" />
          </button>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 pl-1">
            <div className="w-8 h-8 rounded-full border border-[#C5C5D3] overflow-hidden bg-white shrink-0">
              <img
                src={userProfileImg}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
