import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'entities/user.entity';



@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signUp(
    @Body() user:UserEntity,
    ){
    return this.userService.registerUser(user)
  }

  
}
