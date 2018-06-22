DROP TABLE IF EXISTS descriptions CASCADE;
DROP TABLE IF EXISTS room;
DROP TABLE IF EXISTS images;

CREATE TABLE descriptions (
  id SERIAL PRIMARY KEY,
  roomname VARCHAR (20),
  price INT,
  numberOfBedrooms INT,
  rating INT,
  numberOfReviews INT,
  roomType VARCHAR (20),
  instantBook VARCHAR (1)
);

CREATE TABLE room (
  id SERIAL PRIMARY KEY,
  roomID INT REFERENCES descriptions (id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  urlToImage VARCHAR (200),
  roomID INT REFERENCES descriptions (id) ON UPDATE CASCADE ON DELETE CASCADE
);