import { IsEmail, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class UserDto {
  @IsNumber()
  id:number;

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

export class UserDtoFirstSecnodPassword extends UserDto {
  firstPassword: string;
  secondPassword: string;
}

export class Payload extends UserDto {
}
