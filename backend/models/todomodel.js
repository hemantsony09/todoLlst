const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: String,
  userId: String,
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);

module.exports = Todo;
