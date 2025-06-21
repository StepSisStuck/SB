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