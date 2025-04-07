import { UserService } from '@/services/user.service';
import { CreateUserDto } from '@/types/user.dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

/**
 * ユーザーAPI用コントローラー
 */
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * ユーザー新規登録
   * @param createUserDto リクエストデータ
   * @returns ユーザー登録データ
   */
  @HttpCode(HttpStatus.OK)
  @Post('createUser')
  async createUser(@Body() createUserDto: CreateUserDto.RequestData) {
    return this.userService.execCreateUser();
  }
}
