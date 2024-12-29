import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloController } from './hello/hello.controller';
import { HelloService } from './hello/hello.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/users.entity';
import { DepartamentoModule } from './departamento/departamento.module';
import { Departamento } from './departamento/entities/departamento.entity';
import { ProvinciaModule } from './provincia/provincia.module';
import { Provincia } from './provincia/entities/provincia.entity';
import { PaisModule } from './pais/pais.module';
import { Pais } from './pais/entities/pais.entity';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filters';

@Module({

  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '25.6.206.8',
      port: 1433,
      username: 'sa',
      password: '1234',
      database: 'testdamer',
      entities: [Users,Pais,Departamento,Provincia], 
      synchronize: true,
      options: {
        encrypt: false, 
        trustServerCertificate: true, // Opcional, dependiendo de tu configuración de seguridad 
  
      },
    }),
    UsersModule,
    DepartamentoModule,
    ProvinciaModule,
    PaisModule,
    
  ],
  providers: [
    {
      provide:APP_INTERCEPTOR,
      useClass:ResponseInterceptor
    },
    {
      provide:APP_FILTER,
      useClass:AllExceptionsFilter
    }
  ],
})
export class AppModule {}
