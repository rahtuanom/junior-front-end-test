import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Keranjang Anda Kosong',
  description = 'Belum ada produk yang ditambahkan ke keranjang permintaan cabang Anda.',
  actionText = 'Mulai Belanja',
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 my-4">
      <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
        <ShoppingBag className="w-8 h-8" />
      </div>
      <h3 className="text-base font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 max-w-xs mb-6 leading-relaxed">{description}</p>
      {onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
