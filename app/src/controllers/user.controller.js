import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../database/config.js';
import ERRORS from '../helpers/error.codes.js';

const SECRET_KEY = 'your_secret_key';

export const registerUser = async (req, res, next) => {
  const { email, password, rol, lenguage } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, hashedPassword, rol, lenguage]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [req.email]);
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
