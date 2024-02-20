import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'entities/user.entity';
import { ErrorData, successData } from 'type/base.type';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  /**
   * 1. 회원가입한 유저의 정보를 입력받는다.
   * 2. 해당 유저의 정보의 아이디를 DB에 조회시켜본후 중복하지않으면 회원가입을 시킨다.
   * 3. 중복한다면 error 던져주기
   */

  async registerUser(user: UserEntity): Promise<boolean | ErrorData> {
    const userFind = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });

    if (!userFind) {
      await this.userRepository.save(user);
      const data: successData = {
        success: true,
      };

      return data;
    } else {
      return {
        name: 'Unauthorized',
        status: 401,
        error: '중복된 이메일 입니다.',
      };
    }
  }
  /**
   * 1. 사용자가 로그인을 요청한다.
   * 2. db에서 사용자의 이메일로 조회
   * 3. 중복되면 에러 던지기, 아니면 sucecss
   */
  async checkedUserSignIn(user: Pick<UserEntity, 'email' | 'password'>) {
    const userFind = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });

    if (!userFind) {
      const data = {
        name: 'Unauthorized',
        status: 401,
        error: '아이디 또는 비밀번호가 일치하지 않습니다.',
      };

      return data;
    } else {
      const data = {
        success: true,
      };
      return data;
    }
  }

  /**
   * 1. 이메일로 db조회
   * 2. 있으면 true던지기
   * 3. 없으면 error
   */

  async passwordFindByEmail(user:Pick<UserEntity,"email">): Promise<ErrorData | successData>{
    const userFind = await this.userRepository.findOne({
      where: {email: user.email}
    })

    if (!userFind){
      return {
        name: "NotFound",
        error: "요청하신 이메일이 조회되지 않습니다.",
        status: 404
      }
    } else {
      return {
        success: true
      }
    }
  }
}
