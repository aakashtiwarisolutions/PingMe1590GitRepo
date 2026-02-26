/* ============================================================
   PingMe ETL Setup (PostgreSQL)
   - Final tables: users, links
   - Staging tables: stg_users, stg_links
   - ETL: transform + load from staging -> final
   ============================================================ */

-- 0) OPTIONAL: Create database (run only if you need it)
-- CREATE DATABASE pingme;

-- NOTE: After creating DB, connect to pingme and run below.

BEGIN;

-- 1) Extensions (for UUID)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2) FINAL TABLES (used by the website/API)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  bio TEXT,
  qr_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS links (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  label TEXT,
  url TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT TRUE,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3) STAGING TABLES (raw incoming data for ETL)
CREATE TABLE IF NOT EXISTS stg_users (
  email TEXT,
  name TEXT,
  bio TEXT,
  qr_id TEXT
);

CREATE TABLE IF NOT EXISTS stg_links (
  email TEXT,
  type TEXT,
  label TEXT,
  url TEXT,
  is_visible TEXT,
  order_index TEXT
);

COMMIT;

/* ============================================================
   OPTIONAL TEST DATA (for quick validation)
   Uncomment if you want to test ETL immediately
   ============================================================ */

-- INSERT INTO stg_users (email, name, bio, qr_id)
-- VALUES
-- ('Aakash@Test.com ', ' Aakash Tiwari ', ' builder ', 'aakash1590');

-- INSERT INTO stg_links (email, type, label, url, is_visible, order_index)
-- VALUES
-- ('Aakash@Test.com ', 'GitHub', 'My GitHub', 'github.com/aakashtiwarisolutions', 'true', '1'),
-- ('Aakash@Test.com ', 'LinkedIn', 'My LinkedIn', 'https://linkedin.com/in/yourname', '1', '2');


/* ============================================================
   ETL RUN SCRIPT (Transform + Load)
   Run this after inserting rows into stg_users and stg_links
   ============================================================ */

BEGIN;

-- 4) LOAD USERS (clean + upsert)
INSERT INTO users (email, name, bio, qr_id)
SELECT
  LOWER(TRIM(email)) AS email,
  TRIM(name) AS name,
  NULLIF(TRIM(bio), '') AS bio,
  TRIM(qr_id) AS qr_id
FROM stg_users
WHERE email IS NOT NULL AND name IS NOT NULL AND qr_id IS NOT NULL
ON CONFLICT (email) DO UPDATE
SET name = EXCLUDED.name,
    bio = EXCLUDED.bio,
    qr_id = EXCLUDED.qr_id,
    updated_at = NOW();

-- 5) LOAD LINKS (transform url + booleans + join to users)
INSERT INTO links (user_id, type, label, url, is_visible, order_index)
SELECT
  u.id,
  LOWER(TRIM(l.type)) AS type,
  NULLIF(TRIM(l.label), '') AS label,
  CASE
    WHEN TRIM(l.url) ~* '^https?://' THEN TRIM(l.url)
    ELSE 'https://' || TRIM(l.url)
  END AS url,
  CASE
    WHEN LOWER(TRIM(l.is_visible)) IN ('true','1','yes','y') THEN TRUE
    WHEN LOWER(TRIM(l.is_visible)) IN ('false','0','no','n') THEN FALSE
    ELSE TRUE
  END AS is_visible,
  COALESCE(NULLIF(TRIM(l.order_index), '')::INT, 0) AS order_index
FROM stg_links l
JOIN users u ON u.email = LOWER(TRIM(l.email))
WHERE l.email IS NOT NULL AND l.url IS NOT NULL;

-- 6) CLEAR STAGING TABLES AFTER LOAD
TRUNCATE TABLE stg_users;
TRUNCATE TABLE stg_links;

COMMIT;

/* ============================================================
   VERIFY (Run anytime)
   ============================================================ */

-- SELECT * FROM users;
-- SELECT * FROM links ORDER BY order_index;
