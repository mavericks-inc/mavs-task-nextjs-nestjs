import { ArticleController } from '@/controllers/article.controller';
import { AuthGuard } from '@/guards/auth.guard';
import { ArticleService } from '@/services/article.service';
import { PrismaService } from '@/services/prisma.service';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ExceptionModule } from './exception.module';

@Module({
  providers: [
    ArticleService,
    PrismaService,
    ExceptionModule,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [ArticleController],
  exports: [ArticleService],
})
export class ArticleModule {}
