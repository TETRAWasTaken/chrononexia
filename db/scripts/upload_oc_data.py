import os
import re
import pandas as pd
import psycopg
from pathlib import Path
from pathlib import Path

# Base paths
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
CSV_PATH = PROJECT_ROOT / "db" / "scripts" / "OC data (Responses) - Form Responses 1-2.csv"
PHOTOSHOOT_DIR = PROJECT_ROOT / "src" / "assets" / "Photoshoot"

# Load environment
env_file = PROJECT_ROOT / ".env"
if env_file.exists():
    with open(env_file, "r") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip())

DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    "postgresql://postgres.eralwgjyyjdzokshkssn:Anshumaan_Supabase@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require"
)

# 1. Read CSV
print(f"Reading CSV from: {CSV_PATH}")
df = pd.read_csv(CSV_PATH)

col_name = "Full Name"
col_pos = "Your Position in Symbitech"
col_year = "Academic Year"
col_comment = "A comment you may want to give, related to the event. ( Like a yearbook comment, will be used on website and insta posts. )"
col_desc = "Describe yourself in about 30 words, and why you're a great fit in the symbitech OC"
col_img = "Image"

# 2. Build file map for Photoshoot images
list_dir = os.listdir(PHOTOSHOOT_DIR) if PHOTOSHOOT_DIR.exists() else []
file_map = {}
for f in list_dir:
    if f.startswith(".") or ("." not in f):
        continue
    base, ext = os.path.splitext(f)
    file_map[f.lower()] = f
    file_map[base.lower()] = f
    if base.lower().startswith("img_"):
        file_map[base[4:].lower()] = f

def resolve_image_path(raw_val):
    if pd.isna(raw_val):
        return None
    val_str = str(raw_val).strip()
    if "parth" in val_str.lower():
        return "/src/assets/Photoshoot/HOSPITALITY_HEAD_PARTH.jpg"
    if val_str.lower() in file_map:
        return f"/src/assets/Photoshoot/{file_map[val_str.lower()]}"
    clean_val = val_str.replace("IMG_", "").lower()
    if clean_val in file_map:
        return f"/src/assets/Photoshoot/{file_map[clean_val]}"
    for key, fname in file_map.items():
        if clean_val == key or (len(clean_val) > 3 and clean_val in key):
            return f"/src/assets/Photoshoot/{fname}"
    return None

df["Image_Path"] = df[col_img].apply(resolve_image_path)

# 3. Categorize into Fest Heads, Executives, Heads, Co-heads
fest_heads_df = df[df[col_pos].astype(str).str.strip().str.lower() == "fest head"].copy().reset_index(drop=True)
executives_df = df[df[col_pos].astype(str).str.contains("executive", case=False, na=False)].copy().reset_index(drop=True)

# Heads & Co-heads (excluding Fest Head & Executives)
exclude_mask = df[col_pos].astype(str).str.strip().str.lower().eq("fest head") | df[col_pos].astype(str).str.contains("executive", case=False, na=False)
heads_coheads_df = df[~exclude_mask].copy().reset_index(drop=True)

heads_df = heads_coheads_df[~heads_coheads_df[col_pos].astype(str).str.contains(r"co[- ]?head", case=False, regex=True, na=False)].copy().reset_index(drop=True)
coheads_df = heads_coheads_df[heads_coheads_df[col_pos].astype(str).str.contains(r"co[- ]?head", case=False, regex=True, na=False)].copy().reset_index(drop=True)

print(f"Fest Heads: {len(fest_heads_df)}")
print(f"Executives: {len(executives_df)}")
print(f"Heads: {len(heads_df)}")
print(f"Co-Heads: {len(coheads_df)}")

# 4. Push to PostgreSQL with prepare_threshold=None (crucial for Supabase transaction pooler port 6543)
def push_df_to_postgres(sub_df, table_name, conn_info):
    insert_query = f"""
        INSERT INTO {table_name} (name, position, academic_year, comment, description, image_url)
        VALUES (%s, %s, %s, %s, %s, %s)
        ON CONFLICT (name) DO UPDATE SET
            position = EXCLUDED.position,
            academic_year = EXCLUDED.academic_year,
            comment = EXCLUDED.comment,
            description = EXCLUDED.description,
            image_url = EXCLUDED.image_url;
    """
    
    records = []
    for _, row in sub_df.iterrows():
        name = str(row[col_name]).strip() if pd.notna(row[col_name]) else None
        pos = str(row[col_pos]).strip() if pd.notna(row[col_pos]) else None
        year = str(row[col_year]).strip() if pd.notna(row[col_year]) else None
        comment = str(row[col_comment]).strip() if pd.notna(row[col_comment]) else None
        desc = str(row[col_desc]).strip() if pd.notna(row[col_desc]) else None
        img = str(row["Image_Path"]).strip() if pd.notna(row["Image_Path"]) and row["Image_Path"] is not None else None
        if name:
            records.append((name, pos, year, comment, desc, img))
    
    with psycopg.connect(conn_info, prepare_threshold=None) as conn:
        with conn.cursor() as cur:
            cur.executemany(insert_query, records)
        conn.commit()
    print(f"✅ Successfully pushed {len(records)} records into PostgreSQL table '{table_name}'")

push_df_to_postgres(fest_heads_df, "fest_heads", DATABASE_URL)
push_df_to_postgres(executives_df, "executives", DATABASE_URL)
push_df_to_postgres(heads_df, "heads", DATABASE_URL)
push_df_to_postgres(coheads_df, "coheads", DATABASE_URL)
print("All tables successfully updated in Supabase!")
