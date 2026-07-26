import React, { useState } from 'react';
import { Truck, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { ShippingOption } from '../data/shippingMethods';

export interface ShippingMethodProps {
  methods: ShippingOption[];
  selectedShipping: string;
  onSelectShipping: (id: string) => void;
}

export const ShippingMethod: React.FC<ShippingMethodProps> = ({
  methods,
  selectedShipping,
  onSelectShipping
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentOption = methods.find((m) => m.id === selectedShipping) || methods[0];

  const handleSelectOption = (id: string) => {
    onSelectShipping(id);
    setIsOpen(false); // Automatically collapse dropdown after selection!
  };

  return (
    <div className="space-y-3">
      {/* Label Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-[#0D1C2F]">Opsi Ekspedisi / Pengiriman</h3>
          <p className="text-[11px] text-[#444651]">Pilih kurir pengiriman ke outlet Anda.</p>
        </div>
        <span className="text-[10px] font-semibold text-[#757682] bg-slate-100 px-2 py-0.5 rounded-full">
          {methods.length} Opsi
        </span>
      </div>

      {/* Main Collapsible Dropdown Card */}
      <div className="relative bg-white border border-[#C5C5D3] rounded-xl overflow-hidden shadow-2xs">
        {/* Selected Option Collapsed Header (Click to Expand / Collapse) */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between p-3.5 cursor-pointer transition-all ${
            isOpen ? 'bg-[#FDF2F7] border-b border-[#A1315E]' : 'bg-white hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-[#A1315E] text-white shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-bold text-xs sm:text-sm text-[#0D1C2F] truncate">
                  {currentOption ? currentOption.name : 'Pilih Opsi Ekspedisi / Pengiriman'}
                </h4>
                {currentOption && (
                  <span className="text-[10px] font-semibold text-[#A1315E] bg-white border border-[#C5C5D3] px-2 py-0.2 rounded-full shrink-0">
                    {currentOption.estimate}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#757682] truncate mt-0.5">
                {currentOption ? currentOption.description : 'Klik untuk melihat daftar kurir'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 pl-2">
            <span className="font-extrabold text-xs sm:text-sm text-[#A1315E]">
              {currentOption.price === 0 ? 'Gratis' : `Rp ${currentOption.price.toLocaleString('id-ID')}`}
            </span>
            <div className="p-1 rounded-md text-[#757682] bg-slate-100">
              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </div>
        </div>

        {/* Expanded Options List (Dropdown Panel) */}
        {isOpen && (
          <div className="p-3 space-y-2 bg-[#F8F9FF] border-t border-slate-100 animate-in fade-in duration-150">
            <p className="text-[10px] font-bold text-[#757682] uppercase tracking-wider px-1">
              Pilihan Kurir Tersedia
            </p>

            {methods.map((method) => {
              const isSelected = selectedShipping === method.id;
              return (
                <div
                  key={method.id}
                  onClick={() => handleSelectOption(method.id)}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#A1315E] bg-white shadow-2xs'
                      : 'border-[#C5C5D3] bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-md shrink-0 ${
                        isSelected ? 'bg-[#A1315E] text-white' : 'bg-slate-100 text-[#757682]'
                      }`}
                    >
                      <Truck className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-bold text-xs text-[#0D1C2F]">{method.name}</h5>
                        <span className="text-[9px] font-semibold text-[#757682] bg-slate-100 px-1.5 py-0.2 rounded-full">
                          {method.estimate}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#757682] mt-0.5">{method.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pl-2">
                    <span className="font-bold text-xs text-[#0D1C2F]">
                      {method.price === 0 ? 'Gratis' : `Rp ${method.price.toLocaleString('id-ID')}`}
                    </span>
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? 'text-[#A1315E]' : 'text-slate-200'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
