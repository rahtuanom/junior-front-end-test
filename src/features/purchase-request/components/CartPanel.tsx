import React from 'react';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
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
  onClearCart,
  onNextStep,
  onExceedStock,
  isMobileDrawer = false,
  onCloseMobileDrawer,
  isLoading = false
}) => {
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 300], [1, 0]);

  const bind = useDrag(
    ({ movement: [, my], velocity: [, vy], down, cancel }) => {
      // Only allow dragging downward
      if (my < 0) {
        y.set(0);
        return;
      }

      if (down) {
        y.set(my);
      } else {
        // Close if swiped down far enough or fast enough
        if (my > 120 || vy > 0.5) {
          animate(y, 400, {
            type: 'spring',
            stiffness: 300,
            damping: 30,
            onComplete: () => {
              onCloseMobileDrawer?.();
              y.set(0);
            },
          });
        } else {
          // Snap back to open position
          animate(y, 0, {
            type: 'spring',
            stiffness: 300,
            damping: 30,
          });
        }
      }
    },
    {
      axis: 'y',
      filterTaps: true,
      rubberband: true,
    }
  );

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const content = (
    <div className="flex flex-col h-full space-y-4 justify-between">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-[#C5C5D3] pb-3 shrink-0">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-[#0D1C2F]" />
          <h3 className="font-semibold text-[20px] text-[#0D1C2F]">Keranjang</h3>
        </div>

        <div className="flex items-center gap-2">
          {cart.length > 0 && onClearCart && (
            <button
              onClick={onClearCart}
              className="text-xs text-red-500 hover:text-red-700 hover:underline font-medium"
              title="Clear all items"
            >
              Hapus Semua Produk
            </button>
          )}
          <span className="bg-brand-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {totalItemCount} Item
          </span>
        </div>
      </div>

      {/* Cart Items List with internal scroll */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-2">
        <AnimatePresence mode="popLayout">
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
        </AnimatePresence>
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
    const gestureBind = bind();
    const gestureHandlers = {
      onPointerDown: gestureBind.onPointerDown as any,
      onPointerMove: gestureBind.onPointerMove as any,
      onPointerUp: gestureBind.onPointerUp as any,
      onPointerCancel: gestureBind.onPointerCancel as any,
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 backdrop-blur-xs lg:hidden"
        onClick={onCloseMobileDrawer}
      >
        <motion.div
          {...gestureHandlers}
          style={{ y, opacity, touchAction: 'none' }}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="w-full bg-white rounded-t-3xl p-5 max-h-[85vh] flex flex-col shadow-2xl cursor-grab active:cursor-grabbing"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drag Handle Indicator */}
          <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-3" />

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
        </motion.div>
      </motion.div>
    );
  }

  return (
    <aside className="w-80 bg-white border-l border-[#C5C5D3] h-full p-5 hidden lg:flex flex-col shrink-0 overflow-hidden">
      {content}
    </aside>
  );
};

