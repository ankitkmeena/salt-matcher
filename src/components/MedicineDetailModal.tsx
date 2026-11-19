import React from 'react';
import { Medicine } from '../types/medicine';
import { ShieldCheck, ShieldAlert, Clock, Thermometer, Utensils, Info } from 'lucide-react';

interface MedicineDetailModalProps {
  medicine: Medicine | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToBasket: (med: Medicine) => void;
  isInBasket?: boolean;
}

export const MedicineDetailModal: React.FC<MedicineDetailModalProps> = ({
  medicine,
  isOpen,
  onClose,
  onAddToBasket,
  isInBasket = false,
}) => {
  if (!isOpen || !medicine) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-500 bg-[#f4f4f2] px-3 py-0.5 rounded-full">
                {medicine.therapeutic_category}
              </span>
              {medicine.is_jan_aushadhi === 1 && (
                <span className="text-[10px] font-bold text-[#183b28] bg-[#eef5f1] px-2.5 py-0.5 rounded-full">
                  Govt Jan Aushadhi
                </span>
              )}
              {medicine.is_nti === 1 && (
                <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3 text-amber-700" /> NTI Caution
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {medicine.name}
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-600">
              {medicine.composition_summary}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold transition-colors shrink-0"
          >
            ✕
          </button>
        </div>

        {/* Pricing & Units Banner */}
        <div className="p-5 rounded-2xl bg-[#183b28] text-white flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-emerald-200/80">Retail MRP</span>
            <div className="text-2xl sm:text-3xl font-black text-white">
              ₹{medicine.price_inr.toFixed(2)}
              <span className="text-xs text-emerald-300 font-medium ml-2">
                /{medicine.package_size} {medicine.dosage_form}s (₹{medicine.price_per_unit.toFixed(2)}/unit)
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onAddToBasket(medicine)}
            className={`px-5 py-2.5 rounded-full font-bold text-xs transition-all ${
              isInBasket
                ? 'bg-emerald-400 text-slate-950'
                : 'bg-white text-slate-900 hover:bg-emerald-50 active:scale-95'
            }`}
          >
            {isInBasket ? '✓ Added to Slip' : '+ Add to Savings Slip'}
          </button>
        </div>

        {/* Clinical Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Indications */}
          <div className="p-4 rounded-2xl bg-[#f8f9fa] border border-slate-100 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Info className="w-4 h-4 text-[#183b28]" />
              <span>Primary Indications</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {medicine.indications || 'Used for symptomatic management and treatment as indicated by active pharmaceutical salts.'}
            </p>
          </div>

          {/* Dosage & Administration */}
          <div className="p-4 rounded-2xl bg-[#f8f9fa] border border-slate-100 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Clock className="w-4 h-4 text-[#183b28]" />
              <span>How to Administer</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {medicine.how_to_use || 'Take exactly as directed by your physician. Swallow whole with water; do not crush sustained-release tablets.'}
            </p>
          </div>

          {/* Food & Dietary Advice */}
          <div className="p-4 rounded-2xl bg-[#f8f9fa] border border-slate-100 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Utensils className="w-4 h-4 text-[#183b28]" />
              <span>Dietary Instructions</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {medicine.food_interaction || 'May be taken with or without food. Maintain consistent hydration and follow your doctor recommendations.'}
            </p>
          </div>

          {/* Storage Conditions */}
          <div className="p-4 rounded-2xl bg-[#f8f9fa] border border-slate-100 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Thermometer className="w-4 h-4 text-[#183b28]" />
              <span>Storage Guidelines</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {medicine.storage || 'Store below 25°C in a dry place protected from direct sunlight and moisture. Keep out of reach of children.'}
            </p>
          </div>
        </div>

        {/* Regulatory & Safety Footer */}
        <div className="p-4 rounded-2xl bg-[#eef5f1] border border-emerald-100 flex items-center justify-between text-xs text-[#183b28]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span className="font-semibold">Manufacturer: {medicine.manufacturer}</span>
          </div>
          {medicine.nppa_ceiling_price && (
            <span className="font-mono text-[11px] font-bold">
              DPCO Cap: ₹{medicine.nppa_ceiling_price.toFixed(2)}/unit
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
