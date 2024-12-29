import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import cookieParser from 'cookie-parser';
import { Users } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Users)
    private readonly repositoryUsers: Repository<Users>,
  ) { }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ token: string,usuario:Users }> {
    
    const usuario = await this.repositoryUsers.findOne({
        where : {
          email : email,
          password:password
        }
      })

    if (!usuario) {
      throw new UnauthorizedException();
    }

    const payload = { sub: usuario.id, username: usuario.nombres, roles: 'admin' };


    return {
      token: await this.jwtService.signAsync(payload),
      usuario
    }; 
  }
}