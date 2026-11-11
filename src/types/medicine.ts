export interface Medicine {
  id: number;
  name: string;
  brand_name: string;
  manufacturer: string;
  dosage_form: string;
  release_mechanism: string;
  package_size: number;
  price_inr: number;
  price_per_unit: number;
  is_generic: number; // 0 or 1
  is_jan_aushadhi: number; // 0 or 1
  is_nti: number; // Narrow Therapeutic Index
  therapeutic_category: string;
  composition_summary: string;
  normalized_salt_key: string;
  indications?: string;
  prescription_required: number;
  pmbi_code?: string;
  last_verified?: string;
  cdsco_approval?: string;
}

export interface Salt {
  id: number;
  name: string;
  description?: string;
  is_nti: number;
  warnings?: string;
}

export interface MedicineSaltJoin {
  id: number;
  medicine_id: number;
  salt_id: number;
  salt_name: string;
  strength: number;
  unit: string;
  is_nti: number;
  warnings?: string;
}

export interface AlternativeComparison {
  target: Medicine;
  alternatives: {
    medicine: Medicine;
    unit_price_savings: number;
    pack_price_difference: number;
    percentage_savings: number;
    monthly_savings_inr: number; // 30 tablets equivalent
    annual_savings_inr: number;
    is_exact_salt_match: boolean;
    release_mechanism_match: boolean;
    tier: 'jan_aushadhi' | 'generic_branded' | 'commercial_alternative';
  }[];
  cheapest: Medicine;
  max_savings_percentage: number;
  nti_alert?: string;
}

export interface BasketItem {
  medicine: Medicine;
  strips_per_month: number;
  chosen_alternative?: Medicine;
}

export interface BasketSummary {
  total_current_monthly: number;
  total_optimized_monthly: number;
  monthly_savings: number;
  annual_savings: number;
  overall_savings_percentage: number;
  nti_warnings: {
    medicine_name: string;
    warning: string;
  }[];
  breakdown: {
    medicine: Medicine;
    alternative: Medicine;
    strips_per_month: number;
    current_cost: number;
    alternative_cost: number;
    savings: number;
    percentage_savings: number;
    is_nti: boolean;
  }[];
}
