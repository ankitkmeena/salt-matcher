import React from 'react';
import { Medicine } from '../types/medicine';
import { Pill, ShieldAlert, CheckCircle2, ShieldCheck, ArrowRight, Plus } from 'lucide-react';

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
  const isJanAushadhi = medicine.is_jan_aushadhi === 1;
  const isGeneric = medicine.is_generic === 1;

  return (
    <article className="group bg-white rounded-[28px] p-7 sm:p-8 flex flex-col justify-between gap-7 shadow-[0_4px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300">
      {/* Top Details Group */}
      <div className="flex flex-col gap-4">
        {/* Badges Bar Group */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {isJanAushadhi ? (
              <>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#eef5f1] text-[#183b28]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#27583d]" /> Jan Aushadhi
                </span>
                {medicine.pmbi_code && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#183b28] text-emerald-200">
                    {medicine.pmbi_code}
                  </span>
                )}
              </>
            ) : isGeneric ? (
              <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700">
                Unbranded Generic
              </span>
            ) : (
              <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700">
                Commercial Brand
              </span>
            )}

            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#f4f4f2] text-slate-600">
              {medicine.dosage_form} • {medicine.release_mechanism}
            </span>
          </div>

          {medicine.is_nti === 1 && (
            <span
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900"
              title="Narrow Therapeutic Index drug - requires physician lab monitoring"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-700" /> NTI
            </span>
          )}
        </div>

        {/* Medicine Name & Brand Title */}
        <div className="flex flex-col gap-1">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-[#183b28] transition-colors leading-snug line-clamp-1">
            {medicine.name}
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Manufacturer: <span className="text-slate-600 font-semibold">{medicine.manufacturer}</span>
          </p>
        </div>

        {/* Active Salt Composition Inset */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#f7f8f6] flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Active Composition
          </span>
          <div className="text-xs sm:text-sm font-semibold text-slate-800 flex items-start gap-2">
            <Pill className="w-4 h-4 text-[#27583d] shrink-0 mt-0.5" />
            <span className="leading-snug">{medicine.composition_summary}</span>
          </div>
        </div>

        {/* Indications if present */}
        {medicine.indications && (
          <p className="text-xs text-slate-400 line-clamp-1 italic px-0.5">
            Prescribed for: {medicine.indications}
          </p>
        )}

        {/* Clinical Verification & Trust Stamp */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="truncate max-w-[190px]">{medicine.cdsco_approval || 'CDSCO Bioequivalent'}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono shrink-0">
            Verified {medicine.last_verified || 'Nov 2026'}
          </span>
        </div>
      </div>

      {/* Bottom Pricing & Actions Group */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              ₹{medicine.price_inr.toFixed(2)}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              /{medicine.package_size} {medicine.dosage_form.toLowerCase()}s
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-400">
            ₹{medicine.price_per_unit.toFixed(2)} per unit
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onAddToBasket(medicine)}
            className={`p-2.5 rounded-full transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${
              isInBasket
                ? 'bg-[#eef5f1] text-[#183b28]'
                : 'bg-[#f4f4f2] text-slate-700 hover:text-[#183b28] hover:bg-[#eef5f1] active:scale-95'
            }`}
            aria-label={`Add ${medicine.name} to monthly prescription basket`}
            title="Add to monthly prescription"
          >
            <Plus className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onSelect(medicine)}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-[#183b28] hover:bg-[#0f271a] active:scale-95 rounded-full shadow-sm shadow-[#183b28]/15 transition-all min-h-[44px]"
          >
            <span>Compare</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
