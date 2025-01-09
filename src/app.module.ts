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
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import { NotificationModule } from './websocket/notificacion/notification.module';
import { ChatModule } from './websocket/chat/chat.module';
import { MessageModule } from './websocket/message/message.module';
import { Message } from './websocket/message/entities/message.entity';

@Module({

  imports: [
    AuthModule,
    NotificationModule,
    ChatModule,
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables estén disponibles en toda la aplicación
      envFilePath: '.env', // Ruta del archivo de variables de entorno
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Users, Pais, Departamento, Provincia,Message],
      synchronize: true,
      options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: true,
      },
      logging: true,
    }),
    UsersModule,
    DepartamentoModule,
    ProvinciaModule,
    PaisModule,
    UploadModule,
    MessageModule,
    
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
