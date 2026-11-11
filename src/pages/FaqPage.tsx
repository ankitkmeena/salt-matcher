import React, { useState } from 'react';
import { Search, HelpCircle, ArrowRight, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    category: 'Quality & Safety',
    q: 'Are Jan Aushadhi generic medicines of identical quality to top brands?',
    a: 'Yes. Every batch of Jan Aushadhi medicine is procured by PMBI from WHO-GMP compliant facilities and independently tested at NABL (National Accreditation Board for Testing and Calibration Laboratories) accredited labs before dispatch to generic pharmacy stores. The active chemical molecule, purity, and bioequivalence are identical.',
  },
  {
    category: 'Doctor & Pharmacist Consultations',
    q: 'What should I tell my doctor or chemist when requesting generic substitution?',
    a: 'You can show them your SaltMatch transition slip. Ask: "Doctor, could you please prescribe this medication under its active generic salt name or allow Jan Aushadhi substitution?" In India, the National Medical Commission (NMC) encourages physicians to write prescriptions using generic salt names to reduce the out-of-pocket financial burden on families.',
  },
  {
    category: 'Formulation Science',
    q: 'What is the difference between Sustained Release (SR/PR) and Immediate Release (IR)?',
    a: 'Release mechanisms dictate how medicine is absorbed over time. An Extended Release (ER) or Sustained Release (SR) tablet releases active ingredients gradually over 12–24 hours, whereas Immediate Release acts quickly. SaltMatch enforces strict release profile checks: you should only match formulations with matching release profiles (e.g. SR to SR).',
  },
  {
    category: 'Legal & Rights',
    q: 'Is it legal for an Indian chemist to dispense a generic alternative?',
    a: 'Under the Pharmacy Act and Drug & Cosmetics Rules, if a doctor prescribes a medicine by generic name (e.g. "Paracetamol 650mg"), the pharmacist is legally required to dispense the generic form. If a specific brand is written, pharmacists should confirm with the patient or doctor before substituting, which is why bringing a printed SaltMatch slip is recommended.',
  },
  {
    category: 'Quality & Safety',
    q: 'Why do generic tablets sometimes look, smell, or taste different from branded ones?',
    a: 'Pharma companies patent non-active excipients, pill shapes, colors, and flavorings (such as strawberry coatings). However, these inactive binders have zero therapeutic effect. The active medicinal molecule in the generic version is identical in weight, purity, and clinical efficacy.',
  },
  {
    category: 'Quality & Safety',
    q: 'What are Narrow Therapeutic Index (NTI) drugs and why is caution advised?',
    a: 'NTI medications (such as Levothyroxine for thyroid disorders, Warfarin for anticoagulation, or Lithium) have very narrow boundaries between therapeutic benefit and toxicity. While generic versions are bioequivalent, even minor batch variations between manufacturers can shift blood levels. Whenever switching brands of an NTI drug, ask your physician to order follow-up serum blood tests.',
  },
  {
    category: 'Jan Aushadhi Logistics',
    q: 'Where can I find the nearest Jan Aushadhi generic dispensary?',
    a: 'There are over 10,000 Pradhan Mantri Bhartiya Janaushadhi Kendras (PMBJK) operating across almost all districts in India. You can locate your nearest store using the official "Jan Aushadhi Sugam" mobile app or at janaushadhi.gov.in.',
  },
  {
    category: 'Quality & Safety',
    q: 'Can switching to a generic medicine cause unexpected side effects?',
    a: 'Because the active pharmaceutical molecule is identical, side effects associated with the drug itself will be the same. In rare instances, a patient might have an allergy to an inactive binder or food coloring (excipient), but adverse reaction rates between generics and innovator brands are virtually identical according to CDSCO and FDA surveillance.',
  },
];

export const FaqPage: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Quality & Safety', 'Doctor & Pharmacist Consultations', 'Formulation Science', 'Legal & Rights', 'Jan Aushadhi Logistics'];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.q.toLowerCase().includes(filterQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(filterQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-20 flex flex-col gap-14 sm:gap-20">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#183b28] bg-[#eef5f1] px-4 py-1.5 rounded-full shadow-2xs">
          Patient Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-[1.12]">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-[60ch]">
          Clear, medically verified answers on generic drug equivalence, patient rights, bioequivalence testing, and how to discuss substitutions with your doctor.
        </p>

        {/* Search input within FAQ */}
        <div className="w-full max-w-xl mt-4 bg-white rounded-full p-2 pl-5 pr-3 shadow-[0_4px_30px_rgb(0,0,0,0.04)] flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search questions (e.g. doctor, Jan Aushadhi, NTI, quality)..."
            className="flex-1 bg-transparent border-none text-slate-900 placeholder-slate-400 text-sm focus:outline-hidden"
          />
          {filterQuery && (
            <button
              type="button"
              onClick={() => setFilterQuery('')}
              className="text-xs text-slate-400 hover:text-slate-700 px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#183b28] text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 shadow-2xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="max-w-4xl w-full mx-auto flex flex-col gap-4">
        {filteredFaqs.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-[32px] text-slate-400 flex flex-col items-center gap-3 shadow-xs">
            <HelpCircle className="w-8 h-8" />
            <p className="text-sm font-semibold">No questions matched your search term.</p>
            <button
              type="button"
              onClick={() => {
                setFilterQuery('');
                setSelectedCategory('All');
              }}
              className="text-xs text-[#183b28] font-bold underline"
            >
              Reset search
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => (
            <details
              key={idx}
              name="faq-accordion"
              className="group rounded-[28px] bg-white p-7 sm:p-8 shadow-[0_4px_30px_rgb(0,0,0,0.02)] open:shadow-xl transition-all"
            >
              <summary className="font-bold text-slate-900 text-base sm:text-lg cursor-pointer list-none flex items-center justify-between gap-4">
                <span className="leading-snug">{faq.q}</span>
                <span className="w-8 h-8 rounded-full bg-[#f8f9fa] group-open:bg-[#eef5f1] text-[#183b28] flex items-center justify-center font-black text-sm shrink-0 transition-transform group-open:rotate-180">
                  ↓
                </span>
              </summary>
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {faq.category}
                </span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-[68ch]">
                  {faq.a}
                </p>
              </div>
            </details>
          ))
        )}
      </div>

      {/* Patient Checklist Card */}
      <div className="max-w-4xl mx-auto w-full p-8 sm:p-10 rounded-[32px] bg-[#f7f8f6] flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#eef5f1] text-[#183b28] flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Doctor Consultation Checklist</h3>
            <p className="text-xs text-slate-500">3 simple questions to ask during your next appointment</p>
          </div>
        </div>

        <ul className="flex flex-col gap-3 text-xs sm:text-sm text-slate-700">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#183b28] shrink-0 mt-0.5" />
            <span>&quot;Doctor, is there any clinical reason I cannot take the Jan Aushadhi generic equivalent of this medication?&quot;</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#183b28] shrink-0 mt-0.5" />
            <span>&quot;Can you write the generic molecule name (e.g. Metformin 500mg ER) on the prescription so any licensed chemist can dispense it?&quot;</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#183b28] shrink-0 mt-0.5" />
            <span>&quot;For my thyroid or heart medication, will you order a blood test in 4 weeks to verify my serum levels after switching?&quot;</span>
          </li>
        </ul>
      </div>

      {/* Footer CTA */}
      <div className="text-center flex flex-col items-center gap-3">
        <h4 className="font-bold text-slate-900 text-lg">Have a specific prescription slip?</h4>
        <Link
          to="/prescription"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#183b28] text-white text-xs font-bold hover:bg-[#122e1f] transition-all"
        >
          Try the Prescription Parser <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
