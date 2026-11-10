import React from 'react';
import { ShieldCheck, Zap, DollarSign, AlertCircle } from 'lucide-react';

export const EducationalSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3.5 py-1 rounded-full">
            Healthcare Transparency
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Do Identical Medicines Have Such Vast Price Gaps?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
            Understand how drug formulation works so you can save thousands safely every year without compromising clinical efficacy.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-7 rounded-3xl bg-slate-50/70 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center mb-1">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Marketing Markups</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Branded pharmaceutical companies spend heavily on field sales forces, marketing campaigns, and packaging. The active medicinal molecule itself often costs only pennies to manufacture.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-slate-50/70 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100/80 text-teal-700 flex items-center justify-center mb-1">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Verified Bioequivalence</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Approved generic drugs undergo strict bioequivalence testing to ensure they deliver the exact same amount of active ingredient into the bloodstream at the same rate as innovator brands.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-slate-50/70 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center mb-1">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Jan Aushadhi Scheme</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              The Government of India&apos;s PMBJP initiative procures WHO-GMP certified generic medicines in bulk directly from audited manufacturers, eliminating distributor margins to offer 50%–90% price reductions.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-slate-50/70 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100/80 text-amber-700 flex items-center justify-center mb-1">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Narrow Therapeutic Index</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              For critical medications like Levothyroxine (Thyroid) or Warfarin (Blood thinner), tiny variations affect plasma levels. While alternatives exist, always have your doctor order blood work when switching brands.
            </p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl w-full mx-auto flex flex-col gap-3">
          <h3 className="text-xl font-extrabold text-slate-900 text-center mb-2">
            Frequently Asked Questions
          </h3>

          <details name="salt-faq" className="group rounded-2xl bg-slate-50/80 p-5 open:bg-white open:shadow-lg open:shadow-slate-200/40 transition-all">
            <summary className="font-extrabold text-slate-900 text-sm sm:text-base cursor-pointer list-none flex items-center justify-between">
              <span>Are Jan Aushadhi generic medicines of identical quality to top brands?</span>
              <span className="text-emerald-600 font-black group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              Yes. Every batch of Jan Aushadhi medicine is sourced from WHO-GMP compliant facilities and tested at NABL (National Accreditation Board for Testing and Calibration Laboratories) accredited independent labs before dispatch to generic pharmacy stores.
            </p>
          </details>

          <details name="salt-faq" className="group rounded-2xl bg-slate-50/80 p-5 open:bg-white open:shadow-lg open:shadow-slate-200/40 transition-all">
            <summary className="font-extrabold text-slate-900 text-sm sm:text-base cursor-pointer list-none flex items-center justify-between">
              <span>What should I tell my doctor or chemist when requesting generic substitution?</span>
              <span className="text-emerald-600 font-black group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              You can simply show them the printable consultation slip from SaltMatch. Ask: &quot;Doctor/Pharmacist, could you please prescribe or dispense this medication under its active salt composition or through the Jan Aushadhi generic equivalent?&quot; Most physicians are supportive of reducing financial burdens on chronic patients.
            </p>
          </details>

          <details name="salt-faq" className="group rounded-2xl bg-slate-50/80 p-5 open:bg-white open:shadow-lg open:shadow-slate-200/40 transition-all">
            <summary className="font-extrabold text-slate-900 text-sm sm:text-base cursor-pointer list-none flex items-center justify-between">
              <span>What is the difference between Sustained Release (SR/PR) and Immediate Release (IR)?</span>
              <span className="text-emerald-600 font-black group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              Release mechanism matters! An Extended Release (ER) or Sustained Release (SR) tablet releases medication slowly over 12–24 hours, whereas Immediate Release acts quickly. SaltMatch enforces strict release profile checks so you only match with identical delivery mechanisms.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
};
