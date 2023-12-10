import { prisma } from '../utils/prisma/index.js';

export class UsersRepository {
  Signup = async (email, nickname, hash) => {
    const signupUser = await prisma.users.create({
      data: {
        email,
        nickname,
        password: hash,
      },
    });
    return signupUser;
  };

  isExistEmail = async (email) => {
    const isExistEmail = await prisma.users.findUnique({
      where: { email },
    });

    return isExistEmail;
  };

  isExistNickname = async (nickname) => {
    const isExistNickname = await prisma.users.findUnique({
      where: { nickname },
    });
    return isExistNickname;
  };

  Signin = async (email, password) => {
    const Signin = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    return Signin;
  };
}
