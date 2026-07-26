import React from 'react';
import { QrCode, Truck, CreditCard, CheckCircle2 } from 'lucide-react';
import { PaymentMethodId, PaymentMethodOption } from '@/types';

export interface PaymentMethodProps {
  methods: PaymentMethodOption[];
  selectedMethod: PaymentMethodId;
  onSelectMethod: (id: PaymentMethodId) => void;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({
  methods,
  selectedMethod,
  onSelectMethod
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'QrCode':
        return <QrCode className="w-6 h-6" />;
      case 'Truck':
        return <Truck className="w-6 h-6" />;
      case 'CreditCard':
        return <CreditCard className="w-6 h-6" />;
      default:
        return <CreditCard className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-bold text-slate-800">Pilih Metode Pembayaran</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Pilih metode pembayaran pengadaan yang disetujui oleh manajemen outlet.
        </p>
      </div>

      <div className="space-y-3">
        {methods.map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <div
              key={method.id}
              onClick={() => onSelectMethod(method.id)}
              className={`relative flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                isSelected
                  ? 'border-brand-600 bg-brand-50/40 shadow-sm ring-2 ring-brand-600/10'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div
                className={`p-2.5 rounded-xl shrink-0 transition-colors ${
                  isSelected ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {getIcon(method.iconName)}
              </div>

              <div className="flex-1 min-w-0 pr-6">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-800">{method.name}</h4>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{method.description}</p>
                {method.details && (
                  <p className="text-[11px] font-semibold text-brand-700 mt-1.5 bg-brand-100/50 inline-block px-2 py-0.5 rounded-md">
                    {method.details}
                  </p>
                )}
              </div>

              {/* Selection Checkmark */}
              <div className="absolute top-4 right-4">
                <CheckCircle2
                  className={`w-5 h-5 transition-all ${
                    isSelected ? 'text-brand-600 scale-100' : 'text-slate-200 scale-90'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
