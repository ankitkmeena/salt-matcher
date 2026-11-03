import React from 'react';
import { Pill, ShoppingBag, FileText, ShieldCheck } from 'lucide-react';
import { BasketItem } from '../types/medicine';

interface NavbarProps {
  basket: BasketItem[];
  onOpenBasket: () => void;
  onOpenParser: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ basket, onOpenBasket, onOpenParser }) => {
  const totalItems = basket.reduce((sum, item) => sum + item.strips_per_month, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Pill className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  Salt<span className="text-emerald-600">Match</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <ShieldCheck className="w-3 h-3 mr-1" /> Verified Bioequivalence
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                Medicine Salt Matcher & Generic Alternative Finder
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              type="button"
              onClick={onOpenParser}
              className="inline-flex items-center space-x-1.5 px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors min-h-[44px]"
              aria-label="Paste or scan a prescription"
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Paste Prescription</span>
              <span className="sm:hidden">Paste Rx</span>
            </button>

            <button
              type="button"
              onClick={onOpenBasket}
              className="relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm shadow-emerald-600/30 transition-all min-h-[44px]"
              aria-label={`View monthly prescription basket, ${totalItems} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline font-semibold">Rx Basket</span>
              {totalItems > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold bg-white text-emerald-700 rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
