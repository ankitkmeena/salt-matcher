import React from 'react';
import { ShieldCheck, Zap, DollarSign, AlertCircle } from 'lucide-react';

export const EducationalSection: React.FC = () => {
  return (
    <section className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Consumer Health Literacy
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
            Why Do Identical Medicines Have Such Vast Price Differences?
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Understand how drug formulation works so you can save thousands safely every year.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Brand Marketing Markups</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Branded pharmaceutical companies spend heavily on field sales forces, marketing campaigns, and packaging. The active medicinal molecule itself often costs only pennies to produce.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Verified Bioequivalence</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Approved generic drugs undergo strict bioequivalence testing to ensure they deliver the exact same amount of active ingredient into the bloodstream at the same rate as the innovator drug.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Jan Aushadhi Scheme</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              The Government of India&apos;s PMBJP initiative procures WHO-GMP certified generic medicines in bulk directly from audited manufacturers, eliminating distributor margins to offer 50%–90% price reductions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Narrow Therapeutic Index</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              For critical medications like Levothyroxine (Thyroid) or Warfarin (Blood thinner), tiny variations affect plasma levels. While alternatives exist, always have your doctor order blood work when switching brands.
            </p>
          </div>
        </div>

        {/* FAQ Accordion using modern native <details> with name="salt-faq" for exclusive behavior */}
        <div className="mt-12 max-w-3xl mx-auto space-y-3">
          <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">
            Frequently Asked Questions
          </h3>

          <details name="salt-faq" className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-4 open:bg-white open:border-emerald-300 transition-colors">
            <summary className="font-bold text-slate-800 text-sm cursor-pointer list-none flex items-center justify-between">
              <span>Are Jan Aushadhi generic medicines of identical quality to top brands?</span>
              <span className="text-emerald-600 font-extrabold group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              Yes. Every batch of Jan Aushadhi medicine is sourced from WHO-GMP compliant facilities and tested at NABL (National Accreditation Board for Testing and Calibration Laboratories) accredited independent labs before dispatch to generic pharmacy stores.
            </p>
          </details>

          <details name="salt-faq" className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-4 open:bg-white open:border-emerald-300 transition-colors">
            <summary className="font-bold text-slate-800 text-sm cursor-pointer list-none flex items-center justify-between">
              <span>What should I tell my doctor or chemist when requesting generic substitution?</span>
              <span className="text-emerald-600 font-extrabold group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              You can simply show them the printable consultation slip from SaltMatch. Ask: &quot;Doctor/Pharmacist, could you please prescribe or dispense this medication under its active salt composition or through the Jan Aushadhi generic equivalent?&quot; Most physicians are supportive of reducing financial burdens on chronic patients.
            </p>
          </details>

          <details name="salt-faq" className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-4 open:bg-white open:border-emerald-300 transition-colors">
            <summary className="font-bold text-slate-800 text-sm cursor-pointer list-none flex items-center justify-between">
              <span>What is the difference between Sustained Release (SR/PR) and Immediate Release (IR)?</span>
              <span className="text-emerald-600 font-extrabold group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              Release mechanism matters! An Extended Release (ER) or Sustained Release (SR) tablet releases medication slowly over 12–24 hours, whereas Immediate Release acts quickly. SaltMatch enforces strict release profile checks so you only match with identical delivery mechanisms.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
};
