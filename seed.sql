-- ====================================================================
-- SaltMatch: Verified Seed Data for Chronic & High-Impact Medicines
-- Contains Branded formulations, Generic-Branded, & Jan Aushadhi options
-- ====================================================================

-- 1. Insert Active Pharmaceutical Ingredients (Salts)
INSERT INTO salts (name, description, is_nti, warnings) VALUES
('Amoxicillin', 'Broad-spectrum beta-lactam antibiotic used to treat bacterial infections.', 0, NULL),
('Clavulanic Acid', 'Beta-lactamase inhibitor that prevents bacterial resistance against amoxicillin.', 0, NULL),
('Metformin Hydrochloride', 'First-line biguanide oral antihyperglycemic agent for Type 2 Diabetes.', 0, 'Risk of lactic acidosis; monitor renal function.'),
('Glimepiride', 'Second-generation sulfonylurea that stimulates insulin secretion from beta cells.', 0, 'Risk of hypoglycemia; take immediately with or after breakfast.'),
('Telmisartan', 'Angiotensin II receptor antagonist (ARB) for essential hypertension and cardiac risk reduction.', 0, 'Contraindicated in pregnancy; monitor serum potassium and creatinine.'),
('Amlodipine', 'Dihydropyridine calcium channel blocker for hypertension and chronic stable angina.', 0, 'Watch for peripheral edema and dizziness.'),
('Atorvastatin', 'HMG-CoA reductase inhibitor (statin) used to lower LDL-C and cardiovascular event risk.', 0, 'Report unexplained muscle pain or weakness (myopathy risk).'),
('Rosuvastatin', 'Potent synthetic statin for primary hypercholesterolemia and mixed dyslipidemia.', 0, 'Monitor liver transaminases and CK levels if symptomatic.'),
('Pantoprazole', 'Proton pump inhibitor (PPI) that decreases stomach acid secretion.', 0, 'Prolonged use may affect B12 and magnesium absorption.'),
('Domperidone', 'Dopamine D2 receptor antagonist used as an antiemetic and prokinetic.', 0, 'Caution in cardiac patients; risk of QT prolongation.'),
('Omeprazole', 'Proton pump inhibitor for peptic ulcer disease and gastroesophageal reflux disease.', 0, 'Can interact with clopidogrel.'),
('Levothyroxine Sodium', 'Synthetic thyroid hormone (T4) for primary and secondary hypothyroidism.', 1, 'NARROW THERAPEUTIC INDEX: Inadvertent changes in bioavailability can lead to hypo- or hyperthyroidism. Brand switching requires TSH check in 6-8 weeks.'),
('Warfarin Sodium', 'Vitamin K antagonist anticoagulant for prevention of thromboembolic events.', 1, 'NARROW THERAPEUTIC INDEX: High bleeding risk. Strict International Normalized Ratio (INR) monitoring is mandatory when changing brands or lots.'),
('Aceclofenac', 'NSAID analog with potent anti-inflammatory and analgesic properties.', 0, 'Avoid in active peptic ulcer or severe renal impairment.'),
('Paracetamol', 'Analgesic and antipyretic agent with central action.', 0, 'Do not exceed 4g/day to prevent hepatotoxicity.'),
('Ibuprofen', 'Non-steroidal anti-inflammatory drug (NSAID) for mild-to-moderate pain and fever.', 0, 'Take with food to minimize gastric irritation.'),
('Montelukast', 'Leukotriene receptor antagonist for maintenance treatment of asthma and allergic rhinitis.', 0, 'Monitor for neuropsychiatric events (mood changes).'),
('Levocetirizine', 'Third-generation non-sedating antihistamine for allergic rhinitis and chronic urticaria.', 0, 'May cause mild drowsiness in sensitive individuals.'),
('Sitagliptin', 'DPP-4 inhibitor that enhances incretin levels for glycemic control.', 0, 'Discontinue if pancreatitis is suspected.'),
('Bisoprolol', 'Cardioselective beta-1 blocker for hypertension and chronic heart failure.', 0, 'Do not abruptly discontinue; taper dose.');

-- 2. Insert Medicines (Brands, Generics, Jan Aushadhi)
INSERT INTO medicines 
(name, brand_name, manufacturer, dosage_form, release_mechanism, package_size, price_inr, price_per_unit, is_generic, is_jan_aushadhi, is_nti, therapeutic_category, composition_summary, normalized_salt_key, indications, prescription_required)
VALUES
-- Antibiotics: Amoxicillin (500mg) + Clavulanic Acid (125mg)
('Augmentin 625 Duo Tablet', 'Augmentin', 'GlaxoSmithKline Pharmaceuticals Ltd', 'Tablet', 'Immediate Release', 10, 223.50, 22.35, 0, 0, 0, 'Antibiotic', 'Amoxicillin (500mg) + Clavulanic Acid (125mg)', 'amoxicillin:500mg+clavulanic_acid:125mg|tablet|immediate_release', 'Respiratory tract, ENT, skin and soft tissue bacterial infections', 1),
('Clavam 625 Tablet', 'Clavam', 'Alkem Laboratories Ltd', 'Tablet', 'Immediate Release', 10, 185.00, 18.50, 0, 0, 0, 'Antibiotic', 'Amoxicillin (500mg) + Clavulanic Acid (125mg)', 'amoxicillin:500mg+clavulanic_acid:125mg|tablet|immediate_release', 'Respiratory tract, ENT, skin and soft tissue bacterial infections', 1),
('Moxikind-CV 625 Tablet', 'Moxikind-CV', 'Mankind Pharma Ltd', 'Tablet', 'Immediate Release', 10, 145.00, 14.50, 0, 0, 0, 'Antibiotic', 'Amoxicillin (500mg) + Clavulanic Acid (125mg)', 'amoxicillin:500mg+clavulanic_acid:125mg|tablet|immediate_release', 'Respiratory tract, ENT, skin and soft tissue bacterial infections', 1),
('Jan Aushadhi Amoxicillin & Pot. Clavulanate 625mg', 'Jan Aushadhi Generic', 'BPPI (Bureau of Pharma PSUs of India)', 'Tablet', 'Immediate Release', 10, 62.00, 6.20, 1, 1, 0, 'Antibiotic', 'Amoxicillin (500mg) + Clavulanic Acid (125mg)', 'amoxicillin:500mg+clavulanic_acid:125mg|tablet|immediate_release', 'Respiratory tract, ENT, skin and soft tissue bacterial infections', 1),

-- Diabetes: Metformin (500mg SR) + Glimepiride (2mg)
('Glycomet-GP 2 Tablet PR', 'Glycomet-GP', 'USV Ltd', 'Tablet', 'Sustained Release (SR)', 15, 162.00, 10.80, 0, 0, 0, 'Diabetes', 'Metformin Hydrochloride (500mg SR) + Glimepiride (2mg)', 'glimepiride:2mg+metformin_hydrochloride:500mg|tablet|sustained_release', 'Type 2 Diabetes Mellitus in adults inadequately controlled on monotherapy', 1),
('Gemer 2 Tablet PR', 'Gemer', 'Sun Pharmaceutical Industries Ltd', 'Tablet', 'Sustained Release (SR)', 10, 140.00, 14.00, 0, 0, 0, 'Diabetes', 'Metformin Hydrochloride (500mg SR) + Glimepiride (2mg)', 'glimepiride:2mg+metformin_hydrochloride:500mg|tablet|sustained_release', 'Type 2 Diabetes Mellitus in adults inadequately controlled on monotherapy', 1),
('Zoryl-M 2 Tablet PR', 'Zoryl-M', 'Intas Pharmaceuticals Ltd', 'Tablet', 'Sustained Release (SR)', 15, 135.00, 9.00, 0, 0, 0, 'Diabetes', 'Metformin Hydrochloride (500mg SR) + Glimepiride (2mg)', 'glimepiride:2mg+metformin_hydrochloride:500mg|tablet|sustained_release', 'Type 2 Diabetes Mellitus in adults inadequately controlled on monotherapy', 1),
('Jan Aushadhi Glimepiride 2mg + Metformin 500mg SR', 'Jan Aushadhi Generic', 'BPPI (Bureau of Pharma PSUs of India)', 'Tablet', 'Sustained Release (SR)', 10, 22.00, 2.20, 1, 1, 0, 'Diabetes', 'Metformin Hydrochloride (500mg SR) + Glimepiride (2mg)', 'glimepiride:2mg+metformin_hydrochloride:500mg|tablet|sustained_release', 'Type 2 Diabetes Mellitus in adults inadequately controlled on monotherapy', 1),

-- Diabetes: Metformin (500mg) Single Agent
('Glycomet 500 Tablet', 'Glycomet', 'USV Ltd', 'Tablet', 'Immediate Release', 10, 28.50, 2.85, 0, 0, 0, 'Diabetes', 'Metformin Hydrochloride (500mg)', 'metformin_hydrochloride:500mg|tablet|immediate_release', 'First line treatment for Type 2 Diabetes Mellitus', 1),
('Glucophage 500 Tablet', 'Glucophage', 'Merck Ltd', 'Tablet', 'Immediate Release', 10, 36.00, 3.60, 0, 0, 0, 'Diabetes', 'Metformin Hydrochloride (500mg)', 'metformin_hydrochloride:500mg|tablet|immediate_release', 'First line treatment for Type 2 Diabetes Mellitus', 1),
('Jan Aushadhi Metformin 500mg Tablet', 'Jan Aushadhi Generic', 'BPPI (Bureau of Pharma PSUs of India)', 'Tablet', 'Immediate Release', 10, 7.50, 0.75, 1, 1, 0, 'Diabetes', 'Metformin Hydrochloride (500mg)', 'metformin_hydrochloride:500mg|tablet|immediate_release', 'First line treatment for Type 2 Diabetes Mellitus', 1),

-- Hypertension: Telmisartan (40mg)
('Telma 40 Tablet', 'Telma', 'Glenmark Pharmaceuticals Ltd', 'Tablet', 'Immediate Release', 15, 245.00, 16.33, 0, 0, 0, 'Hypertension', 'Telmisartan (40mg)', 'telmisartan:40mg|tablet|immediate_release', 'Essential hypertension and cardiovascular risk reduction', 1),
('Telmikind 40 Tablet', 'Telmikind', 'Mankind Pharma Ltd', 'Tablet', 'Immediate Release', 10, 65.00, 6.50, 0, 0, 0, 'Hypertension', 'Telmisartan (40mg)', 'telmisartan:40mg|tablet|immediate_release', 'Essential hypertension and cardiovascular risk reduction', 1),
('Telpres 40 Tablet', 'Telpres', 'Abbott India Ltd', 'Tablet', 'Immediate Release', 15, 180.00, 12.00, 0, 0, 0, 'Hypertension', 'Telmisartan (40mg)', 'telmisartan:40mg|tablet|immediate_release', 'Essential hypertension and cardiovascular risk reduction', 1),
('Jan Aushadhi Telmisartan 40mg Tablet', 'Jan Aushadhi Generic', 'BPPI (Bureau of Pharma PSUs of India)', 'Tablet', 'Immediate Release', 10, 14.50, 1.45, 1, 1, 0, 'Hypertension', 'Telmisartan (40mg)', 'telmisartan:40mg|tablet|immediate_release', 'Essential hypertension and cardiovascular risk reduction', 1),

-- Hypertension: Amlodipine (5mg)
('Amlodac 5 Tablet', 'Amlodac', 'Zydus Cadila', 'Tablet', 'Immediate Release', 10, 38.00, 3.80, 0, 0, 0, 'Hypertension', 'Amlodipine (5mg)', 'amlodipine:5mg|tablet|immediate_release', 'Hypertension and chronic stable angina', 1),
('Stamlo 5 Tablet', 'Stamlo', 'Dr. Reddy''s Laboratories Ltd', 'Tablet', 'Immediate Release', 15, 98.00, 6.53, 0, 0, 0, 'Hypertension', 'Amlodipine (5mg)', 'amlodipine:5mg|tablet|immediate_release', 'Hypertension and chronic stable angina', 1),
('Jan Aushadhi Amlodipine 5mg Tablet', 'Jan Aushadhi Generic', 'BPPI (Bureau of Pharma PSUs of India)', 'Tablet', 'Immediate Release', 10, 6.00, 0.60, 1, 1, 0, 'Hypertension', 'Amlodipine (5mg)', 'amlodipine:5mg|tablet|immediate_release', 'Hypertension and chronic stable angina', 1),

-- Cholesterol: Atorvastatin (20mg)
('Atorva 20 Tablet', 'Atorva', 'Zydus Cadila', 'Tablet', 'Immediate Release', 15, 265.00, 17.67, 0, 0, 0, 'Cardiovascular', 'Atorvastatin (20mg)', 'atorvastatin:20mg|tablet|immediate_release', 'Hypercholesterolemia, prevention of cardiovascular diseases and stroke', 1),
('Lipitor 20mg Tablet', 'Lipitor', 'Pfizer Ltd', 'Tablet', 'Immediate Release', 10, 340.00, 34.00, 0, 0, 0, 'Cardiovascular', 'Atorvastatin (20mg)', 'atorvastatin:20mg|tablet|immediate_release', 'Hypercholesterolemia, prevention of cardiovascular diseases and stroke', 1),
('Storvas 20 Tablet', 'Storvas', 'Sun Pharmaceutical Industries Ltd', 'Tablet', 'Immediate Release', 10, 180.00, 18.00, 0, 0, 0, 'Cardiovascular', 'Atorvastatin (20mg)', 'atorvastatin:20mg|tablet|immediate_release', 'Hypercholesterolemia, prevention of cardiovascular diseases and stroke', 1),
('Jan Aushadhi Atorvastatin 20mg Tablet', 'Jan Aushadhi Generic', 'BPPI (Bureau of Pharma PSUs of India)', 'Tablet', 'Immediate Release', 10, 20.00, 2.00, 1, 1, 0, 'Cardiovascular', 'Atorvastatin (20mg)', 'atorvastatin:20mg|tablet|immediate_release', 'Hypercholesterolemia, prevention of cardiovascular diseases and stroke', 1),

-- Cholesterol: Rosuvastatin (10mg)
('Rozavel 10 Tablet', 'Rozavel', 'Sun Pharmaceutical Industries Ltd', 'Tablet', 'Immediate Release', 15, 225.00, 15.00, 0, 0, 0, 'Cardiovascular', 'Rosuvastatin (10mg)', 'rosuvastatin:10mg|tablet|immediate_release', 'Primary hypercholesterolemia and dyslipidemia', 1),
('Crestor 10mg Tablet', 'Crestor', 'AstraZeneca Pharma India Ltd', 'Tablet', 'Immediate Release', 15, 395.00, 26.33, 0, 0, 0, 'Cardiovascular', 'Rosuvastatin (10mg)', 'rosuvastatin:10mg|tablet|immediate_release', 'Primary hypercholesterolemia and dyslipidemia', 1),
('Jan Aushadhi Rosuvastatin 10mg Tablet', 'Jan Aushadhi Generic', 'BPPI (Bureau of Pharma PSUs of India)', 'Tablet', 'Immediate Release', 10, 24.00, 2.40, 1, 1, 0, 'Cardiovascular', 'Rosuvastatin (10mg)', 'rosuvastatin:10mg|tablet|immediate_release', 'Primary hypercholesterolemia and dyslipidemia', 1),

-- Gastrointestinal: Pantoprazole (40mg) + Domperidone (30mg SR)
('Pan-D Capsule PR', 'Pan-D', 'Alkem Laboratories Ltd', 'Capsule', 'Sustained Release (SR)', 15, 215.00, 14.33, 0, 0, 0, 'Gastrointestinal', 'Pantoprazole (40mg) + Domperidone (30mg SR)', 'domperidone:30mg+pantoprazole:40mg|capsule|sustained_release', 'Gastroesophageal reflux disease (GERD) with dyspepsia and heartburn', 1),
('Pantocid D-SR Capsule', 'Pantocid D-SR', 'Sun Pharmaceutical Industries Ltd', 'Capsule', 'Sustained Release (SR)', 10, 185.00, 18.50, 0, 0, 0, 'Gastrointestinal', 'Pantoprazole (40mg) + Domperidone (30mg SR)', 'domperidone:30mg+pantoprazole:40mg|capsule|sustained_release', 'Gastroesophageal reflux disease (GERD) with dyspepsia and heartburn', 1),
('Jan Aushadhi Pantoprazole 40mg + Domperidone 30mg SR', 'Jan Aushadhi Generic', 'BPPI (Bureau of Pharma PSUs of India)', 'Capsule', 'Sustained Release (SR)', 10, 28.00, 2.80, 1, 1, 0, 'Gastrointestinal', 'Pantoprazole (40mg) + Domperidone (30mg SR)', 'domperidone:30mg+pantoprazole:40mg|capsule|sustained_release', 'Gastroesophageal reflux disease (GERD) with dyspepsia and heartburn', 1),

-- Gastrointestinal: Omeprazole (20mg)
('Omez 20 Capsule', 'Omez', 'Dr. Reddy''s Laboratories Ltd', 'Capsule', 'Immediate Release', 15, 76.50, 5.10, 0, 0, 0, 'Gastrointestinal', 'Omeprazole (20mg)', 'omeprazole:20mg|capsule|immediate_release', 'Heartburn, acid reflux, and healing of peptic ulcers', 1),
('Jan Aushadhi Omeprazole 20mg Capsule', 'Jan Aushadhi Generic', 'BPPI (Bureau of Pharma PSUs of India)', 'Capsule', 'Immediate Release', 10, 10.00, 1.00, 1, 1, 0, 'Gastrointestinal', 'Omeprazole (20mg)', 'omeprazole:20mg|capsule|immediate_release', 'Heartburn, acid reflux, and healing of peptic ulcers', 1),

-- Thyroid: Levothyroxine Sodium (50mcg) - Narrow Therapeutic Index (NTI)!
('Thyronorm 50mcg Tablet', 'Thyronorm', 'Abbott India Ltd', 'Tablet', 'Immediate Release', 100, 182.00, 1.82, 0, 0, 1, 'Thyroid', 'Levothyroxine Sodium (50mcg)', 'levothyroxine_sodium:50mcg|tablet|immediate_release', 'Primary, secondary, and tertiary hypothyroidism', 1),
('Eltroxin 50mcg Tablet', 'Eltroxin', 'GlaxoSmithKline Pharmaceuticals Ltd', 'Tablet', 'Immediate Release', 100, 175.00, 1.75, 0, 0, 1, 'Thyroid', 'Levothyroxine Sodium (50mcg)', 'levothyroxine_sodium:50mcg|tablet|immediate_release', 'Primary, secondary, and tertiary hypothyroidism', 1),
('Jan Aushadhi Levothyroxine 50mcg Tablet', 'Jan Aushadhi Generic', 'BPPI (Bureau of Pharma PSUs of India)', 'Tablet', 'Immediate Release', 100, 45.00, 0.45, 1, 1, 1, 'Thyroid', 'Levothyroxine Sodium (50mcg)', 'levothyroxine_sodium:50mcg|tablet|immediate_release', 'Primary, secondary, and tertiary hypothyroidism (NTI: Retest TSH after brand switch)', 1),

-- Anticoagulant: Warfarin Sodium (5mg) - Narrow Therapeutic Index (NTI)!
('Warf 5mg Tablet', 'Warf', 'Cipla Ltd', 'Tablet', 'Immediate Release', 10, 78.00, 7.80, 0, 0, 1, 'Cardiovascular', 'Warfarin Sodium (5mg)', 'warfarin_sodium:5mg|tablet|immediate_release', 'Venous thrombosis, pulmonary embolism, thromboembolic complications', 1),
('Coumadin 5mg Tablet', 'Coumadin', 'Bristol-Myers Squibb', 'Tablet', 'Immediate Release', 10, 195.00, 19.50, 0, 0, 1, 'Cardiovascular', 'Warfarin Sodium (5mg)', 'warfarin_sodium:5mg|tablet|immediate_release', 'Venous thrombosis, pulmonary embolism, thromboembolic complications', 1),
('Jan Aushadhi Warfarin 5mg Tablet', 'Jan Aushadhi Generic', 'BPPI (Bureau of Pharma PSUs of India)', 'Tablet', 'Immediate Release', 10, 18.00, 1.80, 1, 1, 1, 'Cardiovascular', 'Warfarin Sodium (5mg)', 'warfarin_sodium:5mg|tablet|immediate_release', 'Venous thrombosis prophylaxis (NTI: Strict INR monitoring required upon switch)', 1),

-- Pain & Inflammation: Aceclofenac (100mg) + Paracetamol (325mg)
('Zerodol-P Tablet', 'Zerodol-P', 'Ipca Laboratories Ltd', 'Tablet', 'Immediate Release', 10, 68.00, 6.80, 0, 0, 0, 'Pain & Analgesic', 'Aceclofenac (100mg) + Paracetamol (325mg)', 'aceclofenac:100mg+paracetamol:325mg|tablet|immediate_release', 'Osteoarthritis, rheumatoid arthritis, ankylosing spondylitis, musculoskeletal pain', 1),
('Hifenac-P Tablet', 'Hifenac-P', 'Intas Pharmaceuticals Ltd', 'Tablet', 'Immediate Release', 10, 62.00, 6.20, 0, 0, 0, 'Pain & Analgesic', 'Aceclofenac (100mg) + Paracetamol (325mg)', 'aceclofenac:100mg+paracetamol:325mg|tablet|immediate_release', 'Osteoarthritis, rheumatoid arthritis, ankylosing spondylitis, musculoskeletal pain', 1),
('Jan Aushadhi Aceclofenac 100mg + Paracetamol 325mg', 'Jan Aushadhi Generic', 'BPPI (Bureau of Pharma PSUs of India)', 'Tablet', 'Immediate Release', 10, 15.00, 1.50, 1, 1, 0, 'Pain & Analgesic', 'Aceclofenac (100mg) + Paracetamol (325mg)', 'aceclofenac:100mg+paracetamol:325mg|tablet|immediate_release', 'Relief of pain and inflammation in arthritic and musculoskeletal conditions', 1),

-- Respiratory & Allergy: Montelukast (10mg) + Levocetirizine (5mg)
('Montair-LC Tablet', 'Montair-LC', 'Cipla Ltd', 'Tablet', 'Immediate Release', 10, 210.00, 21.00, 0, 0, 0, 'Respiratory', 'Montelukast (10mg) + Levocetirizine (5mg)', 'levocetirizine:5mg+montelukast:10mg|tablet|immediate_release', 'Allergic rhinitis, seasonal allergies and allergic asthma symptoms', 1),
('Telekast-L Tablet', 'Telekast-L', 'Lupin Ltd', 'Tablet', 'Immediate Release', 10, 175.00, 17.50, 0, 0, 0, 'Respiratory', 'Montelukast (10mg) + Levocetirizine (5mg)', 'levocetirizine:5mg+montelukast:10mg|tablet|immediate_release', 'Allergic rhinitis, seasonal allergies and allergic asthma symptoms', 1),
('Jan Aushadhi Montelukast 10mg + Levocetirizine 5mg', 'Jan Aushadhi Generic', 'BPPI (Bureau of Pharma PSUs of India)', 'Tablet', 'Immediate Release', 10, 28.50, 2.85, 1, 1, 0, 'Respiratory', 'Montelukast (10mg) + Levocetirizine (5mg)', 'levocetirizine:5mg+montelukast:10mg|tablet|immediate_release', 'Relief of sneezing, runny nose, and allergic bronchospasm', 1);

-- 3. Link medicine_salts
-- Augmentin & alternatives
INSERT INTO medicine_salts (medicine_id, salt_id, strength, unit)
SELECT m.id, s.id, 500, 'mg' FROM medicines m, salts s WHERE m.normalized_salt_key LIKE 'amoxicillin:500mg+clavulanic_acid:125mg%' AND s.name = 'Amoxicillin';
INSERT INTO medicine_salts (medicine_id, salt_id, strength, unit)
SELECT m.id, s.id, 125, 'mg' FROM medicines m, salts s WHERE m.normalized_salt_key LIKE 'amoxicillin:500mg+clavulanic_acid:125mg%' AND s.name = 'Clavulanic Acid';

-- Glycomet-GP 2 & alternatives
INSERT INTO medicine_salts (medicine_id, salt_id, strength, unit)
SELECT m.id, s.id, 500, 'mg' FROM medicines m, salts s WHERE m.normalized_salt_key LIKE '%glimepiride:2mg+metformin_hydrochloride:500mg%' AND s.name = 'Metformin Hydrochloride';
INSERT INTO medicine_salts (medicine_id, salt_id, strength, unit)
SELECT m.id, s.id, 2, 'mg' FROM medicines m, salts s WHERE m.normalized_salt_key LIKE '%glimepiride:2mg+metformin_hydrochloride:500mg%' AND s.name = 'Glimepiride';

-- Metformin 500 single agent
INSERT INTO medicine_salts (medicine_id, salt_id, strength, unit)
SELECT m.id, s.id, 500, 'mg' FROM medicines m, salts s WHERE m.normalized_salt_key = 'metformin_hydrochloride:500mg|tablet|immediate_release' AND s.name = 'Metformin Hydrochloride';

-- Telmisartan 40
INSERT INTO medicine_salts (medicine_id, salt_id, strength, unit)
SELECT m.id, s.id, 40, 'mg' FROM medicines m, salts s WHERE m.normalized_salt_key = 'telmisartan:40mg|tablet|immediate_release' AND s.name = 'Telmisartan';

-- Amlodipine 5
INSERT INTO medicine_salts (medicine_id, salt_id, strength, unit)
SELECT m.id, s.id, 5, 'mg' FROM medicines m, salts s WHERE m.normalized_salt_key = 'amlodipine:5mg|tablet|immediate_release' AND s.name = 'Amlodipine';

-- Atorvastatin 20
INSERT INTO medicine_salts (medicine_id, salt_id, strength, unit)
SELECT m.id, s.id, 20, 'mg' FROM medicines m, salts s WHERE m.normalized_salt_key = 'atorvastatin:20mg|tablet|immediate_release' AND s.name = 'Atorvastatin';

-- Rosuvastatin 10
INSERT INTO medicine_salts (medicine_id, salt_id, strength, unit)
SELECT m.id, s.id, 10, 'mg' FROM medicines m, salts s WHERE m.normalized_salt_key = 'rosuvastatin:10mg|tablet|immediate_release' AND s.name = 'Rosuvastatin';

-- Pan-D & alternatives
INSERT INTO medicine_salts (medicine_id, salt_id, strength, unit)
SELECT m.id, s.id, 40, 'mg' FROM medicines m, salts s WHERE m.normalized_salt_key LIKE '%pantoprazole:40mg%' AND s.name = 'Pantoprazole';
INSERT INTO medicine_salts (medicine_id, salt_id, strength, unit)
SELECT m.id, s.id, 30, 'mg' FROM medicines m, salts s WHERE m.normalized_salt_key LIKE '%domperidone:30mg%' AND s.name = 'Domperidone';

-- Omeprazole 20
INSERT INTO medicine_salts (medicine_id, salt_id, strength, unit)
SELECT m.id, s.id, 20, 'mg' FROM medicines m, salts s WHERE m.normalized_salt_key = 'omeprazole:20mg|capsule|immediate_release' AND s.name = 'Omeprazole';

-- Levothyroxine 50
INSERT INTO medicine_salts (medicine_id, salt_id, strength, unit)
SELECT m.id, s.id, 50, 'mcg' FROM medicines m, salts s WHERE m.normalized_salt_key = 'levothyroxine_sodium:50mcg|tablet|immediate_release' AND s.name = 'Levothyroxine Sodium';

-- Warfarin 5
INSERT INTO medicine_salts (medicine_id, salt_id, strength, unit)
SELECT m.id, s.id, 5, 'mg' FROM medicines m, salts s WHERE m.normalized_salt_key = 'warfarin_sodium:5mg|tablet|immediate_release' AND s.name = 'Warfarin Sodium';

-- Zerodol-P
INSERT INTO medicine_salts (medicine_id, salt_id, strength, unit)
SELECT m.id, s.id, 100, 'mg' FROM medicines m, salts s WHERE m.normalized_salt_key LIKE '%aceclofenac:100mg%' AND s.name = 'Aceclofenac';
INSERT INTO medicine_salts (medicine_id, salt_id, strength, unit)
SELECT m.id, s.id, 325, 'mg' FROM medicines m, salts s WHERE m.normalized_salt_key LIKE '%paracetamol:325mg%' AND s.name = 'Paracetamol';

-- Montair-LC
INSERT INTO medicine_salts (medicine_id, salt_id, strength, unit)
SELECT m.id, s.id, 10, 'mg' FROM medicines m, salts s WHERE m.normalized_salt_key LIKE '%montelukast:10mg%' AND s.name = 'Montelukast';
INSERT INTO medicine_salts (medicine_id, salt_id, strength, unit)
SELECT m.id, s.id, 5, 'mg' FROM medicines m, salts s WHERE m.normalized_salt_key LIKE '%levocetirizine:5mg%' AND s.name = 'Levocetirizine';
