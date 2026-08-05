import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';

export interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
  onExceedStock: (name: string, max: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  onExceedStock,
}) => {
  const { product, quantity } = item;
  const totalPrice = product.price * quantity;

  // Pengubahan Jumlah Produk
  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(quantity - 1);
    } else {
      onRemove();
    }
  };

  const handleIncrease = () => {
    if (quantity < product.stock) {
      onUpdateQuantity(quantity + 1);
    } else {
      onExceedStock(product.name, product.stock);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="py-3 border-b border-[#C5C5D3] flex items-center justify-between gap-3"
    >
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-[16px] text-navy-900 leading-snug truncate">
          {product.name}
        </h4>
        <p className="text-[13px] text-[#444651] mt-0.5">
          Rp {product.price.toLocaleString('id-ID')}
        </p>

        {/* Pengubahan Jumlah Produk */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center border border-slate-300 rounded-md overflow-hidden bg-slate-50">
            <motion.button
              whileTap={{ scale: 0.85 }}
              type="button"
              onClick={handleDecrease}
              className="p-1 hover:bg-slate-200 text-slate-600 transition-colors"
              title="Lower value / Reduce quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </motion.button>
            <motion.span
              key={quantity}
              initial={{ scale: 1.2, color: '#E5B22E' }}
              animate={{ scale: 1, color: '#1e293b' }}
              className="px-2.5 text-xs font-semibold text-slate-800 inline-block"
            >
              {quantity}
            </motion.span>
            <motion.button
              whileTap={{ scale: 0.85 }}
              type="button"
              onClick={handleIncrease}
              className="p-1 hover:bg-slate-200 text-slate-600 transition-colors"
              title="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          <motion.button
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.1 }}
            type="button"
            onClick={onRemove}
            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
            title="Delete item"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <div className="text-right shrink-0 self-start mt-1">
        <span className="font-bold text-[15px] text-navy-900">
          Rp {totalPrice.toLocaleString('id-ID')}
        </span>
      </div>
    </motion.div>
  );
};


