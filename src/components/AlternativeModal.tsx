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

  // Handle native backdrop click to dismiss
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
      className="backdrop:bg-slate-900/60 backdrop:backdrop-blur-xs p-0 rounded-3xl max-w-4xl w-[94vw] bg-white shadow-2xl border border-slate-200 outline-none overflow-hidden my-auto mx-auto"
      aria-labelledby="comparison-modal-title"
    >
      {/* Header Bar */}
      <div className="px-6 py-5 bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-xs">
              Bioequivalent Match
            </span>
            <span className="text-xs text-emerald-100">
              {alternatives.length} verified alternative{alternatives.length === 1 ? '' : 's'} found
            </span>
          </div>
          <h2 id="comparison-modal-title" className="text-xl sm:text-2xl font-bold mt-1">
            Salt Matching Analysis
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close comparison window"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
        {/* NTI Warning Banner if applicable */}
        {nti_alert && (
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex items-start space-x-3 shadow-xs">
            <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-sm">
              <h4 className="font-bold text-amber-900">
                Narrow Therapeutic Index (NTI) Clinical Notice
              </h4>
              <p className="mt-1 leading-relaxed text-amber-900/90">{nti_alert}</p>
            </div>
          </div>
        )}

        {/* Top: Current Branded Medicine Overview */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Current Prescribed Medicine
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                {target.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Manufacturer: <strong className="text-slate-700">{target.manufacturer}</strong> •{' '}
                {target.dosage_form} ({target.release_mechanism})
              </p>
              
              <div className="mt-2.5 inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800">
                <Pill className="w-3.5 h-3.5 text-emerald-600" />
                <span>Exact Salt: {target.composition_summary}</span>
              </div>
            </div>

            <div className="text-left sm:text-right shrink-0 bg-white sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-slate-200">
              <span className="text-xs text-slate-500 font-medium block">Current Retail MRP</span>
              <div className="text-2xl font-black text-slate-900">
                ₹{target.price_inr.toFixed(2)}
              </div>
              <span className="text-xs font-semibold text-slate-500">
                ₹{target.price_per_unit.toFixed(2)} per unit
              </span>
            </div>
          </div>
        </div>

        {/* Best Saving Generic Callout Card */}
        {bestAlt && max_savings_percentage > 0 && (
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white shadow-xl shadow-emerald-600/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 translate-x-6 -translate-y-6 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-extrabold bg-white text-emerald-800 shadow-xs mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Maximum Savings Recommendation</span>
                </div>

                <h4 className="text-2xl font-extrabold tracking-tight">
                  {bestAlt.medicine.name}
                </h4>

                <p className="text-emerald-100 text-xs sm:text-sm mt-1">
                  Mfg by {bestAlt.medicine.manufacturer} • Identical Active Salt Formulation
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold">
                  <span className="px-3 py-1 rounded-lg bg-emerald-800/40 text-emerald-50 border border-emerald-400/30">
                    Monthly Saving: ₹{bestAlt.monthly_savings_inr.toFixed(2)}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/20 text-white border border-white/30 font-bold">
                    Annual Family Saving: ₹{bestAlt.annual_savings_inr.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 shrink-0 bg-emerald-900/40 p-4 rounded-2xl border border-emerald-400/30">
                <div>
                  <span className="text-xs text-emerald-200 block">Generic Alternative Price</span>
                  <div className="flex items-baseline space-x-1.5">
                    <span className="text-3xl font-black">₹{bestAlt.medicine.price_inr.toFixed(2)}</span>
                    <span className="text-xs text-emerald-200">
                      ({bestAlt.medicine.package_size} units)
                    </span>
                  </div>
                  <span className="text-xs text-emerald-100 font-medium">
                    ₹{bestAlt.medicine.price_per_unit.toFixed(2)} / unit
                  </span>
                </div>

                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-black bg-emerald-300 text-emerald-950">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  Save {max_savings_percentage}%
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onAddToBasket(bestAlt.medicine);
                    onClose();
                  }}
                  className="w-full inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 bg-white text-emerald-900 font-bold text-xs rounded-xl hover:bg-emerald-50 transition-colors shadow-md min-h-[44px]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Alternative to Rx Basket</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Alternative Comparison List */}
        <div>
          <h4 className="text-base font-bold text-slate-900 mb-3 flex items-center justify-between">
            <span>All Verified Equivalent Formulations</span>
            <span className="text-xs font-medium text-slate-500">
              Sorted by price savings
            </span>
          </h4>

          {alternatives.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-50 border border-slate-200 text-slate-500">
              <p className="font-semibold">No direct salt matches currently in database.</p>
              <p className="text-xs mt-1">This formulation might be off-patent or require custom compounding.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {alternatives.map((alt) => {
                const isJan = alt.medicine.is_jan_aushadhi === 1;
                return (
                  <div
                    key={alt.medicine.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      isJan
                        ? 'bg-emerald-50/50 border-emerald-300'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center flex-wrap gap-2">
                        <h5 className="font-bold text-slate-900 text-base">
                          {alt.medicine.name}
                        </h5>
                        {isJan ? (
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Jan Aushadhi
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                            Generic-Branded
                          </span>
                        )}
                        <span className="text-xs text-slate-500">
                          {alt.medicine.package_size} {alt.medicine.dosage_form.toLowerCase()}s
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 font-medium">
                        Manufacturer: <span className="text-slate-700">{alt.medicine.manufacturer}</span>
                      </p>

                      <div className="text-xs text-slate-600 flex items-center gap-3 pt-1">
                        <span className="flex items-center text-emerald-700 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Identical Active Salt
                        </span>
                        <span>•</span>
                        <span>{alt.medicine.release_mechanism}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-5 shrink-0 pt-3 md:pt-0 border-t md:border-0 border-slate-200">
                      <div className="text-left md:text-right">
                        <div className="text-lg font-extrabold text-slate-900">
                          ₹{alt.medicine.price_inr.toFixed(2)}
                        </div>
                        <div className="text-xs text-slate-500">
                          ₹{alt.medicine.price_per_unit.toFixed(2)} / unit
                        </div>
                        {alt.percentage_savings > 0 && (
                          <span className="inline-block mt-0.5 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
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
                        className="inline-flex items-center space-x-1 px-3 py-2 text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-xl transition-colors min-h-[44px]"
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

        {/* Regulatory & Educational Note */}
        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-xs flex items-start space-x-2">
          <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p>
            <strong>Bioequivalence Guarantee:</strong> Under Indian CDSCO and international WHO-GMP standards, approved generic drugs contain the identical active pharmaceutical ingredient (API) in the same dosage, safety profile, efficacy, and intended use as branded products.
          </p>
        </div>
      </div>
    </dialog>
  );
};
