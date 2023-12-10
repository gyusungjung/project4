import { UsersService } from '../services/auth.service.js';

export class UsersController {
  usersService = new UsersService();
  Signup = async (req, res, next) => {
    try {
      const { email, nickname, password, confirmpassword } = req.body;

      const users = await this.usersService.Signup(
        email,
        nickname,
        password,
        confirmpassword,
      );

      return res
        .status(200)
        .json({ message: '회원가입이 완료되었습니다.', data: users });
    } catch (err) {
      next(err);
    }
  };

  Signin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await this.usersService.Signin(email, password);

      // 응답 헤더에 JWT 토큰을 설정합니다.
      res.header('Authorization', `Bearer ${token}`);
      return res.status(200).json({ token: `Bearer ${token}` });
    } catch (err) {
      next(err);
    }
  };

  checkToken = async (req, res, next) => {
    try {
      const { userId, email, nickname } = res.locals.user;

      return res.status(200).json({
        message: '토큰이 정상적입니다.',
        data: { userId, email, nickname },
      });
    } catch (err) {
      next(err);
    }
  };
}
