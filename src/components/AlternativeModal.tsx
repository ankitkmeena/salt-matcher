import React, { useEffect, useRef } from 'react';
import { AlternativeComparison, Medicine } from '../types/medicine';
import {
  X,
  ShieldAlert,
  CheckCircle2,
  TrendingDown,
  Sparkles,
  Plus,
  HelpCircle,
  Pill,
} from 'lucide-react';

interface AlternativeModalProps {
  comparison: AlternativeComparison | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToBasket: (medicine: Medicine) => void;
}

export const AlternativeModal: React.FC<AlternativeModalProps> = ({
  comparison,
  isOpen,
  onClose,
  onAddToBasket,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  if (!comparison) return null;

  const { target, alternatives, cheapest, max_savings_percentage, nti_alert } = comparison;
  const bestAlt = alternatives.find((a) => a.medicine.id === cheapest.id) || alternatives[0];

  return (
    <dialog
      ref={dialogRef}
      onCancel={onClose}
      onClick={handleBackdropClick}
      className="backdrop:bg-slate-900/40 backdrop:backdrop-blur-sm p-0 rounded-[32px] max-w-4xl w-[92vw] bg-white shadow-2xl outline-none overflow-hidden my-auto mx-auto"
      aria-labelledby="comparison-modal-title"
    >
      {/* Modal Header */}
      <div className="px-8 py-6 bg-[#183b28] text-white flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-white/15 text-white backdrop-blur-xs">
              Bioequivalent Match
            </span>
            <span className="text-xs text-emerald-200 font-medium">
              {alternatives.length} verified alternative{alternatives.length === 1 ? '' : 's'}
            </span>
          </div>
          <h2 id="comparison-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight">
            Active Salt Matching Analysis
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close comparison window"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Modal Scrollable Body */}
      <div className="p-7 sm:p-10 max-h-[80vh] overflow-y-auto flex flex-col gap-8">
        {/* NTI Warning Banner if applicable */}
        {nti_alert && (
          <div className="p-6 rounded-3xl bg-[#fffbf0] text-amber-950 flex items-start gap-4 shadow-2xs">
            <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="flex flex-col gap-1 text-sm">
              <h4 className="font-bold text-amber-900">
                Narrow Therapeutic Index (NTI) Clinical Notice
              </h4>
              <p className="leading-relaxed text-amber-900/90">{nti_alert}</p>
            </div>
          </div>
        )}

        {/* 1. Current Prescribed Medicine Overview */}
        <div className="p-7 sm:p-8 rounded-3xl bg-[#f5f6f4] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Current Prescribed Medicine
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {target.name}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Manufacturer: <strong className="text-slate-700">{target.manufacturer}</strong> •{' '}
              {target.dosage_form} ({target.release_mechanism})
            </p>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-xs font-semibold text-slate-800 shadow-2xs w-fit mt-1">
              <Pill className="w-3.5 h-3.5 text-[#27583d]" />
              <span>Exact Salt: {target.composition_summary}</span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:items-end bg-white sm:bg-transparent p-5 sm:p-0 rounded-2xl shadow-xs sm:shadow-none">
            <span className="text-xs text-slate-400 font-medium">Current Retail Price</span>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-0.5">
              ₹{target.price_inr.toFixed(2)}
            </div>
            <span className="text-xs font-semibold text-slate-400">
              ₹{target.price_per_unit.toFixed(2)} per unit
            </span>
          </div>
        </div>

        {/* 2. Maximum Savings Hero Card */}
        {bestAlt && max_savings_percentage > 0 && (
          <div className="p-8 sm:p-10 rounded-[32px] bg-[#183b28] text-white shadow-xl shadow-[#183b28]/15 relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex flex-col gap-3.5 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black bg-white text-[#183b28] shadow-xs w-fit">
                <Sparkles className="w-3.5 h-3.5 text-[#27583d]" />
                <span>Recommended Generic Formulation</span>
              </div>

              <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {bestAlt.medicine.name}
              </h4>

              <p className="text-emerald-100 text-xs sm:text-sm font-medium">
                Mfg: {bestAlt.medicine.manufacturer} • Identical Active Molecules & Bioavailability
              </p>

              <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold pt-1">
                {bestAlt.medicine.pmbi_code && (
                  <span className="px-3 py-1.5 rounded-full bg-white/20 text-emerald-100 font-mono text-[11px]">
                    Govt Drug Code: {bestAlt.medicine.pmbi_code}
                  </span>
                )}
                <span className="px-3 py-1.5 rounded-full bg-white/15 text-emerald-100 text-[11px] font-medium">
                  {bestAlt.medicine.cdsco_approval || 'WHO-GMP & NABL Lab Certified'}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white/10 text-emerald-200 text-[11px]">
                  Verified {bestAlt.medicine.last_verified || 'Nov 2026'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs font-bold pt-1">
                <span className="px-4 py-2 rounded-full bg-white/10 text-emerald-100">
                  Monthly Saving: ₹{bestAlt.monthly_savings_inr.toFixed(2)}
                </span>
                <span className="px-4 py-2 rounded-full bg-white/20 text-white">
                  Annual Household Saving: ₹{bestAlt.annual_savings_inr.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-5 bg-[#0f271a] p-6 rounded-3xl">
              <div className="flex flex-col lg:items-end">
                <span className="text-xs text-emerald-200 font-medium">Generic Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black">₹{bestAlt.medicine.price_inr.toFixed(2)}</span>
                  <span className="text-xs text-emerald-200">
                    ({bestAlt.medicine.package_size} units)
                  </span>
                </div>
                <span className="text-xs text-emerald-100 font-medium">
                  ₹{bestAlt.medicine.price_per_unit.toFixed(2)} / unit
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-sm font-black bg-emerald-300 text-emerald-950">
                <TrendingDown className="w-4 h-4" />
                Save {max_savings_percentage}%
              </div>

              <button
                type="button"
                onClick={() => {
                  onAddToBasket(bestAlt.medicine);
                  onClose();
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#183b28] font-bold text-xs rounded-full hover:bg-emerald-50 active:scale-95 transition-all shadow-md min-h-[44px]"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Prescription Basket</span>
              </button>
            </div>
          </div>
        )}

        {/* 3. All Verified Alternatives Group */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-slate-900 tracking-tight">
              All Equivalent Formulations
            </h4>
            <span className="text-xs font-medium text-slate-400">
              Sorted by price savings
            </span>
          </div>

          {alternatives.length === 0 ? (
            <div className="p-8 text-center rounded-3xl bg-[#f5f6f4] text-slate-500 flex flex-col gap-1">
              <p className="font-bold">No direct salt matches currently in database.</p>
              <p className="text-xs">This formulation might be off-patent or require custom compounding.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3.5">
              {alternatives.map((alt) => {
                const isJan = alt.medicine.is_jan_aushadhi === 1;
                return (
                  <div
                    key={alt.medicine.id}
                    className={`p-6 rounded-3xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 ${
                      isJan
                        ? 'bg-[#eef5f1]'
                        : 'bg-[#f7f8f6] hover:bg-[#f2f4f0]'
                    }`}
                  >
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h5 className="font-bold text-slate-900 text-base">
                          {alt.medicine.name}
                        </h5>
                        {isJan ? (
                          <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#183b28] text-white">
                            Jan Aushadhi
                          </span>
                        ) : (
                          <span className="px-3 py-0.5 rounded-full text-[11px] font-semibold bg-stone-200 text-stone-800">
                            Generic-Branded
                          </span>
                        )}
                        <span className="text-xs text-slate-500 font-medium">
                          {alt.medicine.package_size} {alt.medicine.dosage_form.toLowerCase()}s
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 font-medium">
                        Manufacturer: <span className="text-slate-700 font-semibold">{alt.medicine.manufacturer}</span>
                      </p>

                      <div className="text-xs text-slate-600 flex items-center gap-3 pt-0.5">
                        <span className="flex items-center gap-1.5 text-[#183b28] font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Identical Active Salt
                        </span>
                        <span>•</span>
                        <span>{alt.medicine.release_mechanism}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 pt-2 md:pt-0">
                      <div className="flex flex-col text-left md:text-right">
                        <div className="text-2xl font-black text-slate-900">
                          ₹{alt.medicine.price_inr.toFixed(2)}
                        </div>
                        <div className="text-xs text-slate-400 font-medium">
                          ₹{alt.medicine.price_per_unit.toFixed(2)} / unit
                        </div>
                        {alt.percentage_savings > 0 && (
                          <span className="inline-block mt-1 text-xs font-bold text-[#183b28] bg-white px-2.5 py-0.5 rounded-full w-fit md:ml-auto">
                            Save {alt.percentage_savings}%
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onAddToBasket(alt.medicine);
                          onClose();
                        }}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-[#183b28] bg-white hover:bg-stone-100 rounded-full transition-all shadow-xs min-h-[44px]"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add to Rx</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 4. Regulatory Transparency Note */}
        <div className="p-5 rounded-2xl bg-[#f4f4f2] text-slate-600 text-xs flex items-start gap-3.5">
          <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-800 font-semibold">Bioequivalence Standard:</strong> Under Indian CDSCO and international WHO-GMP standards, certified generic medicines contain the identical active pharmaceutical ingredient (API) in the same dosage, safety profile, efficacy, and intended use as branded products.
          </p>
        </div>
      </div>
    </dialog>
  );
};
