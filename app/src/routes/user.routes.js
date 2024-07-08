import express from 'express';
import { registerUser, loginUser, getUser } from '../controllers/user.controller.js';
import { verifyCredentials, validateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Ruta para registrar usuario
router.post('/usuarios', verifyCredentials, registerUser);

// Ruta para login de usuario
router.post('/login', verifyCredentials, loginUser);

// Ruta para obtener datos del usuario autenticado
router.get('/usuarios', validateToken, getUser);

export default router;
