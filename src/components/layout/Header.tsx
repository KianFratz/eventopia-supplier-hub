
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Bell, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Suppliers', path: '/suppliers' },
    { label: 'Events', path: '/events' },
    { label: 'Analytics', path: '/analytics' },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-semibold text-xl text-primary">EventPro</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.path ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Search and Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search suppliers..." 
              className="pl-9 w-64 bg-secondary/50 border-0 focus-visible:ring-primary" 
            />
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Calendar className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-background z-40 animate-fade-in">
          <nav className="flex flex-col p-6 space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-base font-medium transition-colors ${
                  location.pathname === item.path ? 'text-primary' : 'text-foreground'
                }`}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search suppliers..." 
                  className="pl-9 w-full bg-secondary/50 border-0 focus-visible:ring-primary" 
                />
              </div>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" className="flex-1 justify-start space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                </Button>
                <Button variant="outline" size="icon" className="flex-1 justify-start space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Calendar</span>
                </Button>
                <Button variant="outline" size="icon" className="flex-1 justify-start space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
