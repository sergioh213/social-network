DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS chat;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    hashed_password VARCHAR(100) NOT NULL,
    image_url VARCHAR(300),
    bio VARCHAR(400),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendships (
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id),
    receiver_id INT REFERENCES users(id),
    status INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE chat (
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id),
    message VARCHAR(400),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SELECT * FROM friendships
-- WHERE ((sender_id = $1 AND receiver_id = $2)
-- OR (sender_id = $2 AND receiver_id = $1))
-- AND (status = 1 OR status = 2)
--
-- UPDATE friendships
-- SET updated_at = CURRENT_TIMESTAMP;
--
-- 1: pending, 2:accepted, 3: rejected,

-- SELECT * FROM friendships
-- WHERE ((sender_id = 2 AND receiver_id = 1)
-- OR (sender_id = 2 AND receiver_id = 1))
-- AND (status = 1 OR status = 2);
