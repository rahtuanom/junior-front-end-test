/**
 * types/index.ts - Domain Types & Interfaces untuk Sistem Permintaan Barang Anemone
 * Mengatur seluruh definisi tipe data katalog, keranjang, pembayaran, dan notifikasi.
 */

// Kategori produk yang tersedia di katalog
export type CategoryType = 'Semua' | 'Buku' | 'Tas' | 'Alat Tulis' | 'Aksesoris' | 'Seragam';

// Tipe data utama untuk produk operasional
export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: CategoryType;
  unit: string;
  description: string;
  image: string;
}

// Item yang ada di dalam keranjang belanja
export interface CartItem {
  product: Product;
  quantity: number;
}

// Opsi metode pembayaran yang didukung
export type PaymentMethodId = 'qris' | 'cod' | 'debit';

export interface PaymentMethodOption {
  id: PaymentMethodId;
  name: string;
  description: string;
  iconName: string;
  details: string;
}

// Tipe langkah dalam alur pemesanan (1: Katalog, 2: Pembayaran, 3: Konfirmasi Struk)
export type StepType = 1 | 2 | 3;

// Tipe data pesan toast notifikasi
export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}
