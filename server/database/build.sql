BEGIN;

    DROP TABLE IF EXISTS user, project;
    DROP TYPE IF EXISTS roles;

    CREATE TYPE roles AS ENUM
    (
    'architect',
    'consumer'
    );

CREATE TABLE user
(
    id SERIAL PRIMARY KEY,
    full_name VARCHAR NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR NOT NULL,
    role roles NOT NULL,
    resetPasswordToken VARCHAR,
    resetPasswordExpires BIGINT
);

CREATE TABLE project
(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT NOT NULL,
    size INT NOT NULL,
    width INT NOT NULL,
    length INT NOT NULL,
    height INT NOT NULL

);

COMMIT;
