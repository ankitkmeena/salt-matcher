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
    heroTag: 'Indian Generic Bioequivalence Network',
    heroTitle: 'Save up to 85% on your monthly family medications',
    heroSubtitle: 'Find chemically identical Jan Aushadhi generic substitutes for branded prescriptions with 100% verified salt bioequivalence.',
    searchPlaceholder: 'Search by brand (e.g. Augmentin, Lipitor, Telma) or active salt...',
    allCategories: 'All Categories',

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

    // Card Details
    regulatoryDetails: 'Regulatory & Manufacturer Details',
    manufacturer: 'Manufacturer',
    pmbiCode: 'Govt PMBI Code',
    certification: 'Certification',
    dpcoCeiling: 'NPPA DPCO Ceiling',
    save: 'Save',
    addToBasket: 'Add to Slip',
    inBasket: 'Added',

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
    annualSavings: 'Projected Annual Savings'
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
    heroTag: 'भारतीय जेनेरिक समतुल्यता नेटवर्क',
    heroTitle: 'अपनी मासिक दवाइयों पर 85% तक की बचत करें',
    heroSubtitle: 'ब्रांडेड दवाइयों के बदले 100% समान सक्रिय साल्ट वाली सरकारी जन औषधि जेनेरिक दवाइयां आसानी से खोजें।',
    searchPlaceholder: 'ब्रांड नाम (जैसे Augmentin, Telma, Lipitor) या साल्ट खोजें...',
    allCategories: 'सभी श्रेणियां',

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

    // Card Details
    regulatoryDetails: 'विनियामक व निर्माता विवरण',
    manufacturer: 'निर्माता कंपनी',
    pmbiCode: 'सरकारी PMBI कोड',
    certification: 'प्रमाणीकरण',
    dpcoCeiling: 'सरकारी अधिकतम मूल्य सीमा (DPCO)',
    save: 'बचत',
    addToBasket: 'पर्ची में जोड़ें',
    inBasket: 'जोड़ा गया',

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
    annualSavings: 'वार्षिक अनुमानित बचत'
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
