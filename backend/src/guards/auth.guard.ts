import { IS_PUBLIC_KEY } from '@/decorators/public.decorator';
import { jwtConstants } from '@/constants/constants';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

/**
 * 共通認証処理
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  /**
   * Token認証チェック
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Tokenチェック不要(サインインAPI等)チェック
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 「@Public」が付与されている場合はスキップ
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      // トークン不正
      throw new UnauthorizedException();
    }
    try {
      // トークンチェック
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // リクエストデータにpayload付与
      request['jwtPayload'] = payload;
    } catch {
      // トークン不正
      throw new UnauthorizedException();
    }
    return true;
  }

  /**
   * リクエストヘッダーにトークンが付与されているか
   * @param request リクエストデータ
   * @returns トークン or undefined
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
