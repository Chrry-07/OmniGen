import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score


# ---------------------------------------------------
# Load dataset
# ---------------------------------------------------

def load_dataset():
    df = pd.read_csv("data/processed/engineered_batch_data.csv")
    return df


# ---------------------------------------------------
# Prepare features and target
# ---------------------------------------------------

def prepare_data(df):

    feature_columns = [
        "Temperature_C_mean",
        "Pressure_Bar_mean",
        "Humidity_Percent_mean",
        "Motor_Speed_RPM_mean",
        "Compression_Force_kN_mean",
        "Flow_Rate_LPM_mean",
        "Power_Consumption_kW_mean",
        "Vibration_mm_s_mean"
    ]

    X = df[feature_columns]
    y = df["quality_score"]

    return X, y, feature_columns


# ---------------------------------------------------
# Train ML model
# ---------------------------------------------------

def train_model(X, y):

    X_train, X_test, y_train, y_test = train_test_split(
        X, y,
        test_size=0.2,
        random_state=42
    )

    model = RandomForestRegressor(
        n_estimators=200,
        random_state=42
    )

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    mae = mean_absolute_error(y_test, predictions)
    r2 = r2_score(y_test, predictions)

    print("\nModel Performance")
    print("MAE:", round(mae, 3))
    print("R2 Score:", round(r2, 3))

    return model


# ---------------------------------------------------
# Predict quality for golden signature
# ---------------------------------------------------

def suggest_optimal_parameters(model, golden_signature, feature_columns):

    print("\nGenerating optimization suggestions...")

    golden_df = pd.DataFrame(
        [golden_signature],
        columns=feature_columns
    )

    predicted_quality = model.predict(golden_df)[0]

    print("\nIf process runs near GOLDEN SIGNATURE:")
    print("Predicted Quality Score:", round(predicted_quality, 2))


# ---------------------------------------------------
# Compare latest batch vs golden signature
# ---------------------------------------------------

def compare_with_golden(df):

    print("\nComparing latest batch with golden signature...")

    golden = pd.read_csv(
        "data/processed/golden_signature.csv",
        index_col=0
    ).iloc[:, 0]

    latest_batch = df.iloc[-1]

    parameters = [
        "Temperature_C_mean",
        "Pressure_Bar_mean",
        "Motor_Speed_RPM_mean",
        "Flow_Rate_LPM_mean",
        "Power_Consumption_kW_mean"
    ]

    for param in parameters:

        current = latest_batch[param]
        optimal = golden[param]

        diff = current - optimal

        if abs(diff) > 0.5:

            if diff > 0:
                print(f"{param}: Reduce by {round(diff,2)}")
            else:
                print(f"{param}: Increase by {round(abs(diff),2)}")

        else:
            print(f"{param}: Within optimal range")


# ---------------------------------------------------
# Main optimization pipeline
# ---------------------------------------------------

def run_optimization():

    print("Loading dataset...")

    df = load_dataset()

    X, y, feature_columns = prepare_data(df)

    print("Training optimization model...")

    model = train_model(X, y)

    golden_signature = pd.read_csv(
        "data/processed/golden_signature.csv",
        index_col=0
    ).values.flatten()

    suggest_optimal_parameters(
        model,
        golden_signature,
        feature_columns
    )

    compare_with_golden(df)


# ---------------------------------------------------
# Run script
# ---------------------------------------------------

if __name__ == "__main__":
    run_optimization()