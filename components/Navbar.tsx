import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Destinations', id: 'destinations' },
    { name: 'Packages', id: 'popular' },
    { name: 'AI Planner', id: 'planner' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNav = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => handleNav('hero')}>
            <div className="bg-primary-600 p-2 rounded-lg text-white">
              <Globe size={24} />
            </div>
            <span className="font-display font-bold text-2xl text-slate-900">
              Global<span className="text-primary-600">LY</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNav(link.id)}
                className="text-slate-600 hover:text-primary-600 font-medium transition-colors"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => handleNav('planner')}
              className="bg-primary-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all transform hover:-translate-y-0.5"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2 shadow-lg">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNav(link.id)}
                className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => handleNav('planner')}
              className="block w-full mt-4 text-center bg-primary-600 text-white px-3 py-3 rounded-lg font-semibold"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};