import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

interface ErrorResponse {
  message: string;
  status: number;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let errorResponse: ErrorResponse;

    const message = exception?.response?.message || exception?.message;

    if (exception instanceof HttpException) errorResponse = { 
      status: exception.getStatus(), 
      message: message
    };
    else errorResponse = { message, status: HttpStatus.INTERNAL_SERVER_ERROR };

    response.status(errorResponse.status).json({
      statusCode: errorResponse.status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: errorResponse.message,
    });
  }
}
