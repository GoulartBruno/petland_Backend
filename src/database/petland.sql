-- Active: 1713378336196@@127.0.0.1@3306



CREATE TABLE users (
    user_id TEXT PRIMARY KEY UNIQUE NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(50) NOT NULL,
    species VARCHAR(100),
    breed VARCHAR(100),
    age INT,
    gender VARCHAR(10),
    bio TEXT,
    profile_picture VARCHAR(255),
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);


INSERT INTO users (user_id, user_name, email, password, species, breed, age, gender, bio, profile_picture)
VALUES
("u001", 'Rex', 'rex@example.com', 'password123', 'Dog', 'Labrador Retriever', 3, 'Male', 'Hello! I am Rex, a very friendly Labrador Retriever.', 'rex.jpg'),
("u002", 'Whiskers', 'whiskers@example.com', 'password456', 'Cat', 'Siamese', 2, 'Female', 'Hi! I am Whiskers, a very playful Siamese cat.', 'whiskers.jpg'),
("u003", 'Max', 'max@example.com', 'password789', 'Dog', 'German Shepherd', 4, 'Male', 'Hey there! I am Max, a loyal German Shepherd.', 'max.jpg'),
("u004", 'Luna', 'luna@example.com', 'passwordabc', 'Cat', 'Persian', 1, 'Female', 'Meow! I am Luna, a fluffy Persian cat.', 'luna.jpg'),
("u005", 'Buddy', 'buddy@example.com', 'passwordxyz', 'Dog', 'Golden Retriever', 5, 'Male', 'Woof! I am Buddy, a friendly Golden Retriever.', 'buddy.jpg');



CREATE TABLE followers (
    follower_id TEXT PRIMARY KEY UNIQUE NOT NULL,
    user_id  TEXT UNIQUE NOT NULL,
    followed_back BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO followers (follower_id, user_id, followed_back)
VALUES
("u001", "u002", TRUE), 
("u003", "u001", TRUE), 
("u002", "u004", FALSE); 



CREATE TABLE posts (
    post_id TEXT PRIMARY KEY UNIQUE NOT NULL,
    text TEXT VARCHAR(1000),
    image TEXT VARCHAR(255),
    likes INTEGER DEFAULT 0 NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    update_at TEXT DEFAULT (DATETIME()) NOT NULL,
    user_id TEXT ,
    user_name TEXT ,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO posts (post_id, user_id, text, image)
VALUES
("p001", 'u001', 'This is the first post!', 'image1.jpg'),
("p002", 'u002', 'Look at my cute whiskers!', 'image2.jpg'),
("p003", 'u003', 'Just enjoying a walk in the park.', 'image3.jpg'),
("p004", 'u004', 'Napping in the sun. 😺', 'image4.jpg'),
("p005", 'u005', 'Playing fetch with my favorite toy!', 'image5.jpg');



CREATE TABLE comments (
    comment_id TEXT PRIMARY KEY NOT NULL,
    post_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO comments (comment_id, post_id, user_id, text)
VALUES
('c001', 'p001', 'u002', 'Great post!'),
('c002', 'p001', 'u003', 'Love it!'),
('c003', 'p002', 'u001', 'So adorable!'),
('c004', 'p003', 'u004', 'Nice weather!'),
('c005', 'p004', 'u005', 'Looks cozy!'),
('c006', 'p005', 'u002', 'Fun times!'),
('c007', 'p005', 'u003', 'Cute!'),
('c008', 'p005', 'u004', 'That is a happy dog!'),
('c009', 'p005', 'u001', 'My favorite activity!');



CREATE TABLE likes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE);

INSERT INTO likes (user_id, post_id, like)
VALUES
('u001', 'p002', 1),
('u001', 'p003', 1),
('u002', 'p001', 1),
('u002', 'p004', 1),
('u002', 'p005', 1),
('u003', 'p002', 1);




UPDATE posts
SET likes = 2
WHERE post_id = 'p001';


UPDATE posts
SET likes = 3
WHERE post_id = 'p002';


UPDATE posts
SET likes = 1
WHERE post_id = 'p003';



DROP TABLE likes

DROP TABLE comments


DROP TABLE followers


DROP TABLE posts


DROP TABLE users
