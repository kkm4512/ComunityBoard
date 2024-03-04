import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { AuthGuard } from './token.guard';
import { Request } from 'express';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @UseGuards(AuthGuard)
  @Post('isValidToken')
  isValidateToken() {
    return {
      success: true,
    };
  }

  @Post('refreshToken')
  refreshToken() {}
}
