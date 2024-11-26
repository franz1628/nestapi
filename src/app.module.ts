import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloController } from './hello/hello.controller';
import { HelloService } from './hello/hello.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { DepartamentoModule } from './departamento/departamento.module';
import { Departamento } from './departamento/entities/departamento.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: '1234',
      database: 'prueba',
      entities: [User,Departamento], 
      synchronize: true,
      options: {
        trustServerCertificate: true, // Ignora la validación del certificado
      },
    }),
    UsersModule,
    DepartamentoModule
  ],
})
export class AppModule {}
