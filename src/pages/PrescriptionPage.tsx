import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Sparkles,
  Check,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  ShoppingBag,
  Camera,
  UploadCloud,
  Loader2,
  Lock,
} from 'lucide-react';
import { SEED_MEDICINES } from '../data/seedData';
import { Medicine } from '../types/medicine';
import { parsePrescriptionText, findAlternatives } from '../utils/matcher';
import { recognizePrescriptionImage, OcrProgress } from '../utils/ocrService';
import { useBasket } from '../context/BasketContext';

const SAMPLE_PRESCRIPTIONS = [
  {
    title: 'Diabetes & Hypertension',
    text: `Rx:
1. Glycomet-GP 2 Forte tab - 1 tab daily before breakfast
2. Telma 40 mg tab - 1 tab daily morning
3. Atorva 20 mg - 1 tab at bedtime
4. Pantocid 40 mg - 1 tab before breakfast`,
  },
  {
    title: 'Post-Op Antibiotic & Pain',
    text: `Rx:
1. Augmentin 625 Duo - 1 tab twice daily for 5 days
2. Zerodol-SP tab - 1 tab twice daily after meals
3. Pan 40 tab - 1 tab OD empty stomach`,
  },
  {
    title: 'Chronic Cardiac & Statin',
    text: `Rx:
1. Rosuvas 10 mg - 1 tab HS
2. Concor 5 mg - 1 tab morning
3. Ecosprin 75 mg - 1 tab post lunch`,
  },
];

export const PrescriptionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'text'>('upload');
  const [text, setText] = useState('');
  const [detectedMedicines, setDetectedMedicines] = useState<Medicine[]>([]);
  const [hasParsed, setHasParsed] = useState(false);
  const [addedAll, setAddedAll] = useState(false);

  // OCR state
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const [ocrProgress, setOcrProgress] = useState<OcrProgress | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [ocrError, setOcrError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const { importMedicines } = useBasket();
  const navigate = useNavigate();

  const handleParse = (inputText: string = text) => {
    const found = parsePrescriptionText(inputText, SEED_MEDICINES);
    setDetectedMedicines(found);
    setHasParsed(true);
    setAddedAll(false);
  };

  const handleApplySample = (sampleText: string) => {
    setText(sampleText);
    setActiveTab('text');
    setPreviewImage(null);
    handleParse(sampleText);
  };

  const handleAddAll = () => {
    if (detectedMedicines.length > 0) {
      importMedicines(detectedMedicines);
      setAddedAll(true);
    }
  };

  const processImageFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setOcrError('Please upload a valid image file (PNG, JPG, or WEBP).');
      return;
    }

    setOcrError(null);
    setIsOcrProcessing(true);

    const reader = new FileReader();
    reader.onload = (e) => setPreviewImage(e.target?.result as string);
    reader.readAsDataURL(file);

    try {
      const extracted = await recognizePrescriptionImage(file, (p) => {
        setOcrProgress(p);
      });

      if (!extracted.trim()) {
        setOcrError('Could not detect readable text in the image. Try typing the medicine names or take a clearer photo.');
      } else {
        setText(extracted);
        handleParse(extracted);
      }
    } catch (err: unknown) {
      console.error('OCR error:', err);
      const errMsg = err instanceof Error ? err.message : 'Unknown OCR error';
      setOcrError(`Failed to process image: ${errMsg}`);
    } finally {
      setIsOcrProcessing(false);
      setOcrProgress(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-14 flex flex-col gap-10 sm:gap-14">
      {/* Quiet Editorial Header */}
      <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          Prescription Molecule Scanner
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Upload your doctor&apos;s slip or paste text to match exact bioequivalent generic equivalents.
        </p>

        <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 bg-white px-3 py-1 rounded-full shadow-2xs mt-1">
          <Lock className="w-3 h-3 text-emerald-600" />
          <span>100% On-Device OCR • No patient photos saved or uploaded</span>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Focused Segmented Input Workspace (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Segmented Mode Toggle */}
          <div className="flex items-center p-1 rounded-full bg-[#f3f4f1] w-fit mx-auto sm:mx-0">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'upload'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              📷 Photo / Image Upload
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('text')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'text'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              ✍️ Paste Prescription Text
            </button>
          </div>

          <div className="p-7 sm:p-8 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] flex flex-col gap-5">
            {activeTab === 'upload' ? (
              /* TAB 1: Clean Photo Upload */
              <div className="flex flex-col gap-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="p-8 rounded-3xl border-2 border-dashed border-slate-200 hover:border-[#183b28] bg-[#f8f9fa] transition-colors flex flex-col items-center justify-center text-center gap-3 cursor-pointer min-h-[220px]"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {previewImage ? (
                    <div className="flex flex-col items-center gap-2">
                      <img
                        src={previewImage}
                        alt="Prescription Preview"
                        className="max-h-40 rounded-xl object-contain shadow-xs border border-slate-200"
                      />
                      <span className="text-xs text-slate-500 font-semibold underline">Click to choose another photo</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2.5">
                      <div className="w-12 h-12 rounded-2xl bg-white text-[#183b28] flex items-center justify-center shadow-2xs">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <p className="font-bold text-slate-800 text-sm">
                        Drop prescription photo here, or <span className="text-[#183b28] underline">browse files</span>
                      </p>
                      <p className="text-[11px] text-slate-400">Supports PNG, JPG, JPEG, WEBP</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    className="flex-1 py-2.5 rounded-full bg-[#f3f4f1] hover:bg-[#eef5f1] hover:text-[#183b28] text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Camera className="w-4 h-4 text-[#183b28]" /> Snap with Camera
                  </button>
                  {previewImage && (
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage(null);
                        setOcrError(null);
                      }}
                      className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-500 text-xs font-semibold"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {isOcrProcessing && (
                  <div className="p-3.5 rounded-2xl bg-[#eef5f1] text-[#183b28] flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#183b28]" />
                        {ocrProgress?.status || 'Analyzing prescription image...'}
                      </span>
                      <span>{ocrProgress?.progress || 10}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-emerald-100 overflow-hidden">
                      <div
                        className="h-full bg-[#183b28] transition-all duration-300"
                        style={{ width: `${ocrProgress?.progress || 10}%` }}
                      />
                    </div>
                  </div>
                )}

                {ocrError && (
                  <div className="p-3.5 rounded-2xl bg-rose-50 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{ocrError}</span>
                  </div>
                )}
              </div>
            ) : (
              /* TAB 2: Clean Text Area */
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="rx-text" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#183b28]" />
                    Prescription Text
                  </label>
                  {text && (
                    <button
                      type="button"
                      onClick={() => {
                        setText('');
                        setDetectedMedicines([]);
                        setHasParsed(false);
                      }}
                      className="text-xs text-slate-400 hover:text-slate-700"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <textarea
                  id="rx-text"
                  rows={6}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste prescription lines (e.g. Tab Augmentin 625 Duo, Glycomet GP2, Telma 40)..."
                  className="w-full p-4 rounded-2xl bg-[#f8f9fa] border-none text-slate-900 placeholder-slate-400 font-mono text-xs leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-[#183b28]"
                />

                <button
                  type="button"
                  onClick={() => handleParse()}
                  disabled={!text.trim() || isOcrProcessing}
                  className="w-full py-3 rounded-full bg-[#183b28] hover:bg-[#122e1f] disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                  Extract & Match Formulations
                </button>
              </div>
            )}
          </div>

          {/* Quick Presets Strip */}
          <div className="p-5 rounded-2xl bg-[#f8f9fa] flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="text-slate-400 font-medium">Or test sample:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {SAMPLE_PRESCRIPTIONS.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplySample(sample.text)}
                  className="px-3 py-1 rounded-full bg-white hover:bg-[#eef5f1] hover:text-[#183b28] text-slate-600 font-medium transition-colors shadow-2xs text-[11px]"
                >
                  {sample.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Parsed Results (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {!hasParsed ? (
            <div className="p-8 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] text-center flex flex-col items-center justify-center gap-3 min-h-[340px]">
              <div className="w-12 h-12 rounded-2xl bg-[#f8f9fa] text-slate-400 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Awaiting Prescription</h3>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Choose a photo on the left or paste text to view matched Jan Aushadhi generic substitutes.
              </p>
            </div>
          ) : detectedMedicines.length === 0 ? (
            <div className="p-8 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] text-center flex flex-col items-center justify-center gap-3 min-h-[340px]">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">No Matching Formulations Found</h3>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Could not detect recognized medicines. Switch to &apos;Paste Text&apos; to enter brand names like &quot;Augmentin&quot; or &quot;Telma&quot;.
              </p>
            </div>
          ) : (
            <div className="p-7 sm:p-8 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Match Results</span>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    {detectedMedicines.length} Medicine{detectedMedicines.length === 1 ? '' : 's'} Detected
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#183b28] bg-[#eef5f1] px-3 py-1 rounded-full">
                  100% Bioequivalent
                </span>
              </div>

              {/* Matched list */}
              <div className="flex flex-col gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                {detectedMedicines.map((med) => {
                  const comp = findAlternatives(med, SEED_MEDICINES);
                  const bestAlt = comp.alternatives[0]?.medicine;
                  const savingsPct = comp.max_savings_percentage;

                  return (
                    <div
                      key={med.id}
                      className="p-3.5 rounded-2xl bg-[#f8f9fa] flex flex-col gap-2 transition-all hover:bg-[#f3f4f1]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{med.name}</h4>
                          <p className="text-[11px] text-slate-400 font-mono mt-0.5">{med.composition_summary}</p>
                        </div>
                        <span className="text-xs font-bold text-slate-500 shrink-0">₹{med.price_inr.toFixed(2)}</span>
                      </div>

                      {bestAlt && (
                        <div className="pt-2 border-t border-slate-200/50 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 text-emerald-800 font-medium text-[11px]">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Jan Aushadhi: ₹{bestAlt.price_inr.toFixed(2)}</span>
                          </div>
                          <span className="font-bold text-[#183b28] bg-[#eef5f1] px-2 py-0.5 rounded-full text-[10px]">
                            Save {savingsPct}%
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleAddAll}
                  disabled={addedAll}
                  className="w-full py-3 rounded-full bg-[#183b28] hover:bg-[#122e1f] disabled:bg-[#eef5f1] disabled:text-[#183b28] text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  {addedAll ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" /> Added to Transition Slip
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-emerald-300" /> Add All to Savings Slip
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/savings')}
                  className="w-full py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  Go to Savings Ledger <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
