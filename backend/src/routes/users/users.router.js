import authService from '../../services/auth/AuthService.js';
import express from 'express';

const router = express.Router();

/**
 * ユーザー新規登録
 */
router.get('/createUser', async (req, res, next) => {
  try {
    let res = {};

    const body = {};
    res.status(200).json(body);
  } catch (error) {
    console.error(error);
    res.status(500).json(body);
  }
});
/**
 *
 */

export default router;
