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
    <section className="bg-gradient-to-b from-emerald-50/60 via-slate-50/40 to-slate-50 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-9">
        {/* 1. Hero Group */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-100/80 text-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Exact Active Salt Matching • 60%–90% Prescription Savings</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Stop Overpaying for Brands.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
              Find Identical Salt Generics.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Match your prescribed medicines by exact chemical salts, strengths, and delivery mechanism to discover certified Jan Aushadhi and bioequivalent generic alternatives.
          </p>
        </div>

        {/* 2. Search & Query Suggestions Group */}
        <div className="max-w-3xl w-full mx-auto flex flex-col gap-3.5">
          <search className="w-full">
            <form
              action="/search"
              method="GET"
              onSubmit={handleSubmit}
              role="search"
            >
              <div className="relative flex items-center bg-white rounded-2xl shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-slate-200/80 focus-within:shadow-2xl focus-within:ring-2 focus-within:ring-emerald-500/30 transition-all p-1.5">
                <label htmlFor="medicine-search-input" className="sr-only">
                  Search by medicine brand name, active salt, or molecule
                </label>
                
                <div className="pl-4 text-emerald-600 pointer-events-none flex items-center justify-center">
                  <Search className="w-6 h-6" aria-hidden="true" />
                </div>

                <input
                  type="search"
                  id="medicine-search-input"
                  name="q"
                  value={query}
                  onChange={(e) => onQueryChange(e.target.value)}
                  placeholder="Search brand (e.g. Augmentin, Glycomet, Telma) or molecule (Metformin, Telmisartan)..."
                  className="w-full py-3.5 pl-3.5 pr-10 text-base sm:text-lg text-slate-900 placeholder-slate-400 bg-transparent border-0 focus:outline-none focus:ring-0 min-h-[52px]"
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
                    className="p-2.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors mr-1"
                    aria-label="Clear search input"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>
          </search>

          {/* Quick Suggestions Chips Group */}
          <div className="flex items-center flex-wrap gap-2 text-xs px-1">
            <span className="font-semibold text-slate-400">Popular:</span>
            {POPULAR_QUERIES.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => onQueryChange(q)}
                className="px-3 py-1 rounded-lg bg-white/90 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 font-medium transition-all shadow-xs"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Category & Filter Controls Group */}
        <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Segmented Category Control */}
          <div 
            className="flex items-center overflow-x-auto p-1.5 rounded-2xl bg-slate-200/50 backdrop-blur-xs gap-1.5 scrollbar-none" 
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
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all min-h-[40px] ${
                    active
                      ? 'bg-white text-emerald-800 shadow-sm shadow-slate-300/40'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Jan Aushadhi Only Pill Toggle */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-200/50 backdrop-blur-xs self-start md:self-auto shrink-0 min-h-[44px]">
            <button
              type="button"
              role="switch"
              aria-checked={onlyGenerics}
              onClick={onToggleOnlyGenerics}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                onlyGenerics ? 'bg-emerald-600' : 'bg-slate-300'
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

        {/* 4. Clinical Safety Banner Group */}
        <div className="max-w-5xl w-full mx-auto p-4 rounded-2xl bg-amber-50/70 text-amber-950 text-xs flex items-start gap-3 shadow-xs">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="leading-relaxed">
            <strong className="font-bold text-amber-900">Clinical Bioequivalence Rule:</strong> SaltMatch matches identical chemical salts, strengths, and delivery profiles. For Narrow Therapeutic Index (NTI) drugs (e.g., Levothyroxine, Warfarin), always consult your physician for lab monitoring prior to switching brands.
          </p>
        </div>
      </div>
    </section>
  );
};
