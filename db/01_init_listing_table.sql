CREATE USER postgres;

CREATE TABLE IF NOT EXISTS public.listing (
    id                   SERIAL PRIMARY KEY,
    name                 VARCHAR NOT NULL,
    description          VARCHAR NOT NULL,
    building_type        VARCHAR NOT NULL,
    street_address       VARCHAR NOT NULL,
    postal_code          VARCHAR NOT NULL,
    city                 VARCHAR NOT NULL,
    country              VARCHAR NOT NULL,
    surface_area_m2      DOUBLE PRECISION NOT NULL,
    rooms_count          INTEGER NOT NULL,
    bedrooms_count       INTEGER NOT NULL,
    price                DOUBLE PRECISION NOT NULL,
    contact_phone_number VARCHAR,
    created_date         TIMESTAMP,
    updated_date         TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.price_history (
    id           SERIAL PRIMARY KEY,
    listing_id   INTEGER,
    price_eur    INTEGER,
    created_date TIMESTAMP
);
