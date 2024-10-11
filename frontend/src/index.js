const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todoapp')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const JWT_SECRET = '229cef5f73b48a77dce22b24272edbd7be2c6554571f155a3749339396396e6b98e';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model('User', userSchema);

const todoSchema = new mongoose.Schema({
  text: String,
  userId: String,
  completed: { type: Boolean, default: false },
});
const Todo = mongoose.model('Todo', todoSchema);

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.json({ message: 'User registered successfully' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET);
  res.json({ token });
});

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
app.post('/todos', authenticateToken, async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Todo cannot be empty!' });
  }

  const todo = new Todo({ text, userId: req.user.id });
  await todo.save();
  res.json(todo);
});
app.get('/todos', authenticateToken, async (req, res) => {
  const todos = await Todo.find({ userId: req.user.id });
  res.json(todos);
});

app.put('/todos/:id', authenticateToken, async (req, res) => {
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
});

app.delete('/todos/:id', authenticateToken, async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id, userId: req.user.id });
  res.json({ message: 'Todo deleted' });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
