import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  signUp(
    @Body() user:UserEntity
    ){
    console.log(user)
    return this.userService.registerUser(user)
  }

  
}
