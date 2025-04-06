
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight, HeartPulse, Home, MessageSquare, Pill, Settings, Users, UserRound, CalendarClock, UserCog } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItems = [
  { name: 'Dashboard', icon: Home, path: '/' },
  { name: 'Health Metrics', icon: HeartPulse, path: '/health' },
  { name: 'Medications', icon: Pill, path: '/medications' },
  { name: 'Daily Schedule', icon: CalendarClock, path: '/schedule' },
  { name: 'Social', icon: Users, path: '/social' },
  { name: 'Messages', icon: MessageSquare, path: '/messages' },
  { name: 'My Profile', icon: UserRound, path: '/profile' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

const caregiverMenuItems = [
  { name: 'Dashboard', icon: Home, path: '/caregiver' },
  { name: 'Patients', icon: Users, path: '/caregiver/patients' },
  { name: 'Schedule', icon: Calendar, path: '/caregiver/schedule' },
  { name: 'Messages', icon: MessageSquare, path: '/caregiver/messages' },
  { name: 'Settings', icon: Settings, path: '/caregiver/settings' },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isCaregiverMode, setIsCaregiverMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleProfileSwitch = (mode: 'user' | 'caregiver') => {
    setIsCaregiverMode(mode === 'caregiver');
    
    if (mode === 'caregiver') {
      navigate('/caregiver');
      toast({
        title: "Switched to Caregiver Profile",
        description: "You are now viewing the caregiver portal"
      });
    } else {
      navigate('/');
      toast({
        title: "Switched to User Profile",
        description: "You are now viewing Martha's profile"
      });
    }
  };

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
        {(isCaregiverMode ? caregiverMenuItems : menuItems).map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "flex items-center gap-4 px-3 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
              location.pathname === item.path && "bg-primary/10 text-primary font-medium"
            )}
          >
            <item.icon className={cn("h-6 w-6 flex-shrink-0", location.pathname === item.path && "text-primary")} />
            {!collapsed && <span className="text-accessible truncate">{item.name}</span>}
          </Link>
        ))}
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed ? (
          <div className="flex items-center gap-3 p-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3 w-full justify-start p-2 h-auto">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    {isCaregiverMode ? 
                      <UserCog className="h-5 w-5" /> : 
                      <UserRound className="h-5 w-5" />
                    }
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="font-medium truncate">{isCaregiverMode ? "Caregiver Portal" : "Martha Johnson"}</p>
                    <p className="text-sm text-muted-foreground truncate">Switch Profiles</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Switch Profile</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className={!isCaregiverMode ? "bg-primary/10" : ""}
                  onClick={() => handleProfileSwitch('user')}
                >
                  <UserRound className="mr-2 h-4 w-4" />
                  <span>Martha Johnson</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className={isCaregiverMode ? "bg-primary/10" : ""}
                  onClick={() => handleProfileSwitch('caregiver')}
                >
                  <UserCog className="mr-2 h-4 w-4" />
                  <span>Caregiver Portal</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full">
                  {isCaregiverMode ? 
                    <UserCog className="h-5 w-5" /> : 
                    <UserRound className="h-5 w-5" />
                  }
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Switch Profile</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleProfileSwitch('user')}>
                  <UserRound className="mr-2 h-4 w-4" />
                  <span>Martha</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleProfileSwitch('caregiver')}>
                  <UserCog className="mr-2 h-4 w-4" />
                  <span>Caregiver</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
}
