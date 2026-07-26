import React, { useState } from 'react';
import { HelpCircle, ArrowRight, CheckCircle2, X, Sparkles, ShoppingBag, CreditCard, Truck, FileCheck } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';

export interface TourGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onStartSimulation: () => void;
}

export const TourGuide: React.FC<TourGuideProps> = ({
  isOpen,
  onClose,
  onStartSimulation
}) => {
  const [currentGuideStep, setCurrentGuideStep] = useState(1);

  if (!isOpen) return null;

  const tourSteps = [
    {
      step: 1,
      title: '1. Pilih Produk & Tambah Kuantitas',
      icon: <ShoppingBag className="w-6 h-6 text-[#A1315E]" />,
      description: 'Pilih barang operasional dari katalog. Sebagai simulasi, coba tambahkan "Kotak Pensil Pink" sebanyak 5 unit.',
      highlight: 'Kotak Pensil Pink (stok 5) -> Tekan tombol + hingga 5 pcs.'
    },
    {
      step: 2,
      title: '2. Lanjut ke Pembayaran',
      icon: <ArrowRight className="w-6 h-6 text-[#A1315E]" />,
      description: 'Periksa item di panel Keranjang Permintaan Saat Ini (sisi kanan/drawer mobile), lalu klik "Lanjut ke Pembayaran".',
      highlight: 'Rincian Subtotal & PPN 11% terhitung secara otomatis.'
    },
    {
      step: 3,
      title: '3. Pilih Opsi Ekspedisi',
      icon: <Truck className="w-6 h-6 text-[#A1315E]" />,
      description: 'Pada halaman pembayaran, pilih metode pengiriman (Kurir Reguler, Ekspedisi Express HO, atau Ambil Mandiri).',
      highlight: 'Biaya ekspedisi akan langsung menambahkan total belanja.'
    },
    {
      step: 4,
      title: '4. Pilih Metode Pembayaran',
      icon: <CreditCard className="w-6 h-6 text-[#A1315E]" />,
      description: 'Pilih opsi pembayaran resmi outlet yang disetujui (QRIS, COD, atau Kartu Debit Corporate).',
      highlight: 'Opsi yang dipilih akan tercetak resmi di struk konfirmasi.'
    },
    {
      step: 5,
      title: '5. Konfirmasi & Cetak Struk',
      icon: <FileCheck className="w-6 h-6 text-[#A1315E]" />,
      description: 'Klik "Lanjut ke Konfirmasi" untuk mengirim permintaan ke Head Office dan dapatkan No. Referensi REQ-ANM-XXXXXX.',
      highlight: 'Stok akan berkurang otomatis dan struk transaksi siap dicetak!'
    }
  ];

  const currentInfo = tourSteps[currentGuideStep - 1];

  const handleNext = () => {
    if (currentGuideStep < tourSteps.length) {
      setCurrentGuideStep((prev) => prev + 1);
    } else {
      onStartSimulation();
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentGuideStep > 1) {
      setCurrentGuideStep((prev) => prev - 1);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FDF2F7] text-[#A1315E] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#0D1C2F]">Panduan Simulasi Workflow</h2>
              <p className="text-xs text-slate-500">Panduan langkah demi langkah penggunaan web app</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between gap-2 bg-[#EFF4FF] p-3 rounded-xl border border-[#C5C5D3]">
          {tourSteps.map((s) => (
            <div
              key={s.step}
              onClick={() => setCurrentGuideStep(s.step)}
              className={`flex-1 h-2 rounded-full cursor-pointer transition-all ${
                s.step === currentGuideStep
                  ? 'bg-[#A1315E]'
                  : s.step < currentGuideStep
                  ? 'bg-[#A1315E]/50'
                  : 'bg-slate-200'
              }`}
              title={`Langkah ${s.step}`}
            />
          ))}
        </div>

        {/* Step Content Card */}
        <div className="bg-white border border-[#C5C5D3] rounded-2xl p-5 space-y-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FDF2F7] shrink-0">
              {currentInfo.icon}
            </div>
            <h3 className="font-bold text-sm sm:text-base text-[#0D1C2F]">{currentInfo.title}</h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {currentInfo.description}
          </p>

          <div className="bg-[#EFF4FF] border border-[#DDE9FF] p-3 rounded-xl text-xs text-[#0D1C2F] font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#A1315E] shrink-0" />
            <span>{currentInfo.highlight}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={currentGuideStep === 1}
            className="text-xs"
          >
            Sebelumnya
          </Button>

          <span className="text-xs text-slate-400 font-semibold">
            Langkah {currentGuideStep} dari {tourSteps.length}
          </span>

          <Button
            variant="primary"
            size="sm"
            onClick={handleNext}
            className="bg-[#A1315E] hover:bg-[#89274E] text-white text-xs"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            {currentGuideStep === tourSteps.length ? 'Mulai Simulasi' : 'Selanjutnya'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
