import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Printer, Download, ShoppingBag, Trash2, Plus, Minus, ShieldCheck, AlertCircle, ArrowLeft, Share2, MapPin, ShieldAlert, BookmarkPlus, History } from 'lucide-react';
import { useBasket } from '../context/BasketContext';
import { SEED_MEDICINES } from '../data/seedData';
import { calculateBasketSummary } from '../utils/matcher';
import { generateTransitionSlipPDF } from '../utils/pdfGenerator';
import { ShareSavingsModal } from '../components/ShareSavingsModal';
import { checkDrugInteractions, DetectedInteraction } from '../utils/ddiService';
import { useTranslation } from '../utils/i18n';

export const SavingsPage: React.FC = () => {
  const { t } = useTranslation();
  const { basket, updateStrips, removeItem, clearBasket, savedSlips, saveCurrentSlip, loadSavedSlip, deleteSavedSlip } = useBasket();
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSlip = () => {
    saveCurrentSlip();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const summary = useMemo(() => {
    return calculateBasketSummary(basket, SEED_MEDICINES);
  }, [basket]);

  // Evaluate Drug-Drug Interactions (DDI) across all medicines in current basket
  const ddiAlerts: DetectedInteraction[] = useMemo(() => {
    const medicineList = summary.breakdown.map((item) => ({
      id: item.medicine.id,
      name: item.medicine.name,
      composition_summary: item.medicine.composition_summary
    }));
    return checkDrugInteractions(medicineList);
  }, [summary]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    generateTransitionSlipPDF(summary);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 flex flex-col gap-12 sm:gap-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 print:hidden">
        <div className="flex flex-col gap-2">
          <Link
            to="/medicines"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Medicine Catalog
          </Link>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#183b28] bg-[#eef5f1] px-4 py-1.5 rounded-full shadow-2xs w-fit">
            {t.familyLedger}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            {t.slipTitle}
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-[56ch] leading-relaxed">
            Review your monthly prescription costs versus verified Jan Aushadhi generic equivalents, and print a consultation slip for your doctor.
          </p>
        </div>

        {basket.length > 0 && (
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={handleSaveSlip}
              className="px-4 py-2.5 rounded-full bg-white hover:bg-slate-50 text-[#183b28] text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 border border-slate-200"
              title="Save this prescription slip for later"
            >
              <BookmarkPlus className="w-4 h-4 text-emerald-700" />
              {savedSuccess ? 'Saved!' : t.saveSlip}
            </button>
            {savedSlips.length > 0 && (
              <button
                type="button"
                onClick={() => setHistoryOpen(!historyOpen)}
                className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <History className="w-4 h-4 text-slate-500" />
                {t.savedSlips} ({savedSlips.length})
              </button>
            )}
            <button
              type="button"
              onClick={clearBasket}
              className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-bold transition-colors"
            >
              {t.clearSlip}
            </button>
            <button
              type="button"
              onClick={() => setShareModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#183b28] text-xs font-bold transition-all shadow-xs flex items-center gap-2"
            >
              <Share2 className="w-4 h-4 text-[#27583d]" />
              {t.shareSavings}
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all shadow-xs flex items-center gap-2 border border-slate-200"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              {t.printSlip}
            </button>
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="px-6 py-2.5 rounded-full bg-[#183b28] hover:bg-[#122e1f] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-emerald-300" />
              {t.downloadPdf}
            </button>
          </div>
        )}
      </div>

      {/* Saved Slips History Drawer/Panel */}
      {historyOpen && savedSlips.length > 0 && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col gap-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <History className="w-4 h-4 text-[#183b28]" />
              Saved Prescription Slips
            </h4>
            <span className="text-xs text-slate-400">Tap to load past slip into active review</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {savedSlips.map((slip) => (
              <div
                key={slip.id}
                className="p-3.5 rounded-2xl bg-[#f8f9fa] border border-slate-100 flex items-center justify-between gap-3 text-xs"
              >
                <button
                  type="button"
                  onClick={() => {
                    loadSavedSlip(slip.id);
                    setHistoryOpen(false);
                  }}
                  className="flex flex-col text-left hover:text-[#183b28] transition-colors"
                >
                  <span className="font-bold text-slate-800 line-clamp-1">{slip.name}</span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {slip.items.length} items • {new Date(slip.date).toLocaleDateString('en-IN')}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => deleteSavedSlip(slip.id)}
                  className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                  title="Delete slip"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {basket.length === 0 ? (
        <div className="p-16 sm:p-24 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] text-center flex flex-col items-center justify-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-[#f8f9fa] text-slate-400 flex items-center justify-center">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div className="flex flex-col gap-2 max-w-md">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Your Savings Slip is Empty</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Add your regular monthly medications from our catalog or paste an e-prescription to calculate your family&apos;s annual savings.
            </p>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Link
              to="/medicines"
              className="px-6 py-3 rounded-full bg-[#183b28] text-white font-bold text-xs hover:bg-[#122e1f] transition-all"
            >
              Browse Medicines
            </Link>
            <Link
              to="/prescription"
              className="px-6 py-3 rounded-full bg-slate-100 text-slate-800 font-bold text-xs hover:bg-slate-200 transition-colors"
            >
              Scan Prescription
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {/* Printable Header (Visible only on print) */}
          <div className="hidden print:flex flex-col gap-2 border-b pb-6 border-slate-300">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">SaltMatch — Prescription Substitution Note</h2>
              <span className="text-xs text-slate-500">Date: {new Date().toLocaleDateString('en-IN')}</span>
            </div>
            <p className="text-xs text-slate-600">
              Dear Doctor / Pharmacist: The following table lists the active chemical salt compositions and verified Jan Aushadhi bioequivalent generic options for the patient&apos;s regular chronic medications. Please review for generic substitution approval.
            </p>
          </div>

          {/* High-Impact Scandinavian Metrics Banner */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8 sm:p-10 rounded-[32px] bg-[#183b28] text-white shadow-xl">
            <div className="flex flex-col gap-1">
              <span className="text-emerald-300/80 text-xs font-semibold uppercase tracking-wider">{t.currentSpend}</span>
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">₹{summary.total_current_monthly.toFixed(0)}</span>
              <span className="text-[11px] text-emerald-200/60 font-medium">per month</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-emerald-300/80 text-xs font-semibold uppercase tracking-wider">{t.genericSpend}</span>
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-300 tracking-tight">₹{summary.total_optimized_monthly.toFixed(0)}</span>
              <span className="text-[11px] text-emerald-200/60 font-medium">per month</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-emerald-300/80 text-xs font-semibold uppercase tracking-wider">{t.monthlySavings}</span>
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">₹{summary.monthly_savings.toFixed(0)}</span>
              <span className="text-[11px] text-emerald-300 font-semibold">{summary.overall_savings_percentage}% saved</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-emerald-300/80 text-xs font-semibold uppercase tracking-wider">{t.annualSavings}</span>
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-300 tracking-tight">₹{summary.annual_savings.toFixed(0)}</span>
              <span className="text-[11px] text-amber-200/80 font-medium">per year</span>
            </div>
          </div>

          {/* Narrow Therapeutic Index (NTI) Safety Alert */}
          {summary.nti_warnings.length > 0 && (
            <div className="p-6 sm:p-7 rounded-3xl bg-[#fffbf0] border border-amber-200/80 flex flex-col sm:flex-row items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1 text-xs text-amber-900 leading-relaxed">
                <h4 className="font-bold text-sm text-amber-950">Clinical Vigilance: Narrow Therapeutic Index (NTI) Detected</h4>
                <p>
                  Your list contains medication with a narrow therapeutic range ({summary.nti_warnings.map((w) => w.medicine_name).join(', ')}). While generic equivalents exist and are bioequivalent, blood serum levels (e.g., TSH, INR) must be verified after any brand transition under physician supervision.
                </p>
              </div>
            </div>
          )}

          {/* Clinical Drug-Drug Interaction (DDI) Checker Alerts */}
          {ddiAlerts.length > 0 && (
            <div className="p-6 sm:p-7 rounded-3xl bg-[#fff5f5] border border-rose-200 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-sm text-rose-950">
                    Clinical Alert: {ddiAlerts.length} Potential Drug Interaction{ddiAlerts.length > 1 ? 's' : ''} Detected
                  </h4>
                  <p className="text-xs text-rose-800/80">
                    Your monthly basket contains medicines known to interact when co-administered. Review these notes before your physician visit.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                {ddiAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-4 rounded-2xl bg-white border border-rose-100 flex flex-col gap-2 text-xs shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">
                        {alert.medicine_a_name} ↔ {alert.medicine_b_name}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          alert.severity === 'severe'
                            ? 'bg-rose-100 text-rose-800'
                            : alert.severity === 'moderate'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {alert.severity} Risk
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      <strong>Effect:</strong> {alert.clinical_effect}
                    </p>
                    <div className="p-2.5 rounded-xl bg-slate-50 text-slate-700 text-[11px] border border-slate-100">
                      <strong>Physician Action:</strong> {alert.recommendation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Item List */}
          <div className="p-8 sm:p-10 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] flex flex-col gap-8">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Medication Comparison & Strip Quantities
            </h3>

            <div className="flex flex-col divide-y divide-slate-100">
              {summary.breakdown.map((row) => (
                <div key={row.medicine.id} className="py-6 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Left: Medicine Details */}
                  <div className="flex flex-col gap-2 max-w-xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-slate-900 text-base">{row.medicine.name}</h4>
                      <span className="text-xs text-slate-400 font-medium">({row.medicine.manufacturer})</span>
                      {row.is_nti && (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                          NTI Caution
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-mono">{row.medicine.composition_summary}</p>

                    {/* Generic equivalent box */}
                    <div className="mt-1 p-3 rounded-2xl bg-[#eef5f1] flex items-center justify-between text-xs text-emerald-900">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span className="font-semibold">Substituted with: {row.alternative.name}</span>
                      </div>
                      <span className="text-emerald-700 font-bold">
                        ₹{row.alternative.price_inr.toFixed(2)} / pack
                      </span>
                    </div>
                  </div>

                  {/* Right: Quantity & Costs */}
                  <div className="flex items-center justify-between md:justify-end gap-8 shrink-0">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2.5 print:hidden">
                      <button
                        type="button"
                        onClick={() => updateStrips(row.medicine.id, -1)}
                        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
                        title="Decrease strips per month"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-slate-900 w-12 text-center">
                        {row.strips_per_month} strip{row.strips_per_month === 1 ? '' : 's'}/mo
                      </span>
                      <button
                        type="button"
                        onClick={() => updateStrips(row.medicine.id, 1)}
                        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
                        title="Increase strips per month"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Price & Savings */}
                    <div className="flex flex-col text-right min-w-[120px]">
                      <div className="flex items-baseline justify-end gap-2">
                        <span className="text-xs text-slate-400 line-through font-semibold">
                          ₹{row.current_cost.toFixed(0)}
                        </span>
                        <span className="text-base font-extrabold text-[#183b28]">
                          ₹{row.alternative_cost.toFixed(0)}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700">
                        Save ₹{row.savings.toFixed(0)} ({row.percentage_savings}%)
                      </span>
                    </div>

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeItem(row.medicine.id)}
                      className="text-slate-300 hover:text-rose-500 transition-colors p-2 print:hidden"
                      title="Remove from slip"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Printable Instructions for Doctor/Pharmacist */}
          <div className="p-6 rounded-3xl bg-[#f8f9fa] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-200/60">
            <div className="flex flex-col gap-2 text-xs text-slate-500 leading-relaxed max-w-2xl">
              <h5 className="font-bold text-slate-700">Patient Instructions for Next Clinic Visit:</h5>
              <ol className="list-decimal list-inside flex flex-col gap-1 pl-1">
                <li>Show this printed or mobile slip to your prescribing physician at your next follow-up.</li>
                <li>Ask: &quot;Doctor, can we switch these to Jan Aushadhi generic equivalents or prescribe by active salt name?&quot;</li>
                <li>Purchase directly at any of the 10,000+ Pradhan Mantri Bhartiya Janaushadhi Kendras across India.</li>
              </ol>
            </div>

            <Link
              to="/stores"
              className="px-6 py-3 rounded-full bg-[#183b28] hover:bg-[#122e1f] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <MapPin className="w-4 h-4 text-emerald-300" />
              Locate Jan Aushadhi Kendras
            </Link>
          </div>

          {/* Share Savings Modal */}
          <ShareSavingsModal
            summary={summary}
            isOpen={shareModalOpen}
            onClose={() => setShareModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};
