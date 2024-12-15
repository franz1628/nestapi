import { HttpStatus, Injectable } from '@nestjs/common';
import { ExecutionContext, CallHandler, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';
import { ResponseDto } from '../dtos/responseDto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>(); // Obtener la solicitud
    return next.handle().pipe(
      map((data) => {
        return new ResponseDto(
          HttpStatus.OK,
          data,
          'Operación exitosa',
          request.url,
        );
      }),
    );
  }
}
