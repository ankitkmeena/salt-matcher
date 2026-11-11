import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { BasketItem, Medicine, AlternativeComparison } from '../types/medicine';
import { SEED_MEDICINES } from '../data/seedData';
import { findAlternatives } from '../utils/matcher';

const LOCAL_STORAGE_BASKET_KEY = 'saltmatch_rx_basket_v2';

interface BasketContextType {
  basket: BasketItem[];
  addToBasket: (medicine: Medicine) => void;
  updateStrips: (medicineId: number, delta: number) => void;
  removeItem: (medicineId: number) => void;
  clearBasket: () => void;
  importMedicines: (medicines: Medicine[]) => void;
  totalItemsCount: number;
  isInBasket: (medicineId: number) => boolean;
  
  // Alternative comparison modal state
  selectedComparison: AlternativeComparison | null;
  openComparison: (medicine: Medicine) => void;
  closeComparison: () => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [basket, setBasket] = useState<BasketItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_BASKET_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse basket from localStorage', e);
    }
    // Default starter basket with high-impact chronic examples
    const starter1 = SEED_MEDICINES.find((m) => m.name.includes('Glycomet-GP 2'));
    const starter2 = SEED_MEDICINES.find((m) => m.name.includes('Telma 40'));
    const starter3 = SEED_MEDICINES.find((m) => m.name.includes('Atorva 20'));
    const initial: BasketItem[] = [];
    if (starter1) initial.push({ medicine: starter1, strips_per_month: 2 });
    if (starter2) initial.push({ medicine: starter2, strips_per_month: 2 });
    if (starter3) initial.push({ medicine: starter3, strips_per_month: 2 });
    return initial;
  });

  const [selectedComparison, setSelectedComparison] = useState<AlternativeComparison | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_BASKET_KEY, JSON.stringify(basket));
    } catch (e) {
      console.warn('Failed to save basket to localStorage', e);
    }
  }, [basket]);

  const addToBasket = (med: Medicine) => {
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

  const updateStrips = (medicineId: number, delta: number) => {
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

  const removeItem = (medicineId: number) => {
    setBasket((prev) => prev.filter((item) => item.medicine.id !== medicineId));
  };

  const clearBasket = () => {
    setBasket([]);
  };

  const importMedicines = (imported: Medicine[]) => {
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
  };

  const totalItemsCount = useMemo(() => {
    return basket.reduce((acc, item) => acc + item.strips_per_month, 0);
  }, [basket]);

  const basketItemIds = useMemo(() => new Set(basket.map((b) => b.medicine.id)), [basket]);
  const isInBasket = (medicineId: number) => basketItemIds.has(medicineId);

  const openComparison = (med: Medicine) => {
    const comp = findAlternatives(med, SEED_MEDICINES);
    setSelectedComparison(comp);
  };

  const closeComparison = () => {
    setSelectedComparison(null);
  };

  return (
    <BasketContext.Provider
      value={{
        basket,
        addToBasket,
        updateStrips,
        removeItem,
        clearBasket,
        importMedicines,
        totalItemsCount,
        isInBasket,
        selectedComparison,
        openComparison,
        closeComparison,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = (): BasketContextType => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
};
