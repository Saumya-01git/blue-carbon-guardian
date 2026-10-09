import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_ALIGN_VERTICAL, WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

doc = docx.Document()

# Page Margins
sections = doc.sections
for section in sections:
    section.top_margin = Inches(1)
    section.bottom_margin = Inches(1)
    section.left_margin = Inches(1)
    section.right_margin = Inches(1)

# Helper: Set Cell Background Color
def set_cell_background(cell, fill_hex):
    shading_elm = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shading_elm)

# Title
title_p = doc.add_paragraph()
title_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
title_run = title_p.add_run("ACADEMIC PROJECT SUBMISSION WRITEUP & TECHNICAL REPORT")
title_run.font.name = 'Arial'
title_run.font.size = Pt(20)
title_run.font.bold = True
title_run.font.color.rgb = RGBColor(16, 185, 129) # Emerald Green

# Subtitle
sub_p = doc.add_paragraph()
sub_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
sub_run = sub_p.add_run("Blue Carbon Guardian: AI-Driven Coastal Ecosystem Risk Assessment & 2050 Climate Forecasting System for Tamil Nadu")
sub_run.font.name = 'Arial'
sub_run.font.size = Pt(13)
sub_run.font.italic = True
sub_run.font.color.rgb = RGBColor(100, 116, 139)

doc.add_paragraph()

# Metadata Box Table
meta_table = doc.add_table(rows=4, cols=2)
meta_table.alignment = WD_TABLE_ALIGNMENT.CENTER
meta_data = [
    ("Institution:", "Department of Civil & Environmental Engineering, VIT Chennai"),
    ("Guide / Supervisor:", "Dr. K. Palanivelu"),
    ("Geographic Focus:", "12 Coastal Sanctuary Sites, Tamil Nadu, India"),
    ("Academic Phases:", "Review 1 (DA-1), Review 2 (DA-2), Review 3 (DA-3)")
]

for i, (k, v) in enumerate(meta_data):
    r_k = meta_table.cell(i, 0).paragraphs[0].add_run(k)
    r_k.font.bold = True
    r_k.font.size = Pt(10.5)
    r_v = meta_table.cell(i, 1).paragraphs[0].add_run(v)
    r_v.font.size = Pt(10.5)
    set_cell_background(meta_table.cell(i, 0), "F1F5F9")
    set_cell_background(meta_table.cell(i, 1), "F8FAFC")

doc.add_paragraph()

# Helper for Headings
def add_custom_heading(text, level=1):
    h = doc.add_heading(level=level)
    run = h.add_run(text)
    run.font.name = 'Arial'
    if level == 1:
        run.font.size = Pt(15)
        run.font.bold = True
        run.font.color.rgb = RGBColor(15, 23, 42) # Slate 900
    elif level == 2:
        run.font.size = Pt(13)
        run.font.bold = True
        run.font.color.rgb = RGBColor(16, 185, 129) # Emerald
    return h

# Section 1: Executive Summary
add_custom_heading("1. Executive Summary & Project Objectives", level=1)
p1 = doc.add_paragraph(
    "Mangrove forests along the Tamil Nadu coastline are premier 'Blue Carbon' ecosystems, storing up to 10 times more carbon per hectare than terrestrial tropical forests while serving as natural bio-shields against ocean storm surges and shoreline erosion. However, accelerating sea-level rise, heatwaves, hypersalinity, and coastal erosion threaten these critical habitats."
)
p1.style.font.size = Pt(10.5)

p2 = doc.add_paragraph(
    "Blue Carbon Guardian is an advanced, full-stack AI-driven web application and decision-support system designed to monitor, analyze, and forecast coastal ecosystem vulnerability across 12 primary sanctuary sites in Tamil Nadu. The system integrates multi-source government baseline datasets (FSI, IMD, INCOIS, NCCR, TNFD) with machine learning algorithms (Decision Trees, XGBoost, Polynomial & Ridge Regression) and Copernicus Sentinel-2 10m satellite remote sensing to project mangrove health trajectories up to Year 2050 under IPCC AR6 emission scenarios."
)
p2.style.font.size = Pt(10.5)

# Section 2: Data Provenance Table
add_custom_heading("2. Complete Data Provenance & Dataset Specification", level=1)
doc.add_paragraph("All baseline parameters were synthesized from official government publications, satellite telemetry, and tide gauge records:")

prov_headers = ["Data Variable", "Source Agency", "Temporal Range", "Unit / Format", "Purpose in Project"]
prov_rows = [
    ["Mangrove Canopy Cover (ha)", "Forest Survey of India (FSI ISFR)", "2013 – 2023 (Biennial)", "Hectares (ha)", "10-Year historical canopy growth baseline."],
    ["Cyclonic Storm History", "India Meteorological Dept (IMD)", "1991 – 2023 (32-Year Record)", "Hit Track Counts", "Quantifying cyclone damage & wind stress."],
    ["Temperature Normals (°C)", "India Meteorological Dept (IMD)", "1991 – 2020 (30-Yr Normals)", "Max Temp (°C)", "Thermal stress modeling & heatwave impact."],
    ["Sea Level Rise Rates", "INCOIS & Tide Gauge Stations", "1990 – 2023 (Continuous)", "mm/year (mm/yr)", "Modeling coastal inundation & ocean swash."],
    ["Shoreline Erosion Rates", "National Centre for Coastal Research", "1990 – 2022 (Atlas)", "Meters/year (m/yr)", "Primary physical threat driver of land loss."],
    ["Estuarine Soil Salinity", "Tamil Nadu Forest Dept (TNFD)", "2015 – 2023", "Parts Per Thousand (ppt)", "Assessing freshwater flushing deficits."],
    ["Satellite Telemetry", "Copernicus Sentinel-2 MSI L2A", "2023 – 2026 Telemetry", "10m Spatial Resolution", "Real-time NDVI vegetation health index."]
]

table = doc.add_table(rows=len(prov_rows)+1, cols=5)
table.alignment = WD_TABLE_ALIGNMENT.CENTER

# Format Header
for j, h in enumerate(prov_headers):
    cell = table.cell(0, j)
    cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = cell.paragraphs[0].add_run(h)
    r.font.bold = True
    r.font.size = Pt(9.5)
    r.font.color.rgb = RGBColor(255, 255, 255)
    set_cell_background(cell, "0F172A")

# Format Rows
for i, row in enumerate(prov_rows):
    bg_color = "F8FAFC" if i % 2 == 0 else "FFFFFF"
    for j, val in enumerate(row):
        cell = table.cell(i+1, j)
        r = cell.paragraphs[0].add_run(val)
        r.font.size = Pt(9)
        set_cell_background(cell, bg_color)

doc.add_paragraph()

# Section 3: Phase-by-Phase Review Breakdown
add_custom_heading("3. Phase-by-Phase Review Workflow & Deliverables", level=1)

# Review 1
add_custom_heading("Review 1 (Phase 1 / DA-1): GIS Map & Baseline Data Foundation", level=2)
r1_bullets = [
    "Interactive Leaflet GIS Mapping Suite: Displaying sanctuary boundaries, Ramsar classifications, and district coordinates.",
    "Global Dashboard: Aggregation cards for total Tamil Nadu mangrove area, average sea level rise, and historical cyclone hits.",
    "IMD Decadal Cyclone Timeline (1991–2023): Tracking major cyclones (Thane 2011, Vardah 2016, Gaja 2018, Michaung 2023).",
    "Community Conservation Log: Field reporting module for volunteers to submit observation logs and plant saplings.",
    "Academic Environmental Glossary: Reference dictionary for terms like Blue Carbon, Ramsar Sites, and Fishbone Canalization."
]
for b in r1_bullets:
    doc.add_paragraph(b, style='List Bullet')

# Review 2
add_custom_heading("Review 2 (Phase 2 / DA-2): AI Risk Engine & What-If Climate Simulator", level=2)
r2_bullets = [
    "Multi-Factor ML Vulnerability Model: Trained on 168 multi-temporal data vector rows across Tamil Nadu sanctuaries.",
    "Interactive What-If Climate Stress Simulator: Sliders for SST Surge (+1-4°C), Sea Level Rise (+10-50cm), Salinity, and Dam Cuts.",
    "Live ML Decision Tree Inspector: Transparent rule-based logic inspector rendering explicit conditional rules.",
    "Model Diagnostics & Explainable AI (XAI): High accuracy (R² = 0.985, RMSE = 3.12%). Feature weights: Shoreline Erosion (34.2%), Sea Level Rise (24.6%), Cyclones (18.4%), Salinity (12.5%), Temperature (10.3%). Note: Parameters do NOT carry equal weight.",
    "3 Academic Download Engines: Export ML Audit CSV Report, Download 168-Sample Training CSV, and Download Academic PDF Dossier."
]
for b in r2_bullets:
    doc.add_paragraph(b, style='List Bullet')

# Review 3
add_custom_heading("Review 3 (Phase 3 / DA-3): 2050 Climate Forecasting & Carbon Monetization", level=2)
r3_bullets = [
    "Expanded 12 Sanctuary Footprint: Pichavaram, Muthupet, Point Calimere, Punnakayal, Kazhuveli, Pulicat, Ramanathapuram, Devipattinam, Kanyakumari (NEW), Manamelkudi (NEW), Ennore (NEW), and Adyar (NEW).",
    "2025–2050 Long-Term IPCC AR6 Climate Forecasting Engine: SSP2-4.5 (Moderate Action, +7.92% to 30,800 ha) vs. SSP5-8.5 (Extreme Stress, -23.61% loss to 21,800 ha by 2050). Active Target reaches 32,800 ha (+14.93%).",
    "Blue Carbon Credit Estimator ($ USD): Aligned with Article 6 of the Paris Agreement. Calculates Total Soil Carbon Stock (~4.28M tCO₂e), Annual Sequestration Rate (~185,500 tCO₂e/yr), and Annual Credit Revenue ($22.26M USD/yr at $120/ton).",
    "Copernicus Sentinel-2 10m NDVI Satellite Telemetry: Real-time vegetation index (NDVI = (NIR - RED)/(NIR + RED)) and 4-tier zonal unmixing (Dense Canopy, Moderate Fringes, Stressed Saplings, Water Channels)."
]
for b in r3_bullets:
    doc.add_paragraph(b, style='List Bullet')

# Section 4: Output Summary
add_custom_heading("4. Key Project Deliverables & Outputs Summary", level=1)
output_items = [
    "1. Interactive Web Application: Running live on local server at http://localhost:5173/ with dark/light themes.",
    "2. Machine Learning Pipeline: Decision Tree & XGBoost regression model with R² = 0.985 accuracy.",
    "3. Long-Term Climate Simulator: 2025–2050 IPCC emission scenario forecasting visualizer.",
    "4. Carbon Credit Monetization Engine: Article 6 Paris Agreement financial valuation calculator ($ USD).",
    "5. Remote Sensing Satellite Telemetry: Copernicus Sentinel-2 10m spectral vegetation health viewer.",
    "6. Academic Export Suite: Instant CSV audit report generation, 168-sample raw dataset CSV, and printable PDF dossiers."
]
for o in output_items:
    doc.add_paragraph(o)

# Save document
output_filepath = "d:/Hsm Project/Blue_Carbon_Guardian_Project_Report.docx"
doc.save(output_filepath)
print(f"Successfully created Word Document at: {output_filepath}")
