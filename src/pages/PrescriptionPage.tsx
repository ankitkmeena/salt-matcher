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
  X,
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

    // Create preview
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
      console.error('OCR processing error:', err);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 flex flex-col gap-14 sm:gap-20">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#183b28] bg-[#eef5f1] px-4 py-1.5 rounded-full shadow-2xs">
          Smart Rx Text & Photo OCR
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
          Prescription Scanner & Molecule Matcher
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-[62ch]">
          Upload a photo of your doctor&apos;s slip, capture with camera, or paste clinical notes. Our on-device OCR engine extracts the active salts and matches generic equivalents.
        </p>

        {/* 100% Privacy Badge */}
        <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 bg-white/80 px-3.5 py-1.5 rounded-full shadow-2xs">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>100% On-Device OCR • No patient images uploaded to any server</span>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Upload & Text Input (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Dual Action Upload Card */}
          <div className="p-8 sm:p-10 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] flex flex-col gap-6">
            <h3 className="text-base font-bold text-slate-900 flex items-center justify-between">
              <span>Step 1: Upload Prescription Image or Photo</span>
              {previewImage && (
                <button
                  type="button"
                  onClick={() => {
                    setPreviewImage(null);
                    setOcrError(null);
                  }}
                  className="text-xs text-rose-600 hover:underline font-semibold flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" /> Remove Image
                </button>
              )}
            </h3>

            {/* Hidden file inputs */}
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

            {/* Drag & Drop Zone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="p-6 sm:p-8 rounded-3xl border-2 border-dashed border-slate-200 hover:border-[#183b28] bg-[#f8f9fa] transition-colors flex flex-col items-center justify-center text-center gap-4 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {previewImage ? (
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={previewImage}
                    alt="Prescription Preview"
                    className="max-h-48 rounded-2xl object-contain shadow-xs border border-slate-200"
                  />
                  <p className="text-xs font-semibold text-slate-600">Click to choose a different photo</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-white text-[#183b28] flex items-center justify-center shadow-xs">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">
                      Drop prescription photo here, or <span className="text-[#183b28] underline">browse files</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">Supports PNG, JPG, JPEG, WEBP</p>
                  </div>
                </div>
              )}
            </div>

            {/* Camera Quick Button (Mobile & Desktop) */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="flex-1 py-3 rounded-full bg-[#f3f4f1] hover:bg-[#eef5f1] hover:text-[#183b28] text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4 text-[#183b28]" /> Take Photo with Camera
              </button>
            </div>

            {/* OCR Live Progress Bar */}
            {isOcrProcessing && (
              <div className="p-4 rounded-2xl bg-[#eef5f1] text-[#183b28] flex flex-col gap-2 transition-all">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#183b28]" />
                    {ocrProgress?.status || 'Analyzing prescription image...'}
                  </span>
                  <span>{ocrProgress?.progress || 10}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-emerald-100 overflow-hidden">
                  <div
                    className="h-full bg-[#183b28] transition-all duration-300"
                    style={{ width: `${ocrProgress?.progress || 10}%` }}
                  />
                </div>
              </div>
            )}

            {ocrError && (
              <div className="p-4 rounded-2xl bg-rose-50 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{ocrError}</span>
              </div>
            )}

            {/* Textarea for Direct Editing or Manual Input */}
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label htmlFor="rx-text" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#183b28]" />
                  Extracted / Manual Prescription Text
                </label>
                {text && (
                  <button
                    type="button"
                    onClick={() => {
                      setText('');
                      setDetectedMedicines([]);
                      setHasParsed(false);
                      setPreviewImage(null);
                    }}
                    className="text-xs text-slate-400 hover:text-slate-700 font-medium"
                  >
                    Clear text
                  </button>
                )}
              </div>

              <textarea
                id="rx-text"
                rows={5}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Or paste prescription text directly (e.g. Tab Augmentin 625, Glycomet GP2, Telma 40)..."
                className="w-full p-4 rounded-2xl bg-[#f8f9fa] border-none text-slate-900 placeholder-slate-400 font-mono text-xs sm:text-sm leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-[#183b28]"
              />

              <button
                type="button"
                onClick={() => handleParse()}
                disabled={!text.trim() || isOcrProcessing}
                className="w-full mt-2 py-3.5 rounded-full bg-[#183b28] hover:bg-[#122e1f] disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs sm:text-sm transition-all active:scale-98 flex items-center justify-center gap-2 shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                Extract Molecules & Match Generics
              </button>
            </div>
          </div>

          {/* Sample Presets */}
          <div className="p-7 sm:p-8 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Or Try A Realistic Clinical Prescription Sample
            </span>
            <div className="flex flex-wrap gap-2.5">
              {SAMPLE_PRESCRIPTIONS.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplySample(sample.text)}
                  className="px-4 py-2 rounded-full bg-[#f3f4f1] hover:bg-[#eef5f1] hover:text-[#183b28] text-xs font-semibold text-slate-700 transition-colors"
                >
                  {sample.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Parsed Results (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {!hasParsed ? (
            <div className="p-10 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] text-center flex flex-col items-center justify-center gap-4 min-h-[420px]">
              <div className="w-16 h-16 rounded-3xl bg-[#f8f9fa] text-slate-400 flex items-center justify-center">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">No Prescription Scanned Yet</h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xs leading-relaxed">
                Take a photo of your prescription slip on the left, drop an image, or click a sample to see matched generic alternatives.
              </p>
            </div>
          ) : detectedMedicines.length === 0 ? (
            <div className="p-10 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] text-center flex flex-col items-center justify-center gap-4 min-h-[420px]">
              <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">No Matching Formulations Recognized</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xs leading-relaxed">
                We couldn&apos;t match any medicine names in the extracted text. If the handwriting was unclear, you can edit the text box on the left with the brand names directly.
              </p>
            </div>
          ) : (
            <div className="p-8 sm:p-10 rounded-[32px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.02)] flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Extracted Formulations</span>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {detectedMedicines.length} Medicine{detectedMedicines.length === 1 ? '' : 's'} Matched
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#183b28] bg-[#eef5f1] px-3 py-1 rounded-full">
                  100% Bioequivalent
                </span>
              </div>

              {/* Matched list */}
              <div className="flex flex-col gap-3 max-h-[440px] overflow-y-auto pr-1">
                {detectedMedicines.map((med) => {
                  const comp = findAlternatives(med, SEED_MEDICINES);
                  const bestAlt = comp.alternatives[0]?.medicine;
                  const savingsPct = comp.max_savings_percentage;

                  return (
                    <div
                      key={med.id}
                      className="p-4 rounded-2xl bg-[#f8f9fa] flex flex-col gap-2.5 transition-all hover:bg-[#f3f4f1]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{med.name}</h4>
                          <p className="text-xs text-slate-400 font-mono mt-0.5">{med.composition_summary}</p>
                        </div>
                        <span className="text-xs font-bold text-slate-500 shrink-0">₹{med.price_inr.toFixed(2)}</span>
                      </div>

                      {bestAlt && (
                        <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Jan Aushadhi: ₹{bestAlt.price_inr.toFixed(2)}</span>
                          </div>
                          <span className="font-bold text-[#183b28] bg-[#eef5f1] px-2 py-0.5 rounded-full text-[11px]">
                            Save {savingsPct}%
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleAddAll}
                  disabled={addedAll}
                  className="w-full py-3.5 rounded-full bg-[#183b28] hover:bg-[#122e1f] disabled:bg-[#eef5f1] disabled:text-[#183b28] text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  {addedAll ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" /> All Medicines Added to Slip
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
                  className="w-full py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  Go to Family Savings Ledger <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
