import React from 'react';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { CartItem as CartItemType, StepType } from '@/types';
import { CartItem } from './CartItem';
import { OrderSummary } from './OrderSummary';
import { EmptyState } from '@/components/ui/EmptyState';

export interface CartPanelProps {
  cart: CartItemType[];
  subtotal: number;
  currentStep: StepType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onNextStep: () => void;
  onExceedStock: (name: string, max: number) => void;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
  isLoading?: boolean;
}

export const CartPanel: React.FC<CartPanelProps> = ({
  cart,
  subtotal,
  currentStep,
  onUpdateQuantity,
  onRemoveItem,
  onNextStep,
  onExceedStock,
  isMobileDrawer = false,
  onCloseMobileDrawer,
  isLoading = false
}) => {
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const content = (
    <div className="flex flex-col h-full space-y-4 justify-between">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-[#C5C5D3] pb-3 shrink-0">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-[#0D1C2F]" />
          <h3 className="font-semibold text-[20px] text-[#0D1C2F]">Keranjang</h3>
        </div>

        <span className="bg-[#A1315E] text-white text-xs font-semibold px-3 py-1 rounded-full">
          {totalItemCount} Item
        </span>
      </div>

      {/* Cart Items List with internal scroll */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-2">
        {cart.length > 0 ? (
          cart.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              onUpdateQuantity={(qty) => onUpdateQuantity(item.product.id, qty)}
              onRemove={() => onRemoveItem(item.product.id)}
              onExceedStock={onExceedStock}
            />
          ))
        ) : (
          <EmptyState
            title="Keranjang Kosong"
            description="Pilih item dari katalog produk di sebelah kiri untuk menambah pesanan."
          />
        )}
      </div>

      {/* Order Summary & Submit Button at bottom */}
      {cart.length > 0 && (
        <div className="shrink-0 pt-2 border-t border-slate-100">
          <OrderSummary
            subtotal={subtotal}
            currentStep={currentStep}
            onNextStep={onNextStep}
            isLoading={isLoading}
            disabled={cart.length === 0}
          />
        </div>
      )}
    </div>
  );

  if (isMobileDrawer) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 backdrop-blur-xs lg:hidden">
        <div className="w-full bg-white rounded-t-3xl p-5 max-h-[85vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={onCloseMobileDrawer}
              className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Tutup Keranjang</span>
            </button>
          </div>
          {content}
        </div>
      </div>
    );
  }

  return (
    <aside className="w-80 bg-white border-l border-[#C5C5D3] h-full p-5 hidden lg:flex flex-col shrink-0 overflow-hidden">
      {content}
    </aside>
  );
};
