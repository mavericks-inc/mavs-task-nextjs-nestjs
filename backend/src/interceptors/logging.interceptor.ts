import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * 共通ロガー処理
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const nextBody = { ...http.getRequest().body };
    if ('password' in nextBody) {
      // パスワードはマスク
      nextBody.password = '********';
    }

    // リクエスト情報のログ
    this.logger.log('start');
    this.logger.log(
      `api request [type=${context.getType()}, version=${
        http.getRequest().httpVersion
      }, url=${http.getRequest().url}, method=${
        http.getRequest().method
      }, body=${JSON.stringify(nextBody)}]`,
    );
    const now = Date.now();
    return next.handle().pipe(
      tap(() =>
        // 終了ログ
        this.logger.log(`end... ${Date.now() - now}ms`),
      ),
    );
  }
}
