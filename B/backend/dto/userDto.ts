import { IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsString()
  password?: string;

  @IsNotEmpty()
  @IsString()
  nickname?: string;
}

export class UserDtoFirstSecnodPasswordPlus extends UserDto {
  firstPassword: string;
  secondPassword: string;
}
