import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AppLayoutProps {
  children: React.ReactNode;
  role: 'admin' | 'student' | 'teacher';
  title: string;
  subtitle?: string;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function AppLayout({ children, role, title, subtitle, activeTab, onTabChange }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-porcelain">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        role={role}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />

      {/* Main area - offset by sidebar width on desktop */}
      <div className="lg:ml-[280px] min-h-screen flex flex-col">
        {/* Header */}
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          title={title}
          subtitle={subtitle}
        />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 page-enter">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
