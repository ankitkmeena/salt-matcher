import React from 'react';
import { ShieldCheck, DollarSign, Zap, AlertCircle, CheckCircle2, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EducationPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-20 flex flex-col gap-16 sm:gap-24">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#183b28] bg-[#eef5f1] px-4 py-1.5 rounded-full shadow-2xs">
          Pharmaceutical Science & Public Policy
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-[1.12]">
          The Science of Bioequivalence & Generic Medicine
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-[62ch]">
          Why do identical chemical molecules sell at 80% lower prices? Here is the clinical, pharmacological, and regulatory truth about generic drugs in India.
        </p>
      </div>

      {/* 4 Pillars of Equivalence */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="p-8 sm:p-9 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#eef5f1] text-[#183b28] flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">Marketing & Brand Markups</h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Leading pharma companies invest up to 30% of revenue in doctor detailing, conferences, and distribution margins. The underlying active salt costs mere rupees to manufacture.
          </p>
        </div>

        <div className="p-8 sm:p-9 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#eef5f1] text-[#183b28] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">Strict Bioequivalence (BE)</h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            CDSCO and WHO guidelines mandate that generic drugs produce blood plasma concentration curves (AUC and Cmax) within 80% to 125% of the innovator brand with a 90% statistical confidence interval.
          </p>
        </div>

        <div className="p-8 sm:p-9 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#eef5f1] text-[#183b28] flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">Jan Aushadhi Bulk Sourcing</h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            The Government&apos;s Pharmaceuticals & Medical Devices Bureau of India (PMBI) aggregates demand across 10,000+ stores, purchasing directly from WHO-GMP certified plants and eliminating intermediaries.
          </p>
        </div>

        <div className="p-8 sm:p-9 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#fffbf0] text-amber-700 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">Narrow Therapeutic Index</h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Drugs with thin margins between toxicity and sub-therapeutic doses (such as Levothyroxine, Warfarin, Lithium) require extra clinical vigilance. Always verify blood levels when switching brands.
          </p>
        </div>
      </div>

      {/* Bioequivalence Deep Dive */}
      <section className="p-10 sm:p-14 rounded-[36px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1 flex flex-col gap-5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Pharmacokinetics Standard
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
            How Bioequivalence is Scientifically Proven
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            When a patent expires on a molecule, generic pharmaceutical manufacturers must conduct in-vivo clinical bioequivalence trials in healthy human volunteers.
          </p>
          <ul className="flex flex-col gap-3 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Area Under Curve (AUC):</strong> Measures total extent of systemic drug absorption over time. Must fall within the 80%–125% bioequivalence window.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Peak Serum Concentration (Cmax):</strong> Verifies how quickly and strongly the active ingredient enters the bloodstream.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Dissolution Profile:</strong> In-vitro testing confirms the tablet disintegrates and releases at identical rates across various digestive pH levels.
              </div>
            </li>
          </ul>
        </div>

        <div className="w-full lg:w-96 p-8 rounded-3xl bg-[#f8f9fa] flex flex-col gap-4 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#eef5f1] text-[#183b28] flex items-center justify-center">
            <Award className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">WHO-GMP & NABL Standard</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every batch of Jan Aushadhi generic medication is independently audited at National Accreditation Board for Testing and Calibration Laboratories (NABL) approved laboratories before distribution.
          </p>
          <div className="pt-2">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white text-xs font-bold text-slate-700 shadow-2xs">
              Zero Compromise on Quality
            </span>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="flex flex-col gap-6">
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight text-center">
          Branded Medicines vs. Jan Aushadhi Generics
        </h3>

        <div className="overflow-x-auto rounded-[32px] bg-white p-6 sm:p-8 shadow-[0_4px_30px_rgb(0,0,0,0.02)]">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                <th className="pb-4">Parameter</th>
                <th className="pb-4">Innovator / Commercial Brand</th>
                <th className="pb-4 text-[#183b28]">Jan Aushadhi Generic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-4 font-bold text-slate-900">Active Chemical Ingredient</td>
                <td className="py-4">Exact pharmaceutical salt</td>
                <td className="py-4 text-[#183b28] font-bold">100% Identical Active Salt</td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-slate-900">Dosage & Strength</td>
                <td className="py-4">e.g. 500mg, 1000mg ER</td>
                <td className="py-4 text-[#183b28] font-bold">100% Identical Strength & Mechanism</td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-slate-900">Manufacturing Plant</td>
                <td className="py-4">WHO-GMP certified</td>
                <td className="py-4 text-[#183b28] font-bold">WHO-GMP certified facilities</td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-slate-900">Marketing & Promotion Cost</td>
                <td className="py-4 text-rose-600 font-semibold">High (included in price)</td>
                <td className="py-4 text-emerald-700 font-semibold">₹0 (Zero marketing budget)</td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-slate-900">Average Patient Price</td>
                <td className="py-4 text-slate-500">₹150 – ₹350 per strip</td>
                <td className="py-4 text-[#183b28] font-extrabold text-base">₹20 – ₹60 per strip</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA to search */}
      <div className="p-10 rounded-[32px] bg-[#183b28] text-white text-center flex flex-col items-center gap-5">
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Ready to verify your prescription salts?
        </h3>
        <p className="text-emerald-200 text-sm max-w-xl">
          Search over 50+ validated chronic formulations across diabetes, cardiology, antibiotics, and pain management.
        </p>
        <div className="flex items-center gap-3 pt-2">
          <Link
            to="/medicines"
            className="px-8 py-3.5 rounded-full bg-white text-[#183b28] font-bold text-xs sm:text-sm hover:bg-emerald-50 transition-colors shadow-md"
          >
            Explore Medicine Catalog
          </Link>
          <Link
            to="/faq"
            className="px-6 py-3.5 rounded-full bg-[#122e1f] text-emerald-200 font-bold text-xs sm:text-sm hover:text-white transition-colors"
          >
            Read FAQ
          </Link>
        </div>
      </div>
    </div>
  );
};
