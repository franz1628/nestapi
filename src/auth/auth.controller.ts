import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Users } from 'src/users/users.entity';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Res() res:Response,@Body() signInDto: Record<string, any>){
    const {token,usuario} =  await this.authService.signIn(signInDto.username, signInDto.password);
    
    res.cookie('authToken',token,{
      httpOnly:true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax', // desarrollo
      maxAge: 1000 * 60 * 60 * 100,
    })
    return res.send(usuario);
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    res.send({ message: 'Sesión cerrada' });
  }

  @UseGuards(AuthGuard)
  @Get('validate')
  validate(@Req() req: Request) {
    return {
      message: 'Token válido',
      user: req.user, 
    };
  }
}