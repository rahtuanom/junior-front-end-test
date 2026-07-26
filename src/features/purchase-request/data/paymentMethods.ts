/**
 * data/paymentMethods.ts - Dataset Metode Pembayaran Resmi Anemone
 * Menyediakan opsi pembayaran yang dapat dipilih oleh koordinator cabang pada Step 2.
 */

import { PaymentMethodOption } from '@/types';

export const PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: 'qris',
    name: 'QRIS',
    description: 'Pembayaran instan via scan QRIS Bank/E-Wallet',
    iconName: 'QrCode',
    details: 'Mendukung GoPay, OVO, Dana, dan ShopeePay'
  },
  {
    id: 'cod',
    name: 'Cash on Delivery (COD)',
    description: 'Bayar saat pengiriman tiba di alamat outlet',
    iconName: 'Truck',
    details: 'Jl. Tukad Sanghyang No.9, Panjer, Denpasar Selatan, Kota Denpasar, Bali 80225'
  },
  {
    id: 'debit',
    name: 'Kartu Debit',
    description: 'Debit otomatis kartu outlet cabang',
    iconName: 'CreditCard',
    details: 'Bank xx Outlet Principal •••• 1234'
  }
];
