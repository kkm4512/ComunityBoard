import { Body, Controller, Post } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('isValidToken')
  isValidateToken(@Body() accessToken:string){
    this.tokenService.isValidateTokenService(accessToken)
  }
}
