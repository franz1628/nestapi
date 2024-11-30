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
import { ProvinciaModule } from './provincia/provincia.module';
import { Provincia } from './provincia/entities/provincia.entity';
import { PaisModule } from './pais/pais.module';
import { Pais } from './pais/entities/pais.entity';
import { AuthModule } from './auth/auth.module';

@Module({

  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: '1234',
      database: 'ejemplo',
      entities: [User,Pais,Departamento,Provincia], 
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

  ],
})
export class AppModule {}
