import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Sparkles, ChevronDown, Check, Filter } from 'lucide-react';

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
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    };
    if (isCategoryOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCategoryOpen]);

  const hasActiveFilters = selectedCategory !== 'All' || onlyGenerics || Boolean(query.trim());

  return (
    <section className="pt-6 pb-2 sm:pt-10 sm:pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-5 sm:gap-6">
        {/* Compact Header */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#eef5f1] text-[#183b28]">
            <Sparkles className="w-3.5 h-3.5 text-[#27583d] shrink-0" />
            <span>50+ Verified Bioequivalent Formulations</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Medicine &amp; Salt Catalog
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm max-w-lg leading-relaxed">
            Search by brand name or active pharmaceutical ingredient to find verified Jan Aushadhi generic equivalents.
          </p>
        </div>

        {/* Unified Search & Dropdown Filter Toolbar */}
        <div className="max-w-4xl w-full mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-full p-2 sm:p-2.5 shadow-[0_4px_25px_rgb(0,0,0,0.06)] border border-slate-200/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* Search Input Box */}
            <div className="relative flex-1 flex items-center pl-3 pr-2 py-1">
              <Search className="w-4 h-4 text-slate-400 shrink-0 pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search brand (Augmentin, Telma) or chemical salt (Metformin, Amoxicillin)..."
                className="w-full py-2 px-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 bg-transparent border-0 focus:outline-hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => onQueryChange('')}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dropdown Filters Container */}
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0 w-full sm:w-auto justify-end pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-100">
              {/* Category Dropdown Popover */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsCategoryOpen((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl sm:rounded-full text-xs font-semibold border transition-all ${
                    selectedCategory !== 'All'
                      ? 'bg-[#183b28] text-white border-[#183b28] shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/90'
                  }`}
                  aria-haspopup="listbox"
                  aria-expanded={isCategoryOpen}
                >
                  <Filter className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate max-w-[130px] sm:max-w-[160px]">
                    {selectedCategory === 'All' ? 'All Categories' : selectedCategory}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu List */}
                {isCategoryOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-1.5 z-40 animate-in fade-in zoom-in-95 duration-100"
                    role="listbox"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Therapeutic Category
                    </div>
                    <div className="max-h-60 overflow-y-auto space-y-0.5">
                      {categories.map((cat) => {
                        const isSelected = selectedCategory === cat;
                        return (
                          <button
                            key={cat}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => {
                              onCategorySelect(cat);
                              setIsCategoryOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${
                              isSelected
                                ? 'bg-[#eef5f1] text-[#183b28] font-bold'
                                : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span>{cat === 'All' ? 'All Categories' : cat}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#183b28]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Generics Only Toggle Button */}
              <button
                type="button"
                onClick={onToggleOnlyGenerics}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl sm:rounded-full text-xs font-bold transition-all border shrink-0 ${
                  onlyGenerics
                    ? 'bg-[#183b28] text-white border-[#183b28] shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/90'
                }`}
              >
                <span className={`w-2 h-2 rounded-full transition-colors ${onlyGenerics ? 'bg-emerald-400' : 'bg-slate-300'}`} />
                <span>Generics Only</span>
              </button>
            </div>
          </div>

          {/* Clean Dismissible Filter Chips & Quick Suggestions Row */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-2 text-xs">
            {hasActiveFilters ? (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-slate-400 text-[11px] font-medium">Active:</span>

                {selectedCategory !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#eef5f1] text-[#183b28] border border-[#d2e7db]">
                    <span>Category: {selectedCategory}</span>
                    <button
                      type="button"
                      onClick={() => onCategorySelect('All')}
                      className="hover:text-black p-0.5 rounded-full"
                      aria-label="Remove category filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {onlyGenerics && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#eef5f1] text-[#183b28] border border-[#d2e7db]">
                    <span>Generics Only</span>
                    <button
                      type="button"
                      onClick={onToggleOnlyGenerics}
                      className="hover:text-black p-0.5 rounded-full"
                      aria-label="Remove generics only filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {query.trim() && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    <span>&ldquo;{query}&rdquo;</span>
                    <button
                      type="button"
                      onClick={() => onQueryChange('')}
                      className="hover:text-black p-0.5 rounded-full"
                      aria-label="Remove search query"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => {
                    onQueryChange('');
                    onCategorySelect('All');
                    if (onlyGenerics) onToggleOnlyGenerics();
                  }}
                  className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 underline ml-1 transition-colors"
                >
                  Clear all
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-slate-400 text-[11px] font-medium">Quick search:</span>
                {POPULAR_QUERIES.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => onQueryChange(q)}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-[#eef5f1] hover:text-[#183b28] text-slate-600 font-medium transition-colors border border-slate-200/80 text-[11px] shadow-2xs"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
