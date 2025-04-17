const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all projects for a user
router.get('/:userId', (req, res) => {
  try {
    const userId = req.params.userId;
    const projects = db.prepare('SELECT * FROM projects WHERE user_id = ?').all(userId);
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new project
router.post('/', (req, res) => {
  try {
    const { title, description, userId } = req.body;
    
    const result = db.prepare(
      'INSERT INTO projects (title, description, user_id) VALUES (?, ?, ?)'
    ).run(title, description, userId);

    const newProject = db.prepare('SELECT * FROM projects WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a project
router.put('/:id', (req, res) => {
  try {
    const { title, description, status } = req.body;
    const projectId = req.params.id;

    const result = db.prepare(
      'UPDATE projects SET title = ?, description = ?, status = ? WHERE id = ?'
    ).run(title, description, status, projectId);

    if (result.changes === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const updatedProject = db.prepare('SELECT * FROM projects WHERE id = ?').get(projectId);
    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a project
router.delete('/:id', (req, res) => {
  try {
    const projectId = req.params.id;
    
    const result = db.prepare('DELETE FROM projects WHERE id = ?').run(projectId);
    
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;