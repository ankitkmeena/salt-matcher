# SaltMatch 💊 — Medicine Salt Matcher & Generic Alternative Finder

> **High-Utility Healthcare Platform:** Chronic patients and families spend thousands every month on branded medications that have identical active ingredients at a fraction of the cost. **SaltMatch** matches medicine formulations by their exact active chemical salts, strengths, and delivery profiles to reveal verified, bioequivalent generic and government Jan Aushadhi alternatives—unlocking 60%–90% monthly prescription savings with clinical safety guardrails.

Built on **Cloudflare Pages**, **Cloudflare D1 (Edge SQLite)**, **Pages Functions**, and maintained via **GitHub Actions**.

---

## 🌟 Key Capabilities

1. **Exact Bioequivalent Salt Matcher**
   - Matches drugs using canonical salt keys (e.g., `amoxicillin:500mg+clavulanic_acid:125mg|tablet|immediate_release`).
   - Distinguishes release mechanisms (Immediate Release vs Sustained/Extended Release) to prevent dosing mismatches.
2. **True Generic & Jan Aushadhi Price Comparison**
   - Direct matching against Government of India **Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP)** formulations.
   - Calculates per-strip, per-unit, monthly (30-day course), and annual household savings.
3. **Narrow Therapeutic Index (NTI) Clinical Guardrails**
   - Flags critical drugs where minor bioavailability fluctuations can cause toxicity or therapeutic failure (*Levothyroxine, Warfarin, Lithium, Digoxin*).
   - Displays clear clinical notices advising patients to consult their doctor for blood work (TSH, INR) when switching brands.
4. **Prescription Basket & Family Savings Calculator**
   - Allows adding a full monthly chronic medicine routine (e.g. Blood Pressure + Diabetes + Cholesterol + Acid Reflux).
   - Computes total monthly expenditure vs optimized generic alternative cost.
   - One-click **Printable Doctor Consultation Slip** for patient-physician alignment.
5. **Instant Prescription Text Parser**
   - Paste doctor prescription notes or e-Rx snippets to parse and compare multiple drugs in one click.

---

## 🏗️ System Architecture

```
                       ┌──────────────────────────────────────────────┐
                       │               GitHub Repository              │
                       │           (Code Maintenance & CI/CD)         │
                       └──────────────────────┬───────────────────────┘
                                              │ Git Push (main)
                                              ▼
                       ┌──────────────────────────────────────────────┐
                       │           GitHub Actions Workflow            │
                       │          (Typecheck, Build & Deploy)         │
                       └──────────────────────┬───────────────────────┘
                                              │
                                              ▼
                       ┌──────────────────────────────────────────────┐
                       │          Cloudflare Pages Hosting            │
                       │      (React + Tailwind + Edge Assets)        │
                       └──────────────────────┬───────────────────────┘
                                              │
                    ┌─────────────────────────┴─────────────────────────┐
                    │                                                   │
                    ▼                                                   ▼
       ┌────────────────────────┐                          ┌────────────────────────┐
       │ Cloudflare Pages       │                          │ Cloudflare D1          │
       │ Edge Functions         │ ◄── Zero-latency binding ┤ (Edge SQLite Database) │
       │ (/functions/api/*)     │                          │ (Medicines, Salts,     │
       └────────────────────────┘                          │  Formulations, NTI)    │
                                                           └────────────────────────┘
```

---

## 🚀 Quick Start & Local Development

### 1. Prerequisites
- **Node.js** >= 20
- **npm** >= 10

### 2. Install & Run Locally
```bash
# Clone the repository
git clone https://github.com/your-username/salt-matcher.git
cd salt-matcher

# Install dependencies
npm install

# Start Vite local development server (includes built-in API mock)
npm run dev
```
Visit `http://localhost:5173` to explore the interface with full dataset matching.

---

## ☁️ Cloudflare D1 & Pages Setup

### 1. Create Cloudflare D1 Database
Make sure you are authenticated with Cloudflare via Wrangler:
```bash
npx wrangler login
```

Create your D1 database:
```bash
npx wrangler d1 create salt-matcher-db
```
Wrangler will output your `database_name` and `database_id`. Update `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "salt-matcher-db"
database_id = "<your-d1-database-id>"
```

### 2. Initialize Edge Database Schema & Seed Data

**Local D1 Database (for local edge preview):**
```bash
npm run d1:init
```

**Remote Cloudflare Production D1 Database:**
```bash
npm run d1:init:remote
```

### 3. Test Pages Functions with Local D1 Binding
```bash
npm run build
npm run pages:dev
```

---

## 🐙 GitHub Repository & CI/CD Deployment

The repository includes a GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) that automatically builds and deploys to Cloudflare Pages on push to `main`.

### Required GitHub Repository Secrets
Under your GitHub repository **Settings → Secrets and variables → Actions**, add:
* `CLOUDFLARE_API_TOKEN`: Cloudflare API Token with *Cloudflare Pages: Edit* and *D1: Edit* permissions.
* `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID (found on the Cloudflare dashboard).

### Cloudflare Pages Dashboard Binding
1. In the **Cloudflare Dashboard**, navigate to **Workers & Pages → Pages → salt-matcher**.
2. Go to **Settings → Functions → D1 database bindings**.
3. Add a binding named `DB` pointing to `salt-matcher-db`.

---

## 📂 Project Structure

```
salt-matcher/
├── .github/
│   └── workflows/
│       └── deploy.yml           # Automated Cloudflare Pages deployment
├── functions/
│   ├── api/
│   │   ├── search.ts            # Edge search endpoint (D1 + fallback)
│   │   ├── alternatives.ts      # Bioequivalent matching endpoint
│   │   ├── basket.ts            # Multi-medicine savings calculator API
│   │   └── categories.ts        # Therapeutic categories aggregator
│   └── types.ts                 # Cloudflare D1 worker environment bindings
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Accessible header with Rx basket indicator
│   │   ├── SearchHeader.tsx     # Semantic <search> form & category filter
│   │   ├── MedicineCard.tsx     # Card with composition and pricing
│   │   ├── AlternativeModal.tsx # Side-by-side comparison & NTI caution
│   │   ├── BasketDrawer.tsx     # Monthly Rx basket & printable slip
│   │   ├── PrescriptionParserModal.tsx # Quick paste Rx parser
│   │   └── EducationalSection.tsx # Bioequivalence & Jan Aushadhi FAQs
│   ├── data/
│   │   └── seedData.ts          # Comprehensive seed dataset (50+ medicines)
│   ├── types/
│   │   └── medicine.ts          # Pharmacological models and interfaces
│   ├── utils/
│   │   └── matcher.ts           # Salt canonicalization and savings logic
│   ├── App.tsx                  # Root application view
│   ├── index.css                # Tailwind directives & printable styling
│   └── main.tsx                 # React DOM bootstrap
├── schema.sql                   # D1 database schema with indices
├── seed.sql                     # Production seed data (Brands, Salts, Jan Aushadhi)
├── wrangler.toml                # Cloudflare Pages and D1 edge config
├── tailwind.config.js           # Tailwind design tokens
├── vite.config.ts               # Vite configuration with local API mock
└── package.json
```

---

## ⚕️ Clinical Safety & Ethics Notice

**SaltMatch** provides active chemical composition transparency and public benchmark price comparisons. It is an informational resource and does **not** provide individual medical diagnosis or replace consultation with a qualified medical professional.

Patients taking **Narrow Therapeutic Index (NTI)** medications (such as Levothyroxine or Warfarin) must **never** switch brands without their prescribing doctor's explicit consent and follow-up therapeutic drug monitoring (TDM).

---

## 📄 License
MIT License. Built for universal healthcare affordability and pharmaceutical transparency.
