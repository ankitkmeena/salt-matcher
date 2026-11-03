import { AlternativeComparison, BasketItem, BasketSummary, Medicine } from '../types/medicine';
import { SEED_MEDICINES } from '../data/seedData';

/**
 * Normalizes user queries for robust matching
 */
export function normalizeQuery(query: string): string {
  return query
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Searches medicines by name, brand, salt composition, or category
 */
export function searchMedicines(
  query: string,
  categoryFilter?: string,
  dataset: Medicine[] = SEED_MEDICINES
): Medicine[] {
  const cleanQ = normalizeQuery(query);
  const terms = cleanQ.split(' ').filter(Boolean);

  return dataset.filter((med) => {
    if (categoryFilter && categoryFilter !== 'All' && med.therapeutic_category !== categoryFilter) {
      return false;
    }

    if (!cleanQ) {
      return true;
    }

    const searchableString = `${med.name} ${med.brand_name} ${med.composition_summary} ${med.manufacturer} ${med.indications || ''}`.toLowerCase();
    
    // All space-delimited terms must match
    return terms.every((term) => searchableString.includes(term));
  });
}

/**
 * Finds all generic and branded alternatives sharing the same salt composition key
 */
export function findAlternatives(
  targetMedicine: Medicine,
  dataset: Medicine[] = SEED_MEDICINES
): AlternativeComparison {
  // Candidate pool with exact salt key
  const matches = dataset.filter(
    (m) => m.normalized_salt_key === targetMedicine.normalized_salt_key && m.id !== targetMedicine.id
  );

  const formattedAlternatives = matches.map((alt) => {
    // Unit price savings
    const unitPriceSavings = targetMedicine.price_per_unit - alt.price_per_unit;
    // Normalized 30 units (1 month daily regimen)
    const monthlySavings = unitPriceSavings * 30;
    const annualSavings = monthlySavings * 12;

    const percentageSavings =
      targetMedicine.price_per_unit > 0
        ? Math.round(((targetMedicine.price_per_unit - alt.price_per_unit) / targetMedicine.price_per_unit) * 100)
        : 0;

    const packPriceDiff = targetMedicine.price_inr - alt.price_inr;

    let tier: 'jan_aushadhi' | 'generic_branded' | 'commercial_alternative' = 'commercial_alternative';
    if (alt.is_jan_aushadhi === 1) {
      tier = 'jan_aushadhi';
    } else if (alt.is_generic === 1 || percentageSavings >= 30) {
      tier = 'generic_branded';
    }

    return {
      medicine: alt,
      unit_price_savings: Math.max(0, Number(unitPriceSavings.toFixed(2))),
      pack_price_difference: Number(packPriceDiff.toFixed(2)),
      percentage_savings: Math.max(0, percentageSavings),
      monthly_savings_inr: Math.max(0, Number(monthlySavings.toFixed(2))),
      annual_savings_inr: Math.max(0, Number(annualSavings.toFixed(2))),
      is_exact_salt_match: true,
      release_mechanism_match: alt.release_mechanism === targetMedicine.release_mechanism,
      tier,
    };
  });

  // Sort: Jan Aushadhi first, then highest percentage savings
  formattedAlternatives.sort((a, b) => {
    if (a.medicine.is_jan_aushadhi !== b.medicine.is_jan_aushadhi) {
      return b.medicine.is_jan_aushadhi - a.medicine.is_jan_aushadhi;
    }
    return b.percentage_savings - a.percentage_savings;
  });

  // Find overall cheapest
  const allInGroup = [targetMedicine, ...matches];
  const cheapest = allInGroup.reduce((min, cur) => (cur.price_per_unit < min.price_per_unit ? cur : min), targetMedicine);
  const maxSavings =
    targetMedicine.price_per_unit > 0
      ? Math.max(0, Math.round(((targetMedicine.price_per_unit - cheapest.price_per_unit) / targetMedicine.price_per_unit) * 100))
      : 0;

  let nti_alert: string | undefined = undefined;
  if (targetMedicine.is_nti === 1) {
    nti_alert = `CRITICAL CLINICAL ADVISORY: ${targetMedicine.brand_name} contains a Narrow Therapeutic Index (NTI) active salt (${targetMedicine.composition_summary}). Even slight shifts in plasma concentration may cause therapeutic failure or toxicity. Do not swap brands without physician supervision and follow-up lab testing (e.g. TSH or INR).`;
  }

  return {
    target: targetMedicine,
    alternatives: formattedAlternatives,
    cheapest,
    max_savings_percentage: maxSavings,
    nti_alert,
  };
}

/**
 * Calculates prescription basket savings (monthly & annual family savings)
 */
export function calculateBasketSummary(
  basket: BasketItem[],
  dataset: Medicine[] = SEED_MEDICINES
): BasketSummary {
  let totalCurrent = 0;
  let totalOptimized = 0;
  const ntiWarnings: { medicine_name: string; warning: string }[] = [];

  const breakdown = basket.map((item) => {
    const currentCost = item.medicine.price_inr * item.strips_per_month;
    totalCurrent += currentCost;

    // Pick best alternative if chosen, or find cheapest Jan Aushadhi / generic match
    let chosen = item.chosen_alternative;
    if (!chosen) {
      const matchObj = findAlternatives(item.medicine, dataset);
      chosen = matchObj.cheapest;
    }

    // Adjust strips if package size differs, so patient receives the exact same number of tablets!
    const targetTabletsNeeded = item.medicine.package_size * item.strips_per_month;
    const altPacksNeeded = Math.ceil(targetTabletsNeeded / chosen.package_size);
    const alternativeCost = chosen.price_inr * altPacksNeeded;
    totalOptimized += alternativeCost;

    const savings = Math.max(0, currentCost - alternativeCost);
    const pct = currentCost > 0 ? Math.round((savings / currentCost) * 100) : 0;

    if (item.medicine.is_nti === 1 || chosen.is_nti === 1) {
      ntiWarnings.push({
        medicine_name: item.medicine.name,
        warning: `Narrow Therapeutic Index (NTI) salt detected. Confirm brand substitution with doctor.`,
      });
    }

    return {
      medicine: item.medicine,
      alternative: chosen,
      strips_per_month: item.strips_per_month,
      current_cost: Number(currentCost.toFixed(2)),
      alternative_cost: Number(alternativeCost.toFixed(2)),
      savings: Number(savings.toFixed(2)),
      percentage_savings: pct,
      is_nti: item.medicine.is_nti === 1 || chosen.is_nti === 1,
    };
  });

  const monthlySavings = Math.max(0, totalCurrent - totalOptimized);
  const annualSavings = monthlySavings * 12;
  const overallPct = totalCurrent > 0 ? Math.round((monthlySavings / totalCurrent) * 100) : 0;

  return {
    total_current_monthly: Number(totalCurrent.toFixed(2)),
    total_optimized_monthly: Number(totalOptimized.toFixed(2)),
    monthly_savings: Number(monthlySavings.toFixed(2)),
    annual_savings: Number(annualSavings.toFixed(2)),
    overall_savings_percentage: overallPct,
    nti_warnings: ntiWarnings,
    breakdown,
  };
}

/**
 * Simple NLP line parser for pasted prescriptions
 */
export function parsePrescriptionText(
  text: string,
  dataset: Medicine[] = SEED_MEDICINES
): Medicine[] {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const matched = new Set<number>();
  const results: Medicine[] = [];

  for (const line of lines) {
    const hits = searchMedicines(line, undefined, dataset);
    if (hits.length > 0) {
      const topHit = hits[0];
      if (!matched.has(topHit.id)) {
        matched.add(topHit.id);
        results.push(topHit);
      }
    }
  }

  return results;
}
