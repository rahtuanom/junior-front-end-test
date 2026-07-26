import React from 'react';
import { Trash2 } from 'lucide-react';
import { Product } from '@/types';

export interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onUpdateCart: (product: Product, quantity: number) => void;
  onExceedStock: (productName: string, maxStock: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantityInCart,
  onUpdateCart,
  onExceedStock
}) => {
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 10;

  const handleDecrement = () => {
    if (quantityInCart > 0) {
      onUpdateCart(product, quantityInCart - 1);
    }
  };

  const handleIncrement = () => {
    if (quantityInCart < product.stock) {
      onUpdateCart(product, quantityInCart + 1);
    } else {
      onExceedStock(product.name, product.stock);
    }
  };

  const handleWrapperPlusClick = () => {
    if (quantityInCart >= product.stock || isOutOfStock) {
      onExceedStock(product.name, product.stock);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    if (rawVal === '') {
      onUpdateCart(product, 0);
      return;
    }
    const val = parseInt(rawVal, 10);
    if (isNaN(val) || val < 0) {
      onUpdateCart(product, 0);
      return;
    }
    if (val > product.stock) {
      onUpdateCart(product, product.stock);
      onExceedStock(product.name, product.stock);
      return;
    }
    onUpdateCart(product, val);
  };

  const handleRemove = () => {
    onUpdateCart(product, 0);
  };

  return (
    <div 
      className={`bg-[#F8F9FF] border border-[#C5C5D3] rounded-xl flex flex-col justify-between overflow-hidden shadow-2xs hover:shadow-md transition-all ${
        isOutOfStock ? 'opacity-85' : ''
      }`}
    >
      {/* Top Image Section (1:1 Aspect Ratio) */}
      <div className="relative aspect-square w-full bg-[#EFF4FF] flex items-center justify-center p-2.5">
        <img
          src={product.image}
          alt={product.name}
          className={`h-full w-full object-contain ${isOutOfStock ? 'grayscale' : ''}`}
          loading="lazy"
        />

        {/* Status Badge Top Right */}
        <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-2xs border border-[#C5C5D3] px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isOutOfStock
                ? 'bg-[#A1315E]'
                : isLowStock
                ? 'bg-[#F7A924]'
                : 'bg-[#20AFC4]'
            }`}
          />
          <span
            className={`text-[10px] font-semibold ${
              isOutOfStock
                ? 'text-[#A1315E]'
                : isLowStock
                ? 'text-[#F7A924]'
                : 'text-[#20AFC4]'
            }`}
          >
            {isOutOfStock ? 'Stok Habis!' : isLowStock ? 'Stok Sedikit' : 'Tersedia'}
          </span>
        </div>
      </div>

      {/* Content Details (Tight & Efficient Spacing) */}
      <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between gap-1.5">
        <div className="space-y-1">
          <p className="text-[10px] sm:text-[11px] font-medium text-[#757682] leading-none">
            Stock: {product.stock}
          </p>
          <h3 className="text-xs sm:text-sm font-semibold text-[#0D1C2F] leading-tight line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-1 pt-0.5">
            <span className="text-sm sm:text-base font-extrabold text-[#A1315E] leading-none">
              Rp {product.price.toLocaleString('id-ID')}
            </span>
            <span className="text-[10px] sm:text-xs text-[#444651]">/ {product.unit || 'pcs'}</span>
          </div>
        </div>

        {/* Action Controls Row */}
        <div className="pt-2 border-t border-[#C5C5D3] flex items-center justify-between gap-1.5">
          {/* Editable Quantity Counter Input Box */}
          <div className="flex items-center bg-white border border-[#C5C5D3] rounded-md h-7 sm:h-8 overflow-hidden">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={isOutOfStock || quantityInCart <= 0}
              className="w-6 sm:w-7 h-full flex items-center justify-center text-[#444651] hover:bg-slate-100 disabled:opacity-40 font-medium transition-colors text-xs shrink-0 select-none"
            >
              -
            </button>
            <input
              type="number"
              min={0}
              max={product.stock}
              value={quantityInCart === 0 ? '' : quantityInCart}
              onChange={handleInputChange}
              disabled={isOutOfStock}
              placeholder="0"
              className="w-8 sm:w-10 text-center text-xs font-bold text-[#0D1C2F] bg-transparent outline-none p-0 border-0 focus:ring-0 appearance-none hide-spinner"
              title="Ketik jumlah kuantitas"
            />
            <div onClick={handleWrapperPlusClick} className="h-full flex items-center cursor-pointer shrink-0">
              <button
                type="button"
                onClick={handleIncrement}
                disabled={isOutOfStock || quantityInCart >= product.stock}
                className="w-6 sm:w-7 h-full flex items-center justify-center text-[#444651] hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none font-medium transition-colors text-xs shrink-0 select-none"
              >
                +
              </button>
            </div>
          </div>

          {/* Trash Button */}
          <button
            type="button"
            onClick={handleRemove}
            disabled={quantityInCart <= 0}
            className="w-7 sm:w-8 h-7 sm:h-8 bg-[#A1315E] hover:bg-[#89274E] disabled:opacity-40 text-white rounded-lg flex items-center justify-center transition-colors shadow-2xs shrink-0"
            title="Hapus dari keranjang"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
