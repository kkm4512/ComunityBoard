import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_SCREATE_KEY } from 'envIntelliJIDE/envIntellJ';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async isValidateTokenService(accessToken:any){
    const payload = await this.jwtService.verifyAsync(
      accessToken.cookie,
      {
        secret: JWT_SCREATE_KEY
      }
    );
    console.log(payload)
  }
}
