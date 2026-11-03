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
      className="backdrop:bg-slate-900/60 backdrop:backdrop-blur-xs p-0 rounded-3xl max-w-2xl w-[94vw] bg-white shadow-2xl border border-slate-200 outline-none overflow-hidden my-auto mx-auto"
      aria-labelledby="parser-modal-title"
    >
      <div className="px-6 py-5 bg-gradient-to-r from-emerald-700 to-teal-800 text-white flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-emerald-300" />
          <h2 id="parser-modal-title" className="text-xl font-bold">
            Paste & Parse Prescription
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close prescription parser"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 max-h-[75vh] overflow-y-auto space-y-5">
        <div>
          <label htmlFor="prescription-text-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Paste Prescription Text or Doctor Notes
          </label>
          <textarea
            id="prescription-text-input"
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g.&#10;Tab Glycomet GP 2 - 1 OD&#10;Tab Telma 40 - 1 OD&#10;Tab Atorva 20 - 1 HS"
            className="w-full p-4 text-sm text-slate-800 bg-slate-50 border border-slate-300 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            autoCorrect="off"
            spellCheck="false"
          />
        </div>

        {/* Preset Sample Quick Buttons */}
        <div>
          <span className="text-xs font-semibold text-slate-500 block mb-2">
            Or try a sample chronic prescription:
          </span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_PRESCRIPTIONS.map((preset) => (
              <button
                key={preset.title}
                type="button"
                onClick={() => setText(preset.text)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                {preset.title}
              </button>
            ))}
          </div>
        </div>

        {/* Matched Medicines Preview */}
        {parsed.length > 0 && (
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
              <span className="flex items-center space-x-1">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Found {parsed.length} Recognized Medicine{parsed.length === 1 ? '' : 's'}</span>
              </span>
              <span>Ready to compare</span>
            </div>

            <div className="space-y-2">
              {parsed.map((med) => (
                <div
                  key={med.id}
                  className="p-2.5 rounded-xl bg-white border border-emerald-100 flex items-center justify-between text-xs"
                >
                  <div>
                    <strong className="text-slate-900">{med.name}</strong>
                    <p className="text-slate-500 text-[11px]">{med.composition_summary}</p>
                  </div>
                  <span className="font-bold text-slate-800">₹{med.price_inr}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleImport}
              className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all min-h-[44px]"
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
