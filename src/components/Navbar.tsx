import React, { useState } from 'react';
import { Menu, X, Calendar, Phone } from 'lucide-react';
import { MeridianBluLogo } from './MeridianBluLogo';
import { useRouter } from '../router';

interface NavbarProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
  onOpenBooking?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const { currentPath, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Multi-page navigation items
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/rooms', label: 'Accommodations' },
    { path: '/about', label: 'About Us' },
    { path: '/trails', label: 'Mountain Trails' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/stories', label: 'Guest Stories' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] transition-all">
      {/* Sleek top accent strip */}
      <div className="h-1.5 w-full bg-[#1e242d]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo Zone */}
        <div className="flex items-center shrink-0">
          <MeridianBluLogo
            theme="light"
            onClick={() => handleNavClick('/')}
          />
        </div>

        {/* Desktop & Tablet Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-3 lg:gap-6 xl:gap-8 text-[13px] lg:text-[14px] font-medium text-[#111827]"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;

            return (
              <button
                key={link.path}
                type="button"
                onClick={() => handleNavClick(link.path)}
                className={`cursor-pointer transition-all duration-200 relative py-1 text-center font-medium whitespace-nowrap ${
                  isActive
                    ? 'text-[#005cd8] font-bold'
                    : 'text-[#1a202c] hover:text-[#005cd8]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-[#005cd8] rounded-full animate-fade-in" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Booking CTA & Mobile Menu Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => handleNavClick('/rooms')}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#005cd8] hover:bg-[#004bb3] active:bg-[#003d92] transition-colors shadow-sm cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Now</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-800 hover:text-black rounded-lg border border-gray-200 cursor-pointer transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-5 shadow-xl animate-fade-in">
          <div className="flex flex-col space-y-2 pb-4 border-b border-gray-100">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;

              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-left text-sm font-medium py-2.5 px-3 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'text-[#005cd8] bg-blue-50/80 font-bold'
                      : 'text-gray-700 hover:text-[#005cd8] hover:bg-gray-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#005cd8]" />}
                </button>
              );
            })}
          </div>

          <div className="pt-4 flex flex-col gap-2.5">
            <button
              onClick={() => handleNavClick('/rooms')}
              className="w-full py-3 text-center text-xs font-bold uppercase tracking-wider text-white bg-[#005cd8] rounded-xl cursor-pointer shadow-md hover:bg-[#004bb3] transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Stay</span>
            </button>
            <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
              <span>Cloud Crest Ridge, Mussoorie</span>
              <a
                href="tel:+911352638888"
                className="flex items-center gap-1 text-[#005cd8] font-medium font-mono"
              >
                <Phone className="w-3 h-3" />
                +91 135 263 8888
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
