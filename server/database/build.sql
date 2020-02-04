BEGIN;

    DROP TABLE IF EXISTS users, projects;
    DROP TYPE IF EXISTS roles
    , types;

CREATE TYPE roles AS ENUM
(
    'architect',
    'consumer'
    );

CREATE TYPE types AS ENUM
(
    'studio',
    'chalet',
    'villa',
    'big_home'
    );

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    full_name VARCHAR NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR NOT NULL,
    role roles NOT NULL,
    resetPasswordToken VARCHAR,
    resetPasswordExpires BIGINT,
    profile_img VARCHAR,
    mobile VARCHAR,
    address VARCHAR
);

CREATE TABLE projects
(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    name VARCHAR NOT NULL,
    description TEXT NOT NULL,
    size INT NOT NULL,
    width INT NOT NULL,
    length INT NOT NULL,
    height INT NOT NULL,
    livingrooms_number INT NOT NULL,
    bathrooms_number INT NOT NULL,
    car_garage_number INT NOT NULL,
    floors_number INT NOT NULL,
    bedrooms_number INT NOT NULL,
    kitchen_description TEXT NOT NULL,
    rooms_description TEXT NOT NULL,
    garage_description TEXT NOT NULL,
    garden_description TEXT NOT NULL,
    price INT NOT NULL,
    charts VARCHAR
    [],
    status VARCHAR,
    sold BOOLEAN,
    type types,
    project_wallpaper VARCHAR,
    images_urls VARCHAR
    [],
    files_urls VARCHAR
    []

);

    COMMIT;