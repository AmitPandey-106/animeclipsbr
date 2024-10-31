const jwt = require('jsonwebtoken');
const {jwt_secret} = require('../keys');

const middleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Authorization header is missing or malformed');
    return res.status(403).json({ error: 'Authorization header is missing or malformed' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log('Authorization token is missing');
    return res.status(403).json({ error: 'Authorization token is missing' });
  }

  try {
    // Attempt to verify token
    const decoded = jwt.verify(token, jwt_secret);
    req.user = decoded;  // Attach decoded user data to request object
    // console.log('Token successfully verified, user:', req.user);
    next();
  } catch (error) {
    console.error('Invalid or expired token:', error.message);  // Log the actual error message
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = middleware;
