import pandas as pd


def load_data():

    df = pd.read_csv("data/processed/engineered_batch_data.csv")

    golden = pd.read_csv(
        "data/processed/golden_signature.csv",
        index_col=0
    ).iloc[:, 0]

    return df, golden


def calculate_ssi(df, golden):

    parameters = [
        "Temperature_C_mean",
        "Pressure_Bar_mean",
        "Motor_Speed_RPM_mean",
        "Flow_Rate_LPM_mean",
        "Power_Consumption_kW_mean",
        "Vibration_mm_s_mean"
    ]

    ssi_scores = []

    for _, row in df.iterrows():

        deviations = []

        for param in parameters:

            value = row[param]
            golden_value = golden[param]

            deviation = abs(value - golden_value) / golden_value

            deviations.append(deviation)

        avg_deviation = sum(deviations) / len(deviations)

        ssi = 100 * (1 - avg_deviation)

        ssi_scores.append(ssi)

    df["SSI"] = ssi_scores

    return df


def save_results(df):

    df.to_csv(
        "data/processed/batch_with_ssi.csv",
        index=False
    )

    print("\nSSI calculation complete.")
    print("Saved to data/processed/batch_with_ssi.csv")


def run_ssi_pipeline():

    print("Loading engineered dataset...")

    df, golden = load_data()

    print("Calculating Stability Score Index (SSI)...")

    df = calculate_ssi(df, golden)

    print("\nTop Stable Batches:")

    print(
        df.sort_values("SSI", ascending=False)[
            ["Batch_ID", "SSI"]
        ].head(10)
    )

    save_results(df)


if __name__ == "__main__":
    run_ssi_pipeline()