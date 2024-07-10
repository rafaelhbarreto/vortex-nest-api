import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class LogInterceptor implements NestInterceptor {
  log(method: string, url: string, timeBefore: number) {
    const duration = Date.now() - timeBefore;
    console.log(`${method} ${url} ${duration}ms`);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();

    return next.handle().pipe(tap(() => this.log(method, url, now)));
  }
}
