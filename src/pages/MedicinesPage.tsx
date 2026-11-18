import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchHeader } from '../components/SearchHeader';
import { MedicineCard } from '../components/MedicineCard';
import { Pagination } from '../components/Pagination';
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

const ITEMS_PER_PAGE = 12;

export const MedicinesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'All';
  const pageParam = parseInt(searchParams.get('page') || '1', 10) || 1;

  const [query, setQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [onlyGenerics, setOnlyGenerics] = useState(false);
  const [currentPage, setCurrentPage] = useState(pageParam);

  const resultsTopRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    setCurrentPage(pageParam);
  }, [pageParam]);

  // Update URL params helper
  const updateUrlParams = (updates: { q?: string; category?: string; page?: number; resetPage?: boolean }) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (updates.q !== undefined) {
      if (updates.q.trim()) newParams.set('q', updates.q);
      else newParams.delete('q');
    }
    
    if (updates.category !== undefined) {
      if (updates.category !== 'All') newParams.set('category', updates.category);
      else newParams.delete('category');
    }
    
    if (updates.resetPage) {
      newParams.delete('page');
      setCurrentPage(1);
    } else if (updates.page !== undefined) {
      if (updates.page > 1) newParams.set('page', updates.page.toString());
      else newParams.delete('page');
    }

    setSearchParams(newParams, { replace: true });
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    updateUrlParams({ q: val, resetPage: true });
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    updateUrlParams({ category: cat, resetPage: true });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    updateUrlParams({ page: newPage });
    // Smooth scroll to top of results
    if (resultsTopRef.current) {
      resultsTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 250, behavior: 'smooth' });
    }
  };

  // Full filtered list
  const filteredMedicines = useMemo(() => {
    let list = searchMedicines(query, selectedCategory, SEED_MEDICINES);
    if (onlyGenerics) {
      list = list.filter((m) => m.is_jan_aushadhi === 1 || m.is_generic === 1);
    }
    return list;
  }, [query, selectedCategory, onlyGenerics]);

  // Paginated slice
  const totalItems = filteredMedicines.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Auto-correct page if current page exceeds total pages
  const validatedPage = Math.min(Math.max(1, currentPage), Math.max(1, totalPages));

  const paginatedMedicines = useMemo(() => {
    const startIndex = (validatedPage - 1) * ITEMS_PER_PAGE;
    return filteredMedicines.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredMedicines, validatedPage]);

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
        onToggleOnlyGenerics={() => {
          setOnlyGenerics(!onlyGenerics);
          updateUrlParams({ resetPage: true });
        }}
      />

      {/* Anchor for smooth scroll on page change */}
      <div ref={resultsTopRef} className="scroll-mt-24" />

      {/* Results Section */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-8 flex flex-col gap-6" aria-label="Medicine catalog results">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {selectedCategory === 'All' ? 'All Formulations' : `${selectedCategory} Formulations`}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Showing {totalItems} verified pharmaceutical formulation{totalItems === 1 ? '' : 's'}
              {totalPages > 1 && ` • Page ${validatedPage} of ${totalPages}`}
            </p>
          </div>

          {(query || selectedCategory !== 'All' || onlyGenerics) && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSelectedCategory('All');
                setOnlyGenerics(false);
                setCurrentPage(1);
                setSearchParams({});
              }}
              className="text-xs font-semibold text-[#183b28] bg-[#eef5f1] hover:bg-[#d8ebd1] px-4 py-2 rounded-full transition-colors"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {totalItems === 0 ? (
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {paginatedMedicines.map((medicine) => (
                <MedicineCard
                  key={medicine.id}
                  medicine={medicine}
                  onSelect={(med) => openComparison(med)}
                  onAddToBasket={addToBasket}
                  isInBasket={isInBasket(medicine.id)}
                />
              ))}
            </div>

            {/* Scandinavian Numbered Pill Pagination */}
            <Pagination
              currentPage={validatedPage}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
            />
          </>
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
