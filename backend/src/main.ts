import { LoggingInterceptor } from '@/interceptors/logging.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS有効
  app.enableCors();
  // バリデーション
  app.useGlobalPipes(
    new ValidationPipe({
      // 詳細エラーメッセージを無効
      disableErrorMessages: true,
    }),
  );
  // ロガーインターセプター
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3001);
}
bootstrap();
