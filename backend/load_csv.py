import os
import sqlite3
import pandas as pd

BASE_DIR = os.path.dirname(__file__)
CSV_DIR = os.path.join(BASE_DIR, "csv")
DB_PATH = os.path.join(BASE_DIR, "..", "buster_dima.db")

conn = sqlite3.connect(DB_PATH)

pd.read_csv(os.path.join(CSV_DIR, "assets.csv")).to_sql(
    "assets", conn, if_exists="append", index=False
)

pd.read_csv(os.path.join(CSV_DIR, "cbm_methods.csv")).to_sql(
    "cbm_methods", conn, if_exists="append", index=False
)

pd.read_csv(os.path.join(CSV_DIR, "components.csv")).to_sql(
    "components", conn, if_exists="append", index=False
)

pd.read_csv(os.path.join(CSV_DIR, "failure_modes.csv")).to_sql(
    "failure_modes", conn, if_exists="append", index=False
)

pd.read_csv(os.path.join(CSV_DIR, "detection_map.csv")).to_sql(
    "detection_map", conn, if_exists="append", index=False
)

pd.read_csv(os.path.join(CSV_DIR, "failure_mode_export.csv")).to_sql(
    "failure_mode_export", conn, if_exists="append", index=False
)

conn.close()

print("✅ All CSV files loaded successfully")
