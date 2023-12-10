import { UsersRepository } from '../repositories/users.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UsersService {
  usersRepository = new UsersRepository();

  Signup = async (email, nickname, password, confirmpassword) => {
    const salt = bcrypt.genSaltSync(
      parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS, 10),
    );
    const hash = bcrypt.hashSync(password, salt);

    //이메일 형식
    let regEmail =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    //비밀번호 형식
    let pwRef = /^[a-zA-z0-9]{6,12}$/;

    //저장소에서 이메일 존재확인 불러오기
    const isExistEmail = await this.usersRepository.isExistEmail(email);

    //이메일 존재한다면
    if (isExistEmail) throw new Error('이미 사용중인 이메일입니다');

    //닉네임중복확인
    const isExistNickname = await this.usersRepository.isExistNickname(
      nickname,
    );
    if (isExistNickname) throw new Error('이미 사용중인 닉네임입니다');

    // 이메일 형식확인
    if (!regEmail.test(email))
      throw new Error('이메일 형식이 올바르지 않습니다');

    //패스워드 형식확인
    if (!pwRef.test(password))
      throw new Error('비밀번호 형식이 올바르지 않습니다');
    //패스워드 일치 확인
    if (password !== confirmpassword)
      throw new Error('비밀번호 확인이 일치하지 않습니다.');

    const users = await this.usersRepository.Signup(email, nickname, hash);

    return {
      email: users.email,
      nickname: users.nickname,
    };
  };

  Signin = async (email, password) => {
    const userInfo = await this.usersRepository.Signin(email);
    if (!userInfo) throw new Error('없는 사용자 이메일입니다');

    //패스워드검증
    //const userPassword = await this.usersRepository.Signin(password);
    const isPasswordCorrect = await bcrypt.compare(password, userInfo.password);

    if (!isPasswordCorrect) throw new Error('비밀번호를 다시 확인해주세요');

    const token = jwt.sign(
      { userId: userInfo.userId },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: '12h' },
    );

    return token;
  };
}
