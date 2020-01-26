BEGIN;

    DROP TABLE IF EXISTS users, projects;
    DROP TYPE IF EXISTS roles;

    CREATE TYPE roles AS ENUM
    (
    'architect',
    'consumer'
    );

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    full_name VARCHAR NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR NOT NULL,
    role roles NOT NULL,
    resetPasswordToken VARCHAR,
    resetPasswordExpires BIGINT
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
    livingrooms_size INT NOT NULL,
    bathrooms_size INT NOT NULL,
    car_garage_size INT NOT NULL,
    floors_size INT NOT NULL,
    bedrooms_size INT NOT NULL,
    kitchen_description TEXT NOT NULL,
    rooms_description TEXT NOT NULL,
    garage_description TEXT NOT NULL,
    garden_description TEXT NOT NULL,
    price INT NOT NULL,
    garden_chart BOOLEAN NOT NULL,
    interior_decoration_chart BOOLEAN NOT NULL,
    health_chart BOOLEAN NOT NULL,
    executive_cahrt BOOLEAN NOT NULL,
    building_chart BOOLEAN NOT NULL,
    quantity_chart BOOLEAN NOT NULL,
    electricity_chart BOOLEAN NOT NULL,
    conditioning_chart BOOLEAN NOT NULL,
    sold BOOLEAN,
    images_url VARCHAR
    []

);

    COMMIT;
