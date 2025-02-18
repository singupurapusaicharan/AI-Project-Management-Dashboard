const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Register user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`]
    );

    res.status(201).json({ 
      id: result.insertId,
      message: 'User registered successfully' 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = users[0];

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Send user data (excluding password)
    const { password: _, ...userData } = user;
    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user
router.put('/users/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.params.id;

    // Check if email is already taken by another user
    const [existingUsers] = await db.query(
      'SELECT * FROM users WHERE email = ? AND id != ?',
      [email, userId]
    );
    
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Email is already taken' });
    }

    const [result] = await db.query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get updated user data
    const [updatedUser] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    
    if (updatedUser.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { password: _, ...userData } = updatedUser[0];
    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;