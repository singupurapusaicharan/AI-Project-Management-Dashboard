const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Password validation rules
const passwordRules = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true
};

const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < passwordRules.minLength) {
    errors.push('Password must be at least 8 characters long');
  }
  if (passwordRules.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (passwordRules.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (passwordRules.requireNumbers && !/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (passwordRules.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return errors;
};

// Register user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate password
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      return res.status(400).json({ 
        message: 'Password validation failed',
        errors: passwordErrors
      });
    }
    
    // Check if user exists
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ 
        message: 'Registration failed',
        errors: ['Email is already registered']
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, avatar, created_at) VALUES (?, ?, ?, ?, NOW())',
      [name, email, hashedPassword, `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`]
    );

    res.status(201).json({ 
      success: true,
      message: 'Registration successful! Welcome to AI Dashboard',
      data: {
        id: result.insertId,
        name,
        email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Registration failed',
      errors: ['An unexpected error occurred']
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ 
        message: 'Login failed',
        errors: ['No account found with this email']
      });
    }

    const user = users[0];

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        message: 'Login failed',
        errors: ['Invalid password']
      });
    }

    // Send user data (excluding password)
    const { password: _, ...userData } = user;
    res.json({
      success: true,
      message: 'Login successful!',
      data: userData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Login failed',
      errors: ['An unexpected error occurred']
    });
  }
});

// Update user
router.put('/users/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.params.id;

    // Check if the email is already taken by another user
    const [existingUsers] = await db.query(
      'SELECT * FROM users WHERE email = ? AND id != ?',
      [email, userId]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Email is already taken by another user' });
    }

    // Update user details in the database
    const [result] = await db.query(
      'UPDATE users SET name = ?, email = ?, updated_at = NOW() WHERE id = ?',
      [name, email, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;