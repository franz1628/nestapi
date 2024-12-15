export class ResponseDto<T> {
  statusCode: number;
  data: T;
  message?: string;
  url?: string;

  constructor(statusCode: number, data: T, message?: string, url?: string) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.url = url; 
  }
}