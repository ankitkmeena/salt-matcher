/**
 * Comprehensive Drug-Drug, Drug-Food, and Clinical Interaction Matrix
 * Clinically referenced against CDSCO, WHO, British National Formulary (BNF), and FDA.
 */

export type InteractionSeverity = 'severe' | 'moderate' | 'mild';

export interface DrugInteractionRule {
  id: string;
  salt_a: string;
  salt_b: string;
  severity: InteractionSeverity;
  clinical_effect: string;
  physician_recommendation: string;
  category: 'drug-drug' | 'drug-food' | 'drug-alcohol';
}

export interface DetectedInteraction {
  id: string;
  medicine_a_name: string;
  medicine_b_name: string;
  severity: InteractionSeverity;
  clinical_effect: string;
  recommendation: string;
  category: 'drug-drug' | 'drug-food' | 'drug-alcohol';
}

export const DDI_RULES: DrugInteractionRule[] = [
  // --- CARDIOLOGY & HYPERTENSION ---
  {
    id: 'ddi-c01',
    salt_a: 'Atorvastatin',
    salt_b: 'Amlodipine',
    severity: 'mild',
    category: 'drug-drug',
    clinical_effect: 'Amlodipine mildly elevates plasma concentrations of Atorvastatin, increasing potential risk of muscle aching.',
    physician_recommendation: 'Safe and widely co-prescribed. Doctor may limit Atorvastatin dose and advise reporting persistent muscle soreness.'
  },
  {
    id: 'ddi-c02',
    salt_a: 'Amlodipine',
    salt_b: 'Simvastatin',
    severity: 'moderate',
    category: 'drug-drug',
    clinical_effect: 'Amlodipine inhibits CYP3A4, causing 1.5x to 2x elevation in Simvastatin levels with high rhabdomyolysis risk.',
    physician_recommendation: 'CDSCO and FDA guidelines recommend limiting Simvastatin to a maximum of 20mg daily when taken with Amlodipine.'
  },
  {
    id: 'ddi-c03',
    salt_a: 'Telmisartan',
    salt_b: 'Spironolactone',
    severity: 'severe',
    category: 'drug-drug',
    clinical_effect: 'Dual blockade with potassium-sparing diuretics may induce acute hyperkalemia (dangerously high blood potassium).',
    physician_recommendation: 'Requires routine serum potassium and serum creatinine laboratory monitoring every 4-6 weeks.'
  },
  {
    id: 'ddi-c04',
    salt_a: 'Atenolol',
    salt_b: 'Verapamil',
    severity: 'severe',
    category: 'drug-drug',
    clinical_effect: 'Severe additive negative inotropic and chronotropic effects, potentially leading to profound bradycardia or heart block.',
    physician_recommendation: 'Combination is contraindicated without inpatient electrophysiological monitoring.'
  },
  {
    id: 'ddi-c05',
    salt_a: 'Digoxin',
    salt_b: 'Amiodarone',
    severity: 'severe',
    category: 'drug-drug',
    clinical_effect: 'Amiodarone reduces renal and non-renal clearance of Digoxin, doubling serum Digoxin concentrations and inducing fatal arrhythmias.',
    physician_recommendation: 'Reduce Digoxin maintenance dose by 50% upon starting Amiodarone and check trough serum Digoxin levels.'
  },
  {
    id: 'ddi-c06',
    salt_a: 'Clopidogrel',
    salt_b: 'Omeprazole',
    severity: 'moderate',
    category: 'drug-drug',
    clinical_effect: 'Omeprazole inhibits CYP2C19, blocking the bio-activation of Clopidogrel into its antiplatelet form and increasing thrombosis risk.',
    physician_recommendation: 'Switch gastro-protection to Pantoprazole or Rabeprazole, which exhibit negligible CYP2C19 inhibition.'
  },

  // --- ANTICOAGULATION & HEMATOLOGY ---
  {
    id: 'ddi-a01',
    salt_a: 'Warfarin',
    salt_b: 'Aspirin',
    severity: 'severe',
    category: 'drug-drug',
    clinical_effect: 'Concurrent antiplatelet and anticoagulant action drastically elevates major gastrointestinal and cerebral bleeding risk.',
    physician_recommendation: 'Must be explicitly authorized by cardiologist/neurologist. Frequent INR testing and mandatory PPI co-prescription.'
  },
  {
    id: 'ddi-a02',
    salt_a: 'Warfarin',
    salt_b: 'Paracetamol',
    severity: 'moderate',
    category: 'drug-drug',
    clinical_effect: 'Frequent Paracetamol intake (>2g/day for >3 days) inhibits vitamin K clotting factor synthesis, raising INR.',
    physician_recommendation: 'Check INR if taking Paracetamol regularly. Prefer lower doses (<1.5g daily) for occasional fever/pain.'
  },
  {
    id: 'ddi-a03',
    salt_a: 'Warfarin',
    salt_b: 'Ciprofloxacin',
    severity: 'severe',
    category: 'drug-drug',
    clinical_effect: 'Fluoroquinolones suppress gut flora synthesizing vitamin K and inhibit CYP1A2, triggering dangerous INR spikes.',
    physician_recommendation: 'Test INR within 3 days of starting antibiotic; temporary Warfarin dose reduction usually required.'
  },

  // --- DIABETES & METABOLIC ---
  {
    id: 'ddi-d01',
    salt_a: 'Metformin',
    salt_b: 'Alcohol',
    severity: 'severe',
    category: 'drug-alcohol',
    clinical_effect: 'Alcohol exacerbates Metformin inhibition of hepatic lactate uptake, creating a high risk of fatal lactic acidosis.',
    physician_recommendation: 'Strictly avoid binge alcohol consumption or chronic heavy drinking while on Metformin therapy.'
  },
  {
    id: 'ddi-d02',
    salt_a: 'Glimepiride',
    salt_b: 'Fluconazole',
    severity: 'severe',
    category: 'drug-drug',
    clinical_effect: 'Fluconazole strongly inhibits CYP2C9, prolonging Sulfonylurea half-life and causing severe, prolonged hypoglycemia.',
    physician_recommendation: 'Frequent capillary blood glucose monitoring; consider reducing Glimepiride dosage during antifungal therapy.'
  },
  {
    id: 'ddi-d03',
    salt_a: 'Metformin',
    salt_b: 'Cimetidine',
    severity: 'moderate',
    category: 'drug-drug',
    clinical_effect: 'Cimetidine competes for renal tubular organic cation transporters, increasing Metformin blood levels by up to 40%.',
    physician_recommendation: 'Use Ranitidine or Famotidine as an alternative H2 blocker to avoid transporter competition.'
  },

  // --- THYROID & ENDOCRINE ---
  {
    id: 'ddi-t01',
    salt_a: 'Levothyroxine',
    salt_b: 'Calcium Carbonate',
    severity: 'moderate',
    category: 'drug-drug',
    clinical_effect: 'Calcium forms insoluble chelate complexes with Levothyroxine in the gut, cutting thyroid absorption by over 50%.',
    physician_recommendation: 'Strict separation required: take Levothyroxine on an empty stomach upon waking, and Calcium supplements 4 hours later.'
  },
  {
    id: 'ddi-t02',
    salt_a: 'Levothyroxine',
    salt_b: 'Iron Supplements',
    severity: 'moderate',
    category: 'drug-drug',
    clinical_effect: 'Ferrous iron binds Thyroxine in the stomach, creating poor bioavailability and persistent hypothyroidism symptoms.',
    physician_recommendation: 'Maintain a minimum 4-hour window between taking thyroid hormones and oral iron formulations.'
  },
  {
    id: 'ddi-t03',
    salt_a: 'Levothyroxine',
    salt_b: 'Pantoprazole',
    severity: 'mild',
    category: 'drug-drug',
    clinical_effect: 'Reduced stomach acidity impairs optimal dissolution and absorption of thyroid hormone tablets.',
    physician_recommendation: 'Thyroid profile (TSH) should be tested 6-8 weeks after starting or discontinuing prolonged PPI treatment.'
  },

  // --- GASTRO & ANALGESICS ---
  {
    id: 'ddi-g01',
    salt_a: 'Diclofenac',
    salt_b: 'Aspirin',
    severity: 'severe',
    category: 'drug-drug',
    clinical_effect: 'Additive inhibition of COX-1 enzymes leads to high frequency of gastric mucosal ulceration, erosions, and GI bleeding.',
    physician_recommendation: 'Avoid concurrent NSAID usage. If antiplatelet therapy is needed, switch pain management to Paracetamol.'
  },
  {
    id: 'ddi-g02',
    salt_a: 'Ibuprofen',
    salt_b: 'Telmisartan',
    severity: 'moderate',
    category: 'drug-drug',
    clinical_effect: 'NSAIDs block vasodilatory prostaglandins in renal arterioles, attenuating the antihypertensive action of ARBs and risking acute kidney injury.',
    physician_recommendation: 'Limit NSAID duration to under 3-5 days; ensure adequate hydration and monitor blood pressure.'
  },

  // --- PSYCHIATRY & NEUROLOGY ---
  {
    id: 'ddi-p01',
    salt_a: 'Escitalopram',
    salt_b: 'Tramadol',
    severity: 'severe',
    category: 'drug-drug',
    clinical_effect: 'Additive serotonergic elevation can precipitate Serotonin Syndrome (hyperthermia, tremor, clonus, autonomic instability).',
    physician_recommendation: 'Avoid concurrent use. Use alternative non-serotonergic analgesics (e.g. Paracetamol) for acute pain.'
  },
  {
    id: 'ddi-p02',
    salt_a: 'Lithium',
    salt_b: 'Diclofenac',
    severity: 'severe',
    category: 'drug-drug',
    clinical_effect: 'NSAIDs reduce renal prostaglandins and decrease Lithium clearance, quickly inducing toxic serum levels (>1.5 mEq/L).',
    physician_recommendation: 'NSAIDs are contraindicated with Lithium without weekly serum lithium level monitoring and dose reduction.'
  },
  {
    id: 'ddi-p03',
    salt_a: 'Phenytoin',
    salt_b: 'Omeprazole',
    severity: 'moderate',
    category: 'drug-drug',
    clinical_effect: 'Omeprazole decreases the hepatic clearance of Phenytoin via CYP2C19 inhibition, increasing toxicity symptoms (ataxia, nystagmus).',
    physician_recommendation: 'Check serum Phenytoin levels or substitute with a non-interacting PPI such as Pantoprazole.'
  },

  // --- ANTIBIOTICS & INFECTIOUS DISEASE ---
  {
    id: 'ddi-b01',
    salt_a: 'Azithromycin',
    salt_b: 'Atorvastatin',
    severity: 'moderate',
    category: 'drug-drug',
    clinical_effect: 'Macrolides inhibit P-glycoprotein and CYP3A4, causing transient elevations in systemic statin exposure.',
    physician_recommendation: 'Short 3-5 day antibiotic courses are acceptable; report any acute calf or muscular weakness.'
  },
  {
    id: 'ddi-b02',
    salt_a: 'Ciprofloxacin',
    salt_b: 'Antacids',
    severity: 'moderate',
    category: 'drug-drug',
    clinical_effect: 'Magnesium and Aluminum in antacids chelate with Fluoroquinolones, cutting antibacterial blood absorption by 80%.',
    physician_recommendation: 'Take Ciprofloxacin at least 2 hours before or 4 hours after taking antacid or sucralfate suspensions.'
  },
  {
    id: 'ddi-b03',
    salt_a: 'Metronidazole',
    salt_b: 'Alcohol',
    severity: 'severe',
    category: 'drug-alcohol',
    clinical_effect: 'Disulfiram-like reaction causing severe nausea, vomiting, facial flushing, tachycardia, and hypotension.',
    physician_recommendation: 'Zero alcohol consumption permitted during Metronidazole course and for 48 hours following completion.'
  }
];

function normalizeName(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function checkDrugInteractions(
  medicines: { id: number; name: string; composition_summary: string }[]
): DetectedInteraction[] {
  const detected: DetectedInteraction[] = [];
  if (medicines.length < 2) return detected;

  for (let i = 0; i < medicines.length; i++) {
    for (let j = i + 1; j < medicines.length; j++) {
      const medA = medicines[i];
      const medB = medicines[j];

      const compA = normalizeName(medA.composition_summary + ' ' + medA.name);
      const compB = normalizeName(medB.composition_summary + ' ' + medB.name);

      for (const rule of DDI_RULES) {
        const saltA = normalizeName(rule.salt_a);
        const saltB = normalizeName(rule.salt_b);

        const matchDirect = compA.includes(saltA) && compB.includes(saltB);
        const matchReverse = compA.includes(saltB) && compB.includes(saltA);

        if (matchDirect || matchReverse) {
          detected.push({
            id: `${rule.id}-${medA.id}-${medB.id}`,
            medicine_a_name: medA.name,
            medicine_b_name: medB.name,
            severity: rule.severity,
            category: rule.category,
            clinical_effect: rule.clinical_effect,
            recommendation: rule.physician_recommendation
          });
        }
      }
    }
  }

  return detected;
}
