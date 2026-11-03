-- ====================================================================
-- SaltMatch: Medicine Salt Matcher & Generic Alternative Finder Schema
-- Target Engine: Cloudflare D1 (SQLite at the Edge)
-- ====================================================================

DROP TABLE IF EXISTS medicine_salts;
DROP TABLE IF EXISTS medicines;
DROP TABLE IF EXISTS salts;

-- 1. Active Pharmaceutical Ingredients / Molecules
CREATE TABLE salts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE COLLATE NOCASE,
    description TEXT,
    is_nti INTEGER NOT NULL DEFAULT 0, -- Narrow Therapeutic Index flag (1 = Caution: small therapeutic window)
    warnings TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Medicine Formulations (Branded, Generic-Branded, Jan Aushadhi)
CREATE TABLE medicines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL COLLATE NOCASE,
    brand_name TEXT NOT NULL COLLATE NOCASE,
    manufacturer TEXT NOT NULL,
    dosage_form TEXT NOT NULL, -- e.g. Tablet, Capsule, Syrup, Inhaler, Injection
    release_mechanism TEXT NOT NULL DEFAULT 'Immediate Release', -- 'Immediate Release', 'Extended Release (ER)', 'Sustained Release (SR)', 'Controlled Release (CR)'
    package_size INTEGER NOT NULL DEFAULT 10, -- number of units per standard strip/pack
    price_inr REAL NOT NULL, -- Retail price (MRP) in INR per strip/pack
    price_per_unit REAL NOT NULL, -- Computed price per tablet/unit
    is_generic INTEGER NOT NULL DEFAULT 0, -- 1 = Generic (Jan Aushadhi or true generic), 0 = Commercial brand
    is_jan_aushadhi INTEGER NOT NULL DEFAULT 0, -- 1 = Government Jan Aushadhi scheme drug
    is_nti INTEGER NOT NULL DEFAULT 0, -- Inherited or specific Narrow Therapeutic Index flag
    therapeutic_category TEXT NOT NULL, -- e.g. Diabetes, Hypertension, Cardiology, Antibiotic, Thyroid, Gastrointestinal, Pain & Analgesic, Respiratory
    composition_summary TEXT NOT NULL, -- Human-readable, e.g. "Amoxicillin (500mg) + Clavulanic Acid (125mg)"
    normalized_salt_key TEXT NOT NULL, -- Canonical string: sorted active molecules + strengths + form + release
    indications TEXT, -- Common usages: "High blood pressure", "Type 2 diabetes", etc.
    prescription_required INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Relation between Medicines and their Salt Ingredients
CREATE TABLE medicine_salts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    medicine_id INTEGER NOT NULL REFERENCES medicines(id) ON DELETE CASCADE,
    salt_id INTEGER NOT NULL REFERENCES salts(id) ON DELETE RESTRICT,
    strength REAL NOT NULL,
    unit TEXT NOT NULL DEFAULT 'mg' -- 'mg', 'mcg', 'g', 'IU', etc.
);

-- Indices for rapid edge queries
CREATE INDEX idx_medicines_salt_key ON medicines(normalized_salt_key);
CREATE INDEX idx_medicines_name ON medicines(name);
CREATE INDEX idx_medicines_brand ON medicines(brand_name);
CREATE INDEX idx_medicines_category ON medicines(therapeutic_category);
CREATE INDEX idx_medicines_generic ON medicines(is_generic, is_jan_aushadhi);
CREATE INDEX idx_medicine_salts_med ON medicine_salts(medicine_id);
CREATE INDEX idx_medicine_salts_salt ON medicine_salts(salt_id);
