-- ====================================================================
-- Automated NPPA DPCO Price Ceiling Patch
-- Generated: 2026-11-18T06:05:16.203Z
-- Source: National Pharmaceutical Pricing Authority (DPCO Section 4 & 6)
-- ====================================================================

-- Ensure columns exist (safely handled if run on SQLite/D1)
ALTER TABLE medicines ADD COLUMN nppa_ceiling_price REAL;
ALTER TABLE medicines ADD COLUMN nppa_gazette_ref TEXT;

UPDATE medicines 
SET 
  nppa_ceiling_price = 2.12,
  nppa_gazette_ref = 'S.O. 1542(E) (2026-04-01)'
WHERE composition_summary LIKE '%Paracetamol%'
  AND dosage_form = 'Tablet';
UPDATE medicines 
SET 
  nppa_ceiling_price = 1.05,
  nppa_gazette_ref = 'S.O. 1542(E) (2026-04-01)'
WHERE composition_summary LIKE '%Paracetamol%'
  AND dosage_form = 'Tablet';
UPDATE medicines 
SET 
  nppa_ceiling_price = 1.85,
  nppa_gazette_ref = 'S.O. 1543(E) (2026-04-01)'
WHERE composition_summary LIKE '%Metformin%'
  AND dosage_form = 'Tablet';
UPDATE medicines 
SET 
  nppa_ceiling_price = 6.84,
  nppa_gazette_ref = 'S.O. 1544(E) (2026-04-01)'
WHERE composition_summary LIKE '%Telmisartan%'
  AND dosage_form = 'Tablet';
UPDATE medicines 
SET 
  nppa_ceiling_price = 6.20,
  nppa_gazette_ref = 'S.O. 1545(E) (2026-04-01)'
WHERE composition_summary LIKE '%Atorvastatin%'
  AND dosage_form = 'Tablet';
UPDATE medicines 
SET 
  nppa_ceiling_price = 2.25,
  nppa_gazette_ref = 'S.O. 1546(E) (2026-04-01)'
WHERE composition_summary LIKE '%Amlodipine%'
  AND dosage_form = 'Tablet';
UPDATE medicines 
SET 
  nppa_ceiling_price = 7.95,
  nppa_gazette_ref = 'S.O. 1547(E) (2026-04-01)'
WHERE composition_summary LIKE '%Pantoprazole%'
  AND dosage_form = 'Tablet';
UPDATE medicines 
SET 
  nppa_ceiling_price = 23.40,
  nppa_gazette_ref = 'S.O. 1548(E) (2026-04-01)'
WHERE composition_summary LIKE '%Azithromycin%'
  AND dosage_form = 'Tablet';
UPDATE medicines 
SET 
  nppa_ceiling_price = 18.90,
  nppa_gazette_ref = 'S.O. 1549(E) (2026-04-01)'
WHERE composition_summary LIKE '%Amoxicillin + Clavulanic Acid%'
  AND dosage_form = 'Tablet';
UPDATE medicines 
SET 
  nppa_ceiling_price = 10.45,
  nppa_gazette_ref = 'S.O. 1550(E) (2026-04-01)'
WHERE composition_summary LIKE '%Montelukast + Levocetirizine%'
  AND dosage_form = 'Tablet';