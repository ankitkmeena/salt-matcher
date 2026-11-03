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
    <section className="bg-gradient-to-b from-emerald-50/80 via-white to-slate-50 pt-8 pb-6 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Copy */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Find Identical Active Ingredients at 60%–90% Lower Cost</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Match Your Medicine Salt,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              Unlock True Generic Savings
            </span>
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Chronic illness medications shouldn&apos;t drain family savings. Search your branded prescription to find verified, bioequivalent Jan Aushadhi and generic alternatives with exact molecule matching.
          </p>
        </div>

        {/* Accessible Search Form */}
        <search className="max-w-3xl mx-auto">
          <form
            action="/search"
            method="GET"
            onSubmit={handleSubmit}
            className="relative"
            role="search"
          >
            <div className="relative flex items-center shadow-lg shadow-slate-200/50 rounded-2xl overflow-hidden bg-white border-2 border-emerald-500/30 focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all">
              <label htmlFor="medicine-search-input" className="sr-only">
                Search by medicine brand name, active salt, or molecule
              </label>
              
              <div className="pl-4 sm:pl-5 text-slate-400 pointer-events-none flex items-center justify-center">
                <Search className="w-6 h-6 text-emerald-600" aria-hidden="true" />
              </div>

              <input
                type="search"
                id="medicine-search-input"
                name="q"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search brand (e.g. Augmentin, Glycomet, Telma) or salt (Metformin, Telmisartan)..."
                className="w-full py-4 pl-3 pr-10 text-base sm:text-lg text-slate-900 placeholder-slate-400 bg-transparent border-0 focus:outline-none focus:ring-0 min-h-[52px]"
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
                  className="pr-4 text-slate-400 hover:text-slate-600 transition-colors p-2"
                  aria-label="Clear search input"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>
        </search>

        {/* Quick Suggestion Chips */}
        <div className="max-w-3xl mx-auto mt-3 flex items-center flex-wrap gap-1.5 text-xs text-slate-500">
          <span className="font-medium mr-1 text-slate-600">Popular:</span>
          {POPULAR_QUERIES.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => onQueryChange(q)}
              className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 rounded-lg transition-colors font-medium shadow-2xs"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Filter Toolbar: Categories + Generic Toggle */}
        <div className="max-w-5xl mx-auto mt-6 pt-5 border-t border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Chips */}
          <div className="flex items-center overflow-x-auto pb-2 md:pb-0 gap-2 scrollbar-none" role="tablist" aria-label="Filter by therapeutic category">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onCategorySelect(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all min-h-[36px] ${
                    active
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Jan Aushadhi / True Generic Toggle */}
          <div className="flex items-center space-x-2 self-start md:self-auto shrink-0">
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
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  onlyGenerics ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className="text-xs sm:text-sm font-medium text-slate-700">
              Jan Aushadhi Only
            </span>
          </div>
        </div>

        {/* Clinical Disclaimer Callout */}
        <div className="max-w-5xl mx-auto mt-4 px-3.5 py-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start space-x-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
          <p>
            <strong className="font-semibold">Patient Safety First:</strong> SaltMatch matches identical chemical salts, strengths, and delivery profiles. For Narrow Therapeutic Index (NTI) drugs (e.g., Levothyroxine, Warfarin), always consult your physician for lab monitoring prior to switching brands.
          </p>
        </div>
      </div>
    </section>
  );
};
