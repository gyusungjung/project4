import express from 'express';
import { UsersController } from '../controllers/users.controller.js';
import authMiddleware from '../middlewares/need-signin.middleware.js';

const router = express.Router();
const usersController = new UsersController();

// 회원가입
router.post('/signup', usersController.Signup);
//로그인
router.post('/signin', usersController.Signin);
//내 정보조회
router.get('/auth/me', authMiddleware, usersController.checkToken);

export default router;
