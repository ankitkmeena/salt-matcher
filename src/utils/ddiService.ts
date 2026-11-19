/**
 * Drug-Drug Interaction (DDI) & Clinical Safety Engine
 * Clinically referenced rules based on WHO, CDSCO, and British National Formulary (BNF).
 * Analyzes patient medication lists in the savings basket for concurrent usage risks.
 */

export type InteractionSeverity = 'severe' | 'moderate' | 'mild';

export interface DrugInteractionRule {
  id: string;
  salt_a: string;
  salt_b: string;
  severity: InteractionSeverity;
  clinical_effect: string;
  physician_recommendation: string;
}

export interface DetectedInteraction {
  id: string;
  medicine_a_name: string;
  medicine_b_name: string;
  severity: InteractionSeverity;
  clinical_effect: string;
  recommendation: string;
}

// Clinically curated rule database for high-prevalence chronic medications
export const DDI_RULES: DrugInteractionRule[] = [
  {
    id: 'ddi-001',
    salt_a: 'Atorvastatin',
    salt_b: 'Amlodipine',
    severity: 'mild',
    clinical_effect: 'Amlodipine may mildly increase serum concentrations of Atorvastatin, potentially increasing the risk of muscle soreness (myopathy).',
    physician_recommendation: 'Generally safe and commonly co-prescribed. Doctor may limit Atorvastatin to 20mg-40mg daily and monitor for muscle pain.'
  },
  {
    id: 'ddi-002',
    salt_a: 'Metformin',
    salt_b: 'Contrast Media',
    severity: 'moderate',
    clinical_effect: 'Iodinated radiocontrast agents combined with Metformin can increase the risk of lactic acidosis if renal function is impaired.',
    physician_recommendation: 'Metformin should be withheld 48 hours prior to contrast imaging scans and restarted only after renal function review.'
  },
  {
    id: 'ddi-003',
    salt_a: 'Telmisartan',
    salt_b: 'Potassium Clavulanate',
    severity: 'mild',
    clinical_effect: 'Co-administration of ARBs with potassium-containing salts may slightly elevate serum potassium levels in renal patients.',
    physician_recommendation: 'Routine blood pressure and serum electrolyte checks are recommended.'
  },
  {
    id: 'ddi-004',
    salt_a: 'Warfarin',
    salt_b: 'Paracetamol',
    severity: 'moderate',
    clinical_effect: 'Prolonged or high-dose Paracetamol (>2g/day) may enhance the anticoagulant effect of Warfarin and increase INR / bleeding risk.',
    physician_recommendation: 'Monitor INR levels if Paracetamol is taken regularly for more than 3 consecutive days.'
  },
  {
    id: 'ddi-005',
    salt_a: 'Aspirin',
    salt_b: 'Warfarin',
    severity: 'severe',
    clinical_effect: 'Dual antiplatelet and anticoagulant therapy significantly elevates the risk of major gastrointestinal and systemic hemorrhage.',
    physician_recommendation: 'Requires strict specialist cardiologist / hematologist supervision. Often requires concurrent proton pump inhibitor (e.g. Pantoprazole).'
  },
  {
    id: 'ddi-006',
    salt_a: 'Levothyroxine',
    salt_b: 'Calcium Carbonate',
    severity: 'moderate',
    clinical_effect: 'Calcium supplements bind Levothyroxine in the gastrointestinal tract, drastically decreasing thyroid hormone absorption.',
    physician_recommendation: 'Separate intake times by at least 4 hours (take Levothyroxine empty stomach in the morning, Calcium at night).'
  },
  {
    id: 'ddi-007',
    salt_a: 'Pantoprazole',
    salt_b: 'Levothyroxine',
    severity: 'moderate',
    clinical_effect: 'Reduced gastric acidity from proton pump inhibitors can decrease the absorption and bioavailability of Levothyroxine.',
    physician_recommendation: 'Monitor TSH levels upon initiating or discontinuing long-term PPI therapy.'
  },
  {
    id: 'ddi-008',
    salt_a: 'Amlodipine',
    salt_b: 'Simvastatin',
    severity: 'moderate',
    clinical_effect: 'Amlodipine inhibits CYP3A4 metabolism, substantially increasing Simvastatin plasma levels and rhabdomyolysis risk.',
    physician_recommendation: 'FDA / CDSCO guidelines recommend capping Simvastatin at maximum 20mg daily when combined with Amlodipine.'
  },
  {
    id: 'ddi-009',
    salt_a: 'Metformin',
    salt_b: 'Alcohol',
    severity: 'severe',
    clinical_effect: 'Acute or chronic alcohol consumption potentiates Metformin effect on lactate metabolism, dramatically increasing lactic acidosis risk.',
    physician_recommendation: 'Advise patients to avoid excessive or binge alcohol consumption while on Metformin.'
  },
  {
    id: 'ddi-010',
    salt_a: 'Azithromycin',
    salt_b: 'Atorvastatin',
    severity: 'moderate',
    clinical_effect: 'Macrolide antibiotics can temporarily elevate statin bioavailability by P-glycoprotein/CYP3A inhibition.',
    physician_recommendation: 'Short 3-5 day courses are generally tolerated; report any sudden acute muscle weakness or dark urine.'
  }
];

/**
 * Normalizes medication salt names for comparison
 */
function normalizeName(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Checks a list of patient medicines for all pairwise drug-drug interactions
 */
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
            clinical_effect: rule.clinical_effect,
            recommendation: rule.physician_recommendation
          });
        }
      }
    }
  }

  return detected;
}
