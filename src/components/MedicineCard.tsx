import React, { useState, useEffect } from 'react';
import { Medicine } from '../types/medicine';
import { ShieldAlert, CheckCircle2, ShieldCheck, ArrowRight, Plus, ChevronDown, Check, Info } from 'lucide-react';
import { MedicineDetailModal } from './MedicineDetailModal';
import { useTranslation } from '../utils/i18n';
import { SEED_MEDICINES } from '../data/seedData';

interface MedicineCardProps {
  medicine: Medicine;
  onSelect: (medicine: Medicine) => void;
  onAddToBasket: (medicine: Medicine) => void;
  isInBasket?: boolean;
}

export const MedicineCard: React.FC<MedicineCardProps> = ({
  medicine,
  onSelect,
  onAddToBasket,
  isInBasket = false,
}) => {
  const { t } = useTranslation();
  const [currentMedicine, setCurrentMedicine] = useState<Medicine>(medicine);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    setCurrentMedicine(medicine);
  }, [medicine]);

  const isJanAushadhi = currentMedicine.is_jan_aushadhi === 1;

  const handleSwitchStrength = (strength: string) => {
    const cleanStrength = strength.trim().toLowerCase();
    const match = SEED_MEDICINES.find(
      (m) =>
        (m.brand_name === currentMedicine.brand_name ||
          m.name.toLowerCase().startsWith(currentMedicine.brand_name.toLowerCase()) ||
          m.normalized_salt_key.split(':')[0] === currentMedicine.normalized_salt_key.split(':')[0]) &&
        (m.name.toLowerCase().includes(cleanStrength) ||
          m.composition_summary.toLowerCase().includes(cleanStrength)) &&
        m.is_jan_aushadhi === currentMedicine.is_jan_aushadhi
    );
    if (match) {
      setCurrentMedicine(match);
    }
  };

  return (
    <article className="group bg-white rounded-[28px] p-6 sm:p-7 flex flex-col justify-between gap-5 shadow-[0_4px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
      <div className="flex flex-col gap-3.5">
        {/* Top Minimal Category & Status Row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-500 bg-[#f4f4f2] px-3 py-0.5 rounded-full">
              {currentMedicine.therapeutic_category || currentMedicine.dosage_form}
            </span>
            {isJanAushadhi && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#eef5f1] text-[#183b28]">
                <CheckCircle2 className="w-3 h-3 text-[#27583d]" /> Jan Aushadhi
              </span>
            )}
          </div>

          {currentMedicine.is_nti === 1 && (
            <span
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900"
              title="Narrow Therapeutic Index drug - requires physician lab monitoring"
            >
              <ShieldAlert className="w-3 h-3 text-amber-700" /> NTI Caution
            </span>
          )}
        </div>

        {/* Medicine Name */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-[#183b28] transition-colors leading-snug line-clamp-1">
              {currentMedicine.name}
            </h3>
            <button
              type="button"
              onClick={() => setIsDetailOpen(true)}
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title={t.viewDetails}
              aria-label={t.viewDetails}
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-1">
            {currentMedicine.composition_summary}
          </p>
        </div>

        {/* Interactive In-Card Strength Switcher */}
        {currentMedicine.strength_variants && currentMedicine.strength_variants.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-0.5">
              {t.strengths}:
            </span>
            {currentMedicine.strength_variants.map((st) => {
              const cleanSt = st.toLowerCase();
              const isCurrent =
                currentMedicine.name.toLowerCase().includes(cleanSt) ||
                currentMedicine.composition_summary.toLowerCase().includes(cleanSt);
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => handleSwitchStrength(st)}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                    isCurrent
                      ? 'bg-[#183b28] text-white shadow-2xs'
                      : 'bg-[#f4f4f2] text-slate-600 hover:bg-[#eef5f1] hover:text-[#183b28]'
                  }`}
                  title={`Switch to ${st}`}
                >
                  {st}
                </button>
              );
            })}
          </div>
        )}

        {/* Progressive Disclosure: On-Demand Regulatory & Clinical Details */}
        <details className="group/details mt-0.5">
          <summary className="text-[11px] font-medium text-slate-400 hover:text-slate-700 cursor-pointer list-none flex items-center gap-1 py-1 select-none transition-colors">
            <span>{t.regulatoryDetails}</span>
            <ChevronDown className="w-3 h-3 text-slate-400 group-open/details:rotate-180 transition-transform" />
          </summary>
          <div className="mt-2.5 p-3.5 rounded-2xl bg-[#f8f9fa] flex flex-col gap-2 text-xs text-slate-600 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-medium">{t.manufacturer}</span>
              <span className="font-semibold text-slate-700 text-right truncate max-w-[170px]">
                {currentMedicine.manufacturer}
              </span>
            </div>
            {currentMedicine.pmbi_code && (
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">{t.pmbiCode}</span>
                <span className="font-mono font-bold text-[#183b28]">{currentMedicine.pmbi_code}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-medium">{t.certification}</span>
              <span className="font-medium text-emerald-800 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                {currentMedicine.cdsco_approval || 'CDSCO Verified'}
              </span>
            </div>
            {currentMedicine.nppa_ceiling_price && (
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">{t.dpcoCeiling}</span>
                <span className="font-medium text-slate-700">
                  ₹{currentMedicine.nppa_ceiling_price.toFixed(2)}/unit
                </span>
              </div>
            )}
            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200/50">
              <span className="text-slate-400">NPPA Gazette Recency</span>
              <span className="font-mono text-slate-500 text-[10px]">
                {currentMedicine.nppa_gazette_ref || currentMedicine.last_verified || 'Nov 2026'}
              </span>
            </div>
          </div>
        </details>
      </div>

      {/* Bottom Pricing & Actions */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              ₹{currentMedicine.price_inr.toFixed(2)}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              /{currentMedicine.package_size} {currentMedicine.dosage_form.toLowerCase()}s
            </span>
          </div>
          <span className="text-[10px] text-slate-400">
            ₹{currentMedicine.price_per_unit.toFixed(2)} per unit
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onAddToBasket(currentMedicine)}
            className={`p-2.5 rounded-full transition-all min-h-[40px] min-w-[40px] flex items-center justify-center ${
              isInBasket
                ? 'bg-[#eef5f1] text-[#183b28]'
                : 'bg-[#f4f4f2] text-slate-700 hover:text-[#183b28] hover:bg-[#eef5f1] active:scale-95'
            }`}
            aria-label={`${t.addToBasket} ${currentMedicine.name}`}
            title={isInBasket ? t.inBasket : t.addToBasket}
          >
            {isInBasket ? <Check className="w-4 h-4 text-emerald-700" /> : <Plus className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => onSelect(currentMedicine)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#183b28] hover:bg-[#122e1f] active:scale-95 rounded-full transition-all min-h-[40px]"
          >
            <span>{t.compare}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Deep Medicine Details & Instructions Modal */}
      <MedicineDetailModal
        medicine={currentMedicine}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onAddToBasket={onAddToBasket}
        isInBasket={isInBasket}
      />
    </article>
  );
};
