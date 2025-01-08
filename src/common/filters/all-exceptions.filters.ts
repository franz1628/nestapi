import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponse } from '../dtos/errorResponse';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const request = host.switchToHttp().getRequest<Request>();
    
    const status = exception?.status || 500;
    const message = exception?.message || 'Internal server error';
    
    console.log(exception);

    const errorResponse = new ErrorResponse(
      status,
      0,
      message,
      exception?.response?.message || 'Error',
      request.url,
    );
 
    
    response
      .status(status)
      .json(errorResponse); // Devuelve el objeto ErrorResponse
  }
}
