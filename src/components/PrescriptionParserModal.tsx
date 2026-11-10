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
    title: 'Type 2 Diabetes & Hypertension Regimen',
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
    title: 'Acute Infection & Allergy',
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
      className="backdrop:bg-slate-900/60 backdrop:backdrop-blur-xs p-0 rounded-3xl max-w-2xl w-[94vw] bg-white shadow-2xl outline-none overflow-hidden my-auto mx-auto"
      aria-labelledby="parser-modal-title"
    >
      {/* Header */}
      <div className="px-7 py-6 bg-gradient-to-r from-emerald-700 to-teal-800 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <FileText className="w-5 h-5 text-emerald-300" />
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
      <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="prescription-text-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Paste Doctor Prescription Notes or Text
          </label>
          <textarea
            id="prescription-text-input"
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g.&#10;Tab Glycomet GP 2 - 1 OD&#10;Tab Telma 40 - 1 OD&#10;Tab Atorva 20 - 1 HS"
            className="w-full p-4 text-sm text-slate-800 bg-slate-50/90 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-mono shadow-2xs resize-none"
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
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 transition-colors"
              >
                {preset.title}
              </button>
            ))}
          </div>
        </div>

        {/* Matched Medicines Preview */}
        {parsed.length > 0 && (
          <div className="p-5 rounded-3xl bg-emerald-50/70 flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Found {parsed.length} Recognized Molecule{parsed.length === 1 ? '' : 's'}</span>
              </span>
              <span className="text-emerald-700">Ready to compare</span>
            </div>

            <div className="flex flex-col gap-2">
              {parsed.map((med) => (
                <div
                  key={med.id}
                  className="p-3.5 rounded-2xl bg-white shadow-2xs flex items-center justify-between text-xs"
                >
                  <div className="flex flex-col gap-0.5">
                    <strong className="text-slate-900 font-bold">{med.name}</strong>
                    <p className="text-slate-500 text-[11px]">{med.composition_summary}</p>
                  </div>
                  <span className="font-black text-slate-800 text-sm">₹{med.price_inr.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleImport}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all min-h-[44px]"
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
