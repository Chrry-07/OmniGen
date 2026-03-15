from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def home():
    return {"message": "AI Manufacturing Optimizer API Running"}

@app.get("/pareto")
def get_pareto():

    df = pd.read_csv("data/processed/pareto_frontier.csv")

    return df.to_dict(orient="records")


@app.get("/golden_signature")
def get_golden():

    df = pd.read_csv("data/processed/golden_signature.csv")

    return df.to_dict()


@app.get("/ssi")
def get_ssi():

    df = pd.read_csv("data/processed/batch_with_ssi.csv")

    results = []

    for _, row in df.iterrows():

        ssi_value = row["SSI"]

        # Status classification
        if ssi_value >= 90:
            status = "GREEN"
        elif ssi_value >= 75:
            status = "AMBER"
        else:
            status = "RED"

        results.append({
            "Batch_ID": row["Batch_ID"],
            "SSI": round(ssi_value, 2),
            "status": status
        })

    return results

@app.get("/pareto_chart")
def pareto_chart():

    df = pd.read_csv("data/processed/pareto_frontier.csv")

    return {
        "quality": df["quality"].tolist(),
        "carbon": df["carbon"].tolist(),
        "energy": df["energy"].tolist()
    }