CREATE DATABASE cadastro

CREATE TABLE tbl_usuario (
    userId INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    PRIMARY KEY (userId)
);