import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

export const verifyCredentials = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Credenciales faltantes' });
  }
  next();
};

export const validateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token no válido' });
    }
    req.email = decoded.email;
    next();
  });
};

