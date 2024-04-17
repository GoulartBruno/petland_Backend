-- Active: 1713257716133@@127.0.0.1@3306


CREATE TABLE Users (
    user_id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    species VARCHAR(100),
    breed VARCHAR(100),
    age INT,
    gender VARCHAR(10),
    bio TEXT,
    profile_picture VARCHAR(255),
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);



INSERT INTO Users (user_id, name, email, password, species, breed, age, gender, bio, profile_picture)
VALUES
("u001", 'Rex', 'rex@example.com', 'password123', 'Dog', 'Labrador Retriever', 3, 'Male', 'Hello! I am Rex, a very friendly Labrador Retriever.', 'rex.jpg'),
("u002", 'Whiskers', 'whiskers@example.com', 'password456', 'Cat', 'Siamese', 2, 'Female', 'Hi! I am Whiskers, a very playful Siamese cat.', 'whiskers.jpg'),
("u003", 'Max', 'max@example.com', 'password789', 'Dog', 'German Shepherd', 4, 'Male', 'Hey there! I am Max, a loyal German Shepherd.', 'max.jpg'),
("u004", 'Luna', 'luna@example.com', 'passwordabc', 'Cat', 'Persian', 1, 'Female', 'Meow! I am Luna, a fluffy Persian cat.', 'luna.jpg'),
("u005", 'Buddy', 'buddy@example.com', 'passwordxyz', 'Dog', 'Golden Retriever', 5, 'Male', 'Woof! I am Buddy, a friendly Golden Retriever.', 'buddy.jpg');



CREATE TABLE Followers (
    follower_id TEXT PRIMARY KEY UNIQUE NOT NULL,
    user_id  TEXT UNIQUE NOT NULL,
    followed_back BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO Followers (follower_id, user_id, followed_back)
VALUES
("u001", "u002", TRUE), 
("u003", "u001", TRUE), 
("u002", "u004", FALSE); 



CREATE TABLE Posts (
    post_id TEXT PRIMARY KEY UNIQUE NOT NULL,
    user_id TEXT  NOT NULL,
    name TEXT NOT NULL,
    text TEXT VARCHAR(1000),
    image VARCHAR(255),
    likes INTEGER DEFAULT 0 NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

DROP TABLE Posts


INSERT INTO Posts (post_id, user_id, name, text, image)
VALUES
("p001", 'u001', "Rex", 'This is the first post!', 'image1.jpg'),
("p002", 'u002', "Whiskers",'Look at my cute whiskers!', 'image2.jpg'),
("p003", 'u003', "Max" ,'Just enjoying a walk in the park.', 'image3.jpg'),
("p004", 'u004', "Luna", 'Napping in the sun. 😺', 'image4.jpg'),
("p005", 'u005', "Buddy", 'Playing fetch with my favorite toy!', 'image5.jpg');



CREATE TABLE Comments (
    comment_id TEXT PRIMARY KEY NOT NULL,
    post_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    text TEXT VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO Comments (comment_id, post_id, user_id, name, text)
VALUES
('c001', 'p001', 'u002', "Whiskers", 'Great post!'),
('c002', 'p001', 'u003', "Max",'Love it!'),
('c003', 'p002', 'u001', "Rex",'So adorable!'),
('c004', 'p003', 'u004', "Luna",'Nice weather!'),
('c005', 'p004', 'u005', "Buddy", 'Looks cozy!'),
('c006', 'p005', 'u002', "Whiskers", 'Fun times!'),
('c007', 'p005', 'u003', "Max", 'Cute!'),
('c008', 'p005', 'u004', "Luna", 'That is a happy dog!'),
('c009', 'p005', 'u001', "Rex",'My favorite activity!');

DROP TABLE Comments


CREATE TABLE Likes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE);


INSERT INTO Likes (user_id, post_id, like)
VALUES
('u001', 'p002', 1),
('u001', 'p003', 1),
('u002', 'p001', 1),
('u002', 'p004', 1),
('u002', 'p005', 1),
('u003', 'p002', 1);




UPDATE Posts
SET likes = 2
WHERE post_id = 'p001';


UPDATE Posts
SET likes = 3
WHERE post_id = 'p002';


UPDATE Posts
SET likes = 1
WHERE post_id = 'p003';



DROP TABLE Likes

DROP TABLE Comments


DROP TABLE Followers


DROP TABLE Posts


DROP TABLE Users