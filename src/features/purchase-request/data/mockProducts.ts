import { Product } from '@/types';
import modul1Img from '@/assets/images/ModulCalistung1.png';
import modul2Img from '@/assets/images/ModulCalistung2.png';
import modul3Img from '@/assets/images/ModulCalistung3.png';
import tasBiruImg from '@/assets/images/Tas-Biru.png';
import tasPinkImg from '@/assets/images/Tas-Pink.png';
import kPensilPinkImg from '@/assets/images/KPensil-Pink.png';
import kPensilBiruImg from '@/assets/images/KPensil-Biru.png';
import tumblerPinkImg from '@/assets/images/Tumbler-Pink.png';

export const INITIAL_MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Modul Calistung Level 1',
    price: 20000,
    stock: 500,
    category: 'Buku',
    unit: 'pcs',
    description: 'Modul membaca, menulis, dan berhitung tingkat dasar untuk siswa Anemone.',
    image: modul1Img
  },
  {
    id: 'prod-2',
    name: 'Modul Calistung Level 2',
    price: 20000,
    stock: 70,
    category: 'Buku',
    unit: 'pcs',
    description: 'Modul lanjutan latihan membaca dan pemahaman berhitung tingkat 2.',
    image: modul2Img
  },
  {
    id: 'prod-3',
    name: 'Modul Calistung Level 3',
    price: 20000,
    stock: 500,
    category: 'Buku',
    unit: 'pcs',
    description: 'Modul membaca, menulis, dan berhitung tingkat mahir untuk siswa Anemone.',
    image: modul3Img
  },
  {
    id: 'prod-4',
    name: 'Tas Anemone Biru',
    price: 100000,
    stock: 1500,
    category: 'Tas',
    unit: 'pcs',
    description: 'Tas ransel sekolah siswa Anemone warna biru tahan air dan ergonomis.',
    image: tasBiruImg
  },
  {
    id: 'prod-5',
    name: 'Tas Anemone Pink',
    price: 100000,
    stock: 1500,
    category: 'Tas',
    unit: 'pcs',
    description: 'Tas ransel sekolah siswa Anemone warna pink cerah khas edisi cabang.',
    image: tasPinkImg
  },
  {
    id: 'prod-6',
    name: 'Kotak Pensil Pink',
    price: 15000,
    stock: 5, // Stok Sedikit
    category: 'Alat Tulis',
    unit: 'pcs',
    description: 'Kotak pensil tempat alat tulis Anemone Pink edisi terbatas.',
    image: kPensilPinkImg
  },
  {
    id: 'prod-7',
    name: 'Kotak Pensil Biru',
    price: 15000,
    stock: 15, // Stok Sedikit
    category: 'Alat Tulis',
    unit: 'pcs',
    description: 'Kotak pensil tempat alat tulis Anemone Biru edisi khas cabang.',
    image: kPensilBiruImg
  },
  {
    id: 'prod-8',
    name: 'Tumbler Anemone Pink',
    price: 75000,
    stock: 100,
    category: 'Aksesoris',
    unit: 'pcs',
    description: 'Botol minum tumbler stainless tahan dingin & panas Anemone Pink.',
    image: tumblerPinkImg
  }
];

export const MOCK_PRODUCTS = [...INITIAL_MOCK_PRODUCTS];
