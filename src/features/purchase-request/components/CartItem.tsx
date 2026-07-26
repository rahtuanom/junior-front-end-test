import React from 'react';
import { CartItem as CartItemType } from '@/types';

export interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
  onExceedStock: (name: string, max: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { product, quantity } = item;
  const totalPrice = product.price * quantity;

  return (
    <div className="py-3 border-b border-[#C5C5D3] flex items-center justify-between gap-3">
      <div>
        <h4 className="font-semibold text-[18px] text-[#0D1C2F] leading-snug">
          {product.name}
        </h4>
        <p className="text-[14px] text-[#444651] mt-0.5">
          Rp {product.price.toLocaleString('id-ID')} &times; {quantity}
        </p>
      </div>

      <div className="text-right shrink-0">
        <span className="font-bold text-[16px] text-[#0D1C2F]">
          Rp {totalPrice.toLocaleString('id-ID')}
        </span>
      </div>
    </div>
  );
};
