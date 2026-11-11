import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ShieldCheck, ShoppingBag, FileText, Menu, X, ArrowUpRight } from 'lucide-react';
import { useBasket } from '../../context/BasketContext';

export const Navbar: React.FC = () => {
  const { totalItemsCount } = useBasket();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Search Salts', path: '/medicines' },
    { label: 'Prescription Parser', path: '/prescription' },
    { label: 'Savings Slip', path: '/savings' },
    { label: 'Bioequivalence', path: '/education' },
    { label: 'FAQ', path: '/faq' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#f8f9fa]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-3.5 group text-left cursor-pointer transition-opacity hover:opacity-85"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#183b28] flex items-center justify-center text-emerald-200 transition-transform group-hover:scale-95 duration-200 shadow-[0_4px_20px_rgba(24,59,40,0.15)]">
            <ShieldCheck className="w-5 h-5 text-emerald-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-slate-900 text-lg leading-tight flex items-center gap-1.5">
              SaltMatch
              <span className="text-[10px] font-bold text-[#183b28] bg-[#eef5f1] px-2 py-0.5 rounded-full">
                Nordic BioRx
              </span>
            </span>
            <span className="text-[11px] font-medium text-slate-400 tracking-wide">
              Verified Generic Bioequivalence
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-[#f3f4f1] p-1.5 rounded-full" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-[0_2px_12px_rgba(0,0,0,0.04)] font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Right CTA Area */}
        <div className="flex items-center gap-3">
          <Link
            to="/prescription"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 px-4 py-2.5 rounded-full transition-all shadow-[0_2px_12px_rgba(0,0,0,0.03)] min-h-[40px]"
          >
            <FileText className="w-4 h-4 text-[#183b28]" />
            Scan Rx
          </Link>

          <Link
            to="/savings"
            className="flex items-center gap-2.5 bg-[#183b28] hover:bg-[#122e1f] text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-tight transition-all active:scale-95 shadow-[0_8px_25px_rgba(24,59,40,0.2)] min-h-[40px]"
            title="Open Family Savings Transition Slip"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-300" />
            <span className="hidden xs:inline">Savings Slip</span>
            {totalItemsCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center text-[10px] font-black">
                {totalItemsCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-2xl bg-white text-slate-700 shadow-xs"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-100 px-6 py-6 flex flex-col gap-3 shadow-lg">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#eef5f1] text-[#183b28] font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 opacity-50" />
              </Link>
            );
          })}
          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/prescription"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-100 text-slate-800 text-xs font-bold"
            >
              <FileText className="w-4 h-4 text-[#183b28]" />
              Paste Doctor Prescription
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
