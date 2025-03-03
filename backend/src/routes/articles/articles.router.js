import articleService from '../../services/articles/ArticleService.js';
import express from 'express';
import authenticate from '../../middleware/authenticate.js';

const router = express.Router();

/**
 * メモ新規登録
 */
router.get('/createArticle', authenticate, async (req, res, next) => {
  try {
    let body = {};

    res.status(200).json(body);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

export default router;
