import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { SearchHeader } from './components/SearchHeader';
import { MedicineCard } from './components/MedicineCard';
import { AlternativeModal } from './components/AlternativeModal';
import { BasketDrawer } from './components/BasketDrawer';
import { PrescriptionParserModal } from './components/PrescriptionParserModal';
import { EducationalSection } from './components/EducationalSection';
import { SEED_MEDICINES } from './data/seedData';
import { AlternativeComparison, BasketItem, Medicine } from './types/medicine';
import { findAlternatives, searchMedicines } from './utils/matcher';
import { ShoppingBag, Sparkles, Database, Cloud, GitBranch, ShieldCheck } from 'lucide-react';

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

const LOCAL_STORAGE_BASKET_KEY = 'saltmatch_rx_basket_v1';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [onlyGenerics, setOnlyGenerics] = useState(false);

  // Modal states
  const [comparisonData, setComparisonData] = useState<AlternativeComparison | null>(null);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isParserOpen, setIsParserOpen] = useState(false);

  // Persistent Prescription Basket
  const [basket, setBasket] = useState<BasketItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_BASKET_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse basket from localStorage', e);
    }
    // Starter basket: High-volume chronic medicine example
    const starter1 = SEED_MEDICINES.find((m) => m.name.includes('Glycomet-GP 2'));
    const starter2 = SEED_MEDICINES.find((m) => m.name.includes('Telma 40'));
    const starter3 = SEED_MEDICINES.find((m) => m.name.includes('Atorva 20'));
    const initial: BasketItem[] = [];
    if (starter1) initial.push({ medicine: starter1, strips_per_month: 2 });
    if (starter2) initial.push({ medicine: starter2, strips_per_month: 2 });
    if (starter3) initial.push({ medicine: starter3, strips_per_month: 2 });
    return initial;
  });

  // Save basket to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_BASKET_KEY, JSON.stringify(basket));
    } catch (e) {
      console.warn('Failed to save basket to localStorage', e);
    }
  }, [basket]);

  // Filter medicines
  const filteredMedicines = useMemo(() => {
    let list = searchMedicines(query, selectedCategory, SEED_MEDICINES);
    if (onlyGenerics) {
      list = list.filter((m) => m.is_jan_aushadhi === 1 || m.is_generic === 1);
    }
    return list;
  }, [query, selectedCategory, onlyGenerics]);

  // Handle medicine selection for comparison
  const handleSelectMedicine = (med: Medicine) => {
    const comp = findAlternatives(med, SEED_MEDICINES);
    setComparisonData(comp);
    setIsComparisonOpen(true);
  };

  // Add single medicine to basket
  const handleAddToBasket = (med: Medicine) => {
    setBasket((prev) => {
      const existing = prev.find((item) => item.medicine.id === med.id);
      if (existing) {
        return prev.map((item) =>
          item.medicine.id === med.id
            ? { ...item, strips_per_month: item.strips_per_month + 1 }
            : item
        );
      }
      return [...prev, { medicine: med, strips_per_month: 1 }];
    });
  };

  // Update strip quantity
  const handleUpdateStrips = (medicineId: number, delta: number) => {
    setBasket((prev) =>
      prev
        .map((item) => {
          if (item.medicine.id === medicineId) {
            const newQty = item.strips_per_month + delta;
            return newQty > 0 ? { ...item, strips_per_month: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as BasketItem[]
    );
  };

  // Remove from basket
  const handleRemoveItem = (medicineId: number) => {
    setBasket((prev) => prev.filter((item) => item.medicine.id !== medicineId));
  };

  // Clear basket
  const handleClearBasket = () => {
    setBasket([]);
  };

  // Import multiple medicines from prescription parser
  const handleImportMedicines = (imported: Medicine[]) => {
    setBasket((prev) => {
      const map = new Map(prev.map((i) => [i.medicine.id, i.strips_per_month]));
      for (const med of imported) {
        map.set(med.id, (map.get(med.id) || 0) + 1);
      }
      const newBasket: BasketItem[] = [];
      for (const [id, qty] of map.entries()) {
        const med = SEED_MEDICINES.find((m) => m.id === id);
        if (med) newBasket.push({ medicine: med, strips_per_month: qty });
      }
      return newBasket;
    });
    setIsBasketOpen(true);
  };

  const basketItemIds = useMemo(() => new Set(basket.map((b) => b.medicine.id)), [basket]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] text-slate-900">
      {/* Navbar */}
      <Navbar
        basket={basket}
        onOpenBasket={() => setIsBasketOpen(true)}
        onOpenParser={() => setIsParserOpen(true)}
      />

      <main className="flex-1 flex flex-col gap-16 sm:gap-24">
        {/* Search & Hero Area */}
        <SearchHeader
          query={query}
          onQueryChange={setQuery}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          categories={CATEGORIES}
          onlyGenerics={onlyGenerics}
          onToggleOnlyGenerics={() => setOnlyGenerics(!onlyGenerics)}
        />

        {/* Medicines Catalog Grid Section */}
        <section className="max-w-7xl w-full mx-auto px-4 sm:px-8 flex flex-col gap-10" aria-label="Medicine search results">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                {selectedCategory === 'All' ? 'All Formulations' : `${selectedCategory} Formulations`}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">
                Showing {filteredMedicines.length} verified pharmaceutical product{filteredMedicines.length === 1 ? '' : 's'}
              </p>
            </div>

            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-xs font-bold text-[#183b28] bg-[#eef5f1] hover:bg-[#d8ebd1] px-5 py-2.5 rounded-full transition-colors min-h-[40px]"
              >
                Clear Search Filter
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
                  onSelect={handleSelectMedicine}
                  onAddToBasket={handleAddToBasket}
                  isInBasket={basketItemIds.has(medicine.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Educational Health Literacy Section */}
        <EducationalSection />
      </main>

      {/* Floating Bottom Rx Basket Sticky Bar on Mobile & Desktop */}
      {basket.length > 0 && !isBasketOpen && (
        <aside
          aria-label="Prescription savings floating action bar"
          className="fixed bottom-8 inset-x-4 sm:inset-x-auto sm:right-10 z-30 flex justify-center"
        >
          <button
            type="button"
            onClick={() => setIsBasketOpen(true)}
            className="flex items-center gap-4 p-2.5 pl-5 pr-6 bg-[#0b111e]/95 backdrop-blur-md text-white rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:bg-black active:scale-95 transition-all min-h-[54px]"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-black text-sm">
              {basket.reduce((s, i) => s + i.strips_per_month, 0)}
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-white text-xs sm:text-sm">Review Rx Savings Basket</span>
              <span className="text-emerald-300 font-medium text-[11px]">
                Tap to view monthly & yearly family savings
              </span>
            </div>
            <ShoppingBag className="w-5 h-5 text-emerald-400 shrink-0 ml-1" />
          </button>
        </aside>
      )}

      {/* Modals */}
      <AlternativeModal
        comparison={comparisonData}
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        onAddToBasket={handleAddToBasket}
      />

      <BasketDrawer
        isOpen={isBasketOpen}
        onClose={() => setIsBasketOpen(false)}
        basket={basket}
        onUpdateStrips={handleUpdateStrips}
        onRemoveItem={handleRemoveItem}
        onClearBasket={handleClearBasket}
        allMedicines={SEED_MEDICINES}
      />

      <PrescriptionParserModal
        isOpen={isParserOpen}
        onClose={() => setIsParserOpen(false)}
        onImportMedicines={handleImportMedicines}
        allMedicines={SEED_MEDICINES}
      />

      {/* Footer */}
      <footer className="bg-[#090d16] text-slate-400 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center gap-2 text-white font-extrabold text-2xl tracking-tight">
                <span>Salt<span className="text-emerald-400">Match</span></span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Empowering patients and families through pharmaceutical salt transparency and certified generic price comparisons.
              </p>
            </div>

            <div className="flex flex-col gap-3.5">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Cloud Architecture
              </h4>
              <ul className="text-xs flex flex-col gap-3 text-slate-300">
                <li className="flex items-center gap-3">
                  <Database className="w-4 h-4 text-emerald-400" />
                  <span>Cloudflare D1 (SQLite Edge Database)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Cloud className="w-4 h-4 text-emerald-400" />
                  <span>Cloudflare Pages & Pages Functions</span>
                </li>
                <li className="flex items-center gap-3">
                  <GitBranch className="w-4 h-4 text-emerald-400" />
                  <span>GitHub Actions Automated Edge CI/CD</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3.5">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Clinical Safety & Ethics
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                SaltMatch is an educational and price transparency tool. It does not provide medical diagnosis or replace personalized consultation with a licensed doctor or pharmacist. Never stop or alter prescribed dosage without professional medical consent.
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} SaltMatch. Universal Healthcare Affordability Initiative.</p>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" /> WHO-GMP Bioequivalence Compliant
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
