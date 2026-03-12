import pandas as pd


def load_dataset():
    df = pd.read_csv("data/processed/merged_batch_data.csv")
    return df


def create_features(df):

    # Temperature stability
    df["temperature_stability"] = (
        df["Temperature_C_max"] - df["Temperature_C_mean"]
    )

    # Pressure stability
    df["pressure_stability"] = (
        df["Pressure_Bar_max"] - df["Pressure_Bar_mean"]
    )

    # Energy efficiency
    df["energy_efficiency"] = (
        df["Power_Consumption_kW_mean"] / df["Granulation_Time"]
    )

    # Production efficiency
    df["production_efficiency"] = (
        df["Tablet_Weight"] / df["Drying_Time"]
    )

    # Quality score
    df["quality_score"] = (
        0.35 * df["Hardness"]
        + 0.35 * df["Dissolution_Rate"]
        + 0.2 * df["Content_Uniformity"]
        - 0.1 * df["Friability"]
    )

    # ---------------------------------------------------
    # NEW FEATURE: Carbon Emission
    # ---------------------------------------------------

    emission_factor = 0.475  # kg CO2 per kWh

    df["carbon_emission"] = (
        df["Power_Consumption_kW_mean"] * emission_factor
    )

    return df


def save_dataset(df):

    df.to_csv(
        "data/processed/engineered_batch_data.csv",
        index=False
    )

    print("Feature engineered dataset saved.")


def run_feature_engineering():

    print("Loading merged dataset...")

    df = load_dataset()

    print("Creating new features...")

    df = create_features(df)

    print("Final dataset shape:", df.shape)

    save_dataset(df)


if __name__ == "__main__":
    run_feature_engineering()