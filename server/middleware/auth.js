import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = (req, res, next) => {

  const authHeader = req.headers['authorization'];
  // Format: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user info (e.g., user id) to request
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ msg: 'Token is not valid' });
  }
};

export default auth;
