import { jwtConstants } from '@/constants/constants';
import { AuthController } from '@/controllers/auth.controller';
import { AuthGuard } from '@/guards/auth.guard';
import { AuthService } from '@/services/auth.service';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ExceptionModule } from './exception.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { algorithm: 'HS256', expiresIn: '10m' },
    }),
    ExceptionModule,
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
