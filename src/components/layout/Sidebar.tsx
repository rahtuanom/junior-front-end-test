import React from 'react';
import { 
  Store, 
  Plus, 
  Grid, 
  ClipboardList, 
  PackageCheck, 
  BarChart3, 
  Settings, 
  HelpCircle 
} from 'lucide-react';

export interface SidebarProps {
  activeTab?: string;
  onTabSelect?: (tab: string) => void;
  onOpenHelp?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab = 'Katalog',
  onTabSelect,
  onOpenHelp
}) => {
  const mainLinks = [
    { name: 'Katalog', icon: Grid },
    { name: 'Pesanan', icon: ClipboardList },
    { name: 'Inventaris', icon: PackageCheck },
    { name: 'Laporan', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#C5C5D3] h-full p-5 flex flex-col justify-between hidden lg:flex shrink-0 overflow-hidden select-none">
      <div className="space-y-6">
        {/* Outlet Switcher Header Box */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EFF4FF] text-[#A1315E] flex items-center justify-center font-bold shrink-0">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[20px] font-semibold text-[#0D1C2F] leading-tight">Outlet Utama</h3>
              <p className="text-[14px] text-[#444651] mt-0.5">Tampilan Koordinator</p>
            </div>
          </div>

          <button 
            type="button"
            onClick={() => onTabSelect && onTabSelect('Katalog')}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#A1315E] hover:bg-[#89274E] text-white rounded-lg text-sm font-semibold transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Permintaan Baru</span>
          </button>
        </div>

        {/* Main Navigation Links */}
        <nav className="space-y-1 pt-2">
          {mainLinks.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.name;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => onTabSelect && onTabSelect(item.name)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isSelected
                    ? 'text-[#A1315E] font-semibold bg-[#FDF2F7]'
                    : 'text-[#0D1C2F] hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'text-[#A1315E]' : 'text-[#757682]'}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Secondary Footer Links */}
      <div className="pt-4 border-t border-[#C5C5D3] space-y-1">
        <button
          type="button"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#444651] hover:bg-slate-50 transition-colors"
        >
          <Settings className="w-5 h-5 text-[#757682]" />
          <span>Pengaturan</span>
        </button>

        <button
          type="button"
          onClick={onOpenHelp}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#A1315E] hover:bg-[#FDF2F7] transition-colors"
        >
          <HelpCircle className="w-5 h-5 text-[#A1315E]" />
          <span>Bantuan (Panduan)</span>
        </button>
      </div>
    </aside>
  );
};
