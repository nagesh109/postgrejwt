CREATE DATABASE jwttoken;

-- (uuid-ossp extension installed)

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(250) NOT NULL,
    user_email VARCHAR(250) NOT NULL,
    user_password VARCHAR(250) NOT NULL
);

-- for clarity dumping fake data

INSERT INTO users (user_name, user_email, user_password) VALUES ('nag', 'nag@email.in', '123456');