import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'entities/user.entity';
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

  async registerUser(user: UserEntity): Promise<boolean> {
    const userFind = this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });

    if (userFind) {
      throw new UnauthorizedException('중복된 이메일 입니다.');
    }

    const createUser = this.userRepository.create(user)
    this.userRepository.save(createUser)

    return true;
  }
}
