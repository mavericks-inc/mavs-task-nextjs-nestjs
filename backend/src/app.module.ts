import { AppController } from '@/controllers/app.controller';
import { ArticleModule } from '@/modules/article.module';
import { AuthModule } from '@/modules/auth.module';
import { UserModule } from '@/modules/user.module';
import { AppService } from '@/services/app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [ArticleModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
