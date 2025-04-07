import { CreateArticleDto } from '@/types/article.dto';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Article, Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

/**
 * メモAPI用サービス
 */
@Injectable()
export class ArticleService {
  private readonly logger = new Logger(ArticleService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * メモ新規登録
   * @returns
   */
  async execCreateArticle(): Promise<CreateArticleDto.ResponseData> {
    try {
      // TODO: 実装してください。
      return {};
    } catch (error) {
      this.logger.error(error.name, error);
      throw new InternalServerErrorException();
    }
  }

  /**
   * 1件データ取得
   */
  async article(
    articleWhereUniqueInput: Prisma.ArticleWhereUniqueInput,
  ): Promise<Article | null> {
    return this.prisma.article.findUnique({
      where: articleWhereUniqueInput,
    });
  }

  /**
   * 複数件データ取得
   */
  async articles(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ArticleWhereUniqueInput;
    where?: Prisma.ArticleWhereInput;
    orderBy?: Prisma.ArticleOrderByWithRelationInput;
  }): Promise<Article[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.article.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /**
   * データ登録
   */
  async createArticle(data: Prisma.ArticleCreateInput): Promise<Article> {
    return this.prisma.article.create({
      data,
    });
  }

  /**
   * データ更新
   */
  async updateArticle(params: {
    where: Prisma.ArticleWhereUniqueInput;
    data: Prisma.ArticleUpdateInput;
  }): Promise<Article> {
    const { where, data } = params;
    return this.prisma.article.update({
      data,
      where,
    });
  }

  /**
   * データ削除
   */
  async deleteArticle(where: Prisma.ArticleWhereUniqueInput): Promise<Article> {
    return this.prisma.article.delete({
      where,
    });
  }
}
