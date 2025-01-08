export class ErrorResponse {
    statusCode: number;
    state:number;
    message: string;
    error?: string;  
    data?: any;      
    timestamp?: string;
    path?: string;
  
    constructor(
      statusCode: number,
      state:number,
      message: string,
      error?: string,
      path?: string,
      data: any = null,
    ) {
      this.statusCode = statusCode;
      this.state = state;
      this.message = message;
      this.error = error;
      this.path = path;
      this.data = data;
      this.timestamp = new Date().toISOString();
    }
  }