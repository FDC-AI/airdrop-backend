import cookieParser from 'cookie-parser';
import http from 'http';
import express from 'express';
import config from './config';
import routes from './routes';

const bootstrap = async () => {
  const app = express();

  const httpServer = http.createServer(app);

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  app.get('/', (_req, res) => {
    res.send('Hello World!');
  });

  app.use('/jetton', routes.jetton);

  const {port} = config.app;

  await new Promise<void>(resolve => httpServer.listen(port, resolve));
  console.info(`server started at port ${port}`);
};

bootstrap();
