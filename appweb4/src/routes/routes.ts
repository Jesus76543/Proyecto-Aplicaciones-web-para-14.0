import { Router, RequestHandler } from 'express';
import {
  login,
  getTimeToken,
  updateToken,
  getAllUsers,
  saveUser,
  updateUser,
  deleteUser,
} from '../controller/auth.controller';

const router = Router();

// Login y manejo de tokens
router.post('/login', login as RequestHandler);
router.get('/getTokenTime', getTimeToken as RequestHandler);
router.patch('/update/:userId', updateToken as RequestHandler);

// Gestión de usuarios
router.get('/users', getAllUsers as RequestHandler);
router.post('/users', saveUser as RequestHandler);

// 🔧 Actualizar parcialmente un usuario
router.patch('/users/:id', updateUser as RequestHandler);
 // 👈 PATCH para actualizaciones parciales

 // borrar un usuario
 router.delete('/deleteU/:id', deleteUser as RequestHandler);
export default router;
