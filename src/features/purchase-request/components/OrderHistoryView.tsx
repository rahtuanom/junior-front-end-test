import React, { useState } from 'react';
import { ClipboardList, Clock, Truck, CreditCard, ShoppingBag, ArrowRight, ChevronDown, ChevronUp, Package } from 'lucide-react';
import { OrderHistoryItem } from '@/types';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';

export interface OrderHistoryViewProps {
  history: OrderHistoryItem[];
  onGoToKatalog: () => void;
}

interface OrderCardProps {
  order: OrderHistoryItem;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const totalItemsCount = order.cart.reduce((sum, i) => sum + i.quantity, 0);
  const firstItem = order.cart[0];

  return (
    <div className="bg-white border border-[#C5C5D3] rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all space-y-4 p-4 sm:p-6">
      {/* Order Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <span className="font-mono font-bold text-sm sm:text-base text-navy-900">
            {order.orderNumber}
          </span>
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{order.status}</span>
          </span>
        </div>

        <span className="text-xs text-[#757682] font-medium">
          {order.createdAt}
        </span>
      </div>

      {/* Item Preview & Collapsible Toggle Header */}
      <div className="space-y-3">
        {!isExpanded && firstItem ? (
          /* Collapsed Item Summary Preview */
          <div className="flex items-center justify-between gap-3 bg-[#F8F9FF] border border-[#C5C5D3] p-3 rounded-xl">
            <div className="flex items-center gap-3">
              <img
                src={firstItem.product.image}
                alt={firstItem.product.name}
                className="w-10 h-10 object-contain bg-white rounded-lg p-1 border border-[#C5C5D3] shrink-0"
              />
              <div>
                <h4 className="font-semibold text-xs sm:text-sm text-navy-900">
                  {firstItem.product.name} {order.cart.length > 1 && `+ ${order.cart.length - 1} item lainnya`}
                </h4>
                <p className="text-[11px] text-[#757682]">
                  Total {totalItemsCount} unit barang dalam pesanan ini
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-1 px-3 py-1.5 bg-white border border-brand-600 text-brand-600 text-xs font-bold rounded-lg hover:bg-brand-50 transition-colors shrink-0 shadow-2xs"
            >
              <span>Lihat Detail ({order.cart.length} Item)</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          /* Expanded Full Items List */
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-navy-900">
                <Package className="w-4 h-4 text-brand-600" />
                <span>Rincian Item Pesanan ({order.cart.length} Jenis Barang)</span>
              </div>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline"
              >
                <span>Tutup Rincian</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5 divide-y divide-slate-100 animate-in fade-in duration-200">
              {order.cart.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between gap-3 pt-2.5 first:pt-0">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain bg-navy-50 rounded-lg p-1 border border-[#C5C5D3] shrink-0"
                    />
                    <div>
                      <h4 className="font-semibold text-xs sm:text-sm text-navy-900">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#757682]">
                        Rp {item.product.price.toLocaleString('id-ID')} &times; {item.quantity} {item.product.unit || 'pcs'}
                      </p>
                    </div>
                  </div>

                  <span className="font-bold text-xs sm:text-sm text-navy-900 shrink-0">
                    {formatRupiah(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Payment & Logistics Metadata */}
      <div className="bg-navy-50 border border-[#DDE9FF] rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 text-navy-900">
            <Truck className="w-4 h-4 text-brand-600" />
            <span className="font-medium">Ekspedisi:</span>
            <span className="font-bold">{order.shippingOption.name}</span>
          </div>

          <div className="flex items-center gap-1.5 text-navy-900">
            <CreditCard className="w-4 h-4 text-brand-600" />
            <span className="font-medium">Pembayaran:</span>
            <span className="font-bold">{order.paymentMethod.name}</span>
          </div>
        </div>

        <span className="text-[11px] text-[#757682] font-semibold">
          Total {totalItemsCount} Barang
        </span>
      </div>

      {/* Pricing Summary Footer */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <div className="space-y-0.5 text-xs text-[#757682]">
          <p>
            Subtotal: {formatRupiah(order.subtotal)} | PPN (11%): {formatRupiah(order.taxAmount)} | Ongkir: {order.shippingOption.price === 0 ? 'Gratis' : formatRupiah(order.shippingOption.price)}
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-[#757682] font-semibold block uppercase">Total Dibayar</span>
          <span className="text-base sm:text-lg font-extrabold text-brand-600">
            {formatRupiah(order.totalAmount)}
          </span>
        </div>
      </div>
    </div>
  );
};

export const OrderHistoryView: React.FC<OrderHistoryViewProps> = ({
  history,
  onGoToKatalog
}) => {
  return (
    <div className="flex-1 h-full overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-6 pb-24 lg:pb-8">
      {/* Page Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#C5C5D3]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-navy-50 text-brand-600 flex items-center justify-center font-bold shrink-0">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-navy-900">Histori Pesanan</h1>
            <p className="text-xs sm:text-sm text-[#444651] mt-0.5">
              Daftar pengajuan barang yang telah berhasil dikirim ke Head Office pada sesi ini.
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={onGoToKatalog}
          leftIcon={<ShoppingBag className="w-4 h-4" />}
          className="bg-brand-600 hover:bg-brand-700 text-white hidden sm:flex"
        >
          Permintaan Baru
        </Button>
      </div>

      {/* History Cards List */}
      {history.length > 0 ? (
        <div className="space-y-4">
          {history.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#C5C5D3] rounded-2xl p-8 text-center space-y-4">
          <EmptyState
            title="Belum Ada Histori Pesanan"
            description="Anda belum melakukan pengajuan barang pada sesi ini. Silakan buat pesanan baru dari katalog produk."
          />

          <Button
            variant="primary"
            size="md"
            onClick={onGoToKatalog}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs py-2 px-4 rounded-lg shadow-xs mx-auto"
          >
            Mulai Permintaan Baru
          </Button>
        </div>
      )}
    </div>
  );
};
