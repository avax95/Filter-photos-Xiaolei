-- DROP TABLE IF EXISTS descriptions CASCADE;
-- DROP TABLE IF EXISTS images;

-- CREATE TABLE descriptions (
--   id SERIAL PRIMARY KEY,
--   roomname VARCHAR (20),
--   price INT,
--   "numberOfBedrooms" INT,
--   rating INT,
--   "numberOfReviews" INT,
--   "roomType" VARCHAR (20),
--   "instantBook" VARCHAR (1)
-- );

-- CREATE TABLE images (
--   id SERIAL PRIMARY KEY,
--   "urlToImage" VARCHAR (200),
--   "roomId" INT REFERENCES descriptions (id) ON UPDATE CASCADE ON DELETE CASCADE
-- );

\COPY descriptions(roomname, price, "numberOfBedrooms", rating, "numberOfReviews", "roomType", "instantBook") FROM './PostgresGenerator/descriptions.csv' WITH CSV;
\COPY images("urlToImage", "roomId") FROM './PostgresGenerator/images.csv' WITH CSV;

