------Problem Statement:
Manufacturing industries generate large volumes of batch production data, but struggle to:
Identify optimal production conditions
Balance multiple objectives such as cost, efficiency, and quality
Extract actionable insights from historical production records
Make intelligent real-time production decisions
Traditional optimization methods fail to provide AI-driven multi-objective recommendations.

-------Proposed Solution

OmniGen is an AI-powered manufacturing optimization system that:

Identifies Golden Production Signatures
Computes Smart Similarity Index (SSI)
Uses Multi-Objective Optimization (NSGA-II)
Generates Pareto Optimal Production Recommendations
Provides Interactive Dashboard Visualization

This enables industries to:

✔ Reduce production cost
✔ Improve product quality
✔ Optimize process efficiency
✔ Make AI-driven decisions

-------System Architecture:
React Frontend (Visualization Dashboard)
            ↓
FastAPI Backend (API Layer)
            ↓
Optimization Engine (NSGA-II)
            ↓
Feature Engineering + SSI Computation
            ↓
Processed Manufacturing Dataset

---------Detailed Project Structure:
OmniGen/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── App.jsx
│   │   │   → Main dashboard layout and routing
│   │   │
│   │   ├── main.jsx
│   │   │   → React application entry point
│   │   │
│   │   ├── ParetoChart.jsx
│   │   │   → Visualization of Pareto frontier results
│   │   │
│   │   ├── Recommendations.jsx
│   │   │   → Displays AI optimization recommendations
│   │   │
│   │   ├── App.css
│   │   ├── index.css
│   │   │   → Styling using Tailwind + custom CSS
│   │   │
│   │   └── assets/
│   │       → Static UI assets
│   │
│   ├── public/
│   │   → Static public resources
│   │
│   ├── package.json
│   │   → Frontend dependencies and scripts
│   │
│   ├── vite.config.js
│   │   → Vite configuration
│   │
│   ├── tailwind.config.js
│   │   → Tailwind styling configuration
│   │
│   └── postcss.config.js
│       → CSS processing configuration
│
│
├── backend/
│   │
│   ├── src/
│   │   │
│   │   ├── api.py
│   │   │   → FastAPI application defining REST endpoints
│   │   │
│   │   ├── data_pipeline.py
│   │   │   → Data cleaning, merging, preprocessing logic
│   │   │
│   │   ├── feature_engineering.py
│   │   │   → Feature creation from raw manufacturing data
│   │   │
│   │   ├── golden_signature.py
│   │   │   → Identification of optimal production signatures
│   │   │
│   │   ├── ssi_calculation.py
│   │   │   → Smart Similarity Index computation
│   │   │
│   │   ├── nsga_optimizer.py
│   │   │   → NSGA-II multi-objective optimization implementation
│   │   │
│   │   ├── optimization_engine.py
│   │   │   → Orchestrates optimization workflow
│   │   │
│   │   └── check_data.py
│   │       → Validation of dataset integrity
│   │
│   ├── data/
│   │   │
│   │   ├── raw/
│   │   │   → Original manufacturing datasets (Excel files)
│   │   │
│   │   ├── processed/
│   │   │   → Engineered datasets used by AI modules
│   │   │
│   │   ├── golden_signature.csv
│   │   ├── pareto_frontier.csv
│   │   └── engineered_batch_data.csv
│   │
│   ├── requirements.txt
│   │   → Backend dependencies
│   │
│   └── dashboard.py
│       → Backend analytics utilities
│
│
└── README.md
    → Project documentation


-------Technology Stack
Frontend:
React (Vite)
Tailwind CSS
Recharts

Backend:
FastAPI
Python
Pandas
NumPy

AI Optimization:
Golden Signature Detection
Smart Similarity Index (SSI)
NSGA-II Algorithm
Pareto Frontier Analysis

       ------How to Run the Project------
Backend:
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn src.api:app --reload

Backend URL:
http://127.0.0.1:8000

API Docs:
http://127.0.0.1:8000/docs

Frontend:
cd frontend
npm install
npm run dev

Frontend URL:
http://localhost:5173


 -------Key Features:

Golden Batch Detection
Multi-Objective Optimization
Pareto Frontier Visualization
SSI-based Batch Comparison
Interactive Dashboard

---------Future Enhancements:

Real-time industrial IoT integration
Cloud-native deployment
Deep learning optimization
Predictive manufacturing intelligence
