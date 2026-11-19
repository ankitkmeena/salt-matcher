import { useState, useEffect } from 'react';

/**
 * Lightweight Zero-Dependency Internationalization Dictionary (i18n)
 * Supports English and Hindi (हिन्दी) for Indian patients, elders, and caregivers.
 */

export type Language = 'en' | 'hi';

export const TRANSLATIONS = {
  en: {
    // Navigation
    searchSalts: 'Search Salts',
    prescriptionParser: 'Prescription Parser',
    savingsSlip: 'Savings Slip',
    findKendras: 'Find Kendras',
    bioequivalence: 'Bioequivalence',
    faq: 'FAQ',
    scanRx: 'Scan Rx',

    // Hero & Home
    heroTag: "India's Independent Chemical Salt Matcher",
    heroTitle: 'Identical active molecules.',
    heroTitleHighlight: 'A fraction of the branded price.',
    heroSubtitle: 'Chronic patients and families spend thousands every month on branded medications that have identical CDSCO-certified generic equivalents. Find verified Jan Aushadhi and generic substitutes instantly.',
    searchPlaceholder: 'Search by brand (e.g. Augmentin, Glycomet, Telma) or active salt...',
    allCategories: 'All Categories',
    popularSearches: 'Popular Searches',
    compareAndSave: 'Compare & Save',
    auditBill: 'Audit Chemist Bill',
    auditBillDesc: 'Check your pharmacy receipt for illegal DPCO overcharging',

    // Medicines Catalog
    allFormulations: 'All Formulations',
    verifiedFormulations: 'verified pharmaceutical formulations',
    resetFilters: 'Reset All Filters',
    onlyGovtGenerics: 'Govt Jan Aushadhi Only',
    compare: 'Compare',
    compareAction: 'Compare Alternatives',
    noMedsFound: 'No matching medicines found',
    noMedsDesc: 'Try searching for the active salt name (e.g. "Metformin", "Amoxicillin") or explore one of the condition categories.',

    // Categories
    catAll: 'All',
    catDiabetes: 'Diabetes',
    catHypertension: 'Hypertension & Heart',
    catCardiovascular: 'Cardiovascular',
    catGastrointestinal: 'Gastrointestinal',
    catAntibiotic: 'Antibiotic',
    catThyroid: 'Thyroid',
    catPain: 'Pain & Analgesic',
    catRespiratory: 'Respiratory & Allergy',
    catOncology: 'Oncology',
    catNephrology: 'Nephrology',
    catNeurology: 'Neurology & Mental Health',

    // Stores Page
    kendraNetwork: 'Government Jan Aushadhi Network',
    findKendrasTitle: 'Find Jan Aushadhi Kendra Stores',
    kendraSubtitle: 'Access the full national directory of 21,663 Pradhan Mantri Bhartiya Janaushadhi Kendras across India.',
    pincodePlaceholder: 'Search by 6-digit Pincode (e.g. 110029, 400028), City, or Landmark...',
    nearMe: 'Near Me',
    callStore: 'Call Store',
    whatsappEnquiry: 'WhatsApp',
    getDirections: 'Get Directions on Maps',
    genuineSupply: '100% Genuine PMBI Supply',
    storesFound: 'Kendras Found',
    noStoresFound: 'No Jan Aushadhi Kendras found matching',

    // Card Details
    regulatoryDetails: 'Regulatory & Manufacturer Details',
    manufacturer: 'Manufacturer',
    pmbiCode: 'Govt PMBI Code',
    certification: 'Certification',
    dpcoCeiling: 'NPPA DPCO Ceiling',
    save: 'Save',
    addToBasket: 'Add to Slip',
    inBasket: 'Added to Slip',
    viewDetails: 'View pharmacology & instructions',
    strengths: 'Strengths',

    // Savings Page
    familyLedger: 'Family Healthcare Ledger',
    slipTitle: 'Prescription Transition Slip',
    clearSlip: 'Clear Slip',
    shareSavings: 'Share Savings',
    printSlip: 'Print Slip',
    downloadPdf: 'Download PDF Slip',
    currentSpend: 'Current Branded Spend',
    genericSpend: 'Jan Aushadhi Generic Spend',
    monthlySavings: 'Monthly Family Savings',
    annualSavings: 'Projected Annual Savings',
    saveSlip: 'Save Slip',
    savedSlips: 'Saved Slips',
    noSavedSlips: 'No saved consultation slips yet.',
    ddiAlertTitle: 'Clinical Drug-Drug Interaction Safety Alert',
  },
  hi: {
    // Navigation
    searchSalts: 'दवा व साल्ट खोजें',
    prescriptionParser: 'पर्चा स्कैनर (OCR)',
    savingsSlip: 'बचत पर्ची',
    findKendras: 'जन औषधि केंद्र खोजें',
    bioequivalence: 'जेनेरिक विज्ञान',
    faq: 'अक्सर पूछे जाने वाले सवाल',
    scanRx: 'पर्चा स्कैन करें',

    // Hero & Home
    heroTag: 'भारत का स्वतंत्र केमिकल साल्ट विश्लेषक',
    heroTitle: 'समान सक्रिय रासायनिक तत्व।',
    heroTitleHighlight: 'ब्रांडेड दवाइयों से 85% तक कम कीमत पर।',
    heroSubtitle: 'क्रोनिक मरीज और परिवार हर महीने ब्रांडेड दवाइयों पर हजारों रुपये खर्च करते हैं, जिनका समान सरकारी व जेनेरिक विकल्प मौजूद है। प्रमाणित जन औषधि व जेनेरिक विकल्प तुरंत खोजें।',
    searchPlaceholder: 'ब्रांड नाम (जैसे Augmentin, Telma, Lipitor) या साल्ट खोजें...',
    allCategories: 'सभी श्रेणियां',
    popularSearches: 'लोकप्रिय खोजें',
    compareAndSave: 'तुलना करें व बचाएं',
    auditBill: 'दवा बिल जांचें',
    auditBillDesc: 'देखें कि क्या मेडिकल स्टोर ने सरकारी मूल्य से अधिक तो नहीं वसूला',

    // Medicines Catalog
    allFormulations: 'सभी दवाइयां',
    verifiedFormulations: 'प्रमाणित दवा फॉर्मूलेशन उपलब्ध',
    resetFilters: 'सारे फ़िल्टर हटाएं',
    onlyGovtGenerics: 'केवल सरकारी जन औषधि',
    compare: 'तुलना करें',
    compareAction: 'सस्ते विकल्प देखें',
    noMedsFound: 'कोई दवा नहीं मिली',
    noMedsDesc: 'कृपया सक्रिय साल्ट नाम (जैसे "Metformin", "Amoxicillin") से खोजें या ऊपर दी गई बीमारी की श्रेणी चुनें।',

    // Categories
    catAll: 'सभी',
    catDiabetes: 'मधुमेह (शुगर)',
    catHypertension: 'ब्लड प्रेशर व दिल',
    catCardiovascular: 'हृदय रोग (कार्डियो)',
    catGastrointestinal: 'पेट व गैस (गैस्ट्रो)',
    catAntibiotic: 'एंटीबायोटिक',
    catThyroid: 'थायराइड',
    catPain: 'दर्द व सूजन निवारक',
    catRespiratory: 'सांस व एलर्जी',
    catOncology: 'कैंसर (ऑन्कोलॉजी)',
    catNephrology: 'गुर्दे की बीमारी (नेफ्रोलॉजी)',
    catNeurology: 'न्यूरो व मानसिक स्वास्थ्य',

    // Stores Page
    kendraNetwork: 'सरकारी जन औषधि नेटवर्क',
    findKendrasTitle: 'नजदीकी जन औषधि केंद्र खोजें',
    kendraSubtitle: 'भारत भर के 21,663 से अधिक प्रधानमंत्री भारतीय जन औषधि केंद्रों की आधिकारिक सूची से नजदीकी दुकान देखें।',
    pincodePlaceholder: '6-अंकीय पिनकोड (जैसे 110029, 302001) या शहर दर्ज करें...',
    nearMe: 'मेरे निकट',
    callStore: 'कॉल करें',
    whatsappEnquiry: 'व्हाट्सएप',
    getDirections: 'गूगल मैप्स दिशा-निर्देश',
    genuineSupply: '100% प्रामाणिक PMBI आपूर्ति',
    storesFound: 'केंद्र मिले',
    noStoresFound: 'इस खोज के लिए कोई जन औषधि केंद्र नहीं मिला',

    // Card Details
    regulatoryDetails: 'विनियामक व निर्माता विवरण',
    manufacturer: 'निर्माता कंपनी',
    pmbiCode: 'सरकारी PMBI कोड',
    certification: 'प्रमाणीकरण',
    dpcoCeiling: 'सरकारी अधिकतम मूल्य सीमा (DPCO)',
    save: 'बचत',
    addToBasket: 'पर्ची में जोड़ें',
    inBasket: 'पर्ची में जोड़ा गया',
    viewDetails: 'दवा के प्रभाव व खुराक नियम देखें',
    strengths: 'उपलब्ध ताकत (डोज़)',

    // Savings Page
    familyLedger: 'पारिवारिक स्वास्थ्य बचत लेज़र',
    slipTitle: 'दवा परिवर्तन परामर्श पर्ची',
    clearSlip: 'पर्ची साफ करें',
    shareSavings: 'बचत साझा करें',
    printSlip: 'पर्ची प्रिंट करें',
    downloadPdf: 'PDF डाउनलोड करें',
    currentSpend: 'ब्रांडेड दवा का मासिक खर्च',
    genericSpend: 'जन औषधि जेनेरिक का खर्च',
    monthlySavings: 'मासिक पारिवारिक बचत',
    annualSavings: 'वार्षिक अनुमानित बचत',
    saveSlip: 'पर्ची सेव करें',
    savedSlips: 'पिछली पर्चियां',
    noSavedSlips: 'अभी तक कोई पर्ची सेव नहीं है।',
    ddiAlertTitle: 'नैदानिक दवा परस्पर क्रिया (DDI) सुरक्षा चेतावनी',
  }
};

const LANG_KEY = 'saltmatch_preferred_lang';

export function getSavedLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const saved = localStorage.getItem(LANG_KEY);
  return (saved === 'hi' || saved === 'en') ? saved : 'en';
}

export function saveLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LANG_KEY, lang);
}

/**
 * React hook to reactively consume language state and translations
 */
export function useTranslation() {
  const [lang, setLang] = useState<Language>(getSavedLanguage);

  useEffect(() => {
    const handleLangChange = () => {
      setLang(getSavedLanguage());
    };
    window.addEventListener('languagechange', handleLangChange);
    return () => window.removeEventListener('languagechange', handleLangChange);
  }, []);

  const changeLanguage = (newLang: Language) => {
    saveLanguage(newLang);
    setLang(newLang);
    window.dispatchEvent(new Event('languagechange'));
  };

  return {
    lang,
    t: TRANSLATIONS[lang],
    setLanguage: changeLanguage
  };
}
