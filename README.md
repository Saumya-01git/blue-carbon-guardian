# 🌊 Blue Carbon Guardian

> **AI-Powered Coastal Ecosystem Monitoring & 2050 Climate Forecasting Platform for Tamil Nadu, India**

Blue Carbon Guardian is an interactive web application designed to monitor mangrove health, predict climate risk, forecast future canopy growth up to **2050**, and calculate the monetary value of carbon credits for **12 coastal sanctuary sites in Tamil Nadu**.

---

## 📍 12 Monitored Coastal Sanctuaries

1. **Pichavaram Mangroves** (*Cuddalore*)
2. **Muthupet Mangroves** (*Tiruvarur / Thanjavur*)
3. **Point Calimere / Kodiyakkarai** (*Nagapattinam*)
4. **Punnakayal Mangroves** (*Thoothukudi*)
5. **Kazhuveli Wetland Sanctuary** (*Villupuram*)
6. **Pulicat / Pazhaverkadu** (*Tiruvallur*)
7. **Ramanathapuram Islands** (*Ramanathapuram*)
8. **Devipattinam Palk Bay Belt** (*Ramanathapuram / Pudukkottai*)
9. **Kanyakumari Coastal Bio-Shield** (*Kanyakumari*)
10. **Manamelkudi Mangrove Wetland** (*Pudukkottai*)
11. **Ennore Creek Mangrove Bio-Shield** (*Chennai / Tiruvallur*)
12. **Adyar Estuary & Eco-Park Wetland** (*Chennai*)

---

## 🚀 Main Features

- 🗺️ **Interactive GIS Map & Dashboard**: Real-time Leaflet map displaying sanctuary locations, Ramsar status, and climate threat levels.
- 🤖 **AI Risk Engine & What-If Simulator**: Machine Learning model ($R^2 = 0.985$) predicting site vulnerability with custom climate stress sliders (Temperature, Sea Level Rise, Salinity, Dam Cuts, Cyclones).
- 📈 **2025–2050 Long-Term IPCC Climate Forecast**: 25-year predictive curve evaluating canopy area under IPCC AR6 emission scenarios (**SSP2-4.5** vs. **SSP5-8.5**).
- 💰 **Blue Carbon Credit Estimator ($ USD)**: Calculates soil carbon stocks ($\text{tCO}_2\text{e}$) and annual carbon credit revenue under Article 6 of the Paris Agreement.
- 🛰️ **Copernicus Sentinel-2 Satellite NDVI Viewer**: Live 10m spatial resolution vegetation health index ($\text{NDVI}$) and 4-tier canopy health breakdown.
- 📥 **Academic Data Export Suite**: Export custom climate scenario CSV audit reports, 168-sample ML training datasets, and printable PDF dossiers.

---

## 📊 Data Sources Used

- **Forest Survey of India (FSI ISFR)**: Biennial Mangrove Canopy Cover (2013–2023).
- **India Meteorological Department (IMD)**: Cyclones & Climate Normals (1991–2023).
- **INCOIS & Tide Gauges**: Sea Level Rise Rates (mm/yr).
- **National Centre for Coastal Research (NCCR)**: Shoreline Erosion Rates (m/yr).
- **Copernicus Sentinel-2 MSI**: 10m Satellite NDVI Telemetry.

---

## 💻 Quick Start & Running Locally

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
   Open **`http://localhost:5173/`** in your browser.
