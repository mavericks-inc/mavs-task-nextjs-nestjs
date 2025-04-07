import { UserController } from '@/controllers/user.controller';
import { AuthGuard } from '@/guards/auth.guard';
import { PrismaService } from '@/services/prisma.service';
import { UserService } from '@/services/user.service';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ExceptionModule } from './exception.module';

@Module({
  providers: [
    UserService,
    PrismaService,
    ExceptionModule,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
