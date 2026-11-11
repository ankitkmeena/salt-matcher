import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchHeader } from '../components/SearchHeader';
import { MedicineCard } from '../components/MedicineCard';
import { AlternativeModal } from '../components/AlternativeModal';
import { SEED_MEDICINES } from '../data/seedData';
import { searchMedicines } from '../utils/matcher';
import { Sparkles } from 'lucide-react';
import { useBasket } from '../context/BasketContext';

const CATEGORIES = [
  'All',
  'Diabetes',
  'Hypertension',
  'Cardiovascular',
  'Gastrointestinal',
  'Antibiotic',
  'Thyroid',
  'Pain & Analgesic',
  'Respiratory',
];

export const MedicinesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'All';

  const [query, setQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [onlyGenerics, setOnlyGenerics] = useState(false);

  const {
    addToBasket,
    isInBasket,
    selectedComparison,
    openComparison,
    closeComparison,
  } = useBasket();

  // Sync state when URL params change
  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  // Update URL params when query or category changes
  const handleQueryChange = (val: string) => {
    setQuery(val);
    const newParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      newParams.set('q', val);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat !== 'All') {
      newParams.set('category', cat);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams, { replace: true });
  };

  const filteredMedicines = useMemo(() => {
    let list = searchMedicines(query, selectedCategory, SEED_MEDICINES);
    if (onlyGenerics) {
      list = list.filter((m) => m.is_jan_aushadhi === 1 || m.is_generic === 1);
    }
    return list;
  }, [query, selectedCategory, onlyGenerics]);

  return (
    <div className="flex flex-col gap-6 sm:gap-8 pb-20">
      {/* Search Header */}
      <SearchHeader
        query={query}
        onQueryChange={handleQueryChange}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        categories={CATEGORIES}
        onlyGenerics={onlyGenerics}
        onToggleOnlyGenerics={() => setOnlyGenerics(!onlyGenerics)}
      />

      {/* Results Section */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-8 flex flex-col gap-6" aria-label="Medicine catalog results">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {selectedCategory === 'All' ? 'All Formulations' : `${selectedCategory} Formulations`}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Showing {filteredMedicines.length} verified pharmaceutical product{filteredMedicines.length === 1 ? '' : 's'}
            </p>
          </div>

          {(query || selectedCategory !== 'All' || onlyGenerics) && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSelectedCategory('All');
                setOnlyGenerics(false);
                setSearchParams({});
              }}
              className="text-xs font-semibold text-[#183b28] bg-[#eef5f1] hover:bg-[#d8ebd1] px-4 py-2 rounded-full transition-colors"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {filteredMedicines.length === 0 ? (
          <div className="text-center py-24 px-6 bg-white rounded-[32px] shadow-[0_4px_30px_rgb(0,0,0,0.02)] flex flex-col items-center gap-3.5">
            <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mb-1">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">No matching medicines found</h3>
            <p className="text-sm text-slate-500 max-w-md leading-relaxed">
              Try searching for the active salt name (e.g. &quot;Metformin&quot;, &quot;Amoxicillin&quot;) or explore one of the condition categories above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredMedicines.map((medicine) => (
              <MedicineCard
                key={medicine.id}
                medicine={medicine}
                onSelect={(med) => openComparison(med)}
                onAddToBasket={addToBasket}
                isInBasket={isInBasket(medicine.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Alternative Modal */}
      <AlternativeModal
        comparison={selectedComparison}
        isOpen={selectedComparison !== null}
        onClose={closeComparison}
        onAddToBasket={addToBasket}
      />
    </div>
  );
};
