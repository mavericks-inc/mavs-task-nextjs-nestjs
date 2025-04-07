import { Public } from '@/decorators/public.decorator';
import { AuthService } from '@/services/auth.service';
import { SignInDto } from '@/types/auth.dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

/**
 * 認証API用コントローラー
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * サインイン
   * @param signInDto リクエストデータ
   * @returns 認証情報
   */
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(
    @Body() signInDto: SignInDto.RequestData,
  ): Promise<SignInDto.ResponseData> {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }
}
