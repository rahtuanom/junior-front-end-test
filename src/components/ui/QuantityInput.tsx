import React from 'react';
import { Plus, Minus } from 'lucide-react';

export interface QuantityInputProps {
  value: number;
  min?: number;
  max: number;
  onChange: (value: number) => void;
  onExceedStock?: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export const QuantityInput: React.FC<QuantityInputProps> = ({
  value,
  min = 0,
  max,
  onChange,
  onExceedStock,
  disabled = false,
  size = 'md'
}) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    } else {
      if (onExceedStock) onExceedStock();
    }
  };

  const handleWrapperPlusClick = () => {
    if (value >= max || max <= 0) {
      if (onExceedStock) onExceedStock();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = parseInt(e.target.value, 10);
    if (isNaN(rawVal)) {
      onChange(min);
      return;
    }
    if (rawVal > max) {
      onChange(max);
      if (onExceedStock) onExceedStock();
    } else if (rawVal < min) {
      onChange(min);
    } else {
      onChange(rawVal);
    }
  };

  const buttonSize = size === 'sm' ? 'w-7 h-7' : 'w-8 h-8';
  const textSize = size === 'sm' ? 'text-xs w-8' : 'text-sm w-10';

  const isMinDisabled = disabled || value <= min;
  const isMaxDisabled = disabled || max <= 0 || value >= max;

  return (
    <div className="inline-flex items-center bg-white border border-[#C5C5D3] rounded-md h-8.5 overflow-hidden shadow-2xs">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={isMinDisabled}
        className="w-8 h-full flex items-center justify-center text-[#444651] hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        title="Kurangi kuantitas"
        aria-label="Kurangi kuantitas"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        disabled={disabled || max <= 0}
        min={min}
        max={max}
        className={`${textSize} text-center bg-transparent font-semibold text-navy-900 focus:outline-none focus:ring-1 focus:ring-brand-600`}
      />

      <div onClick={handleWrapperPlusClick} className="h-full inline-flex items-center cursor-pointer">
        <button
          type="button"
          onClick={handleIncrement}
          disabled={isMaxDisabled}
          className="w-8 h-full flex items-center justify-center text-[#444651] hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          title={value >= max ? `Mencapai batas stok (${max})` : 'Tambah kuantitas'}
          aria-label="Tambah kuantitas"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
