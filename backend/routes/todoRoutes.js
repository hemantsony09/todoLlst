const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/', authenticateToken, todoController.createTodo);
router.get('/', authenticateToken, todoController.getTodos);
router.put('/:id', authenticateToken, todoController.updateTodo);
router.delete('/:id', authenticateToken, todoController.deleteTodo);

module.exports = router;
