import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { BasketProvider, useBasket } from './context/BasketContext';
import { HomePage } from './pages/HomePage';
import { MedicinesPage } from './pages/MedicinesPage';
import { PrescriptionPage } from './pages/PrescriptionPage';
import { SavingsPage } from './pages/SavingsPage';
import { EducationPage } from './pages/EducationPage';
import { FaqPage } from './pages/FaqPage';
import { AlternativeModal } from './components/AlternativeModal';
import { ShoppingBag } from 'lucide-react';

const AppLayout: React.FC = () => {
  const { selectedComparison, closeComparison, addToBasket, totalItemsCount } = useBasket();
  const location = useLocation();

  const isSavingsPage = location.pathname === '/savings';

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] text-slate-900">
      <ScrollToTop />
      
      {/* Global Scandinavian Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/medicines" element={<MedicinesPage />} />
          <Route path="/prescription" element={<PrescriptionPage />} />
          <Route path="/savings" element={<SavingsPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Floating Quick-Access Savings Pill (Visible when basket has items and user is not on /savings) */}
      {totalItemsCount > 0 && !isSavingsPage && (
        <aside
          aria-label="Prescription savings floating action"
          className="fixed bottom-8 inset-x-4 sm:inset-x-auto sm:right-10 z-30 flex justify-center"
        >
          <Link
            to="/savings"
            className="flex items-center gap-4 p-2.5 pl-5 pr-6 bg-[#0b111e]/95 backdrop-blur-md text-white rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:bg-black active:scale-95 transition-all min-h-[54px]"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-black text-sm">
              {totalItemsCount}
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-white text-xs sm:text-sm">Review Family Savings Slip</span>
              <span className="text-emerald-300 font-medium text-[11px]">
                Tap to view monthly & yearly cost comparison
              </span>
            </div>
            <ShoppingBag className="w-5 h-5 text-emerald-400 shrink-0 ml-1" />
          </Link>
        </aside>
      )}

      {/* Global Alternative Comparison Modal */}
      <AlternativeModal
        comparison={selectedComparison}
        isOpen={selectedComparison !== null}
        onClose={closeComparison}
        onAddToBasket={addToBasket}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <BasketProvider>
        <AppLayout />
      </BasketProvider>
    </BrowserRouter>
  );
};
