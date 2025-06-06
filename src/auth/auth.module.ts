import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { Users } from 'src/users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      global: true,
      secret: '123456',
      signOptions: { expiresIn: '60000s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}