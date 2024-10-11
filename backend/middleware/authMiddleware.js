const jwt = require('jsonwebtoken');
const JWT_SECRET = '229cef5f73b48a77dce22b24272edbd7be2c6554571f155a3749339396396e6b98e'; 

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
