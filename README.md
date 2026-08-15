# 🛡️ Blue Carbon Guardian
> **AI-Based Coastal Ecosystem Monitoring and Climate Risk Assessment Platform for Tamil Nadu, India**  
> *Academic Project — Tamil Nadu, India*

[![Vite](https://img.shields.io/badge/Vite-8.2.1-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/Data_License-Open_Government_Data-10b981)](#-data-transparency--academic-integrity)

---

## 📌 Project Overview

**Blue Carbon Guardian** is an interactive web platform designed for monitoring coastal mangrove ecosystems, climate risk indicators, shoreline erosion dynamics, and sea level rise baselines across 8 study sanctuaries in Tamil Nadu, India.

The platform provides researchers, evaluators, and conservationists with comparative multi-year visualizations, location-specific environmental profiles, historical cyclone impact timelines, and community reporting tools.

---

## 📍 8 Verified Tamil Nadu Study Sanctuaries

| Location Name | District | Ecosystem Category | Key Protection / Designation |
| :--- | :--- | :--- | :--- |
| **Pichavaram Mangroves** | Cuddalore | Estuarine Mangroves | Ramsar Site No. 2482 |
| **Muthupet Mangroves** | Tiruvarur / Thanjavur | Lagoon Mangroves | Part of Point Calimere Ramsar Complex (Site #1210) |
| **Point Calimere / Kodiyakkarai** | Nagapattinam | Mangrove Wetlands | Ramsar Site No. 1210 |
| **Punnakayal Mangroves** | Thoothukudi | Estuarine Mangroves | Thamirabarani Estuary Fishbone Restoration Zone |
| **Kazhuveli Wetland Sanctuary** | Villupuram | Lagoon Mangroves | Ramsar Site No. 3026 / TN 16th Bird Sanctuary |
| **Pulicat / Pazhaverkadu** | Tiruvallur | Estuarine Mangroves | Pulicat Lake Bird Sanctuary / CRZ-I Zone |
| **Ramanathapuram Islands** | Ramanathapuram | Seagrass & Island Mangroves | UNESCO Man and Biosphere Reserve (MAB) |
| **Devipattinam Mangrove Belt** | Ramanathapuram | Deltaic Bio-Shield Mangroves | Green Tamil Nadu Mission Coastal Bio-Shield Zone |

---

## 🚀 Key Features

- 🗺️ **Interactive Tamil Nadu Leaflet Map**: Custom sub-ecosystem marker pins displaying site details.
- 📊 **Global Comparison Dashboard**: Side-by-side multi-parameter charts comparing Temperature, Annual Rainfall, FSI Mangrove Cover, NCCR Shoreline Erosion, and INCOIS Sea Level Rise.
- 📈 **Location Detail Profiles**:
  - **FSI Mangrove Cover Trend** across official assessment cycles (2013, 2015, 2017, 2019, 2021, 2023).
  - **IMD Cyclonic Landfall Timeline (2011–2023)** detailing severe storms (*Thane*, *Vardah*, *Gaja*, *Nivar*, *Mandous*, *Michaung*).
  - **Daily Min vs Max Climatological Temperature Ranges** ($^\circ\text{C}$).
  - **🚨 Degradation Drivers & 🌿 Active Restoration Schemes** (*MISHTI Scheme*, *TN-SHORE Mission*, *MSSRF Fishbone Canalization*).
- 📖 **Environmental Glossary & Key Terms Guide**: Searchable plain-English definitions for complex environmental terms.
- 📝 **Community Reporting & Volunteer Plantation Tracker**: User submission forms stored with `localStorage` persistence.
- 🌓 **Dual Environmental Theme System**: Translucent Ocean Teal Dark Mode and Mint Eco Light Mode toggle.

---

## 📜 Data Transparency & Academic Integrity

Every baseline value in this project is sourced from legal, publicly accessible government and research publications:

- **India Meteorological Department (IMD)**: 30-Year Climatological Tables (1991–2020) & Cyclonic Track Records.
- **Forest Survey of India (FSI)**: India State of Forest Reports (ISFR 2013, 2015, 2017, 2019, 2021, 2023).
- **Ramsar Information Service (RSIS)**: Official Ramsar Information Sheets (RIS #2482, #1210, #3026).
- **National Centre for Coastal Research (NCCR)**: Shoreline Change Assessment Atlas (1990–2018).
- **Indian National Centre for Ocean Information Services (INCOIS)**: Tide Gauge Atlas & Coastal Vulnerability Index (CVI).
- **Tamil Nadu Environment & Forest Department**: Green TN Mission & Kazhuveli Management Plan (2024).

> ⚠️ **Zero Synthetic / Interpolated Facts**: Unverified single-year step interpolations were removed. Unlisted pre-sanctuary historical breakups explicitly state `"Data unavailable — Insufficient verified historical data"`.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 19 + Vite 8
- **Styling**: Vanilla CSS + Tailwind CSS v4
- **Charts & Data Viz**: Recharts (ComposedChart, BarChart, LineChart)
- **Geospatial Maps**: Leaflet + React-Leaflet
- **Icons**: Lucide React

---

## 💻 Local Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Saumya-01git/blue-carbon-guardian.git
   cd blue-carbon-guardian
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Build production bundle**:
   ```bash
   npm run build
   ```

---

## 🔬 Future Machine Learning Pipeline

The project includes a pre-processed feature matrix (`master_environmental_data.csv` & `data/verified/master_environmental_data.csv`) structured for Phase 2 climate-risk classification modeling with features:
- `mean_max_temp_c`
- `mean_min_temp_c`
- `annual_rainfall_mm`
- `mangrove_cover_ha`
- `shoreline_erosion_pct`
- `sea_level_rise_mm_yr`
- `cyclone_frequency_10yr`
- `cvi_hazard_class`

---

## 📄 License & Attribution

This academic project is open-source. All environmental baseline datasets belong to their respective authoritative public organizations (IMD, FSI, NCCR, INCOIS, Ramsar).
