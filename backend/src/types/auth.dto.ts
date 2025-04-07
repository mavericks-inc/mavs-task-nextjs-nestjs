import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * サインインAPI用の型定義
 */
export namespace SignInDto {
  export class RequestData {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
  }
  export class ResponseData {
    email?: string;
    token?: string;
  }
}
