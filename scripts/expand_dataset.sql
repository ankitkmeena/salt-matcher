-- ==============================================================================
-- SALTS EXPANSION (IDs 21 - 35)
-- ==============================================================================
INSERT OR IGNORE INTO salts (id, name, description, is_nti, warnings) VALUES
(21, 'Dapagliflozin', 'SGLT2 inhibitor that reduces renal glucose reabsorption for Type 2 Diabetes, heart failure, and chronic kidney disease.', 0, 'Risk of genital mycotic infections and euglycemic DKA; ensure adequate hydration.'),
(22, 'Empagliflozin', 'Potent selective SGLT2 inhibitor proven to reduce cardiovascular mortality in T2D and heart failure with reduced ejection fraction.', 0, 'Monitor for volume depletion, hypotension, and UTI symptoms.'),
(23, 'Teneligliptin', 'Third-generation DPP-4 inhibitor that increases active incretin hormone concentrations.', 0, 'Can be safely used in renal impairment without dose adjustment; watch for hypoglycemia with sulfonylureas.'),
(24, 'Vildagliptin', 'Selective DPP-4 inhibitor preventing GLP-1 inactivation in Type 2 Diabetes.', 0, 'Perform liver function tests at baseline and periodically during therapy.'),
(25, 'Cefixime', 'Broad-spectrum third-generation oral cephalosporin antibiotic active against Gram-negative and Gram-positive pathogens.', 0, 'Complete the full course; caution in patients with history of penicillin hypersensitivity.'),
(26, 'Azithromycin', 'Subclass azalide macrolide antibiotic with long tissue half-life used for respiratory tract and soft tissue infections.', 0, 'May prolong cardiac QT interval; avoid concurrent antiarrhythmics.'),
(27, 'Ciprofloxacin', 'Broad-spectrum fluoroquinolone antibiotic targeting bacterial DNA gyrase and topoisomerase IV.', 0, 'Black box warning: risk of tendonitis, tendon rupture, and peripheral neuropathy. Avoid in pregnancy/children unless essential.'),
(28, 'Rabeprazole Sodium', 'Potent substituted benzimidazole proton pump inhibitor (PPI) with rapid onset of gastric acid suppression.', 0, 'Prolonged high-dose use may impair calcium and B12 absorption.'),
(29, 'Esomeprazole Magnesium', 'S-enantiomer of omeprazole offering superior bioavailability and sustained 24-hr intragastric pH > 4.', 0, 'May interact with clopidogrel; monitor bone density in long-term elderly users.'),
(30, 'Metoprolol Succinate', 'Cardioselective beta-1 adrenergic blocker formulated for continuous 24-hour hemodynamic control.', 0, 'Do not abruptly discontinue; taper over 1-2 weeks to avoid rebound hypertension/angina.'),
(31, 'Nebivolol', 'Highly selective beta-1 blocker with nitric oxide-mediated endothelial vasodilating properties.', 0, 'Contraindicated in severe bradycardia, cardiogenic shock, and severe hepatic impairment.'),
(32, 'Clopidogrel Bisulfate', 'Thienopyridine P2Y12 platelet aggregation inhibitor reducing atherothrombotic events after MI, stroke, or stenting.', 0, 'Bleeding risk. Discontinue 5 days prior to elective surgery under cardiologist direction.'),
(33, 'Etoricoxib', 'Second-generation selective COX-2 inhibitor with high anti-inflammatory and analgesic efficacy for osteoarthritis and gout.', 0, 'Cardiovascular risk: use lowest effective dose for shortest duration; monitor BP regularly.'),
(34, 'Tamsulosin Hydrochloride', 'Selective alpha-1A/1D adrenoceptor antagonist relaxing prostatic smooth muscle in BPH.', 0, 'First-dose syncope/orthostatic hypotension risk; warn eye surgeon before cataract surgery (IFIS risk).'),
(35, 'Dutasteride', 'Dual 5-alpha-reductase inhibitor (types 1 & 2) blocking testosterone to dihydrotestosterone conversion.', 0, 'Contraindicated in women of childbearing age (teratogenic); may reduce serum PSA levels by ~50%.');

-- ==============================================================================
-- MEDICINES EXPANSION (IDs 43 - 87)
-- ==============================================================================
INSERT OR IGNORE INTO medicines (id, name, brand_name, manufacturer, dosage_form, release_mechanism, package_size, price_inr, price_per_unit, is_generic, is_jan_aushadhi, is_nti, therapeutic_category, composition_summary, normalized_salt_key, indications, prescription_required) VALUES

-- 1. Dapagliflozin 10mg (Diabetes & Heart Failure)
(43, 'Forxiga 10mg Tablet', 'Forxiga', 'AstraZeneca India Ltd', 'Tablet', 'Immediate Release', 14, 885.00, 63.21, 0, 0, 0, 'Diabetes', 'Dapagliflozin (10mg)', 'dapagliflozin:10mg|tablet|immediate_release', 'Type 2 Diabetes, Chronic Kidney Disease, Heart Failure (HFrEF)', 1),
(44, 'Dapanorm 10 Tablet', 'Dapanorm', 'Alkem Laboratories Ltd', 'Tablet', 'Immediate Release', 10, 165.00, 16.50, 0, 0, 0, 'Diabetes', 'Dapagliflozin (10mg)', 'dapagliflozin:10mg|tablet|immediate_release', 'Type 2 Diabetes and glycemic regulation', 1),
(45, 'Jan Aushadhi Dapagliflozin 10mg Tablets', 'Jan Aushadhi Generic', 'BPPI (PMBJP)', 'Tablet', 'Immediate Release', 10, 68.00, 6.80, 1, 1, 0, 'Diabetes', 'Dapagliflozin (10mg)', 'dapagliflozin:10mg|tablet|immediate_release', 'Type 2 Diabetes, renal and cardiac protection', 1),

-- 2. Empagliflozin 10mg (Diabetes & Cardiovascular Protection)
(46, 'Jardiance 10mg Tablet', 'Jardiance', 'Boehringer Ingelheim India', 'Tablet', 'Immediate Release', 10, 610.00, 61.00, 0, 0, 0, 'Diabetes', 'Empagliflozin (10mg)', 'empagliflozin:10mg|tablet|immediate_release', 'Type 2 Diabetes and cardiovascular death reduction', 1),
(47, 'Gibtulio 10mg Tablet', 'Gibtulio', 'Lupin Ltd', 'Tablet', 'Immediate Release', 10, 195.00, 19.50, 0, 0, 0, 'Diabetes', 'Empagliflozin (10mg)', 'empagliflozin:10mg|tablet|immediate_release', 'Type 2 Diabetes management', 1),
(48, 'Jan Aushadhi Empagliflozin 10mg Tablets', 'Jan Aushadhi Generic', 'BPPI (PMBJP)', 'Tablet', 'Immediate Release', 10, 75.00, 7.50, 1, 1, 0, 'Diabetes', 'Empagliflozin (10mg)', 'empagliflozin:10mg|tablet|immediate_release', 'Type 2 Diabetes and cardiac glycemic control', 1),

-- 3. Sitagliptin 50mg + Metformin 500mg (Combination Diabetes)
(49, 'Janumet 50mg/500mg Tablet', 'Janumet', 'MSD Pharmaceuticals / Sun Pharma', 'Tablet', 'Immediate Release', 15, 340.00, 22.67, 0, 0, 0, 'Diabetes', 'Sitagliptin (50mg) + Metformin Hydrochloride (500mg)', 'metformin_hydrochloride:500mg+sitagliptin:50mg|tablet|immediate_release', 'Dual oral therapy for Type 2 Diabetes refractory to monotherapy', 1),
(50, 'Istamet 50mg/500mg Tablet', 'Istamet', 'Sun Pharmaceutical Industries Ltd', 'Tablet', 'Immediate Release', 15, 220.00, 14.67, 0, 0, 0, 'Diabetes', 'Sitagliptin (50mg) + Metformin Hydrochloride (500mg)', 'metformin_hydrochloride:500mg+sitagliptin:50mg|tablet|immediate_release', 'Type 2 Diabetes blood sugar control', 1),
(51, 'Jan Aushadhi Sitagliptin 50mg + Metformin 500mg', 'Jan Aushadhi Generic', 'BPPI (PMBJP)', 'Tablet', 'Immediate Release', 15, 60.00, 4.00, 1, 1, 0, 'Diabetes', 'Sitagliptin (50mg) + Metformin Hydrochloride (500mg)', 'metformin_hydrochloride:500mg+sitagliptin:50mg|tablet|immediate_release', 'Dual control for Type 2 Diabetes', 1),

-- 4. Teneligliptin 20mg (Diabetes)
(52, 'Zita Plus 20mg Tablet', 'Zita Plus', 'Glenmark Pharmaceuticals Ltd', 'Tablet', 'Immediate Release', 10, 145.00, 14.50, 0, 0, 0, 'Diabetes', 'Teneligliptin (20mg)', 'teneligliptin:20mg|tablet|immediate_release', 'Type 2 Diabetes in patients with normal or impaired renal function', 1),
(53, 'Tendia 20mg Tablet', 'Tendia', 'FDC Ltd', 'Tablet', 'Immediate Release', 10, 110.00, 11.00, 0, 0, 0, 'Diabetes', 'Teneligliptin (20mg)', 'teneligliptin:20mg|tablet|immediate_release', 'Type 2 Diabetes postprandial glucose management', 1),
(54, 'Jan Aushadhi Teneligliptin 20mg Tablets', 'Jan Aushadhi Generic', 'BPPI (PMBJP)', 'Tablet', 'Immediate Release', 10, 32.00, 3.20, 1, 1, 0, 'Diabetes', 'Teneligliptin (20mg)', 'teneligliptin:20mg|tablet|immediate_release', 'Type 2 Diabetes glycemic therapy', 1),

-- 5. Vildagliptin 50mg (Diabetes)
(55, 'Galvus 50mg Tablet', 'Galvus', 'Novartis India Ltd', 'Tablet', 'Immediate Release', 14, 295.00, 21.07, 0, 0, 0, 'Diabetes', 'Vildagliptin (50mg)', 'vildagliptin:50mg|tablet|immediate_release', 'Type 2 Diabetes glycemic therapy', 1),
(56, 'Vildamac 50 Tablet', 'Vildamac', 'Macleods Pharmaceuticals Ltd', 'Tablet', 'Immediate Release', 14, 120.00, 8.57, 0, 0, 0, 'Diabetes', 'Vildagliptin (50mg)', 'vildagliptin:50mg|tablet|immediate_release', 'Type 2 Diabetes control', 1),
(57, 'Jan Aushadhi Vildagliptin 50mg Tablets', 'Jan Aushadhi Generic', 'BPPI (PMBJP)', 'Tablet', 'Immediate Release', 14, 45.00, 3.21, 1, 1, 0, 'Diabetes', 'Vildagliptin (50mg)', 'vildagliptin:50mg|tablet|immediate_release', 'Type 2 Diabetes control', 1),

-- 6. Cefixime 200mg (Antibiotic)
(58, 'Taxim-O 200 Tablet', 'Taxim-O', 'Alkem Laboratories Ltd', 'Tablet', 'Immediate Release', 10, 118.00, 11.80, 0, 0, 0, 'Antibiotic', 'Cefixime (200mg)', 'cefixime:200mg|tablet|immediate_release', 'Typhoid fever, respiratory tract and urinary tract infections', 1),
(59, 'Zifi 200 Tablet', 'Zifi', 'FDC Ltd', 'Tablet', 'Immediate Release', 10, 112.00, 11.20, 0, 0, 0, 'Antibiotic', 'Cefixime (200mg)', 'cefixime:200mg|tablet|immediate_release', 'Bacterial respiratory and ENT infections', 1),
(60, 'Jan Aushadhi Cefixime 200mg Tablets', 'Jan Aushadhi Generic', 'BPPI (PMBJP)', 'Tablet', 'Immediate Release', 10, 36.00, 3.60, 1, 1, 0, 'Antibiotic', 'Cefixime (200mg)', 'cefixime:200mg|tablet|immediate_release', 'Broad spectrum cephalosporin for bacterial infections', 1),

-- 7. Azithromycin 500mg (Antibiotic)
(61, 'Azithral 500 Tablet', 'Azithral', 'Alembic Pharmaceuticals Ltd', 'Tablet', 'Immediate Release', 5, 132.00, 26.40, 0, 0, 0, 'Antibiotic', 'Azithromycin (500mg)', 'azithromycin:500mg|tablet|immediate_release', 'Pneumonia, bronchitis, tonsillitis, and skin infections', 1),
(62, 'Azee 500 Tablet', 'Azee', 'Cipla Ltd', 'Tablet', 'Immediate Release', 5, 125.00, 25.00, 0, 0, 0, 'Antibiotic', 'Azithromycin (500mg)', 'azithromycin:500mg|tablet|immediate_release', 'Respiratory tract bacterial infections', 1),
(63, 'Jan Aushadhi Azithromycin 500mg Tablets', 'Jan Aushadhi Generic', 'BPPI (PMBJP)', 'Tablet', 'Immediate Release', 5, 42.00, 8.40, 1, 1, 0, 'Antibiotic', 'Azithromycin (500mg)', 'azithromycin:500mg|tablet|immediate_release', 'Bacterial infection short-course therapy', 1),

-- 8. Ciprofloxacin 500mg (Antibiotic)
(64, 'Cifran 500 Tablet', 'Cifran', 'Sun Pharmaceutical Industries Ltd', 'Tablet', 'Immediate Release', 10, 48.00, 4.80, 0, 0, 0, 'Antibiotic', 'Ciprofloxacin (500mg)', 'ciprofloxacin:500mg|tablet|immediate_release', 'Urinary tract, abdominal, and joint bacterial infections', 1),
(65, 'Ciplox 500 Tablet', 'Ciplox', 'Cipla Ltd', 'Tablet', 'Immediate Release', 10, 45.00, 4.50, 0, 0, 0, 'Antibiotic', 'Ciprofloxacin (500mg)', 'ciprofloxacin:500mg|tablet|immediate_release', 'Bacterial infections and enteric fever', 1),
(66, 'Jan Aushadhi Ciprofloxacin 500mg Tablets', 'Jan Aushadhi Generic', 'BPPI (PMBJP)', 'Tablet', 'Immediate Release', 10, 15.00, 1.50, 1, 1, 0, 'Antibiotic', 'Ciprofloxacin (500mg)', 'ciprofloxacin:500mg|tablet|immediate_release', 'Urinary tract and enteric bacterial infections', 1),

-- 9. Rabeprazole 20mg + Domperidone 30mg SR (Gastrointestinal)
(67, 'Razo-D Capsule SR', 'Razo-D', 'Dr. Reddys Laboratories Ltd', 'Capsule', 'Sustained Release (SR)', 15, 240.00, 16.00, 0, 0, 0, 'Gastrointestinal', 'Rabeprazole Sodium (20mg) + Domperidone (30mg SR)', 'domperidone:30mg+rabeprazole_sodium:20mg|capsule|sustained_release', 'Acid reflux, GERD, and nausea/dyspepsia', 1),
(68, 'Happi-D Capsule SR', 'Happi-D', 'Zydus Healthcare Ltd', 'Capsule', 'Sustained Release (SR)', 10, 198.00, 19.80, 0, 0, 0, 'Gastrointestinal', 'Rabeprazole Sodium (20mg) + Domperidone (30mg SR)', 'domperidone:30mg+rabeprazole_sodium:20mg|capsule|sustained_release', 'Erosive esophagitis and indigestion', 1),
(69, 'Jan Aushadhi Rabeprazole 20mg + Domperidone 30mg SR', 'Jan Aushadhi Generic', 'BPPI (PMBJP)', 'Capsule', 'Sustained Release (SR)', 10, 42.00, 4.20, 1, 1, 0, 'Gastrointestinal', 'Rabeprazole Sodium (20mg) + Domperidone (30mg SR)', 'domperidone:30mg+rabeprazole_sodium:20mg|capsule|sustained_release', 'Hyperacidity and reflux relief', 1),

-- 10. Esomeprazole 40mg (Gastrointestinal)
(70, 'Nexpro 40 Tablet', 'Nexpro', 'Torrent Pharmaceuticals Ltd', 'Tablet', 'Immediate Release', 15, 162.00, 10.80, 0, 0, 0, 'Gastrointestinal', 'Esomeprazole Magnesium (40mg)', 'esomeprazole_magnesium:40mg|tablet|immediate_release', 'Zollinger-Ellison syndrome, severe GERD, ulcer prophylaxis', 1),
(71, 'Sompraz 40 Tablet', 'Sompraz', 'Sun Pharmaceutical Industries Ltd', 'Tablet', 'Immediate Release', 15, 155.00, 10.33, 0, 0, 0, 'Gastrointestinal', 'Esomeprazole Magnesium (40mg)', 'esomeprazole_magnesium:40mg|tablet|immediate_release', 'Acid peptic disease and reflux healing', 1),
(72, 'Jan Aushadhi Esomeprazole 40mg Tablets', 'Jan Aushadhi Generic', 'BPPI (PMBJP)', 'Tablet', 'Immediate Release', 15, 34.00, 2.27, 1, 1, 0, 'Gastrointestinal', 'Esomeprazole Magnesium (40mg)', 'esomeprazole_magnesium:40mg|tablet|immediate_release', 'Intensive acid suppression', 1),

-- 11. Metoprolol Succinate 50mg ER (Cardiovascular & BP)
(73, 'Betaloc 50 Tablet PR', 'Betaloc', 'AstraZeneca India Ltd', 'Tablet', 'Sustained Release (SR)', 30, 195.00, 6.50, 0, 0, 0, 'Cardiovascular', 'Metoprolol Succinate (50mg ER)', 'metoprolol_succinate:50mg|tablet|sustained_release', 'Hypertension, Angina Pectoris, Heart Failure (NYHA Class II-IV)', 1),
(74, 'Metolar XR 50 Tablet', 'Metolar XR', 'Cipla Ltd', 'Tablet', 'Sustained Release (SR)', 15, 145.00, 9.67, 0, 0, 0, 'Cardiovascular', 'Metoprolol Succinate (50mg ER)', 'metoprolol_succinate:50mg|tablet|sustained_release', '24-hour rate control and hypertension', 1),
(75, 'Jan Aushadhi Metoprolol Succinate 50mg ER', 'Jan Aushadhi Generic', 'BPPI (PMBJP)', 'Tablet', 'Sustained Release (SR)', 15, 28.00, 1.87, 1, 1, 0, 'Cardiovascular', 'Metoprolol Succinate (50mg ER)', 'metoprolol_succinate:50mg|tablet|sustained_release', '24-hour hemodynamic and BP stabilization', 1),

-- 12. Nebivolol 5mg (Hypertension & Vasodilation)
(76, 'Nebicard 5 Tablet', 'Nebicard', 'Torrent Pharmaceuticals Ltd', 'Tablet', 'Immediate Release', 10, 185.00, 18.50, 0, 0, 0, 'Hypertension', 'Nebivolol (5mg)', 'nebivolol:5mg|tablet|immediate_release', 'Essential hypertension and chronic heart failure', 1),
(77, 'Nebicip 5 Tablet', 'Nebicip', 'Cipla Ltd', 'Tablet', 'Immediate Release', 10, 140.00, 14.00, 0, 0, 0, 'Hypertension', 'Nebivolol (5mg)', 'nebivolol:5mg|tablet|immediate_release', 'Vasodilating blood pressure control', 1),
(78, 'Jan Aushadhi Nebivolol 5mg Tablets', 'Jan Aushadhi Generic', 'BPPI (PMBJP)', 'Tablet', 'Immediate Release', 10, 24.00, 2.40, 1, 1, 0, 'Hypertension', 'Nebivolol (5mg)', 'nebivolol:5mg|tablet|immediate_release', 'Blood pressure management with nitric oxide release', 1),

-- 13. Clopidogrel 75mg (Blood Thinner & Antiplatelet)
(79, 'Plavix 75mg Tablet', 'Plavix', 'Sanofi India Ltd', 'Tablet', 'Immediate Release', 15, 1120.00, 74.67, 0, 0, 0, 'Cardiovascular', 'Clopidogrel Bisulfate (75mg)', 'clopidogrel_bisulfate:75mg|tablet|immediate_release', 'Prevention of stroke, myocardial infarction, and vascular death in CAD', 1),
(80, 'Deplatt 75 Tablet', 'Deplatt', 'Torrent Pharmaceuticals Ltd', 'Tablet', 'Immediate Release', 15, 135.00, 9.00, 0, 0, 0, 'Cardiovascular', 'Clopidogrel Bisulfate (75mg)', 'clopidogrel_bisulfate:75mg|tablet|immediate_release', 'Antiplatelet therapy for coronary artery disease', 1),
(81, 'Jan Aushadhi Clopidogrel 75mg Tablets', 'Jan Aushadhi Generic', 'BPPI (PMBJP)', 'Tablet', 'Immediate Release', 15, 32.00, 2.13, 1, 1, 0, 'Cardiovascular', 'Clopidogrel Bisulfate (75mg)', 'clopidogrel_bisulfate:75mg|tablet|immediate_release', 'Cardiovascular antiplatelet therapy', 1),

-- 14. Etoricoxib 90mg (Joint Pain & Arthritis)
(82, 'Nucoxia 90 Tablet', 'Nucoxia', 'Cadila Pharmaceuticals Ltd', 'Tablet', 'Immediate Release', 15, 198.00, 13.20, 0, 0, 0, 'Pain & Analgesic', 'Etoricoxib (90mg)', 'etoricoxib:90mg|tablet|immediate_release', 'Osteoarthritis, rheumatoid arthritis, ankylosing spondylitis, acute gout', 1),
(83, 'Etoshine 90 Tablet', 'Etoshine', 'Sun Pharmaceutical Industries Ltd', 'Tablet', 'Immediate Release', 10, 185.00, 18.50, 0, 0, 0, 'Pain & Analgesic', 'Etoricoxib (90mg)', 'etoricoxib:90mg|tablet|immediate_release', 'Acute gouty arthritis and joint pain', 1),
(84, 'Jan Aushadhi Etoricoxib 90mg Tablets', 'Jan Aushadhi Generic', 'BPPI (PMBJP)', 'Tablet', 'Immediate Release', 10, 38.00, 3.80, 1, 1, 0, 'Pain & Analgesic', 'Etoricoxib (90mg)', 'etoricoxib:90mg|tablet|immediate_release', 'Targeted COX-2 pain and inflammation relief', 1),

-- 15. Tamsulosin 0.4mg + Dutasteride 0.5mg (Prostate & Urology)
(85, 'Urimax-D Tablet', 'Urimax-D', 'Cipla Ltd', 'Tablet', 'Immediate Release', 15, 498.00, 33.20, 0, 0, 0, 'Cardiovascular', 'Tamsulosin Hydrochloride (0.4mg) + Dutasteride (0.5mg)', 'dutasteride:0.5mg+tamsulosin_hydrochloride:0.4mg|tablet|immediate_release', 'Benign Prostatic Hyperplasia (BPH) urinary flow improvement and size reduction', 1),
(86, 'Veltam-Plus Tablet', 'Veltam-Plus', 'Intas Pharmaceuticals Ltd', 'Tablet', 'Immediate Release', 15, 440.00, 29.33, 0, 0, 0, 'Cardiovascular', 'Tamsulosin Hydrochloride (0.4mg) + Dutasteride (0.5mg)', 'dutasteride:0.5mg+tamsulosin_hydrochloride:0.4mg|tablet|immediate_release', 'BPH urinary obstruction and prostate enlargement', 1),
(87, 'Jan Aushadhi Tamsulosin 0.4mg + Dutasteride 0.5mg', 'Jan Aushadhi Generic', 'BPPI (PMBJP)', 'Tablet', 'Immediate Release', 15, 88.00, 5.87, 1, 1, 0, 'Cardiovascular', 'Tamsulosin Hydrochloride (0.4mg) + Dutasteride (0.5mg)', 'dutasteride:0.5mg+tamsulosin_hydrochloride:0.4mg|tablet|immediate_release', 'BPH dual relaxation and volume control', 1);

-- ==============================================================================
-- MEDICINE_SALTS JOIN EXPANSION
-- ==============================================================================
INSERT OR IGNORE INTO medicine_salts (medicine_id, salt_id, strength, unit) VALUES
-- Dapagliflozin (43, 44, 45) -> salt 21
(43, 21, 10, 'mg'),
(44, 21, 10, 'mg'),
(45, 21, 10, 'mg'),

-- Empagliflozin (46, 47, 48) -> salt 22
(46, 22, 10, 'mg'),
(47, 22, 10, 'mg'),
(48, 22, 10, 'mg'),

-- Sitagliptin + Metformin (49, 50, 51) -> salt 19, salt 3
(49, 19, 50, 'mg'), (49, 3, 500, 'mg'),
(50, 19, 50, 'mg'), (50, 3, 500, 'mg'),
(51, 19, 50, 'mg'), (51, 3, 500, 'mg'),

-- Teneligliptin (52, 53, 54) -> salt 23
(52, 23, 20, 'mg'),
(53, 23, 20, 'mg'),
(54, 23, 20, 'mg'),

-- Vildagliptin (55, 56, 57) -> salt 24
(55, 24, 50, 'mg'),
(56, 24, 50, 'mg'),
(57, 24, 50, 'mg'),

-- Cefixime (58, 59, 60) -> salt 25
(58, 25, 200, 'mg'),
(59, 25, 200, 'mg'),
(60, 25, 200, 'mg'),

-- Azithromycin (61, 62, 63) -> salt 26
(61, 26, 500, 'mg'),
(62, 26, 500, 'mg'),
(63, 26, 500, 'mg'),

-- Ciprofloxacin (64, 65, 66) -> salt 27
(64, 27, 500, 'mg'),
(65, 27, 500, 'mg'),
(66, 27, 500, 'mg'),

-- Rabeprazole + Domperidone (67, 68, 69) -> salt 28, salt 10
(67, 28, 20, 'mg'), (67, 10, 30, 'mg'),
(68, 28, 20, 'mg'), (68, 10, 30, 'mg'),
(69, 28, 20, 'mg'), (69, 10, 30, 'mg'),

-- Esomeprazole (70, 71, 72) -> salt 29
(70, 29, 40, 'mg'),
(71, 29, 40, 'mg'),
(72, 29, 40, 'mg'),

-- Metoprolol Succinate (73, 74, 75) -> salt 30
(73, 30, 50, 'mg'),
(74, 30, 50, 'mg'),
(75, 30, 50, 'mg'),

-- Nebivolol (76, 77, 78) -> salt 31
(76, 31, 5, 'mg'),
(77, 31, 5, 'mg'),
(78, 31, 5, 'mg'),

-- Clopidogrel (79, 80, 81) -> salt 32
(79, 32, 75, 'mg'),
(80, 32, 75, 'mg'),
(81, 32, 75, 'mg'),

-- Etoricoxib (82, 83, 84) -> salt 33
(82, 33, 90, 'mg'),
(83, 33, 90, 'mg'),
(84, 33, 90, 'mg'),

-- Tamsulosin + Dutasteride (85, 86, 87) -> salt 34, salt 35
(85, 34, 0.4, 'mg'), (85, 35, 0.5, 'mg'),
(86, 34, 0.4, 'mg'), (86, 35, 0.5, 'mg'),
(87, 34, 0.4, 'mg'), (87, 35, 0.5, 'mg');
