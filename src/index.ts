import cookieParser from 'cookie-parser';
import http from 'http';
import express from 'express';
import config from './config';
import ngrok from 'ngrok';
import JettonController from './controller/jetton.controller';

const bootstrap = async () => {
  const app = express();

  const httpServer = http.createServer(app);

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(express.static(__dirname + '/../public'));

  app.set('views', __dirname + '/../public');
  app.set('view engine', 'pug');
  app.get('/', (_req, res) => {
    res.render('index');
  });

  app.post('/jetton/transfer', JettonController.transfer);

  const {port, ngrokAuthToken} = config.app;

  await new Promise<void>(resolve => httpServer.listen(port, resolve));
  console.info(`server started at port ${port}`);

  if (process.env.NODE_ENV !== 'development') {
    const ngrokPayload: ngrok.Ngrok.Options = {
      proto: 'http',
      addr: port,
      authtoken: ngrokAuthToken,
    };
    const url = await ngrok.connect(ngrokPayload);
    console.info(`ngrok url: ${url}`);
  }
};

bootstrap();
