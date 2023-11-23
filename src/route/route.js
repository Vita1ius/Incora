import { Router } from "express";
const router = Router();
import * as userController from '../controller/user.controller.js';
import { authenticated } from "../middleware/auth.middleware.js";

router.post('/users', userController.createUser)
router.post('/login', userController.login)
router.get('/users/:id',authenticated, userController.getUserById)
router.put('/users/:id', userController.updateUser)
export default router;