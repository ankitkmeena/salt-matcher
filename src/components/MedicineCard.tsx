import React from 'react';
import { Medicine } from '../types/medicine';
import { Pill, ShieldAlert, CheckCircle2, ArrowRight, Plus } from 'lucide-react';

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
    <article className="group bg-white rounded-3xl p-6 flex flex-col justify-between gap-6 shadow-sm shadow-slate-200/60 hover:shadow-xl hover:shadow-emerald-600/8 hover:-translate-y-0.5 transition-all">
      {/* Top Details Group */}
      <div className="flex flex-col gap-4">
        {/* Badges Bar Group */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            {isJanAushadhi ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Jan Aushadhi Generic
              </span>
            ) : isGeneric ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-800">
                Unbranded Generic
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                Commercial Brand
              </span>
            )}

            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100/80 text-slate-600">
              {medicine.dosage_form} • {medicine.release_mechanism}
            </span>
          </div>

          {medicine.is_nti === 1 && (
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-800"
              title="Narrow Therapeutic Index drug - requires physician lab monitoring"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-700" /> NTI
            </span>
          )}
        </div>

        {/* Medicine Name & Brand Title */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
            {medicine.name}
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Manufacturer: <span className="text-slate-700 font-semibold">{medicine.manufacturer}</span>
          </p>
        </div>

        {/* Active Salt Composition Box */}
        <div className="p-3.5 rounded-2xl bg-slate-50/90 flex flex-col gap-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Active Composition
          </span>
          <div className="text-xs font-bold text-slate-800 flex items-start gap-1.5">
            <Pill className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <span className="leading-snug">{medicine.composition_summary}</span>
          </div>
        </div>

        {/* Indications if present */}
        {medicine.indications && (
          <p className="text-xs text-slate-500 line-clamp-1 italic px-0.5">
            Prescribed for: {medicine.indications}
          </p>
        )}
      </div>

      {/* Bottom Pricing & Actions Group */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900">
              ₹{medicine.price_inr.toFixed(2)}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              /{medicine.package_size} {medicine.dosage_form.toLowerCase()}s
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-500">
            ₹{medicine.price_per_unit.toFixed(2)} per unit
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onAddToBasket(medicine)}
            className={`p-2.5 rounded-xl transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${
              isInBasket
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-slate-100 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 active:scale-95'
            }`}
            aria-label={`Add ${medicine.name} to monthly prescription basket`}
            title="Add to monthly prescription"
          >
            <Plus className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onSelect(medicine)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-98 rounded-xl shadow-md shadow-emerald-600/15 transition-all min-h-[44px]"
          >
            <span>Compare</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
