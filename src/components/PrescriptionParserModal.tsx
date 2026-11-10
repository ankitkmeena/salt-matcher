import React, { useEffect, useRef, useState } from 'react';
import { parsePrescriptionText } from '../utils/matcher';
import { Medicine } from '../types/medicine';
import { X, FileText, PlusCircle, ArrowRight, Sparkles } from 'lucide-react';

interface PrescriptionParserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportMedicines: (medicines: Medicine[]) => void;
  allMedicines: Medicine[];
}

const SAMPLE_PRESCRIPTIONS = [
  {
    title: 'Type 2 Diabetes & Hypertension',
    text: `1. Glycomet-GP 2 Tablet (1 tab daily morning)
2. Telma 40 Tablet (1 tab daily after breakfast)
3. Atorva 20 Tablet (1 tab at night)
4. Pan-D Capsule (1 cap empty stomach)`,
  },
  {
    title: 'Thyroid & Joint Pain Regimen',
    text: `1. Thyronorm 50mcg Tablet (1 tab morning empty stomach)
2. Zerodol-P Tablet (1 tab twice daily as needed for pain)`,
  },
  {
    title: 'Infection & Allergy',
    text: `1. Augmentin 625 Duo Tablet (1 tab twice daily for 5 days)
2. Montair-LC Tablet (1 tab at bedtime)`,
  },
];

export const PrescriptionParserModal: React.FC<PrescriptionParserModalProps> = ({
  isOpen,
  onClose,
  onImportMedicines,
  allMedicines,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [text, setText] = useState('');
  const [parsed, setParsed] = useState<Medicine[]>([]);

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

  useEffect(() => {
    if (text.trim()) {
      const results = parsePrescriptionText(text, allMedicines);
      setParsed(results);
    } else {
      setParsed([]);
    }
  }, [text, allMedicines]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const handleImport = () => {
    if (parsed.length > 0) {
      onImportMedicines(parsed);
      onClose();
      setText('');
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={onClose}
      onClick={handleBackdropClick}
      className="backdrop:bg-slate-900/40 backdrop:backdrop-blur-sm p-0 rounded-[32px] max-w-2xl w-[92vw] bg-white shadow-2xl outline-none overflow-hidden my-auto mx-auto"
      aria-labelledby="parser-modal-title"
    >
      {/* Header */}
      <div className="px-8 py-6 bg-[#183b28] text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-emerald-200" />
          <h2 id="parser-modal-title" className="text-xl font-bold tracking-tight">
            Paste & Parse Prescription
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close prescription parser"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-7 sm:p-9 max-h-[75vh] overflow-y-auto flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="prescription-text-input" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Paste Doctor Prescription Notes or Text
          </label>
          <textarea
            id="prescription-text-input"
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g.&#10;Tab Glycomet GP 2 - 1 OD&#10;Tab Telma 40 - 1 OD&#10;Tab Atorva 20 - 1 HS"
            className="w-full p-5 text-sm text-slate-800 bg-[#f7f8f6] rounded-3xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#183b28]/20 font-mono shadow-2xs resize-none leading-relaxed"
            autoCorrect="off"
            spellCheck="false"
          />
        </div>

        {/* Preset Sample Quick Buttons */}
        <div className="flex flex-col gap-2.5">
          <span className="text-xs font-semibold text-slate-400">
            Or try a pre-filled sample prescription:
          </span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_PRESCRIPTIONS.map((preset) => (
              <button
                key={preset.title}
                type="button"
                onClick={() => setText(preset.text)}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-[#f3f4f1] hover:bg-stone-200 text-slate-700 transition-colors"
              >
                {preset.title}
              </button>
            ))}
          </div>
        </div>

        {/* Matched Medicines Preview */}
        {parsed.length > 0 && (
          <div className="p-6 rounded-3xl bg-[#eef5f1] flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs font-bold text-[#183b28]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#27583d]" />
                <span>Found {parsed.length} Recognized Molecule{parsed.length === 1 ? '' : 's'}</span>
              </span>
              <span className="text-emerald-700 font-medium">Ready to compare</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {parsed.map((med) => (
                <div
                  key={med.id}
                  className="p-4 rounded-2xl bg-white shadow-2xs flex items-center justify-between text-xs"
                >
                  <div className="flex flex-col gap-0.5">
                    <strong className="text-slate-900 font-bold text-sm">{med.name}</strong>
                    <p className="text-slate-400 text-xs font-medium">{med.composition_summary}</p>
                  </div>
                  <span className="font-black text-slate-900 text-base">₹{med.price_inr.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleImport}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#183b28] hover:bg-[#0f271a] active:scale-95 text-white font-bold text-sm shadow-md shadow-[#183b28]/15 transition-all min-h-[44px]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Import All to Rx Savings Basket</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
};
