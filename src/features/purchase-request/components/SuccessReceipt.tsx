import React from 'react';
import { CheckCircle, Printer, RefreshCw } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { CartItem, PaymentMethodOption } from '@/types';
import { ShippingOption } from '../data/shippingMethods';

export interface SuccessReceiptProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  subtotal: number;
  paymentMethod: PaymentMethodOption;
  shippingOption?: ShippingOption;
  orderNumber: string;
  onNewOrder: () => void;
}

export const SuccessReceipt: React.FC<SuccessReceiptProps> = ({
  isOpen,
  onClose,
  cart,
  subtotal,
  paymentMethod,
  shippingOption,
  orderNumber,
  onNewOrder
}) => {
  const taxAmount = Math.round(subtotal * 0.11);
  const shippingCost = shippingOption ? shippingOption.price : 0;
  const totalAmount = subtotal + taxAmount + shippingCost;

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md" closeOnBackdropClick={false}>
      <div className="text-center space-y-4">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-modal-pop">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900">Permintaan Berhasil Terkirim!</h2>
          <p className="text-xs text-slate-500 mt-1">
            Pesanan operasional cabang telah diteruskan ke Head Office Anemone.
          </p>
        </div>

        {/* Receipt Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-3 font-mono text-xs text-slate-700">
          <div className="flex justify-between pb-2 border-b border-dashed border-slate-300 font-sans">
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">No. Referensi</p>
              <p className="font-bold text-slate-800 text-sm">{orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Tanggal</p>
              <p className="text-slate-600">{currentDate}</p>
            </div>
          </div>

          {/* Items Summary Table */}
          <div className="space-y-1.5 py-1 max-h-36 overflow-y-auto pr-1">
            <p className="font-bold font-sans text-slate-800 text-[11px] uppercase tracking-wider mb-2">
              Rincian Item Pesanan ({cart.length})
            </p>
            {cart.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center text-xs py-0.5">
                <span className="truncate max-w-[200px]">
                  {item.product.name} &times; {item.quantity}
                </span>
                <span className="font-medium">{formatRupiah(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-dashed border-slate-300 space-y-1 font-sans">
            <div className="flex justify-between text-slate-600 text-xs">
              <span>Subtotal Produk</span>
              <span>{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600 text-xs">
              <span>PPN (11%)</span>
              <span>{formatRupiah(taxAmount)}</span>
            </div>
            <div className="flex justify-between text-slate-600 text-xs">
              <span>Ekspedisi</span>
              <span className="font-medium">{shippingOption ? shippingOption.name : 'Kurir Reguler'} ({formatRupiah(shippingCost)})</span>
            </div>
            <div className="flex justify-between text-slate-600 text-xs">
              <span>Metode Pembayaran</span>
              <span className="font-semibold text-[#A1315E]">{paymentMethod.name}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
              <span>Total Biaya</span>
              <span className="text-[#A1315E]">{formatRupiah(totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button
            variant="outline"
            size="md"
            className="flex-1 text-xs"
            leftIcon={<Printer className="w-4 h-4" />}
            onClick={() => window.print()}
          >
            Cetak Struk
          </Button>

          <Button
            variant="primary"
            size="md"
            className="flex-1 text-xs bg-[#A1315E] hover:bg-[#89274E]"
            leftIcon={<RefreshCw className="w-4 h-4" />}
            onClick={onNewOrder}
          >
            Buat Permintaan Baru
          </Button>
        </div>
      </div>
    </Modal>
  );
};
