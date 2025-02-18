const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId;
    
    let query = `
      SELECT p.*, u.name as user_name, u.email as user_email, u.avatar as user_avatar 
      FROM projects p 
      JOIN users u ON p.user_id = u.id
    `;
    
    let params = [];
    if (userId) {
      query += ` WHERE p.user_id = ?`;
      params.push(userId);
    }
    
    const [projects] = await db.query(query, params);
    
    const formattedProjects = projects.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      timestamp: new Date(p.created_at).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      status: p.status,
      budget: p.budget,
      userId: p.user_id,
      user: {
        id: p.user_id,
        name: p.user_name,
        email: p.user_email,
        avatar: p.user_avatar
      }
    }));

    res.json(formattedProjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create project
router.post('/', async (req, res) => {
  try {
    const { name, description, budget, userId } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO projects (name, description, budget, status, user_id) VALUES (?, ?, ?, ?, ?)',
      [name, description, budget, 'pending', userId]
    );

    res.status(201).json({ message: 'Project created successfully', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;