import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'entities/user.entity';
import { Response } from 'express';
import { UserDtoFirstSecnodPasswordPlus } from 'dto/userDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signUp')
  @UsePipes(new ValidationPipe())
  async signUp(@Body() user: UserEntity, @Res() res: Response) {
    const result = await this.userService.registerUser(user);

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
    @Body() user: UserDtoFirstSecnodPasswordPlus,
    @Res() res: Response,
  ) {
    const result = await this.userService.userPasswordChange(user);
    res.send(result);
  }
}
