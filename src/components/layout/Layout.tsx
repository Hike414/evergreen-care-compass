
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex">
      <Sidebar className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed z-20 md:relative md:translate-x-0 transition-transform duration-300`} />
      
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className={cn(
          "flex-1 transition-all duration-300 bg-background overflow-y-auto"
        )}>
          {children}
        </main>
      </div>
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-foreground/30 z-10 md:hidden" 
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
