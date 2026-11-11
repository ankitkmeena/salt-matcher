import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Database, Cloud, GitBranch, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b111e] text-white pt-20 pb-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-14">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2 flex flex-col gap-4 max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#183b28] flex items-center justify-center text-emerald-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">SaltMatch</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Open healthcare initiative designed to empower Indian patients and families to verify exact chemical salt compositions, match bioequivalent generic alternatives, and save up to 85% on chronic medications.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
              <span className="inline-flex items-center gap-1.5">
                <Cloud className="w-3.5 h-3.5 text-emerald-400" /> Cloudflare Pages Edge
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-emerald-400" /> Cloudflare D1 SQL
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Platform</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-300">
              <li>
                <Link to="/" className="hover:text-emerald-300 transition-colors">
                  Home & Overview
                </Link>
              </li>
              <li>
                <Link to="/medicines" className="hover:text-emerald-300 transition-colors">
                  Medicine & Salt Catalog
                </Link>
              </li>
              <li>
                <Link to="/prescription" className="hover:text-emerald-300 transition-colors">
                  Prescription OCR & Parser
                </Link>
              </li>
              <li>
                <Link to="/savings" className="hover:text-emerald-300 transition-colors">
                  Family Savings Slip
                </Link>
              </li>
            </ul>
          </div>

          {/* Medical Education & Help */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Clinical & Legal</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-300">
              <li>
                <Link to="/education" className="hover:text-emerald-300 transition-colors">
                  Bioequivalence Standards
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-emerald-300 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <a
                  href="https://janaushadhi.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-emerald-300 transition-colors"
                >
                  PMBJP Official Portal <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ankitkmeena/salt-matcher"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-emerald-300 transition-colors"
                >
                  <GitBranch className="w-3 h-3 text-emerald-400" /> GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Clinical Disclaimer Callout */}
        <div className="p-6 rounded-3xl bg-[#141b2a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400 leading-relaxed">
          <p className="max-w-3xl">
            <strong className="text-slate-200">Statutory Clinical Notice:</strong> SaltMatch provides automated pharmaceutical salt matching and bioequivalence data for informational purposes. Never stop, start, or alter prescription medications without explicit guidance from your treating physician. Narrow Therapeutic Index (NTI) medications require serum monitoring upon brand substitution.
          </p>
          <span className="shrink-0 text-slate-500 font-mono text-[11px]">
            ISO/CDSCO Data Mapping
          </span>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/80 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SaltMatch. Designed with Scandinavian minimalism for public healthcare access.</p>
          <p>Open Source under MIT License • Maintained by ankitmeena1804@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};
