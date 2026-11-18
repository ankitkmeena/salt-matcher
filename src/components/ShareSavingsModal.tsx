import React, { useState } from 'react';
import { Share2, Check, Copy, MessageCircle, Sparkles } from 'lucide-react';
import { BasketSummary } from '../types/medicine';

interface ShareSavingsModalProps {
  summary: BasketSummary;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareSavingsModal: React.FC<ShareSavingsModalProps> = ({ summary, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalMonthlySavings = Math.round(summary.monthly_savings);
  const totalYearlySavings = Math.round(summary.annual_savings);
  const percentSavings = summary.overall_savings_percentage;
  const medicinesCount = summary.breakdown.length;

  const shareText = `💊 My family is saving ₹${totalMonthlySavings.toLocaleString('en-IN')}/month (₹${totalYearlySavings.toLocaleString('en-IN')}/year) by switching ${medicinesCount} branded medicines to verified Jan Aushadhi generic equivalents with identical active ingredients!

🔍 Find your generic medicine alternatives here:
https://salt-matcher.pages.dev/medicines`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl flex flex-col gap-6 overflow-hidden border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-[#eef5f1] text-[#183b28]">
              <Share2 className="w-4 h-4 text-[#27583d]" />
            </span>
            <span className="text-xs font-bold text-slate-800 tracking-tight">
              Share Family Healthcare Savings
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-xs font-bold p-1 rounded-full"
          >
            ✕
          </button>
        </div>

        {/* Visual Shareable Card (Ready for Screenshot or Direct WhatsApp Copy) */}
        <div className="rounded-[24px] bg-[#183b28] text-white p-6 sm:p-7 flex flex-col gap-5 shadow-[0_15px_40px_rgba(24,59,40,0.25)] relative overflow-hidden">
          {/* Subtle decorative circles */}
          <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-emerald-500/10 blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-emerald-400/10 blur-xl pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <span className="text-[11px] font-bold text-emerald-300 tracking-wider uppercase bg-white/10 px-3 py-1 rounded-full">
              SaltMatch Family Ledger
            </span>
            <span className="text-xs text-white/70 font-mono">
              Save {percentSavings}%
            </span>
          </div>

          <div className="flex flex-col gap-1 relative z-10">
            <span className="text-xs text-emerald-200/80 font-medium">Monthly Prescriptions Savings</span>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-baseline gap-2">
              <span>₹{totalMonthlySavings.toLocaleString('en-IN')}</span>
              <span className="text-xs sm:text-sm font-semibold text-emerald-300">/ month</span>
            </div>
            <span className="text-xs text-emerald-200/90 pt-1">
              ₹{totalYearlySavings.toLocaleString('en-IN')} saved every year across {medicinesCount} chronic medications.
            </span>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/70 relative z-10">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              100% Identical Active Salts
            </span>
            <span className="font-semibold text-white">salt-matcher.pages.dev</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="w-full sm:flex-1 py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            Share on WhatsApp
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full sm:flex-1 py-3 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-600" />
                Copy Text & Link
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-slate-400 text-center leading-relaxed">
          Sharing help friends, parents, and chronic patients reduce high out-of-pocket medical bills without altering clinical efficacy.
        </p>
      </div>
    </div>
  );
};
