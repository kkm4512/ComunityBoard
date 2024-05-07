import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payload, UserDto, UserDtoFirstSecnodPassword } from 'dto/userDto';
import { UserEntity } from 'entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { JWT_SCREATE_KEY } from 'envIntelliJIDE/envIntellJ';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  /**
   * 1. 회원가입한 유저의 정보를 입력받는다.
   * 2. 해당 유저의 정보의 아이디를 DB에 조회시켜본후 중복하지않으면 회원가입을 시킨다.
   * 3. 중복한다면 error 던져주기
   */

  async registerUser(user: UserDto) {
    const userFind = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });

    user.password = await bcrypt.hash(user.password, 10);

    const userCreate = this.userRepository.create({
      email: user.email,
      password: user.password,
      nickname: user.nickname,
    })

    if (!userFind) {
      await this.userRepository.save(userCreate);
      const accessToken = await this.createJwtToken(user);
      return {
        success: true,
        message: '회원가입에 성공 하였습니다.',
        accessToken,
      };
    } else {
      throw new UnauthorizedException('중복된 이메일 입니다.');
    }
  }
  /**
   * 1. 사용자가 로그인을 요청한다.
   * 2. db에서 사용자의 이메일로 조회
   * 3. 중복되면 에러 던지기, 아니면 sucecss
   */
  async checkedUserSignIn(user: Pick<UserDto, 'email' | 'password'>) {
    const userFind = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });

    if (!userFind) {
      throw new UnauthorizedException('조회되는 계정이 없습니다.');
    }

    const isCompared = await bcrypt.compare(user.password, userFind.password);

    if (isCompared === false || user.email !== userFind.email) {
      throw new UnauthorizedException(
        '아이디 또는 비밀번호가 일치하지 않습니다.',
      );
    }

    const accessToken = await this.createJwtToken(userFind);
    return {
      success: true,
      message: '로그인에 성공하였습니다.',
      accessToken,
    };
  }

  /**
   * 1. 이메일로 db조회
   * 2. 있으면 true던지기
   * 3. 없으면 error
   */

  async passwordFindByEmail(user: Pick<UserDto, 'email'>) {
    const userFind = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (!userFind) {
      throw new UnauthorizedException('요청하신 이메일이 조회되지 않습니다.');
    } else {
      return {
        success: true,
        email: user.email,
      };
    }
  }

  /**
   * 1. 프론트로부터 이메일과 비밀번호를 받는다.
   * 2. 이메일로 사용자를 먼저 찾고 (사용자는 무조건 있음)
   * 3. 그 사용자에대한 비밀번호를 변경시킨다.
   * 4. 비밀번호 변경할때도 해싱해줘야지
   */

  async userPasswordChange(user: UserDtoFirstSecnodPassword) {
    const userFind: UserDto = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (user.firstPassword !== user.secondPassword) {
      throw new UnauthorizedException('비밀번호가 서로 일치하지 않습니다.');
    }

    user.secondPassword = await bcrypt.hash(user.secondPassword, 10);

    const newUser = Object.assign(userFind, {
      password: user.secondPassword,
    });

    await this.userRepository.save(newUser);

    return {
      success: true,
      message: '비밀번호 변경에 성공하였습니다!',
    };
  }

  /**
   *  1. 로그인 or 회원가입
   *  2. jwt 토큰 프론트로 던져주는 함수작성
   *  3. email,nickname을 받으면 jwt토큰을 생성해주는 로직
   */

  async createJwtToken(user: Payload): Promise<{}> {
    const payload = { email: user.email, nickname: user.nickname, id:user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: JWT_SCREATE_KEY,
      expiresIn: '24h'
    });
    return accessToken;
  }
}
