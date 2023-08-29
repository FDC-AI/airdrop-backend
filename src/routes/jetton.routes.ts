import {Router} from 'express';
import JettonController from '../controller/jetton.controller';

const jettonRouter = Router();
jettonRouter.post('/transfer', JettonController.transfer);

export default jettonRouter;
