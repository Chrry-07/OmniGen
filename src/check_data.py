import pandas as pd

# load datasets
process_df = pd.read_excel("data/raw/_h_batch_process_data.xlsx")
production_df = pd.read_excel("data/raw/_h_batch_production_data.xlsx")

print("\nPROCESS DATASET COLUMNS:\n")
print(process_df.columns)

print("\nPRODUCTION DATASET COLUMNS:\n")
print(production_df.columns)

print("\nPROCESS DATA SAMPLE:\n")
print(process_df.head())

print("\nPRODUCTION DATA SAMPLE:\n")
print(production_df.head())