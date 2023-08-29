import cookieParser from 'cookie-parser';
import http from 'http';
import express from 'express';
import config from './config';

const bootstrap = async () => {
  const app = express();

  const httpServer = http.createServer(app);

  app.use(cookieParser());

  app.get('/', (_req, res) => {
    res.send('Hello World!');
  });

  const {port} = config.app;

  await new Promise<void>(resolve => httpServer.listen(port, resolve));
  console.info(`server started at port ${port}`);
};

bootstrap();
