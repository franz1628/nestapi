import { Module } from '@nestjs/common';
import { ProvinciaService } from './provincia.service';
import { ProvinciaController } from './provincia.controller';
import { Provincia } from './entities/provincia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Departamento } from 'src/departamento/entities/departamento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Provincia,Departamento]),
    JwtModule.register({
      global: true,
      secret: '123456',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  
  controllers: [ProvinciaController],
  providers: [ProvinciaService],
})
export class ProvinciaModule {}
