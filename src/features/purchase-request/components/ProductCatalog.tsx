import React, { useState } from 'react';
import { SearchX, SlidersHorizontal } from 'lucide-react';
import { Product, CategoryType, CartItem } from '@/types';
import { ProductCard } from './ProductCard';

export interface ProductCatalogProps {
  products: Product[];
  cart: CartItem[];
  searchQuery: string;
  onUpdateCart: (product: Product, quantity: number) => void;
  onExceedStock: (productName: string, maxStock: number) => void;
}

const CATEGORIES: CategoryType[] = ['Semua', 'Buku', 'Tas', 'Alat Tulis', 'Aksesoris', 'Seragam'];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  cart,
  searchQuery,
  onUpdateCart,
  onExceedStock
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('Semua');

  // Filter products by category and search query
  const filteredProducts = products.filter((prod) => {
    const matchesCategory = selectedCategory === 'Semua' || prod.category === selectedCategory;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getQuantityInCart = (productId: string) => {
    const found = cart.find((item) => item.product.id === productId);
    return found ? found.quantity : 0;
  };

  return (
    <div className="space-y-4">
      {/* Category Filter Pills Bar */}
      <div className="flex items-center justify-between gap-3 pb-2 border-b border-[#C5C5D3]">
        <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar py-1">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#A1315E] text-white shadow-xs'
                    : 'bg-white border border-[#C5C5D3] text-[#0D1C2F] hover:bg-slate-50'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#757682] font-medium whitespace-nowrap shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#757682]" />
          <span>{filteredProducts.length} Produk</span>
        </div>
      </div>

      {/* Product Grid (Compact 2-Cols on Mobile, 3-4 Cols on Desktop) */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantityInCart={getQuantityInCart(product.id)}
              onUpdateCart={onUpdateCart}
              onExceedStock={onExceedStock}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-xl border border-[#C5C5D3] p-6">
          <div className="w-12 h-12 bg-[#EFF4FF] text-[#A1315E] rounded-full flex items-center justify-center mb-2">
            <SearchX className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-[#0D1C2F] mb-1">Produk Tidak Ditemukan</h4>
          <p className="text-xs text-[#444651] max-w-xs">
            Tidak ada produk yang cocok dengan pencarian &quot;{searchQuery}&quot; atau kategori &quot;{selectedCategory}&quot;.
          </p>
        </div>
      )}
    </div>
  );
};
