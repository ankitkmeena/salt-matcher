import React, { useState } from 'react';
import { ReceiptText, Upload, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';
import { auditReceiptText, ReceiptAuditResult } from '../utils/receiptAuditor';
import { recognizePrescriptionImage } from '../utils/ocrService';

interface ReceiptAuditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReceiptAuditorModal: React.FC<ReceiptAuditorModalProps> = ({ isOpen, onClose }) => {
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [auditResult, setAuditResult] = useState<ReceiptAuditResult | null>(null);

  if (!isOpen) return null;

  const handleAudit = () => {
    if (!inputText.trim()) return;
    const result = auditReceiptText(inputText);
    setAuditResult(result);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const textResult = await recognizePrescriptionImage(file);
      setInputText(textResult);
      const audited = auditReceiptText(textResult);
      setAuditResult(audited);
    } catch (err) {
      console.error(err);
      alert('Error scanning receipt image. Please enter the bill text manually.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-2xl bg-[#eef5f1] text-[#183b28]">
              <ReceiptText className="w-5 h-5 text-[#27583d]" />
            </span>
            <div className="flex flex-col">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Chemist Receipt DPCO Price Auditor
              </h3>
              <span className="text-xs text-slate-400">
                Check whether your local pharmacy charged above statutory NPPA price caps
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-xs font-bold p-1 rounded-full"
          >
            ✕
          </button>
        </div>

        {/* Input / Upload Section */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>Paste Chemist Receipt Text or Upload Bill Image:</span>
            <label className="cursor-pointer text-[#183b28] hover:underline flex items-center gap-1 font-bold">
              <Upload className="w-3.5 h-3.5" />
              Upload Bill Photo
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Example pharmacy bill text:\nAugmentin 625 Duo 10 Tabs - 210.00\nDolo 650 Strip - 32.00\nTelma 40 - 145.00`}
            rows={4}
            className="w-full p-4 rounded-2xl bg-[#f8f9fa] border border-slate-200 text-xs font-mono text-slate-800 outline-none focus:border-[#183b28]/40"
          />

          <button
            type="button"
            onClick={handleAudit}
            disabled={isProcessing || !inputText.trim()}
            className="w-full py-3 px-5 rounded-full bg-[#183b28] hover:bg-[#122e1f] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isProcessing ? 'Analyzing Receipt OCR...' : 'Audit Receipt Against DPCO Ceilings'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Audit Results */}
        {auditResult && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs">
              <div className="flex flex-col">
                <span className="text-slate-400">Total Billed</span>
                <span className="text-base font-bold text-slate-900">₹{auditResult.total_billed.toFixed(2)}</span>
              </div>

              {auditResult.overcharge_detected ? (
                <div className="flex items-center gap-2 text-rose-700 bg-rose-50 px-3 py-1.5 rounded-full font-bold">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Excess Charged: ₹{auditResult.total_excess_charged.toFixed(2)}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Compliant with DPCO Caps</span>
                </div>
              )}
            </div>

            {/* Line items */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-700">Audited Medicine Items ({auditResult.items.length}):</span>
              {auditResult.items.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No recognized prescription medicine prices found in the receipt text.</p>
              ) : (
                auditResult.items.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white border border-slate-100 flex items-center justify-between text-xs shadow-xs">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800">{item.detected_name}</span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Billed: ₹{item.billed_price_per_unit?.toFixed(2)}/unit {item.nppa_ceiling_per_unit ? `| DPCO Cap: ₹${item.nppa_ceiling_per_unit.toFixed(2)}` : ''}
                      </span>
                    </div>

                    {item.is_overcharged ? (
                      <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full">
                        Overcharged by ₹{item.overcharge_amount.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                        Within Legal Limit
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
