
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight, HeartPulse, Home, MessageSquare, Pill, Settings, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: 'Dashboard', icon: Home, path: '/' },
  { name: 'Health Metrics', icon: HeartPulse, path: '/health' },
  { name: 'Medications', icon: Pill, path: '/medications' },
  { name: 'Social', icon: Users, path: '/social' },
  { name: 'Calendar', icon: Calendar, path: '/calendar' },
  { name: 'Messages', icon: MessageSquare, path: '/messages' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
      collapsed ? "w-20" : "w-64",
      className
    )}>
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              EC
            </div>
            <span className="font-bold text-lg truncate">Evergreen Care</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
      
      <nav className="flex-1 py-6 px-3 space-y-3 overflow-y-auto">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.path}
            className={cn(
              "flex items-center gap-4 px-3 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
              item.path === '/' && "bg-primary/10 text-primary font-medium"
            )}
          >
            <item.icon className={cn("h-6 w-6 flex-shrink-0", item.path === '/' && "text-primary")} />
            {!collapsed && <span className="text-accessible truncate">{item.name}</span>}
          </a>
        ))}
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed ? (
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">Caregiver Portal</p>
              <p className="text-sm text-muted-foreground truncate">Switch Profiles</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
