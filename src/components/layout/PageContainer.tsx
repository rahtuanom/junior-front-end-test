import React from 'react';

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`flex-1 flex min-w-0 h-full overflow-hidden ${className}`}>
      {children}
    </div>
  );
};
