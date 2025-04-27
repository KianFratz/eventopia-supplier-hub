import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  Search,
  Star, 
  DollarSign, 
  MessageSquare,
  Clock,
  ChevronRight,
  Store,
  ServerIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const location = useLocation();

  const mainNavItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Suppliers', path: '/suppliers' },
    { icon: Store, label: 'Supplier Dashboard', path: '/supplier-dashboard' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: ServerIcon, label: 'Admin', path: '/admin' },
  ];

  const bottomNavItems = [
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: Search, label: 'Help', path: '/help' },
  ];

  const NavItem = ({ icon: Icon, label, path }: { icon: any; label: string; path: string }) => {
    const isActive = location.pathname === path;
    
    return (
      <Link
        to={path}
        className={cn(
          "flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-200 group",
          isActive 
            ? "bg-primary/10 text-primary" 
            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
        )}
      >
        <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
        {!collapsed && <span className="font-medium text-sm">{label}</span>}
      </Link>
    );
  };

  return (
    <aside 
      className={cn(
        "fixed top-0 left-0 z-40 h-screen pt-20 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        "bg-card border-r border-border"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-20 -right-3 h-6 w-6 rounded-full border border-border bg-background shadow-sm"
        onClick={() => setCollapsed(!collapsed)}
      >
        <ChevronRight className={cn(
          "h-3 w-3 transition-transform duration-200",
          collapsed ? "" : "rotate-180"
        )} />
      </Button>
      
      <ScrollArea className="h-full px-3">
        <div className="space-y-6 py-4">
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </div>
          
          {!collapsed && (
            <div className="pt-4">
              <div className="px-3 py-2">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Quick Actions
                </h3>
              </div>
              <div className="space-y-1 px-3 py-2">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  <Star className="mr-2 h-4 w-4 text-amber-500" />
                  Find Top Rated Suppliers
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  <DollarSign className="mr-2 h-4 w-4 text-emerald-500" />
                  Budget Calculator
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  <MessageSquare className="mr-2 h-4 w-4 text-blue-500" />
                  Contact Support
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  <Clock className="mr-2 h-4 w-4 text-purple-500" />
                  Recent Activities
                </Button>
              </div>
            </div>
          )}
  
          <div className="pt-2 mt-auto">
            <div className="space-y-1">
              {bottomNavItems.map((item) => (
                <NavItem key={item.path} {...item} />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};
