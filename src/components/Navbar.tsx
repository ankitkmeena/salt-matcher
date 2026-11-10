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
    <header className="sticky top-0 z-40 bg-[#f8f9fa]/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5 sm:py-6">
        <div className="flex items-center justify-between">
          {/* Brand Wordmark Group */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#183b28] flex items-center justify-center text-white shadow-sm shadow-[#183b28]/15">
              <Pill className="w-5 h-5 text-emerald-200" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  Salt<span className="text-[#27583d]">Match</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-semibold bg-[#eef5f1] text-[#183b28]">
                  <ShieldCheck className="w-3.5 h-3.5" /> Bioequivalence Index
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden md:block">
                Transparent pharmaceutical salt matching & generic intelligence
              </p>
            </div>
          </div>

          {/* Minimalist Action Controls Group */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenParser}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-stone-100 rounded-full shadow-xs transition-all min-h-[44px]"
              aria-label="Paste or scan a prescription"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Paste Prescription</span>
              <span className="sm:hidden">Paste Rx</span>
            </button>

            <button
              type="button"
              onClick={onOpenBasket}
              className="relative inline-flex items-center gap-2.5 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#183b28] hover:bg-[#0f271a] active:scale-95 rounded-full shadow-md shadow-[#183b28]/15 transition-all min-h-[44px]"
              aria-label={`View monthly prescription basket, ${totalItems} items`}
            >
              <ShoppingBag className="w-4 h-4 text-emerald-200" />
              <span className="hidden sm:inline">Rx Savings Basket</span>
              <span className="sm:hidden font-medium">Rx</span>
              {totalItems > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-black bg-white text-[#183b28] rounded-full">
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
