/*
  # AI Dashboard Database Schema

  1. Tables
    - users
      - id (int, primary key, auto increment)
      - name (varchar)
      - email (varchar, unique)
      - password (varchar)
      - avatar (varchar)
      - created_at (timestamp)
    
    - projects
      - id (int, primary key, auto increment)
      - name (varchar)
      - description (text)
      - status (enum: 'pending', 'approved', 'rejected')
      - budget (decimal)
      - user_id (int, foreign key)
      - created_at (timestamp)
*/

CREATE DATABASE IF NOT EXISTS ai_dashboard;
USE ai_dashboard;

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  budget DECIMAL(10,2) NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);