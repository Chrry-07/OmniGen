import pandas as pd
def load_datasets():
    """
    Load process and production datasets
    """

    process_sheets = pd.read_excel(
        "data/raw/_h_batch_process_data.xlsx",
        sheet_name=None
    )

    process_frames = []

    for name, df in process_sheets.items():

        if "Summary" in name:
            continue

        process_frames.append(df)

    process_df = pd.concat(process_frames, ignore_index=True)

    production_df = pd.read_excel(
        "data/raw/_h_batch_production_data.xlsx"
    )

    print("Process dataset shape:", process_df.shape)
    print("Production dataset shape:", production_df.shape)

    return process_df, production_df


def aggregate_process_data(process_df):
    """
    Convert time-series process data into batch-level features
    """

    aggregated = process_df.groupby("Batch_ID").agg({

        "Temperature_C": ["mean", "max"],
        "Pressure_Bar": ["mean", "max"],
        "Humidity_Percent": ["mean"],
        "Motor_Speed_RPM": ["mean"],
        "Compression_Force_kN": ["mean", "max"],
        "Flow_Rate_LPM": ["mean"],
        "Power_Consumption_kW": ["mean", "max"],
        "Vibration_mm_s": ["mean"]

    }).reset_index()

    aggregated.columns = [
        "_".join(col).strip("_") for col in aggregated.columns.values
    ]

    return aggregated


def merge_datasets(process_agg, production_df):
    """
    Merge process features with production quality data
    """

    merged = pd.merge(
        process_agg,
        production_df,
        on="Batch_ID",
        how="inner"
    )

    return merged


def save_processed_data(df):
    """
    Save final dataset
    """

    df.to_csv("data/processed/merged_batch_data.csv", index=False)

    print("Merged dataset saved to data/processed/merged_batch_data.csv")


def run_pipeline():

    print("Loading datasets...")

    process_df, production_df = load_datasets()

    print("Aggregating process data...")

    process_agg = aggregate_process_data(process_df)

    print("Merging datasets...")

    merged_df = merge_datasets(process_agg, production_df)

    print("Final dataset shape:", merged_df.shape)

    save_processed_data(merged_df)


if __name__ == "__main__":
    run_pipeline()