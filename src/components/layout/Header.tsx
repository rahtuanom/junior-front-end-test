import React from 'react';
import { ShoppingBag, Bell, Search, RefreshCw, Loader2 } from 'lucide-react';
import { Input } from '../ui/Input';
import logoAnemoneFull from '@/assets/icons/LogoColor.svg';
import logoAnemoneIcon from '@/assets/icons/iconColor.svg';
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
    <header className="sticky top-0 z-30 bg-navy-50 border-b border-[#C5C5D3] shadow-xs select-none">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile Icon-only Logo */}
          <img
            src={logoAnemoneIcon}
            alt="Anemone Icon"
            className="h-8 w-8 object-contain md:hidden"
          />
          {/* Desktop Full Text Logo */}
          <img
            src={logoAnemoneFull}
            alt="Anemone Logo"
            className="h-8 w-auto object-contain hidden md:block"
          />
        </div>

        {/* Search Input (Desktop) */}
        <div className="flex-1 max-w-lg mx-2 sm:mx-4 hidden md:block">
          <Input
            placeholder="Cari katalog..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-[#757682]" />}
            className="border-[#C5C5D3] bg-white rounded-lg focus:border-brand-600"
          />
        </div>

        {/* Action Controls Container */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Mobile Compact Search Input */}
          <div className="md:hidden w-28 sm:w-40">
            <Input
              placeholder="Cari..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="border-[#C5C5D3] bg-white text-xs py-1 px-2.5 rounded-lg h-8"
            />
          </div>

          {/* Dev Button: Reset Sesi */}
          <button
            type="button"
            onClick={onResetSession}
            disabled={isResettingSession}
            className="flex items-center gap-1 px-2 sm:px-3 py-1.5 bg-white border border-[#C5C5D3] hover:border-brand-600 hover:text-brand-600 text-navy-900 text-[11px] sm:text-xs font-semibold rounded-lg transition-all shadow-2xs disabled:opacity-60 shrink-0 h-8"
            title="Reset stok dan sesi (Dev Button)"
          >
            {isResettingSession ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-600" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5 text-brand-600" />
            )}
            <span className="hidden sm:inline">Reset Sesi</span>
          </button>

          {/* Cart Icon Mobile Button */}
          {/* <button
            type="button"
            onClick={onOpenCartMobile}
            className="relative lg:hidden p-1.5 text-[#0D1C2F] hover:bg-white/60 rounded-lg transition-colors shrink-0"
            title="Buka Keranjang"
            aria-label="Keranjang Belanja"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#A1315E] text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {cartItemCount}
              </span>
            )}
          </button> */}

          {/* Cart Icon (Desktop) */}
          <button
            type="button"
            onClick={onOpenCartMobile}
            className="relative p-2 text-navy-900 hover:bg-white/60 rounded-lg transition-colors hidden lg:flex"
            title="Keranjang"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button
            type="button"
            className="p-2 text-navy-900 hover:bg-white/60 rounded-lg transition-colors hidden sm:flex"
            title="Notifikasi"
          >
            <Bell className="w-5 h-5" />
          </button>

          {/* User Profile Avatar */}
          <div className="flex items-center pl-0.5 shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#C5C5D3] overflow-hidden bg-white shrink-0">
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
