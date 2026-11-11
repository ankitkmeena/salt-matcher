import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ArrowRight, ShieldCheck, FileText, ShoppingBag, TrendingDown } from 'lucide-react';
import { SEED_MEDICINES } from '../data/seedData';
import { useBasket } from '../context/BasketContext';

const POPULAR_SEARCHES = ['Metformin', 'Amoxicillin', 'Telmisartan', 'Atorvastatin', 'Paracetamol', 'Pantoprazole'];

const FEATURED_SWITCHES = [
  {
    brand: 'Augmentin 625 Duo',
    brandPrice: '₹204.50',
    generic: 'Amoxyclav 625 (Jan Aushadhi)',
    genericPrice: '₹58.00',
    savings: '72%',
    salt: 'Amoxicillin 500mg + Clavulanic Acid 125mg',
    category: 'Antibiotic',
  },
  {
    brand: 'Glycomet-GP 2 Forte',
    brandPrice: '₹248.00',
    generic: 'Glimepiride 2mg + Metformin 1000mg ER',
    genericPrice: '₹34.50',
    savings: '86%',
    salt: 'Metformin 1000mg + Glimepiride 2mg',
    category: 'Diabetes',
  },
  {
    brand: 'Telma 40',
    brandPrice: '₹142.00',
    generic: 'Telmisartan Tablets IP 40mg',
    genericPrice: '₹18.00',
    savings: '87%',
    salt: 'Telmisartan 40mg',
    category: 'Cardiovascular',
  },
];

export const HomePage: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const { openComparison } = useBasket();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/medicines?q=${encodeURIComponent(searchInput.trim())}`);
    } else {
      navigate('/medicines');
    }
  };

  const handleInspectSwitch = (brandName: string) => {
    const med = SEED_MEDICINES.find((m) => m.name.toLowerCase().includes(brandName.toLowerCase()));
    if (med) {
      openComparison(med);
    } else {
      navigate(`/medicines?q=${encodeURIComponent(brandName)}`);
    }
  };

  return (
    <div className="flex flex-col gap-20 sm:gap-28 pb-16">
      {/* Scandinavian Minimalist Hero */}
      <section className="pt-10 sm:pt-16 pb-8 px-4 sm:px-8 max-w-7xl mx-auto w-full text-center flex flex-col items-center">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eef5f1] text-[#183b28] text-xs font-semibold mb-6 shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-[#183b28]" />
          <span>India&apos;s Independent Chemical Salt Matcher</span>
        </div>

        {/* Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 max-w-4xl leading-[1.08] mb-6">
          Identical active molecules. <br className="hidden sm:inline" />
          <span className="text-[#183b28]">A fraction of the branded price.</span>
        </h1>

        {/* Subhead with comfortable line measure */}
        <p className="text-slate-500 text-base sm:text-xl max-w-[62ch] mx-auto leading-relaxed mb-10">
          Chronic patients and families spend thousands every month on branded medications that have identical CDSCO-certified generic equivalents. Find verified Jan Aushadhi and generic substitutes instantly.
        </p>

        {/* Scandinavian Pill Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-2xl bg-white rounded-full p-2.5 sm:p-3 shadow-[0_12px_45px_rgb(0,0,0,0.06)] flex items-center gap-3 transition-shadow focus-within:shadow-[0_16px_50px_rgba(24,59,40,0.12)]"
        >
          <div className="pl-4 text-slate-400">
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search medicine brand or chemical salt (e.g. Augmentin, Metformin)..."
            className="flex-1 bg-transparent border-none text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-hidden font-medium"
          />
          <button
            type="submit"
            className="bg-[#183b28] hover:bg-[#122e1f] text-white px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold tracking-tight transition-all active:scale-95 shadow-xs"
          >
            Find Salt
          </button>
        </form>

        {/* Popular searches pills */}
        <div className="mt-5 flex items-center justify-center flex-wrap gap-2 text-xs text-slate-500">
          <span className="text-slate-400 font-medium mr-1">Popular molecules:</span>
          {POPULAR_SEARCHES.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => navigate(`/medicines?q=${encodeURIComponent(term)}`)}
              className="px-3 py-1 rounded-full bg-white hover:bg-[#eef5f1] hover:text-[#183b28] text-slate-600 transition-colors shadow-2xs font-medium"
            >
              {term}
            </button>
          ))}
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 sm:p-10 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)]">
          <div className="flex flex-col gap-1.5 text-center sm:text-left">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#183b28] tracking-tight">70–88%</span>
            <span className="text-xs sm:text-sm text-slate-500 font-medium">Average Patient Monthly Savings</span>
          </div>
          <div className="flex flex-col gap-1.5 text-center sm:text-left">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">100%</span>
            <span className="text-xs sm:text-sm text-slate-500 font-medium">CDSCO Bioequivalent Criteria</span>
          </div>
          <div className="flex flex-col gap-1.5 text-center sm:text-left">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">10,000+</span>
            <span className="text-xs sm:text-sm text-slate-500 font-medium">PMBJP Jan Aushadhi Kendras in India</span>
          </div>
          <div className="flex flex-col gap-1.5 text-center sm:text-left">
            <span className="text-3xl sm:text-4xl font-extrabold text-emerald-600 tracking-tight">₹0</span>
            <span className="text-xs sm:text-sm text-slate-500 font-medium">Marketing or Brand Surcharges</span>
          </div>
        </div>
      </section>

      {/* 3 Clean Steps: How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 w-full flex flex-col gap-12">
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-white px-4 py-1.5 rounded-full shadow-2xs">
            Simple 3-Step Protocol
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            How Salt Matching Works
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Switching from expensive branded drugs to verified generic equivalents is safe, legal, and straightforward.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 sm:p-9 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#eef5f1] text-[#183b28] flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-xl">Search Active Chemical Salt</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Enter your prescribed brand name or upload your prescription slip. SaltMatch extracts the exact Active Pharmaceutical Ingredient (API) and dosage strength.
            </p>
          </div>

          <div className="p-8 sm:p-9 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#eef5f1] text-[#183b28] flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-xl">Compare Bioequivalence</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Verify that the release profile (e.g. Immediate Release vs Sustained Release) and chemical strengths match 100%. View safety flags for Narrow Therapeutic Index drugs.
            </p>
          </div>

          <div className="p-8 sm:p-9 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#eef5f1] text-[#183b28] flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-xl">Print Doctor Transition Slip</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Generate a clean, physician-ready transition summary to show your doctor or present directly at your local Jan Aushadhi generic dispensary.
            </p>
          </div>
        </div>
      </section>

      {/* Featured High-Impact Switches */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 w-full flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#183b28]">
              Proven Price Discrepancies
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Real-World Brand vs. Generic Examples
            </h2>
          </div>
          <Link
            to="/medicines"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#183b28] hover:underline"
          >
            Explore all 50+ formulations <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {FEATURED_SWITCHES.map((item, idx) => (
            <div
              key={idx}
              className="p-7 sm:p-8 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs font-bold text-[#183b28] bg-[#eef5f1] px-2.5 py-1 rounded-full flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" /> Save {item.savings}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-bold text-slate-900 text-lg">{item.brand}</h3>
                    <span className="text-slate-400 text-sm line-through font-semibold">{item.brandPrice}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">{item.salt}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f7f8f6] flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Equivalent Generic</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-semibold text-slate-800">{item.generic}</span>
                    <span className="text-base font-extrabold text-[#183b28]">{item.genericPrice}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleInspectSwitch(item.brand)}
                className="w-full py-2.5 rounded-full bg-slate-100 hover:bg-[#eef5f1] hover:text-[#183b28] text-xs font-bold text-slate-700 transition-colors"
              >
                Inspect Chemical Equivalence
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Two Specialized Feature Banners: Prescription OCR & Savings Ledger */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Prescription Parser Card */}
          <div className="p-8 sm:p-10 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#eef5f1] text-[#183b28] flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Prescription Parser & OCR</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Have a doctor&apos;s slip? Paste the written text or clinical notes directly. Our parser extracts all medication names, matches their active salts, and presents generic equivalents in one view.
              </p>
            </div>
            <Link
              to="/prescription"
              className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#183b28] hover:bg-[#122e1f] text-white text-xs font-bold transition-all"
            >
              Open Prescription Scanner <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Family Savings Calculator Card */}
          <div className="p-8 sm:p-10 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#fffbf0] text-amber-700 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Family Savings Transition Slip</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Calculate exactly how much your family spends each month versus an optimized Jan Aushadhi basket. Export or print a neat consultation slip to discuss with your healthcare provider.
              </p>
            </div>
            <Link
              to="/savings"
              className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#0b111e] hover:bg-black text-white text-xs font-bold transition-all"
            >
              View Savings Calculator <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
