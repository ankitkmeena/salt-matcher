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
    <article className="group bg-white rounded-2xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5 transition-all flex flex-col justify-between overflow-hidden">
      <div className="p-5">
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center flex-wrap gap-1.5">
            {isJanAushadhi ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" /> Jan Aushadhi Generic
              </span>
            ) : isGeneric ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800">
                Unbranded Generic
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                Commercial Brand
              </span>
            )}

            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
              {medicine.dosage_form} • {medicine.release_mechanism}
            </span>
          </div>

          {medicine.is_nti === 1 && (
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300"
              title="Narrow Therapeutic Index drug - requires physician lab monitoring"
            >
              <ShieldAlert className="w-3 h-3 mr-1 text-amber-700" /> NTI
            </span>
          )}
        </div>

        {/* Medicine Name & Brand */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
          {medicine.name}
        </h3>
        
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Mfg: <span className="text-slate-700">{medicine.manufacturer}</span>
        </p>

        {/* Active Salt Composition */}
        <div className="mt-3.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Active Composition
          </p>
          <p className="text-xs font-semibold text-slate-800 mt-0.5 flex items-start">
            <Pill className="w-3.5 h-3.5 text-emerald-600 mr-1.5 shrink-0 mt-0.5" />
            <span>{medicine.composition_summary}</span>
          </p>
        </div>

        {/* Indications if present */}
        {medicine.indications && (
          <p className="mt-2.5 text-xs text-slate-500 line-clamp-1 italic">
            For: {medicine.indications}
          </p>
        )}
      </div>

      {/* Footer Price & Actions */}
      <div className="px-5 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-baseline space-x-1">
            <span className="text-xl font-extrabold text-slate-900">
              ₹{medicine.price_inr.toFixed(2)}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              /{medicine.package_size} {medicine.dosage_form.toLowerCase()}s
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            ₹{medicine.price_per_unit.toFixed(2)} per unit
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => onAddToBasket(medicine)}
            className={`p-2 rounded-xl transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${
              isInBasket
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-emerald-600 hover:border-emerald-300'
            }`}
            aria-label={`Add ${medicine.name} to monthly prescription basket`}
            title="Add to monthly prescription"
          >
            <Plus className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onSelect(medicine)}
            className="inline-flex items-center space-x-1 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-xs transition-colors min-h-[44px]"
          >
            <span>Compare</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
