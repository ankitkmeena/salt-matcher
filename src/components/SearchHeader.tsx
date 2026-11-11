import React from 'react';
import { Search, X, Sparkles } from 'lucide-react';

interface SearchHeaderProps {
  query: string;
  onQueryChange: (q: string) => void;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  categories: string[];
  onlyGenerics: boolean;
  onToggleOnlyGenerics: () => void;
}

const POPULAR_QUERIES = [
  'Augmentin 625',
  'Glycomet-GP 2',
  'Telma 40',
  'Atorva 20',
  'Pantocid 40',
  'Thyronorm 50',
  'Zerodol-SP',
];

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  query,
  onQueryChange,
  selectedCategory,
  onCategorySelect,
  categories,
  onlyGenerics,
  onToggleOnlyGenerics,
}) => {
  return (
    <section className="pt-8 pb-4 sm:pt-12 sm:pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-8">
        {/* Minimal Search & Filter Centerpiece */}
        <div className="max-w-3xl w-full mx-auto flex flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#eef5f1] text-[#183b28]">
            <Sparkles className="w-3.5 h-3.5 text-[#27583d]" />
            <span>50+ Verified Bioequivalent Formulations</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Medicine & Salt Catalog
          </h1>
          <p className="text-slate-500 text-sm max-w-lg">
            Search by brand name or active pharmaceutical ingredient to find verified Jan Aushadhi generic equivalents.
          </p>

          {/* Quiet Floating Search Bar */}
          <div className="w-full mt-2">
            <div className="relative flex items-center bg-white rounded-full shadow-[0_10px_35px_rgb(0,0,0,0.05)] focus-within:shadow-[0_14px_45px_rgba(24,59,40,0.1)] transition-all p-2 pl-5">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="search"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search brand (Augmentin, Telma) or chemical salt (Metformin, Amoxicillin)..."
                className="w-full py-3 px-3.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 bg-transparent border-0 focus:outline-hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => onQueryChange('')}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors mr-1"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick molecule suggestions */}
            <div className="flex items-center justify-center flex-wrap gap-1.5 text-xs mt-3">
              <span className="text-slate-400 font-medium">Quick search:</span>
              {POPULAR_QUERIES.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => onQueryChange(q)}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-[#eef5f1] hover:text-[#183b28] text-slate-600 font-medium transition-colors shadow-2xs text-[11px]"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Minimal Category Scrollable Strip & Filter Toggle */}
        <div className="max-w-5xl w-full mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div 
            className="flex items-center overflow-x-auto p-1 rounded-full bg-[#f3f4f1] gap-1 scrollbar-none"
            role="tablist"
          >
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onCategorySelect(cat)}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    active
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Generics Only Switch Pill */}
          <button
            type="button"
            onClick={onToggleOnlyGenerics}
            className={`self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
              onlyGenerics
                ? 'bg-[#183b28] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 shadow-2xs'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${onlyGenerics ? 'bg-emerald-400' : 'bg-slate-300'}`} />
            <span>Generics Only</span>
          </button>
        </div>
      </div>
    </section>
  );
};
