import {
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenGuard } from './token.guard';


@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @UseGuards(TokenGuard)
  @Post('isValidToken')
  isValidateToken() {
    return {
      success: true,
    };
  }

  @UseGuards(TokenGuard)
  @Post('refreshToken')
  refreshToken() {}
}
