import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'entities/user.entity';
import { Response } from 'express';
import { UserDtoFirstSecnodPassword } from 'dto/userDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //왜 클라이언트 쿠키에 안보이냐
  //아니 어이없는게 postman에서는 잘보이냐 ㅅㅂ
  @Post('signUp')
  @UsePipes(new ValidationPipe())
  async signUp(@Body() user: UserEntity, @Res() res: Response) {
    const result = await this.userService.registerUser(user);
    res.cookie('accessToken', result?.accessToken, {
      maxAge: 60 * 60 * 24 * 1000,
      httpOnly: true,
    });
    res.send(result);
  }

  @Post('login')
  async signIn(
    @Body() user: Pick<UserEntity, 'email' | 'password'>,
    @Res() res: Response,
  ) {
    const result = await this.userService.checkedUserSignIn(user);
    res.send(result);
  }

  @Post('passwordFind')
  async findPassword(
    @Body() user: Pick<UserEntity, 'email'>,
    @Res() res: Response,
  ) {
    const result = await this.userService.passwordFindByEmail(user);
    res.send(result);
  }

  @Post('passwordChange')
  async passwordChange(
    @Body() user: UserDtoFirstSecnodPassword,
    @Res() res: Response,
  ) {
    const result = await this.userService.userPasswordChange(user);
    res.send(result);
  }
}
