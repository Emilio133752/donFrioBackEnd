const { verifyToken } = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const tokenPart = token.replace('Bearer ', '');

  try {
    const decoded = verifyToken(tokenPart);  
    req.user = decoded;  
    next();  
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = authMiddleware;
