import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Departamento } from './entities/departamento.entity';
import { DepartamentoController } from './departamento.controller';
import { DepartamentoService } from './departamento.service';
import { Pais } from 'src/pais/entities/pais.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Departamento,Pais])],
  controllers: [DepartamentoController],
  providers: [DepartamentoService],
})
export class DepartamentoModule {}
