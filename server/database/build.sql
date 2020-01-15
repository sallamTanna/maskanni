BEGIN;

    DROP TABLE IF EXISTS users;
    DROP TYPE IF EXISTS roles;

    CREATE TYPE roles AS ENUM
    (
    'admin',
    'chef'
    );

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR NOT NULL,
    role roles NOT NULL,
    resetPasswordToken VARCHAR,
    resetPasswordExpires BIGINT
);

COMMIT;
