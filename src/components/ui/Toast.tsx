import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from 'lucide-react';
import { ToastMessage } from '@/types';

export interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
  autoCloseDuration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  toast,
  onClose,
  autoCloseDuration = 2000 // 2 seconds stay duration
}) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, autoCloseDuration);
    return () => clearTimeout(timer);
  }, [toast, onClose, autoCloseDuration]);

  if (!toast) return null;

  const isErrorOrWarning = toast.type === 'error' || toast.type === 'warning';

  const icons = {
    error: <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-600 shrink-0" />,
    success: <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
  };

  const bgStyles = {
    error: 'bg-red-50 border-2 border-red-500 text-red-950 shadow-2xl shadow-red-500/20',
    warning: 'bg-red-50 border-2 border-red-500 text-red-950 shadow-2xl shadow-red-500/20',
    info: 'bg-blue-50 border border-blue-300 text-blue-950 shadow-xl',
    success: 'bg-emerald-50 border border-emerald-300 text-emerald-950 shadow-xl'
  };

  return (
    <div className="fixed top-5 inset-x-0 z-50 flex justify-center items-center pointer-events-none px-4">
      <div 
        className={`pointer-events-auto max-w-md w-full sm:w-auto min-w-[300px] flex items-center gap-3 px-4 py-3 rounded-2xl border ${bgStyles[toast.type]} ${
          isErrorOrWarning ? 'animate-toast-shake' : 'animate-toast-slide'
        }`}
      >
        {icons[toast.type]}
        <div className="flex-1 text-xs sm:text-sm font-bold leading-snug">{toast.message}</div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-lg hover:bg-black/5"
          aria-label="Tutup Notifikasi"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
