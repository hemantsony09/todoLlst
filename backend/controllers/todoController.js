const Todo = require('../models/todomodel');

exports.createTodo = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Todo cannot be empty!' });
  }

  const todo = new Todo({ text, userId: req.user.id });
  await todo.save();
  res.json(todo);
};

exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ userId: req.user.id });
  res.json(todos);
};

exports.updateTodo = async (req, res) => {
  const { text, completed } = req.body;
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { text, completed },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.deleteTodo = async (req, res) => {
  const result = await Todo.deleteOne({ _id: req.params.id, userId: req.user.id });
  if (result.deletedCount === 0) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  res.json({ message: 'Todo deleted' });
};
