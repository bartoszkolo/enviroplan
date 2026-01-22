import React from 'react';
import { Leaf, Menu, X } from 'lucide-react';

export default function Navbar({
  isScrolled = false,
  mobileMenuOpen = false,
  setMobileMenuOpen = () => {},
  navLinks = [],
  onLogoClick = () => {}
}) {
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div onClick={onLogoClick} className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-enviro-600 p-2 rounded-lg group-hover:bg-enviro-700 transition">
            <Leaf className="text-white h-6 w-6" />
          </div>
          <span className={`text-2xl font-serif font-bold tracking-tight transition-colors ${isScrolled ? 'text-gray-900' : 'text-gray-900 lg:text-white'}`}>
            Enviro<span className="text-enviro-600">plan</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`relative text-sm font-medium transition-all duration-300 group ${isScrolled ? 'text-gray-600 hover:text-enviro-600' : 'text-gray-200 hover:text-white'}`}
            >
              <span className="relative z-10">{link.name}</span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-enviro-400 to-transparent group-hover:w-full transition-all duration-300 ease-out"></span>
            </a>
          ))}
          <a
            href="#kontakt"
            className="bg-enviro-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-enviro-700 hover:scale-105 hover:shadow-xl hover:shadow-enviro-600/40 transition-all duration-300 shadow-lg shadow-enviro-600/30"
          >
            Wycena
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu className={isScrolled ? 'text-gray-900' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 py-4 flex flex-col gap-4 px-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-800 font-medium py-2 border-b border-gray-50"
            >
              {link.name}
            </a>
          ))}
          <a href="#kontakt" className="text-enviro-700 font-bold py-2">Zamów wycenę</a>
        </div>
      )}
    </nav>
  );
}
