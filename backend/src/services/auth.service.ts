import { SignInDto } from '@/types/auth.dto';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';
import { UserService } from './user.service';

/**
 * 認証API用サービス
 */
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * パスワードをSHA-256でハッシュ化する
   * @param pass パスワード
   * @returns ハッシュ化後のパスワード
   */
  private hashSha256(pass: string): string {
    const hash = createHash('sha256');
    hash.update(pass);
    return hash.digest('hex');
  }

  /**
   * サインイン
   * @param email メールアドレス
   * @param pass パスワード
   * @returns 認証情報
   */
  async signIn(email: string, pass: string): Promise<SignInDto.ResponseData> {
    try {
      // ユーザー存在チェックを行う
      const user = await this.userService.user({ email: email });
      if (!user) {
        // パラメータ存在しない場合は再ログインを促すため、空で返却する
        return {};
      }
      if (user.password !== this.hashSha256(pass)) {
        // パスワード不正
        throw new UnauthorizedException();
      }

      // トークンを発行する
      const payload = { sub: user.id, email: user.email };

      // 返却用データを生成
      return {
        email: email,
        token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      this.logger.error(error.name, error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
