
import { Button } from "@/components/ui/button";
import { Bell, Menu, MoonStar, Sun, User } from "lucide-react";
import { useState } from 'react';

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="w-full border-b px-6 py-4 bg-background">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight hidden sm:block">Evergreen Care Compass</h1>
          <h1 className="text-2xl font-bold tracking-tight sm:hidden">Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? (
              <MoonStar className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          
          <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-alert"></span>
          </Button>
          
          <Button variant="ghost" size="icon" aria-label="User profile">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
