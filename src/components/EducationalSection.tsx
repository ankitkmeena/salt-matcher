import React from 'react';
import { ShieldCheck, Zap, DollarSign, AlertCircle } from 'lucide-react';

export const EducationalSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#f4f4f2]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-16 sm:gap-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-white/80 px-4 py-1.5 rounded-full shadow-2xs">
            Healthcare Economics
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
            Why Do Identical Medicines Have Such Vast Price Gaps?
          </h2>
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-[58ch]">
            Understand how drug formulation works so you can save thousands safely every year without compromising clinical efficacy.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          <div className="p-8 sm:p-9 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#eef5f1] text-[#183b28] flex items-center justify-center mb-1">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Marketing Markups</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Branded pharmaceutical companies spend heavily on sales reps, doctor gifts, campaigns, and packaging. The active medicinal molecule itself usually costs pennies to produce.
            </p>
          </div>

          <div className="p-8 sm:p-9 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#eef5f1] text-[#183b28] flex items-center justify-center mb-1">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Verified Bioequivalence</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Approved generic drugs undergo strict bioequivalence testing to ensure they deliver the exact same amount of active ingredient into the bloodstream at the same rate as the innovator drug.
            </p>
          </div>

          <div className="p-8 sm:p-9 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#eef5f1] text-[#183b28] flex items-center justify-center mb-1">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Jan Aushadhi Scheme</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              The Government of India&apos;s PMBJP initiative procures WHO-GMP certified generic medicines in bulk directly from audited manufacturers, eliminating distributor margins to offer 50%–90% price reductions.
            </p>
          </div>

          <div className="p-8 sm:p-9 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#fffbf0] text-amber-700 flex items-center justify-center mb-1">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Narrow Therapeutic Index</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              For critical medications like Levothyroxine (Thyroid) or Warfarin (Blood thinner), tiny variations affect plasma levels. While alternatives exist, always have your doctor order blood work when switching brands.
            </p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl w-full mx-auto flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight text-center mb-2">
            Frequently Asked Questions
          </h3>

          <details name="salt-faq" className="group rounded-3xl bg-white p-6 shadow-xs open:shadow-xl transition-all">
            <summary className="font-bold text-slate-900 text-base cursor-pointer list-none flex items-center justify-between">
              <span>Are Jan Aushadhi generic medicines of identical quality to top brands?</span>
              <span className="text-[#183b28] font-black group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-4 text-xs sm:text-sm text-slate-500 leading-relaxed">
              Yes. Every batch of Jan Aushadhi medicine is sourced from WHO-GMP compliant facilities and tested at NABL (National Accreditation Board for Testing and Calibration Laboratories) accredited independent labs before dispatch to generic pharmacy stores.
            </p>
          </details>

          <details name="salt-faq" className="group rounded-3xl bg-white p-6 shadow-xs open:shadow-xl transition-all">
            <summary className="font-bold text-slate-900 text-base cursor-pointer list-none flex items-center justify-between">
              <span>What should I tell my doctor or chemist when requesting generic substitution?</span>
              <span className="text-[#183b28] font-black group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-4 text-xs sm:text-sm text-slate-500 leading-relaxed">
              You can simply show them the printable consultation slip from SaltMatch. Ask: &quot;Doctor/Pharmacist, could you please prescribe or dispense this medication under its active salt composition or through the Jan Aushadhi generic equivalent?&quot; Most physicians are supportive of reducing financial burdens on chronic patients.
            </p>
          </details>

          <details name="salt-faq" className="group rounded-3xl bg-white p-6 shadow-xs open:shadow-xl transition-all">
            <summary className="font-bold text-slate-900 text-base cursor-pointer list-none flex items-center justify-between">
              <span>What is the difference between Sustained Release (SR/PR) and Immediate Release (IR)?</span>
              <span className="text-[#183b28] font-black group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-4 text-xs sm:text-sm text-slate-500 leading-relaxed">
              Release mechanism matters! An Extended Release (ER) or Sustained Release (SR) tablet releases medication slowly over 12–24 hours, whereas Immediate Release acts quickly. SaltMatch enforces strict release profile checks so you only match with identical delivery mechanisms.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
};
