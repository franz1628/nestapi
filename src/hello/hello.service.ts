import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
    getHello(): string { return 'Hello from NestJS Service!'; }
}