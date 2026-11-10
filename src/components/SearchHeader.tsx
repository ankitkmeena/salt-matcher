import React from 'react';
import { Search, X, Sparkles, AlertTriangle } from 'lucide-react';

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
  'Pan-D',
  'Atorva 20',
  'Thyronorm 50',
  'Zerodol-P',
  'Montair-LC',
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-12 sm:gap-14">
        {/* 1. Hero Group */}
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#eef5f1] text-[#183b28]">
            <Sparkles className="w-3.5 h-3.5 text-[#27583d]" />
            <span>Exact Bioequivalent Salt Matching • 60%–90% Prescription Savings</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12]">
            Same Active Medicine.{' '}
            <span className="text-[#183b28] italic font-serif">
              Fraction of the Cost.
            </span>
          </h1>

          <p className="max-w-[56ch] text-base sm:text-lg text-slate-500 font-normal leading-relaxed mt-1">
            Branded medications charge a massive commercial markup for trade names. SaltMatch analyzes identical active molecules and release mechanisms to reveal certified generic and Jan Aushadhi equivalents.
          </p>
        </div>

        {/* 2. Floating Minimalist Search Box */}
        <div className="max-w-3xl w-full mx-auto flex flex-col gap-4">
          <search className="w-full">
            <form
              action="/search"
              method="GET"
              onSubmit={handleSubmit}
              role="search"
            >
              <div className="relative flex items-center bg-white rounded-full shadow-[0_12px_45px_rgb(0,0,0,0.06)] hover:shadow-[0_16px_55px_rgb(0,0,0,0.09)] focus-within:shadow-[0_16px_55px_rgb(0,0,0,0.1)] transition-all p-2 pl-6">
                <label htmlFor="medicine-search-input" className="sr-only">
                  Search by medicine brand name, active salt, or molecule
                </label>
                
                <div className="text-[#183b28] pointer-events-none flex items-center justify-center shrink-0">
                  <Search className="w-6 h-6" aria-hidden="true" />
                </div>

                <input
                  type="search"
                  id="medicine-search-input"
                  name="q"
                  value={query}
                  onChange={(e) => onQueryChange(e.target.value)}
                  placeholder="Search by brand (Augmentin, Glycomet, Telma) or salt (Metformin, Telmisartan)..."
                  className="w-full py-3.5 pl-3.5 pr-4 text-base sm:text-lg text-slate-900 placeholder-slate-400 bg-transparent border-0 focus:outline-none focus:ring-0 min-h-[52px]"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  enterKeyHint="search"
                />

                {query && (
                  <button
                    type="button"
                    onClick={() => onQueryChange('')}
                    className="p-2.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors mr-2"
                    aria-label="Clear search input"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>
          </search>

          {/* Quick Query Pills */}
          <div className="flex items-center flex-wrap gap-2 text-xs px-3">
            <span className="font-semibold text-slate-400">Popular:</span>
            {POPULAR_QUERIES.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => onQueryChange(q)}
                className="px-3.5 py-1.5 rounded-full bg-stone-200/50 hover:bg-stone-200 text-slate-700 font-medium transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Nordic Segmented Category Control & Generic Toggle */}
        <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Segmented Category Pill Container */}
          <div 
            className="flex items-center overflow-x-auto p-1.5 rounded-full bg-[#eceee9] gap-1 scrollbar-none" 
            role="tablist" 
            aria-label="Filter by therapeutic category"
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
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all min-h-[40px] ${
                    active
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Jan Aushadhi Only Pill Toggle */}
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#eceee9] self-start md:self-auto shrink-0 min-h-[44px]">
            <button
              type="button"
              role="switch"
              aria-checked={onlyGenerics}
              onClick={onToggleOnlyGenerics}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#183b28] focus:ring-offset-2 ${
                onlyGenerics ? 'bg-[#183b28]' : 'bg-slate-300'
              }`}
            >
              <span className="sr-only">Show only Government Jan Aushadhi & Generic medicines</span>
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  onlyGenerics ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className="text-xs sm:text-sm font-semibold text-slate-700">
              Jan Aushadhi Only
            </span>
          </div>
        </div>

        {/* 4. Clinical Safety Banner */}
        <div className="max-w-5xl w-full mx-auto p-5 rounded-3xl bg-[#fffbf0] text-amber-950 text-xs sm:text-sm flex items-start gap-4 shadow-2xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="leading-relaxed">
            <strong className="font-bold text-amber-900">Clinical Safety Principle:</strong> SaltMatch matches identical chemical salts, strengths, and delivery profiles under WHO-GMP standards. For Narrow Therapeutic Index (NTI) drugs (e.g., Levothyroxine, Warfarin), always consult your physician for lab monitoring prior to switching brands.
          </p>
        </div>
      </div>
    </section>
  );
};
