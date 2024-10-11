const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');
const JWT_SECRET = '229cef5f73b48a77dce22b24272edbd7be2c6554571f155a3749339396396e6b98e';


exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET);
  res.json({ token });
};
