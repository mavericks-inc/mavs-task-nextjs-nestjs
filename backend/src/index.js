import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import router from './routes/index.js';

void (async () => {
  const app = express();

  // middleware設定
  app.use(compression());
  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // ルーティング設定
  app.use('/', router);

  // Routeに一致しないRequest
  // app.use((req, res, next) => {
  //   res.json({ status: 404 });
  // });

  // サーバ起動
  app.listen(3001, '0.0.0.0', () => {
    console.log('API Server Start');
  });
})();
