/**
 * data/shippingMethods.ts - Dataset Opsi Ekspedisi & Kurir Pengiriman Anemone
 * Menyediakan opsi pengiriman dari Head Office ke outlet cabang beserta estimasi dan biaya.
 */

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimate: string;
  description: string;
}

export const SHIPPING_METHODS: ShippingOption[] = [
  {
    id: 'internal',
    name: 'Kurir Internal Anemone (Reguler)',
    price: 0,
    estimate: '3-5 Hari Kerja',
    description: 'Pengiriman rutin operasional mingguan ke outlet cabang.'
  },
  {
    id: 'express',
    name: 'Ekspedisi Express HO',
    price: 25000,
    estimate: '1 Hari Kerja (Besok Sampai)',
    description: 'Pengiriman prioritas cepat langsung dari Head Office.'
  },
  {
    id: 'regular',
    name: 'Ekspedisi Reguler HO',
    price: 15000,
    estimate: '3-5 Hari Kerja',
    description: 'Pengiriman reguler langsung dari Head Office.'
  },
  {
    id: 'pickup',
    name: 'Ambil Mandiri di Head Office',
    price: 0,
    estimate: 'Hari Ini',
    description: 'Koordinator/owner mengambil langsung paket di gudang pusat.'
  }
];
