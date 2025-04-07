import { ArticleService } from '@/services/article.service';
import { CreateArticleDto } from '@/types/article.dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

/**
 * メモAPI用コントローラー
 */
@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  /**
   * メモ新規登録
   * @param createArticleDto リクエストデータ
   * @returns メモ登録データ
   */
  @HttpCode(HttpStatus.OK)
  @Post('createArticle')
  async createArticle(@Body() createArticleDto: CreateArticleDto.RequestData) {
    return this.articleService.execCreateArticle();
  }
}
