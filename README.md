# 🌸 Anemone — Purchase Requests Web Application

Aplikasi Web **Purchase Requests Operasional Outlet Anemone** berbasis **React 19 + TypeScript + Vite 6 + Tailwind CSS v4** yang dirancang presisi sesuai spesifikasi desain Figma (Pixel-Perfect Slicing) dan dilengkapi dengan pengalaman pengguna (*UI/UX Experience*) tingkat tinggi.

![Anemone Banner](https://raw.githubusercontent.com/rahtuanom/junior-front-end-test/main/src/assets/icons/LogoColor.svg)

---

## 📌 Link Penting (Submission Links)

- **🎨 Link Design Figma (View Access)**: [Figma Design Node 17-254](https://www.figma.com/design/XJevbxVpijK5RWFZEzlOVX/Training-Junior-Front-end---I-Gusti-Ngurah-Anom-Hariyadi?node-id=17-254&p=f&m=dev)
- **🐙 Link Repository GitHub**: [github.com/rahtuanom/junior-front-end-test](https://github.com/rahtuanom/junior-front-end-test)
- **⚡ Link Live Prototype (Vercel)**: [junior-front-end-test.vercel.app](https://junior-front-end-test.vercel.app)

---

## 🛠️ Teknologi yang Digunakan

1. **Core Library / Framework**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/) — Dipilih sebagai ekosistem frontend pilihan untuk menjamin *type-safety*, arsitektur berbasis komponen modular, dan performa tinggi.
2. **Build Tool & Bundler**: [Vite 6](https://vitejs.dev/) — *Lightning-fast* Hot Module Replacement (HMR) dan bundling produksi yang optimal.
3. **Styling & Design Tokens**: [Tailwind CSS v4](https://tailwindcss.com/) — Konfigurasi CSS kustom modern dengan variabel token warna Anemone.
4. **Icons Set**: [Lucide React](https://lucide.dev/) — Ikon visual modern yang konsisten.
5. **State & Storage Persistence**: React State + `localStorage` Web API untuk mempertahankan stok dan keranjang belanja antar sesi/refresh.

> ℹ️ **Catatan Pemilihan Framework**: Dalam pengerjaan tes frontend ini, **React 19 dengan TypeScript** dipilih sebagai framework implementasi utama karena skalabilitas arsitektur berbasis komponen, kemudahan penanganan state kompleks, serta dukungan perkakas modern yang sangat baik.

---

## 🚀 Petunjuk Menjalankan Project (Local Development)

### Prasyarat System:
- **Node.js**: Versi `18.x` atau lebih baru
- **Package Manager**: `npm` (atau `pnpm` / `yarn`)

### Langkah-langkah Memulai:

1. **Clone Repository**:
   ```bash
   git clone https://github.com/rahtuanom/junior-front-end-test.git
   cd junior-front-end-test
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000` (atau port yang ditentukan Vite).

4. **Build untuk Produksi & Pratinjau**:
   ```bash
   npm run build
   npm run preview
   ```

---

## 📁 Struktur Komponen & Arsitektur Kode

Aplikasi ini menggunakan pendekatan **Modular & Feature-Based Architecture (Separation of Concerns)** agar kode bersih, konsisten, dan mudah dikembangkan kembali:

```
src/
├── assets/                       # Asset gambar asli produk, logo SVG, dan foto profil
├── components/                   # Komponen Reusabel Umum
│   ├── layout/                   # Layout wrappers (Header, Sidebar, BottomNav, PageContainer)
│   └── ui/                       # UI Primitives (Button, Modal, Toast, QuantityInput, Accordion, TourGuide)
├── features/
│   └── purchase-request/         # Fitur Utama: Purchase Request
│       ├── components/           # Komponen Fitur (ProductCard, ProductCatalog, CartPanel, CartItem, PaymentMethod, ShippingMethod, OrderSummary, Stepper, SuccessReceipt)
│       ├── data/                 # Dataset Terpisah (mockProducts, paymentMethods, shippingMethods)
│       └── PurchaseRequestPage.tsx # State Container & Logical Controller
├── types/                        # TypeScript Interfaces & Domain Types (index.ts)
├── App.tsx                       # Root Application Component
├── main.tsx                      # Entry Point App
└── index.css                     # Global Styles & Custom Keyframe Animations
```

---

## 🎯 Keputusan UI/UX Utama

1. **Isolasi Scroll 3-Kolom (Fixed Layout Architecture)**:
   - Header, Sidebar Kiri, dan Panel Keranjang Kanan dibuat `fixed` (tidak ikut ter-scroll saat mouse wheel digerakkan).
   - **Hanya Katalog Produk di Tengah** yang merespon mouse scroll, memberikan navigasi yang sangat nyaman bagi Koordinator Outlet.

2. **Katalog Produk Ramping Rasio 1:1 (Shopee-Style Grid)**:
   - Pada layar mobile, produk disajikan dalam grid 2-kolom ramping ala e-commerce modern (Shopee/Tokopedia).
   - Menggunakan container gambar 1:1 persegi (`aspect-square bg-[#EFF4FF]`) agar banyak produk dapat dilihat sekaligus secara efisien.

3. **Top-Center Slide & Shake Toast Notification**:
   - Notifikasi toast berada di posisi **atas-tengah layar** dengan durasi otomatis 2 detik.
   - Menggunakan animasi **bergetar merah (`animate-shake`)** jika user menekan tombol tambah pada produk yang stoknya habis.

4. **Rombak Halaman Pembayaran (Flexible & Collapsible Dropdown Card)**:
   - Rincian *Detail Pesanan* ditampilkan secara utuh (*unclipped*) di kolom kiri tanpa batasan scroll internal.
   - Pilihan *Opsi Ekspedisi* dibuat dalam bentuk **Card Dropdown Collapsible** yang otomatis menutup setelah kurir dipilih untuk menghemat ruang visual.

5. **Panduan Simulasi Workflow Interaktif (`TourGuide.tsx`)**:
   - Dilengkapi fitur tour guide 5 langkah yang dipicu melalui tombol **Bantuan (Panduan)** pada Sidebar.
   - Tombol *"Mulai Simulasi"* di akhir panduan secara otomatis mengisikan **5 pcs Kotak Pensil Pink** ke dalam keranjang untuk langsung disimulasikan.

---

## 💡 Asumsi yang Dibuat Selama Pengerjaan

1. **Role Pengguna**: Pengguna aplikasi adalah **Koordinator Cabang Outlet Anemone** yang bertugas mengajukan permintaan suplai modul, tas, dan alat tulis ke Head Office.
2. **Penanganan Stok Real-Time**: Ketika pesanan diselesaikan (*checkout*), stok produk secara otomatis berkurang secara real-time dan disimpan di `localStorage`.
3. **Dev Button "Reset Sesi"**: Karena stok dapat habis saat pengujian, disediakan tombol **Reset Sesi** pada Header (di sebelah avatar profil) dengan indikator spinner 2 detik untuk mengembalikan seluruh stok produk ke nilai awal (`500`, `70`, `500`, `1500`, `1500`, `5`, `15`, `0`).
4. **Perhitungan Biaya**: Pajak PPN ditetapkan sebesar 11% dari Subtotal Produk, ditambah biaya pengiriman ekspedisi yang dipilih.
5. **Modal Resi Unclosable (`closeOnBackdropClick={false}`)**: Pengguna diwajibkan memilih tombol *"Cetak Struk"* atau *"Buat Permintaan Baru"* dan tidak dapat menutup resi secara tidak sengaja dengan mengeklik luar area modal.

---

## 📄 Lisensi & Kredit

Diikutsertakan sebagai bagian dari **Junior Front-End Test — Anemone**.  
Dikembangkan dengan 💖 oleh **I Gusti Ngurah Anom Hariyadi**.
