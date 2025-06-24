const pool = require("../services/db");

const SQLSTATEMENT = `
DROP TABLE IF EXISTS User;

DROP TABLE IF EXISTS Vulnerability;

DROP TABLE IF EXISTS Report;

CREATE TABLE User (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(255) NOT NULL UNIQUE, 
reputation INT DEFAULT 0
);

CREATE TABLE Vulnerability (
id INT AUTO_INCREMENT PRIMARY KEY,
type TEXT NOT NULL,
description TEXT NOT NULL,
points INT NOT NULL
);

CREATE TABLE Report (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
vulnerability_id INT NOT NULL,
status BOOLEAN NOT NULL DEFAULT 0 -- 0 for Open, 1 for Closed
);

-- Section B
DROP TABLE IF EXISTS QuestStart;
DROP TABLE IF EXISTS QuestCompletion;
DROP TABLE IF EXISTS GameUser;
DROP TABLE IF EXISTS Quests;

CREATE TABLE GameUser (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(255) NOT NULL UNIQUE,
XP INT NOT NULL DEFAULT 0,
user_rank VARCHAR(20) NOT NULL DEFAULT "E-Hunter"
);

INSERT INTO GameUser (username, user_rank)
VALUES
("SJW", "E-Hunter");


CREATE TABLE Quests (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(100) NOT NULL UNIQUE,
description VARCHAR(255) NOT NULL,
xp_reward INT NOT NULL,
required_rank VARCHAR(20) NOT NULL
);

INSERT INTO Quests (title, description, xp_reward, required_rank)
VALUES
("Fix the codes", "A certain code is causing problems to the server", 10, "E-Rank");

CREATE TABLE QuestStart (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL, 
quest_id INT NOT NULL,
started_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
UNIQUE KEY uq_user_quest (user_id, quest_id),
FOREIGN KEY (user_id) REFERENCES GameUser(id),
FOREIGN KEY (quest_id) REFERENCES Quests(id)
);





CREATE TABLE QuestCompletion (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
quest_id INT NOT NULL,
completed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
UNIQUE KEY uq_user_complete (user_id, quest_id),
FOREIGN KEY (user_id)  REFERENCES GameUser(id),
FOREIGN KEY (quest_id) REFERENCES Quests(id)
);


`;






pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully:", results);
  }
  process.exit();
});

// Code 12, Made the username UNIQUE so that MYSQL know what 
