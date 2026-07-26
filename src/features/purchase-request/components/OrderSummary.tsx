import React from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface OrderSummaryProps {
  subtotal: number;
  shippingCost?: number;
  taxRate?: number;
  currentStep: number;
  onNextStep: () => void;
  isLoading?: boolean;
  isCalculating?: boolean;
  disabled?: boolean;
  buttonText?: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  shippingCost = 0,
  taxRate = 0.11,
  currentStep,
  onNextStep,
  isLoading = false,
  isCalculating = false,
  disabled = false,
  buttonText
}) => {
  const taxAmount = Math.round(subtotal * taxRate);
  const totalAmount = subtotal + taxAmount + shippingCost;

  const defaultButtonText = currentStep === 1
    ? 'Lanjut ke Pembayaran'
    : currentStep === 2
    ? 'Lanjut ke Konfirmasi'
    : 'Kirim Permintaan';

  return (
    <div className="bg-[#EFF4FF] border border-[#C5C5D3] rounded-xl p-4 space-y-3 shadow-xs">
      <div className="space-y-2 text-xs sm:text-sm text-[#444651]">
        <div className="flex items-center justify-between">
          <span>Subtotal Produk</span>
          <span className="font-semibold text-[#0D1C2F]">
            {isCalculating ? '...' : `Rp ${subtotal.toLocaleString('id-ID')}`}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>Estimasi Pajak (11%)</span>
          <span className="font-semibold text-[#0D1C2F]">
            {isCalculating ? '...' : `Rp ${taxAmount.toLocaleString('id-ID')}`}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>Biaya Ekspedisi / Ongkir</span>
          <span className="font-semibold text-[#0D1C2F]">
            {isCalculating ? '...' : shippingCost === 0 ? 'Gratis' : `Rp ${shippingCost.toLocaleString('id-ID')}`}
          </span>
        </div>

        <div className="pt-2 border-t border-[#DDE9FF] flex items-center justify-between">
          <span className="font-bold text-base sm:text-[18px] text-[#0D1C2F]">Total Biaya</span>
          <span className="font-bold text-base sm:text-[18px] text-[#A1315E]">
            {isCalculating ? '...' : `Rp ${totalAmount.toLocaleString('id-ID')}`}
          </span>
        </div>
      </div>

      <Button
        variant="primary"
        size="md"
        onClick={onNextStep}
        isLoading={isLoading}
        disabled={disabled || subtotal <= 0 || isCalculating}
        rightIcon={!isLoading && !isCalculating && <ArrowRight className="w-4 h-4" />}
        className="w-full bg-[#A1315E] hover:bg-[#89274E] text-white font-semibold text-sm py-2.5 rounded-lg shadow-xs transition-all disabled:opacity-50"
      >
        {isCalculating ? (
          <span className="inline-flex items-center gap-1.5">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Menghitung total...</span>
          </span>
        ) : (
          buttonText || defaultButtonText
        )}
      </Button>
    </div>
  );
};
