
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  // Automatically collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  }, [isMobile]);

  // Add a subtle page transition effect when route changes
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  
  useEffect(() => {
    setIsPageTransitioning(true);
    const timer = setTimeout(() => {
      setIsPageTransitioning(false);
    }, 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      
      <main 
        className={cn(
          "pt-20 transition-all duration-300",
          sidebarCollapsed ? "pl-16" : "pl-64",
          isMobile && "pl-0"
        )}
      >
        <div 
          className={cn(
            "container py-8 mx-auto max-w-7xl transition-opacity duration-300",
            isPageTransitioning ? "opacity-0" : "opacity-100 animate-scale-in"
          )}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
};
