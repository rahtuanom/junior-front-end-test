<div align="center">

  <img src="src/assets/icons/LogoColor.svg" alt="Anemone Logo" width="220" />

  # Anemone — Purchase Requests Web Application

  Anemone Outlet Operational Supply Procurement Application built with **React 19, TypeScript, Vite 6, and Tailwind CSS v4**.

  <br />

  [![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://junior-front-end-test.vercel.app)
  [![Figma](https://img.shields.io/badge/Figma-Design_Spec-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/design/XJevbxVpijK5RWFZEzlOVX/Training-Junior-Front-end---I-Gusti-Ngurah-Anom-Hariyadi?node-id=17-254&p=f&m=dev)

  <br />

</div>

---

## 📌 Link Proyek (Submission Links)

| Platform | Keterangan | URL / Access |
| :--- | :--- | :--- |
|  **Figma Design** | View Public Access | [Buka Design Figma](https://www.figma.com/design/XJevbxVpijK5RWFZEzlOVX/Training-Junior-Front-end---I-Gusti-Ngurah-Anom-Hariyadi?node-id=17-254&p=f&m=dev) |
|  **GitHub Repository** | Public Source Code | [rahtuanom/junior-front-end-test](https://github.com/rahtuanom/junior-front-end-test) |
|  **Vercel Live Demo** | Production Deployment | [junior-front-end-test.vercel.app](https://anemone-junior-front-end-test.vercel.app/) |

---

## 🛠️ Teknologi yang Digunakan

- **React 19 & TypeScript**: Library UI utama untuk membangun komponen modular dengan tipe data terstruktur.
- **Vite 6**: Alat pembuat (*build tool*) dan *development server*.
- **Tailwind CSS v4**: Framework CSS untuk penataan gaya halaman.
- **Lucide React**: Library ikon komponen.
- **LocalStorage API**: Media penyimpanan lokal browser untuk menyimpan data keranjang dan sisa stok selama sesi berlangsung.

---

## 🚀 Petunjuk Menjalankan Proyek

### Prasyarat System:
- **Node.js**: Versi `18.x` atau lebih baru
- **Package Manager**: `npm` (atau `yarn` / `pnpm`)

### Langkah Instalasi:

```bash
# 1. Clone repository
git clone https://github.com/rahtuanom/junior-front-end-test.git
cd junior-front-end-test

# 2. Install dependensi
npm install

# 3. Jalankan development server
npm run dev

# 4. Build proyek untuk produksi
npm run build
npm run preview
```

---

## 📁 Struktur Proyek

```
junior-front-end-test/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json
├── .gitignore
├── README.md
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── assets/
    │   ├── icons/
    │   │   ├── iconPink.svg
    │   │   └── LogoColor.svg
    │   ├── images/
    │   │   ├── KPensil-Biru.png
    │   │   ├── KPensil-Pink.png
    │   │   ├── ModulCalistung1.png
    │   │   ├── ModulCalistung2.png
    │   │   ├── ModulCalistung3.png
    │   │   ├── Tas-Biru.png
    │   │   ├── Tas-Pink.png
    │   │   └── Tumbler-Pink.png
    │   └── user/
    │       └── user_profile.png
    ├── components/
    │   ├── layout/
    │   │   ├── BottomNav.tsx
    │   │   ├── Header.tsx
    │   │   ├── PageContainer.tsx
    │   │   └── Sidebar.tsx
    │   └── ui/
    │       ├── Accordion.tsx
    │       ├── Button.tsx
    │       ├── EmptyState.tsx
    │       ├── Modal.tsx
    │       ├── QuantityInput.tsx
    │       ├── Toast.tsx
    │       └── TourGuide.tsx
    ├── features/
    │   └── purchase-request/
    │       ├── PurchaseRequestPage.tsx
    │       ├── components/
    │       │   ├── CartItem.tsx
    │       │   ├── CartPanel.tsx
    │       │   ├── OrderSummary.tsx
    │       │   ├── PaymentMethod.tsx
    │       │   ├── ProductCard.tsx
    │       │   ├── ProductCatalog.tsx
    │       │   ├── ShippingMethod.tsx
    │       │   ├── Stepper.tsx
    │       │   └── SuccessReceipt.tsx
    │       └── data/
    │           ├── mockProducts.ts
    │           ├── paymentMethods.ts
    │           └── shippingMethods.ts
    └── types/
        └── index.ts
```

---

## 🎯 Keputusan UI/UX Utama

> [!NOTE]
> **Tata Letak Terisolasi (Fixed Layout Architecture)**  
> Navigasi utama (Header, Sidebar, dan Ringkasan Keranjang) diatur tetap pada posisinya (fixed/sticky). Area scroll dibatasi hanya pada konten utama katalog produk untuk menjaga kenyamanan navigasi pengguna.

> [!TIP]
> **Katalog Produk Responsif**  
> Layout katalog menyesuaikan ukuran layar (grid 2 kolom pada tampilan mobile dan 3–4 kolom pada tampilan desktop) dengan rasio gambar 1:1 agar informasi produk dan harga tetap efisien dalam menggunakan ruang layar.

> [!IMPORTANT]
> **Umpan Balik Pengguna & Notifikasi**  
> Pesan pemberitahuan (Toast) ditampilkan di bagian atas tengah layar untuk memberikan konfirmasi aksi pengguna. Tombol dan bentuk input memiliki indikator status yang jelas.

> [!NOTE]
> **Penyederhanaan Tampilan Pembayaran**  
> Informasi rincian pesanan disusun dalam struktur yang memuat seluruh daftar barang tanpa memicu scroll ganda. Pilihan metode pengiriman menggunakan komponen dropdown yang dapat ditutup secara otomatis setelah opsi dipilih.

> [!TIP]
> **Fitur Panduan Penggunaan (Interactive Tour Guide)**  
> Menyediakan fitur panduan langkah-demi-langkah (yang dapat diakses melalui menu Bantuan) untuk membantu pengguna memahami alur pengajuan barang.

---

## 💡 Asumsi yang Dibuat Selama Pengerjaan

1. **Konteks Pengguna**:
   Aplikasi digunakan oleh Koordinator Outlet Cabang Anemone untuk mengajukan kebutuhan suplai operasional (seperti buku modul, tas, dan alat tulis) kepada Kantor Pusat (Head Office).

2. **Simulasi Pengurangan Stok**:
   Saat transaksi dikonfirmasi, jumlah stok produk akan berkurang sesuai dengan jumlah yang diajukan. Data ini disimpan sementara di `localStorage` browser. Untuk kebutuhan pengujian, disediakan tombol **Reset Sesi** pada bagian Header untuk mengembalikan stok ke kondisi awal.

3. **Komponen Biaya**:
   Total biaya dihitung berdasarkan Subtotal Harga Produk + Pajak PPN (11%) + Biaya Pengiriman sesuai ekspedisi yang dipilih.

4. **Konfirmasi Pemesanan**:
   Setelah konfirmasi berhasil, aplikasi menampilkan resi transaksi resmi beserta nomor referensi pengajuan yang dapat dicetak atau digunakan untuk memulai pengajuan baru.
