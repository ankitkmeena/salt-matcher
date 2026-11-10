import React, { useEffect, useRef } from 'react';
import { BasketItem, Medicine } from '../types/medicine';
import { calculateBasketSummary } from '../utils/matcher';
import {
  X,
  Trash2,
  Printer,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Plus,
  Minus,
  CheckCircle2,
} from 'lucide-react';

interface BasketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  basket: BasketItem[];
  onUpdateStrips: (medicineId: number, delta: number) => void;
  onRemoveItem: (medicineId: number) => void;
  onClearBasket: () => void;
  allMedicines: Medicine[];
}

export const BasketDrawer: React.FC<BasketDrawerProps> = ({
  isOpen,
  onClose,
  basket,
  onUpdateStrips,
  onRemoveItem,
  onClearBasket,
  allMedicines,
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

  const summary = calculateBasketSummary(basket, allMedicines);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        onCancel={onClose}
        onClick={handleBackdropClick}
        className="backdrop:bg-slate-900/40 backdrop:backdrop-blur-sm p-0 rounded-[32px] max-w-3xl w-[92vw] bg-white shadow-2xl outline-none overflow-hidden my-auto mx-auto"
        aria-labelledby="basket-modal-title"
      >
        {/* Header */}
        <div className="px-8 py-6 bg-[#183b28] text-white flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center font-black text-sm text-emerald-200">
              Rx
            </div>
            <div className="flex flex-col">
              <h2 id="basket-modal-title" className="text-xl font-bold tracking-tight">
                Monthly Prescription Basket
              </h2>
              <p className="text-xs text-emerald-200">
                Calculate family chronic medicine savings & export for your doctor
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {basket.length > 0 && (
              <button
                type="button"
                onClick={onClearBasket}
                className="px-3.5 py-1.5 text-xs font-bold text-rose-200 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                title="Clear all medicines"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close basket"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-7 sm:p-10 max-h-[75vh] overflow-y-auto flex flex-col gap-7">
          {basket.length === 0 ? (
            <div className="text-center py-16 px-4 flex flex-col items-center gap-3.5">
              <div className="w-16 h-16 rounded-3xl bg-[#eef5f1] text-[#183b28] flex items-center justify-center mb-1">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Your Rx Basket is empty</h3>
              <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                Search your regular monthly medicines (e.g., blood pressure, diabetes, thyroid) and click &quot;Add to Rx&quot; to calculate your household savings.
              </p>
            </div>
          ) : (
            <>
              {/* Grand Total Savings Callout Banner */}
              <div className="p-8 sm:p-9 rounded-[32px] bg-[#183b28] text-white shadow-xl shadow-[#183b28]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] uppercase tracking-widest font-extrabold text-emerald-200">
                    Total Household Impact
                  </span>
                  <div className="text-3xl sm:text-5xl font-black flex items-baseline gap-2 tracking-tight">
                    <span>₹{summary.monthly_savings.toFixed(2)}</span>
                    <span className="text-sm font-semibold text-emerald-200">saved / month</span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-100 font-medium mt-1">
                    That&apos;s <strong className="text-white font-black">₹{summary.annual_savings.toFixed(2)}</strong> saved every year ({summary.overall_savings_percentage}% reduction).
                  </p>
                </div>

                <div className="p-5 bg-[#0f271a] rounded-3xl text-xs flex flex-col gap-2.5 shrink-0">
                  <div className="flex justify-between gap-6">
                    <span className="text-emerald-200 font-medium">Current Branded:</span>
                    <span className="font-bold text-white line-through opacity-70">
                      ₹{summary.total_current_monthly.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between gap-6">
                    <span className="text-emerald-200 font-medium">Generic Basket:</span>
                    <span className="font-black text-emerald-300 text-sm">
                      ₹{summary.total_optimized_monthly.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* NTI Warnings Alert */}
              {summary.nti_warnings.length > 0 && (
                <div className="p-5 rounded-3xl bg-[#fffbf0] text-amber-950 text-xs sm:text-sm flex items-start gap-3.5">
                  <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong className="font-bold">Prescription Review Note:</strong> Your basket includes Narrow Therapeutic Index (NTI) medications ({summary.nti_warnings.map((w) => w.medicine_name).join(', ')}). Share this report with your prescribing physician to approve substitutions with standard lab follow-up.
                  </div>
                </div>
              )}

              {/* Breakdown List */}
              <div className="flex flex-col gap-4">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
                  Medicines in Monthly Routine ({basket.length})
                </h4>

                <div className="flex flex-col gap-4">
                  {summary.breakdown.map((row) => (
                    <div
                      key={row.medicine.id}
                      className="p-6 rounded-3xl bg-[#f7f8f6] flex flex-col gap-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-slate-900 text-base">{row.medicine.name}</h5>
                            {row.is_nti && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                                NTI
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 font-medium">
                            {row.medicine.composition_summary} • {row.medicine.dosage_form}
                          </p>
                        </div>

                        {/* Strip Counter & Delete */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center rounded-full bg-white shadow-2xs p-1">
                            <button
                              type="button"
                              onClick={() => onUpdateStrips(row.medicine.id, -1)}
                              className="p-1.5 text-slate-600 hover:bg-stone-100 rounded-full transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                              aria-label={`Decrease quantity of ${row.medicine.name}`}
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3.5 text-xs font-bold text-slate-900">
                              {row.strips_per_month} {row.strips_per_month === 1 ? 'pack' : 'packs'}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateStrips(row.medicine.id, 1)}
                              className="p-1.5 text-slate-600 hover:bg-stone-100 rounded-full transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                              aria-label={`Increase quantity of ${row.medicine.name}`}
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(row.medicine.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 transition-colors rounded-full hover:bg-rose-50"
                            aria-label={`Remove ${row.medicine.name} from basket`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Compare with Alternative Card */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-white shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-1.5 text-[#183b28] font-bold">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Switch to: {row.alternative.name}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-medium">
                            Mfg: {row.alternative.manufacturer} (Same Active Salt & Strength)
                          </p>
                        </div>

                        <div className="flex items-center gap-3.5 self-end sm:self-auto">
                          <div className="flex flex-col text-right">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Monthly saving</span>
                            <span className="font-extrabold text-[#183b28] text-base">
                              ₹{row.savings.toFixed(2)}
                            </span>
                          </div>
                          <span className="px-3 py-1 rounded-full font-black text-[11px] bg-[#eef5f1] text-[#183b28]">
                            Save {row.percentage_savings}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-slate-700 bg-[#f4f4f2] hover:bg-stone-200 font-bold text-xs sm:text-sm transition-colors min-h-[44px]"
                >
                  <Printer className="w-4 h-4 text-[#183b28]" />
                  <span>Print Doctor Consultation Slip</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#183b28] hover:bg-[#0f271a] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-[#183b28]/15 transition-all min-h-[44px]"
                >
                  <span>Continue Browsing</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>

      {/* Hidden printable document element for window.print() */}
      <div id="printable-prescription-slip" className="hidden">
        <div style={{ padding: '32px', fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ borderBottom: '2px solid #183b28', paddingBottom: '16px', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#183b28', margin: 0 }}>
              SaltMatch — Generic Medicine Transition Slip
            </h1>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '6px 0 0 0' }}>
              Patient-Prepared Equivalent Formulation Report for Attending Physician & Pharmacist Review
            </p>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginBottom: '24px' }}>
            <thead>
              <tr style={{ background: '#f8f9fa', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '10px' }}>Current Brand</th>
                <th style={{ padding: '10px' }}>Active Salt & Strength</th>
                <th style={{ padding: '10px' }}>Generic / Jan Aushadhi Alternative</th>
                <th style={{ padding: '10px' }}>Monthly Cost Change</th>
                <th style={{ padding: '10px' }}>Physician Approval</th>
              </tr>
            </thead>
            <tbody>
              {summary.breakdown.map((row) => (
                <tr key={row.medicine.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>{row.medicine.name}</td>
                  <td style={{ padding: '10px' }}>{row.medicine.composition_summary}</td>
                  <td style={{ padding: '10px', color: '#183b28', fontWeight: 'bold' }}>
                    {row.alternative.name} ({row.alternative.manufacturer})
                  </td>
                  <td style={{ padding: '10px' }}>
                    ₹{row.current_cost} → ₹{row.alternative_cost} (-{row.percentage_savings}%)
                  </td>
                  <td style={{ padding: '10px', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
                    [ &nbsp; ] Approved
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ background: '#eef5f1', padding: '16px', borderRadius: '16px', marginBottom: '28px' }}>
            <p style={{ margin: 0, fontWeight: 'bold', color: '#183b28' }}>
              Total Estimated Monthly Savings: ₹{summary.monthly_savings.toFixed(2)} (₹{summary.annual_savings.toFixed(2)} / year)
            </p>
            <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#27583d' }}>
              All listed alternatives possess identical active molecules, dosage forms, and routes of administration under WHO-GMP certification.
            </p>
          </div>

          <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <div>
              <p>Patient Name: _______________________</p>
              <p>Date: {new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <p>Doctor / Pharmacist Signature: _______________________</p>
              <p>Registration No: _______________________</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
