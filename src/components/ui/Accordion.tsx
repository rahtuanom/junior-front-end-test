import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  defaultOpen = true,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`bg-white border border-[#C5C5D3] rounded-xl overflow-hidden shadow-xs ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 bg-navy-50 border-b border-[#C5C5D3] text-left transition-colors hover:bg-navy-100"
      >
        <div className="font-semibold text-[20px] text-navy-900">{title}</div>
        <ChevronDown
          className={`w-5 h-5 text-navy-900 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="p-6 animate-in fade-in-50 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};
