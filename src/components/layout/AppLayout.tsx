import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
  onNavigateToLanding?: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, onNavigateToLanding }) => {
  return (
    <div className="min-h-screen bg-[#090A0F] text-slate-100 flex flex-col font-sans selection:bg-[#D8FF65] selection:text-black">
      <Navbar onNavigateToLanding={onNavigateToLanding} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-[#0B0C12] p-4 lg:p-6 text-slate-100">
          {children}
        </main>
      </div>
    </div>
  );
};
