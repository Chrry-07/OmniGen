import pandas as pd


def load_dataset():
    df = pd.read_csv("data/processed/engineered_batch_data.csv")
    return df


def find_golden_batches(df):

    print("Finding top quality batches...")

    # Select top 20% batches based on quality_score
    top_percent = int(len(df) * 0.2)

    golden_batches = df.sort_values(
        by="quality_score",
        ascending=False
    ).head(top_percent)

    print("Golden batches found:", len(golden_batches))

    return golden_batches


def compute_golden_signature(golden_batches):

    print("Computing golden process signature...")

    process_columns = [
        "Temperature_C_mean",
        "Pressure_Bar_mean",
        "Humidity_Percent_mean",
        "Motor_Speed_RPM_mean",
        "Compression_Force_kN_mean",
        "Flow_Rate_LPM_mean",
        "Power_Consumption_kW_mean",
        "Vibration_mm_s_mean"
    ]

    golden_signature = golden_batches[process_columns].mean()

    return golden_signature


def save_results(golden_batches, golden_signature):

    golden_batches.to_csv(
        "data/processed/golden_batches.csv",
        index=False
    )

    golden_signature.to_csv(
        "data/processed/golden_signature.csv"
    )

    print("Golden batches saved.")
    print("Golden signature saved.")


def run_golden_engine():

    print("Loading engineered dataset...")

    df = load_dataset()

    golden_batches = find_golden_batches(df)

    golden_signature = compute_golden_signature(golden_batches)

    print("\nGolden Batch Signature:")
    print(golden_signature)

    save_results(golden_batches, golden_signature)


if __name__ == "__main__":
    run_golden_engine()