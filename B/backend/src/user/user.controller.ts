import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'entities/user.entity';
import { Response } from 'express';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
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
  async passwordChange(@Body() user: UserEntity, @Res() res: Response) {
    const result = await this.userService.userPasswordChange(user);
    res.send(result);
  }
}
