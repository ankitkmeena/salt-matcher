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
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Tagline Group */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-600/15">
              <Pill className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  Salt<span className="text-emerald-600">Match</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Bioequivalent Matcher
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                Transparent chemical salt matching & verified generic alternatives
              </p>
            </div>
          </div>

          {/* Action Controls Group */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={onOpenParser}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100/80 hover:bg-slate-200/80 rounded-xl transition-all min-h-[44px]"
              aria-label="Paste or scan a prescription"
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Paste Prescription</span>
              <span className="sm:hidden">Paste Rx</span>
            </button>

            <button
              type="button"
              onClick={onOpenBasket}
              className="relative inline-flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-98 rounded-xl shadow-md shadow-emerald-600/20 transition-all min-h-[44px]"
              aria-label={`View monthly prescription basket, ${totalItems} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Rx Savings Basket</span>
              <span className="sm:hidden font-medium">Rx</span>
              {totalItems > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-black bg-white text-emerald-700 rounded-full shadow-2xs">
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
