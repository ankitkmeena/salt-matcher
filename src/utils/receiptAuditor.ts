/**
 * Pharmacy Chemist Bill OCR & NPPA Price Ceiling Auditor
 * Extracts line items from uploaded pharmacy receipts and checks against
 * statutory NPPA DPCO price ceilings.
 */

import { SEED_MEDICINES } from '../data/seedData';
import { Medicine } from '../types/medicine';

export interface BilledMedicineAudit {
  raw_line: string;
  detected_name: string;
  matched_medicine?: Medicine;
  billed_price_per_unit?: number;
  nppa_ceiling_per_unit?: number;
  is_overcharged: boolean;
  overcharge_amount: number;
}

export interface ReceiptAuditResult {
  total_billed: number;
  total_dpco_ceiling: number;
  overcharge_detected: boolean;
  total_excess_charged: number;
  items: BilledMedicineAudit[];
}

/**
 * Parses raw receipt OCR text and audits against NPPA price caps
 */
export function auditReceiptText(ocrText: string): ReceiptAuditResult {
  const lines = ocrText.split('\n').map((l) => l.trim()).filter(Boolean);
  const items: BilledMedicineAudit[] = [];

  let totalBilled = 0;
  let totalCeiling = 0;
  let totalExcess = 0;

  for (const line of lines) {
    // Look for lines containing numbers/prices (e.g., "Augmentin 625 10 Tab 205.00" or "Dolo 650 30.50")
    const priceMatch = line.match(/(?:rs\.?|inr|₹)?\s*(\d+(?:\.\d{1,2})?)\s*$/i);
    if (!priceMatch) continue;

    const billedTotal = parseFloat(priceMatch[1]);
    if (isNaN(billedTotal) || billedTotal <= 0) continue;

    // Search matched medicine
    const matched = SEED_MEDICINES.find((med) => {
      const nameParts = med.name.toLowerCase().split(/\s+/);
      const lineLower = line.toLowerCase();
      return nameParts.some((part) => part.length >= 4 && lineLower.includes(part));
    });

    if (matched) {
      const units = matched.package_size || 10;
      const unitRate = billedTotal / units;
      const ceiling = matched.nppa_ceiling_price;

      let isOvercharged = false;
      let excess = 0;

      if (ceiling && unitRate > ceiling) {
        isOvercharged = true;
        excess = (unitRate - ceiling) * units;
        totalExcess += excess;
      }

      totalBilled += billedTotal;
      if (ceiling) {
        totalCeiling += ceiling * units;
      }

      items.push({
        raw_line: line,
        detected_name: matched.name,
        matched_medicine: matched,
        billed_price_per_unit: unitRate,
        nppa_ceiling_per_unit: ceiling,
        is_overcharged: isOvercharged,
        overcharge_amount: excess
      });
    }
  }

  return {
    total_billed: totalBilled,
    total_dpco_ceiling: totalCeiling,
    overcharge_detected: totalExcess > 0,
    total_excess_charged: totalExcess,
    items
  };
}
